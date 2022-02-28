import * as http from 'http';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { Event, EventProcessed, PoI } from './types';
import { PoIImpactCalculator } from './impact';
import { ToRadian } from './utils';

const server = http.createServer();
const events: EventProcessed[] = [];

server.on('request', (req: http.IncomingMessage, res: http.ServerResponse) => {
  let raw = '';

  req.on('readable', () => {
    let chunk;

    while (null !== (chunk = req.read())) {
      raw += chunk;
    }
  });

  req.on('end', () => {
    let body: PoI[] = [];

    try {
      body = JSON.parse(raw);
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(`{"error": "${e}"}`);
    }

    const response = PoIImpactCalculator(events, body);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(response));
  });
});

fs.createReadStream('events.csv')
  .pipe(csv())
  .on('data', (data: Event) => {
    const _rad = ToRadian(data.lat);
    const _sin = Math.sin(_rad);
    const _cos = Math.cos(_rad);

    events.push({ ...data, _sin, _cos });
  })
  .on('end', () => {
    console.log('finished processing events.csv, server is ready');
    server.listen(8080);
  });
