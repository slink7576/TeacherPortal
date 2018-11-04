import { NgModule, Injectable } from '@angular/core';
import { MaterialsRepository } from '../../database/materials-repository';
import { Material } from '../models/material.model';
import { Mapper } from '../../helpers/data/mapper';
@Injectable()

export class MaterialService {
  constructor(private materialsRepository: MaterialsRepository) {
  }
  GetMaterialsWithoutPhoto() {
    let materials = new Array<Material>();
    this.materialsRepository.GetAll().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].type.name != 'Фото') {
          materials.push(Mapper.MapMaterial(data[i]));
        }
      }
    });
    return materials;
  }
  GetMaterials() {
    let materials = new Array<Material>();
    this.materialsRepository.GetAll().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
          materials.push(Mapper.MapMaterial(data[i]));
      }
    });
    return materials;
  }
  FindMaterials(materialType: number, materialName: string) {
    let materials = new Array<Material>();
    this.materialsRepository.Find(materialType, materialName).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        materials.push(Mapper.MapMaterial(data[i]));
      }
    });
    return materials;
  }
  GetPhotos() {
    let photos = new Array<Material>();
    this.materialsRepository.GetAll().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].type.name == 'Фото') {
          photos.push(Mapper.MapMaterial(data[i]));
        }
      }
      });
    return photos;
  }
  GetStats(id: number) {
    return this.materialsRepository.GetStats(id);
  }
  GetById(id: number) {
    return this.materialsRepository.GetById(id);
  }
  Update(material: Material) {
    return this.materialsRepository.Update(material);
  }
  Delete(id: number) {
    return this.materialsRepository.Delete(id);
  }
  Add(material: Material) {
    return this.materialsRepository.Add(material);
  }
  AddView(id: number) {
    this.materialsRepository.AddView(id);
  }
}
