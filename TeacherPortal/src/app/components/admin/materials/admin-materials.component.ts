import { Component, ViewChild, OnInit } from '@angular/core';
import { MaterialService } from '../../../core/services/materials.service';
import { Material } from '../../../core/models/material.model';
import { Mapper } from '../../../helpers/data/mapper';
import { MaterialType } from '../../../core/models/material-types';
import { MaterialsTypeService } from '../../../core/services/materials-type.service';
import { AdminLogin } from '../admin-login';
import { AdminService } from '../../../services/admin-service';
import { Chart } from 'chart.js';
import { LoaderService } from '../../../services/loader.service';

@Component({
    selector: 'app-admin-materials-component',
    templateUrl: './admin-materials.component.html'
})
export class AdminMaterialsComponent extends AdminLogin implements OnInit {

    materials: Array<Material>;
    editMaterial: Material;
    materialTypes: Array<MaterialType>;
    storageMaterials: Array<Material>;
    selectedMaterialTypeId: number;
    findName: string;
    isOpened: boolean = false;
    formError: boolean = false;
    chart: any;
    empty: boolean = false;
    @ViewChild('statChart') private chartRef;
    @ViewChild('hideModal') private hideModal;
    constructor(private materialService: MaterialService,
        private materialsTypeService: MaterialsTypeService,
        private loaderService: LoaderService) {
        super();
    }

    ngOnInit(): void {
        this.loaderService.Start();
        this.editMaterial = new Material();
        this.materialTypes = new Array<MaterialType>();
        this.materials = this.materialService.GetMaterials();
        this.storageMaterials = this.materials;
        this.materialsTypeService.GetMaterials().subscribe(data => {
            this.loaderService.Middle();
            for (let i = 0; i < data.length; i++) {
                this.materialTypes.push(Mapper.MapMaterialType(data[i]));
            }
            this.selectedMaterialTypeId = this.materialTypes[0].id;
            this.loaderService.FinishGood();
        },
            error => {
                this.loaderService.FinishBad();
            }
        );

    }

    Delete(id: number) {
        if (confirm('Ви впевнені?')) {
            this.loaderService.Start();
            this.materialService.Delete(id).subscribe(data => {
                this.loaderService.Middle();
                let indx;
                for (let i = 0; i < this.materials.length; i++) {
                    if (this.materials[i].id == id) {
                        indx = i;
                    }
                }
                this.materials.splice(indx, 1);
                this.loaderService.FinishGood();
            },
                error => {
                    this.loaderService.FinishBad();
                });
        }
    }

    OpenForm(id?: number) {
        this.formError = false;
        if (id !== undefined) {
            this.materialService.GetById(id).subscribe(data => {
                this.editMaterial = Mapper.MapMaterial(data[0]);
                this.selectedMaterialTypeId = this.editMaterial.type.id;
            });
        } else {
            this.editMaterial = new Material();
        }
    }

    OpenUrl(url: string) {
        window.open(url, '_blank');
    }

    SubmitForm() {
        if (this.editMaterial.name == undefined || this.editMaterial.name.length == 0) {
            this.formError = true;
        }
        else if (this.editMaterial.link == undefined || this.editMaterial.link.length == 0) {
            this.formError = true;
        }
        else {
            this.loaderService.Start();
            for (let i = 0; i < this.materialTypes.length; i++) {
                if (this.materialTypes[i].id == this.selectedMaterialTypeId) {
                    this.editMaterial.type = this.materialTypes[i];
                }
            }
            if (this.editMaterial.id != undefined) {
                this.materialService.Update(this.editMaterial).subscribe(data => {
                    this.loaderService.Middle();
                    let mat = Mapper.MapMaterial(data[0]);
                    for (let i = 0; i < this.storageMaterials.length; i++) {
                        if (this.storageMaterials[i].id == mat.id) {
                            this.storageMaterials[i] = mat;
                        }
                    }
                    this.Refresh();
                    this.loaderService.FinishGood();
                    this.hideModal.nativeElement.click();
                },
                    error => {
                        this.loaderService.FinishBad();
                    });
            }
            else {
                this.editMaterial.link = 'https://' + this.editMaterial.link;
                this.materialService.Add(this.editMaterial).subscribe(data => {
                    this.loaderService.Middle();
                    this.storageMaterials.push(Mapper.MapMaterial(data[0]));
                    this.Refresh();
                    this.loaderService.FinishGood();
                    this.hideModal.nativeElement.click();
                },
                    error => {
                        this.loaderService.FinishBad();
                    });
            }
        }
    }
    Refresh() {
        this.materials = this.storageMaterials;
    }
    Search() {
        this.loaderService.Start();
        if (this.findName != undefined && this.findName.length != 0) {
            this.materials = new Array<Material>();
            this.loaderService.Middle();
            for (let i = 0; i < this.storageMaterials.length; i++) {
                if (this.storageMaterials[i].name == this.findName &&
                    this.storageMaterials[i].type.id == this.selectedMaterialTypeId) {
                    this.materials.push(this.storageMaterials[i]);
                }
            }
        }
        else if (this.findName == undefined || this.findName.length != 0) {
            this.materials = new Array<Material>();
            this.loaderService.Middle();
            for (let i = 0; i < this.storageMaterials.length; i++) {
                if (this.storageMaterials[i].type.id == this.selectedMaterialTypeId) {
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
        this.loaderService.FinishGood();
    }

    OpenStats(id: number) {
        this.materialService.GetStats(id).subscribe(data => {
            if (this.isOpened) {
                this.chart.destroy();
            }
            let labels = new Array<string>();
            let stats = new Array<number>();
            for (let i = 0; i < data.length; i++) {
                labels.push(data[i].date.slice(0, 10));
                stats.push(data[i].downloads);
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
        },
            error => {
                this.loaderService.FinishBad();
            });
    }
}
