import { LightInfo } from './light-info';

export class ListResult {
  count!: string;
  next?: string;
  previous?: string;
  results!: LightInfo[];
}
