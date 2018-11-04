import { Article } from '../core/models/article.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Config } from '../../config';
import { Injectable, NgModule } from '@angular/core';
import { enterView } from '@angular/core/src/render3/instructions';
import { ArticleStats } from '../core/models/article-stats.model';

@NgModule({
    imports: [
        HttpClient,
    ],
})
@Injectable({
    providedIn: 'root',
})

export class ArticleRepository {
    path: string;
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {
        this.path = Config.SERVER + 'Articles/';
    }
    AddMaterialToArticle(article: number, material: number) {
        return this.http.post(this.path + 'AddMaterial/' + article + '/' + material, '').subscribe();
    }
    GetStats(id: number) {
        return this.http.get<Array<ArticleStats>>(this.path + 'Stats/' + id);
    }
    GetAll() {
        return this.http.get<Array<Article>>(this.path);
    }
    Add(entity: Article) {
        let date = new Date();
        let currDate = date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear();
        entity.date = currDate;
        entity.id = 0;
        if (entity.materials == undefined) {
            entity.materials = null;
        }
        if (entity.stats == undefined) {
            entity.stats = null;
        }
        let body = JSON.stringify(entity);
        return this.http.post(this.path, body, this.httpOptions);
    }

    GetPage(page: number) {
        return this.http.get<Array<Article>>(this.path + '?page=' + page);
    }

    Delete(entity: Article) {
        return this.http.delete(this.path + entity.id);
    }

    Update(entity: Article) {
        let body = JSON.stringify(entity);
        return this.http.put(this.path + entity.id, body, this.httpOptions);
    }

    GetById(id: number) {
        return this.http.get<Article>(this.path + id);
    }

    AddView(id: number) {
        this.http.post(this.path + 'Views/' + id, '').subscribe();
    }
}
