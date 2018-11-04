import { Component, ViewChild, OnInit } from '@angular/core';
import { ArticleService } from '../../../core/services/article.service';
import { Article } from '../../../core/models/article.model';
import { Mapper } from '../../../helpers/data/mapper';
import { Chart } from 'chart.js';
import { MaterialType } from '../../../core/models/material-types';
import { AdminLogin } from '../admin-login';
import { MaterialService } from '../../../core/services/materials.service';
import { Material } from '../../../core/models/material.model';
import { MaterialsTypeService } from '../../../core/services/materials-type.service';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-admin-article-component',
  templateUrl: './admin-article.component.html'
})
export class AdminArticleComponent extends AdminLogin implements OnInit {

    @ViewChild('statChart') private chartRef;
    @ViewChild('hideModal') private hideModal;
  articles: Array<Article>;
  editArticle: Article;
  isOpened: boolean = false;
  chart: any;
  formError = false;
  findName: string;
  materials: Array<Material>;
  materialTypes: Array<MaterialType>;
  selectedMaterial: number;
  addMaterialArticle: number;

  constructor(private articleService: ArticleService,
    private materialService: MaterialService,
    private materialsTypeService: MaterialsTypeService,
    private loaderService: LoaderService) {
    super();
  }
  ngOnInit(): void {
      this.editArticle = new Article('', '', '');
      this.materials = new Array<Material>();
      this.materialTypes = new Array<MaterialType>();
      this.loaderService.Start();
      this.articleService.GetArticles().subscribe(data => {
        this.loaderService.Middle();
        const tmpArr = new Array<Article>();
        for (let i = 0; i < data.length; i++) {
          tmpArr.push(Mapper.MapToArticle(data[i]));
        }
        this.articles = tmpArr;
        this.loaderService.FinishGood();
      });
      this.materialsTypeService.GetMaterials().subscribe(data => {
          for (let i = 0; i < data.length; i++) {
              this.materialTypes.push(Mapper.MapMaterialType(data[i]));
          };
          this.selectedMaterial = this.materialTypes[0].id;
      },
          error => {
              this.loaderService.FinishBad();
          }
      );
    
  }
  OpenAddMaterial(targetArticle: number) {
    this.addMaterialArticle = targetArticle;
  }
  Search() {
    if (this.findName == undefined || this.findName == null) {
      this.findName = ' ';
    }
    this.materials = this.materialService.FindMaterials(this.selectedMaterial, this.findName);
  }
  AddMaterial(materialId: number) {
    this.loaderService.Start();
    this.loaderService.Middle();
    this.articleService.AddMaterialToArticle(this.addMaterialArticle, materialId);
    this.loaderService.FinishGood();
  }
    OpenForm(id?: number) {
        this.formError = false;
    if (id !== undefined) {
      this.articleService.GetById(id).subscribe(data => {
        this.editArticle = Mapper.MapToArticle(data[0]);
      });
    } else {
      this.editArticle = new Article('', '', '');
    }
  }
    SubmitForm() {
        if (this.editArticle.title.length == 0 || this.editArticle.title == undefined) {
      this.formError = true;
        }
        else if (this.editArticle.body.length == 0 || this.editArticle.body == undefined) {
            this.formError = true;
    }
    else {
      if (this.editArticle.id !== undefined) {
        this.loaderService.Start();
        this.articleService.Update(this.editArticle).subscribe(data => {
          this.loaderService.Middle();
          let art = Mapper.MapToArticle(data[0]);
          for (let i = 0; i < this.articles.length; i++) {
            if (this.articles[i].id == art.id) {
              this.articles[i] = art;
            }
          }
            this.loaderService.FinishGood();
            this.hideModal.nativeElement.click();
        },
            error => {
                this.loaderService.FinishBad();
            }

        );
      }
      else {
        this.loaderService.Start();
        this.articleService.Add(this.editArticle).subscribe(data => {
          this.loaderService.Middle();
          this.articles.push(Mapper.MapToArticle(data[0]));
            this.loaderService.FinishGood();
            this.hideModal.nativeElement.click();
            
        },
            error => {
                this.loaderService.FinishBad();
            }
        );
      }
      this.editArticle = new Article('', '', '');
            this.formError = false;
    }
  }
  Delete(id: number) {
    if (confirm('Ви впевнені?')) {
      this.loaderService.Start();
      this.articleService.Delete(id).subscribe(data => {
        this.loaderService.Middle();
        let indx;
        for (let i = 0; i < this.articles.length; i++) {
          if (this.articles[i].id == id) {
            indx = i;
          }
        }
        this.articles.splice(indx, 1);
        this.loaderService.FinishGood();
      });
    }
  }
    OpenStats(id: number) {
    this.articleService.GetStats(id).subscribe(data => {
      if (this.isOpened) {
        this.chart.destroy();
      }
      let labels = new Array<string>();
      let stats = new Array<number>();
      for (let i = 0; i < data.length; i++) {
        labels.push(data[i].date.slice(0, 10));
        stats.push(data[i].views);
      }
      this.isOpened = true;
      this.chart = new Chart(this.chartRef.nativeElement, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              data: stats,
                  borderColor: '#5e83ba',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }

}
