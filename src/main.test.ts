import 'jest';
import { distance } from './distance';
import assert = require('assert');
import { PoIImpactCalculator } from './impact';
import { ToRadian } from './utils';

const event_imp = {
  lat: 48.82094216189432,
  lon: 2.4049238868200975,
  _sin: Math.sin(ToRadian(48.82094216189432)),
  _cos: Math.cos(ToRadian(48.82094216189432)),
  event_type: 'imp',
};

const event_imp2 = {
  lat: 48.872067,
  lon: 2.305856,
  _sin: Math.sin(ToRadian(48.872067)),
  _cos: Math.cos(ToRadian(48.872067)),
  event_type: 'imp',
};

const event_click = {
  lat: 48.863603,
  lon: 2.34264,
  _sin: Math.sin(ToRadian(48.863603)),
  _cos: Math.cos(ToRadian(48.863603)),
  event_type: 'click',
};

describe('Distance', () => {
  it('Should calculate valid distance', () => {
    const d1 = distance(
      event_imp,
      Math.sin(ToRadian(48.8759992)),
      Math.cos(ToRadian(48.8759992)),
      2.3481253
    );
    assert(d1.toFixed(2) == '7.40');
  });
});

describe('PoIImpact', () => {
  it('Should calculate valid impact', () => {
    const response = PoIImpactCalculator(
      [event_imp, event_imp2, event_click],
      [
        { lat: 48.8759992, lon: 2.3481253, name: 'Arc de triomphe' },
        { lat: 48.86, lon: 2.35, name: 'Chatelet' },
      ]
    );

    assert(response['Arc de triomphe'].impressions == 1);
    assert(response['Chatelet'].clicks == 1);
    assert(response['Chatelet'].impressions == 1);
  });
});
