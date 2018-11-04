import { Material } from './material.model';
import { ArticleStats } from './article-stats.model';
export class Article {
    id: number;
    title: string;
    body: string;
    date: string;
    materials: Array<Material>;
    stats: Array<ArticleStats>;
  constructor(title: string, body: string, date: string) {
    this.title = title;
    this.body = body;
    this.date = date;
  }
  GetBodySize(): number {
    return this.body.length;
  }
  GetTotalViews(): number {
    let total = 0;
    for (let i = 0; i < this.stats.length; i++) {
      total += this.stats[i].views;
    }
    return total;
  }
  GetTotalLikes(): number {
    let total = 0;
    for (let i = 0; i < this.stats.length; i++) {
      total += this.stats[i].likes;
    }
    return total;
  }
}
