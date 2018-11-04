import { MaterialStats } from './material-stats.model';
import { MaterialType } from './material-types';
export class Material {
    id: number;
    name: string;
    link: string;
    type: MaterialType;
  stats: Array<MaterialStats>;

  GetTotalViews(): number {
    let total = 0;
    for (let i = 0; i < this.stats.length; i++) {
      total += this.stats[i].downloads;
    }
    return total;
  }
}
