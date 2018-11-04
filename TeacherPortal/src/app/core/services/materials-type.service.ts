import { NgModule, Injectable } from '@angular/core';
import { MaterialType } from '../models/material-types';
import { MaterialsTypeRepository } from '../../database/materials-type-repository';
@Injectable()

export class MaterialsTypeService {
  constructor(private materialsTypeRepository: MaterialsTypeRepository) {
  }
  GetMaterials() {
    return this.materialsTypeRepository.GetAll();
  }
  GetById(id: number) {
    return this.materialsTypeRepository.GetById(id);
  }
  Delete(id: number) {
    return this.materialsTypeRepository.Delete(id);
  }
  Add(entity: MaterialType) {
    return this.materialsTypeRepository.Add(entity);
  }
  Update(entity: MaterialType) {
    return this.materialsTypeRepository.Update(entity);
  }
}
