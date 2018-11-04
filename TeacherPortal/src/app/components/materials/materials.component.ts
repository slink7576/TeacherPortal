import { Component, OnInit } from '@angular/core';
import { Material } from '../../core/models/material.model';
import { MaterialService } from '../../core/services/materials.service';
import { Mapper } from '../../helpers/data/mapper';
import { MaterialType } from '../../core/models/material-types';
import { MaterialsTypeService } from '../../core/services/materials-type.service';
import { LoaderService } from '../../services/loader.service';

@Component({
    selector: 'app-materials-component',
    templateUrl: './materials.component.html'
})
export class MaterialsComponent implements OnInit {

    materials: Array<Material>;
    materialTypes: Array<MaterialType>;
    storageMaterials: Array<Material>;
    selectedType: number;
    findName: string;
    empty: boolean = false;
    constructor(private materialService: MaterialService, private materialsTypeService: MaterialsTypeService, private loaderService: LoaderService) {
    }
    ngOnInit(): void {
        this.materialTypes = new Array<MaterialType>();
        this.materials = this.materialService.GetMaterialsWithoutPhoto();
        this.storageMaterials = this.materials;
        this.loaderService.Start();
        this.materialsTypeService.GetMaterials().subscribe(data => {
            this.loaderService.Middle();
            for (let i = 0; i < data.length; i++) {
                if (data[i].name != 'Фото') {
                    this.materialTypes.push(Mapper.MapMaterialType(data[i]));
                }
            };
            this.selectedType = this.materialTypes[0].id;
            this.loaderService.FinishGood();
        },
            error => {
                this.loaderService.FinishBad();
            })
    }

    OpenUrl(url: string, id: number) {
        this.materialService.AddView(id);
        window.open(url, '_blank');
    }
    Refresh() {
        this.materials = this.storageMaterials;
    }
    Search() {
        if (this.findName != undefined && this.findName.length != 0) {
            this.materials = new Array<Material>();
            for (let i = 0; i < this.storageMaterials.length; i++) {
                if (this.storageMaterials[i].name == this.findName &&
                    this.storageMaterials[i].type.id == this.selectedType) {
                    this.materials.push(this.storageMaterials[i]);
                }
            }
        }
        else if (this.findName == undefined || this.findName.length != 0) {
            this.materials = new Array<Material>();
            for (let i = 0; i < this.storageMaterials.length; i++) {
                if (this.storageMaterials[i].type.id == this.selectedType) {
                    this.materials.push(this.storageMaterials[i]);
                }
            }
        }
        if (this.materials.length == 0) {
            this.empty = true;

        }
        else {
            this.empty = false;
        }
    }
}
