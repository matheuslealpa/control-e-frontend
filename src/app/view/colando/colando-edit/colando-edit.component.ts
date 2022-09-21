import {DxFormComponent} from 'devextreme-angular/ui/form';
import {Component, Injector, OnInit, ViewChild} from '@angular/core';

import {StandardNgEditComponent} from "../../../@core/template/standard-ng-edit-component";
import {StandardNgConfig} from "../../../@core/template/standard-ng-config";

import {LoadOptions} from "devextreme/data/load_options";
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import {ColandoConfig} from "../colando-config";
import {ColandoService} from "../../../service/colando.service";
import {CursoService} from "../../../service/curso.service";

class ColandoEdit {
    id?: number;
    matricula?: string;
    nome?: string;
    curso?: {id:number};
}

@Component({
  selector: 'app-colando-edit',
  templateUrl: './colando-edit.component.html',
  styles: [],
})
export class ColandoEditComponent extends StandardNgEditComponent<ColandoEdit, number> implements OnInit {

  @ViewChild(DxFormComponent, {static: true})
  form: any

  config: StandardNgConfig = ColandoConfig;

   cursoDxSelectBoxEditorOptions = {
       valueExpr: 'id',
       displayExpr: 'nome',
       searchEnabled: true,
       searchExpr: 'nome',
       dataSource: new DataSource({
           store: new CustomStore({
               key: 'id',
               byKey: (key: number) => this.cursoService.findById(key).toPromise(),
               load: (options: LoadOptions) => this.cursoService.findAll(options).toPromise()
           }),
           sort: [{selector: 'nome', desc: false}],
       })
   };

  constructor(
    injector: Injector,
    protected ColandoService: ColandoService,
    private cursoService: CursoService,
  ) {
    super(injector, ColandoService);
  }

  ngOnInit() {
    this.load(ColandoEdit);
  }


}