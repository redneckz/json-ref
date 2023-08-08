import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import type { URIResolver } from './URIResolver';

const readFile = promisify(fs.readFile);

export const fileResolver =
  (basePath: string): URIResolver =>
  async uri =>
    JSON.parse(await readFile(path.join(basePath, uri), 'utf-8'));
