import type { URIResolver } from './URIResolver';
import * as path from 'path';
import { readFile } from 'fs/promises';

export const fileResolver =
  (basePath: string): URIResolver =>
  async uri =>
    JSON.parse(await readFile(path.join(basePath, uri), 'utf-8'));
