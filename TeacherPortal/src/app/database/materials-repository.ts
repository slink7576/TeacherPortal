import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../../config';
import { Injectable, NgModule } from '@angular/core';
import { Material } from '../core/models/material.model';
import { MaterialStats } from '../core/models/material-stats.model';

@NgModule({
  imports: [
    HttpClient,
  ]
})
@Injectable({
  providedIn: 'root',
})

export class MaterialsRepository {
  path: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {
    this.path = Config.SERVER + 'Materials/';

  }
  Find(materialType: number, materialName: string) {
    return this.http.get<Array<Material>>(this.path + 'Find/?type=' + materialType + '&name=' + materialName);
  }
  GetStats(id: number) {
    return this.http.get<Array<MaterialStats>>(this.path + 'Stats/' + id);
  }
  GetAll() {
    return this.http.get<Array<Material>>(this.path);
  }
  Add(entity: Material) {
    return this.http.post<Material>(this.path, JSON.stringify(entity), this.httpOptions);
  }

  Delete(id: number) {
    return this.http.delete<Material>(this.path + id);
  }

  Update(entity: Material) {
    return this.http.put<Material>(this.path + entity.id, JSON.stringify(entity), this.httpOptions);
  }

  GetById(id: number) {
    return this.http.get<Material>(this.path + id);
  }

  AddView(id: number) {
    return this.http.post(this.path + 'Views/' + id, '').subscribe();
  }
}
