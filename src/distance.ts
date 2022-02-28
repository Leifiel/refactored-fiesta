import { EventProcessed } from './types';
import { ToRadian } from './utils';

export const distance = (
  event: EventProcessed,
  _sin: number,
  _cos: number,
  lon: number
) => {
  const rad = ToRadian(event.lon - lon);
  let dist = event._sin * _sin + event._cos * _cos * Math.cos(rad);

  if (dist > 1) dist = 1;
  dist = ((Math.acos(dist) * 180) / Math.PI) * 60 * 1.1515 * 1.609344;
  return dist;
};
