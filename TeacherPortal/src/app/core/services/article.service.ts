import { Article } from '../models/article.model';
import { ArticleRepository } from '../../database/article-repository';
import { NgModule, Injectable } from '@angular/core';
import { Mapper } from '../../helpers/data/mapper';

@Injectable()
export class ArticleService {
    constructor(private articleRepository: ArticleRepository) {
    }
    AddMaterialToArticle(article: number, material: number) {
        this.articleRepository.AddMaterialToArticle(article, material);
    }
    GetStats(id: number) {
        return this.articleRepository.GetStats(id);
    }
    GetArticles() {
        return this.articleRepository.GetAll();
    }
    GetPage(page: number) {
        return this.articleRepository.GetPage(page);
    }
    GetById(id: number) {
        return this.articleRepository.GetById(id);
    }
    Delete(id: number) {
        const articleTmp = new Article('', '', '');
        articleTmp.id = id;
        return this.articleRepository.Delete(articleTmp);
    }
    Add(article: Article) {
        return this.articleRepository.Add(article);
    }
    AddView(id: number) {
        this.articleRepository.AddView(id);
    }
    Update(article: Article) {
        return this.articleRepository.Update(article);
    }
}
