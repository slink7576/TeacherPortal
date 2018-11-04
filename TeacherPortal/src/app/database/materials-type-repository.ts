import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../../config';
import { Injectable, NgModule } from '@angular/core';
import { MaterialType } from '../core/models/material-types';

@NgModule({
  imports: [
    HttpClient,
  ]
})
@Injectable({
  providedIn: 'root',
})

export class MaterialsTypeRepository {
  path: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {
    this.path = Config.SERVER + 'MaterialTypes/';
  }

  GetAll() {
    return this.http.get<Array<MaterialType>>(this.path);
  }
  Add(entity: MaterialType) {
    return this.http.post<MaterialType>(this.path, JSON.stringify(entity), this.httpOptions);
  }

  Delete(id: number) {
    return this.http.delete(this.path + id);
  }

  Update(entity: MaterialType) {
    return this.http.put<MaterialType>(this.path + entity.id, JSON.stringify(entity), this.httpOptions);
  }

  GetById(id: number) {
    return this.http.get<MaterialType>(this.path + id);
  }
}
