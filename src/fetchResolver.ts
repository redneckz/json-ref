import type { URIResolver } from './URIResolver';

export const fetchResolver =
  (init?: RequestInit): URIResolver =>
  async uri =>
    (await fetch(uri, init)).json();
