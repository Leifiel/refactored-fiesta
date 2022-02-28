export interface PoI {
  lat: number;
  lon: number;
  name: string;
}

export type PoIResponse = {
  [key: string]: PoI & {
    impressions: number;
    clicks: number;
  };
};

export interface PoIProcessed {
  _sin: number;
  _cos: number;
}

export interface Event {
  lat: number;
  lon: number;
  event_type: string;
}

export interface EventProcessed extends Event {
  _sin: number;
  _cos: number;
}
