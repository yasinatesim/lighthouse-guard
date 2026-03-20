import * as fs from 'fs';
import * as path from 'path';
import { RunResult } from '../types';

export function generateDashboardHTML(results: RunResult[]): string {
  const template = fs.readFileSync(
    path.join(__dirname, 'dashboard.html'),
    'utf-8'
  );

  return template.replace('__RESULTS_DATA__', JSON.stringify(results));
}
