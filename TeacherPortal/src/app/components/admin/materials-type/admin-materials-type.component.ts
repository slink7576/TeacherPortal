import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialsTypeService } from '../../../core/services/materials-type.service';
import { MaterialType } from '../../../core/models/material-types';
import { Mapper } from '../../../helpers/data/mapper';
import { extend } from 'webdriver-js-extender';
import { AdminLogin } from '../admin-login';
import { AdminService } from '../../../services/admin-service';
import { LoaderService } from '../../../services/loader.service';

@Component({
    selector: 'app-admin-materials-type-component',
    templateUrl: './admin-materials-type.component.html'
})
export class AdminMaterialsTypeComponent extends AdminLogin implements OnInit {

    materialTypes: Array<MaterialType>;
    editMaterialType: MaterialType;
    formError: boolean = false;
    @ViewChild('hideModal') private hideModal;
    constructor(private materialsTypeService: MaterialsTypeService, private loaderService: LoaderService) {
        super();
    }
    ngOnInit(): void {
        this.loaderService.Start();
        this.materialTypes = new Array<MaterialType>();
        this.editMaterialType = new MaterialType();
        this.materialsTypeService.GetMaterials().subscribe(data => {
            this.loaderService.Middle();
            for (let i = 0; i < data.length; i++) {
                this.materialTypes.push(Mapper.MapMaterialType(data[i]));
            };
            this.loaderService.FinishGood();
        },
            error => {
                this.loaderService.FinishBad();
            });


    }
    OpenForm(id?: number) {
        this.formError = false;
        if (id !== undefined) {
            this.materialsTypeService.GetById(id).subscribe(data => {
                this.editMaterialType = Mapper.MapMaterialType(data);
            });
        } else {
            this.editMaterialType = new MaterialType();
        }
    }
    SubmitForm() {
        if (this.editMaterialType.name == undefined || this.editMaterialType.name.length == 0) {
            this.formError = true;
        }
      else {
            this.loaderService.Start();
            if (this.editMaterialType.id != undefined) {
                this.materialsTypeService.Update(this.editMaterialType).subscribe(data => {
                    this.loaderService.Middle();
                    let mat = Mapper.MapMaterialType(data);
                    for (let i = 0; i < this.materialTypes.length; i++) {
                        if (this.materialTypes[i].id == mat.id) {
                            this.materialTypes[i] = mat;
                        }
                    }
                    this.loaderService.FinishGood();
                    this.hideModal.nativeElement.click();
                },
                    error => {
                        this.loaderService.FinishBad();
                    });
            }
            else {
                this.materialsTypeService.Add(this.editMaterialType).subscribe(data => {
                    this.loaderService.Middle();
                    this.materialTypes.push(Mapper.MapMaterialType(data));
                    this.loaderService.FinishGood();
                    this.hideModal.nativeElement.click();
                },
                    error => {
                        this.loaderService.FinishBad();
                    });
            }
        }
    }
    Delete(id: number) {
        if (confirm('Ви впевнені?')) {
            this.materialsTypeService.Delete(id).subscribe(data => {
                this.loaderService.Middle();
                let indx;
                for (let i = 0; i < this.materialTypes.length; i++) {
                    if (this.materialTypes[i].id == id) {
                        indx = i;
                    }
                }
                this.materialTypes.splice(indx, 1);
                this.loaderService.FinishGood();
            },
                error => {
                    this.loaderService.FinishBad();
                });
        }
    }
}
