import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular/ui/data-grid';
import {ConvidadoService} from "../../../service/convidado.service";
import {StandardNgListComponent} from "../../../@core/template/standard-ng-list-component";
import {ConvidadoConfig} from "../convidado-config";
import {StandardNgConfig} from "../../../@core/template/standard-ng-config";
import {ConvidadoEditDialogComponent} from "../convidado-edit-dialog/convidado-edit-dialog.component";

class ConvidadoView {
  id?: number;
  nome?: string;
}

@Component({
  selector: 'app-convidado-list',
  templateUrl: './convidado-list.component.html',
})
export class ConvidadoListComponent extends StandardNgListComponent<ConvidadoView, number> implements OnInit {

  @ViewChild(DxDataGridComponent, {static: true})
  dataGrid: any;

  @ViewChild('convidadoEditDialogComponent')
  convidadoEditDialogComponent!: ConvidadoEditDialogComponent;


  config: StandardNgConfig = ConvidadoConfig;

  constructor(
    injector: Injector,
    protected ConvidadoService: ConvidadoService,
  ) {
    super(injector, ConvidadoService);
  }

  ngOnInit(): void {
    this.load()
  }

  onSaveConvidado(event: any) {
    this.dataSource.reload();
  }

  override create() {
    this.convidadoEditDialogComponent.create();
  }

  override edit(id: number) {
    this.convidadoEditDialogComponent.edit(id);
  }

  /**
   * Recebe a informação da coluna e envia status como  Inconsistênte ou Efetivado ou Não Efetivado.
   * @param cellInfo
   */
  customizeText(cellInfo: any) {
    return cellInfo.value == true ? 'Sim' : 'Não';
  }


}
