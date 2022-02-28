import { EventProcessed, PoI, PoIProcessed, PoIResponse } from './types';
import { distance } from './distance';
import { ToRadian } from './utils';

export const PoIImpactCalculator = (
  events: EventProcessed[],
  poi: PoI[]
): PoIResponse => {
  const poi_processed: { [key: string]: PoIProcessed } = {};
  const response: PoIResponse = {};

  for (let point of poi) {
    const _rad = ToRadian(point.lat);

    response[point.name] = {
      ...point,
      impressions: 0,
      clicks: 0,
    };
    poi_processed[point.name] = {
      _sin: Math.sin(_rad),
      _cos: Math.cos(_rad),
    };
  }

  for (let event of events) {
    let closest = '';
    let closestDist = 0;

    Object.keys(response).forEach((key) => {
      const dist = distance(
        event,
        poi_processed[key]._sin,
        poi_processed[key]._cos,
        response[key].lon
      );

      if (!closest || dist < closestDist) {
        closest = key;
        closestDist = dist;
      }
    });

    if (event.event_type == 'imp') {
      response[closest].impressions += 1;
    } else if (event.event_type == 'click') {
      response[closest].clicks += 1;
    }
  }
  return response;
};
