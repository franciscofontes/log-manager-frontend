import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/models/page';
import { Log } from 'src/app/models/log';
import { LogService } from 'src/app/services/log.service';
import { LogDTO } from 'src/app/models/log.dto';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { FormatterHelper } from 'src/app/shared/helpers/formatter.helper';
import { DatePipe } from '@angular/common';
import { LogFiltro } from 'src/app/models/log-filtro.model';

@Component({
  selector: 'log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {

  filtro: LogFiltro = { de: "", ate: "", ip: "", status: "", request: "", userAgent: "" };
  de: Date;
  ate: Date;
  deHora: string;
  ateHora: String;
  orderBy = "";
  direction = "";

  modalFiltros = "";
  modalDetalhes = "";
  modalRemocao = "";

  page: Page<LogDTO>;
  log: Log;

  constructor(
    private service: LogService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    public formatterHelper: FormatterHelper
  ) { }

  ngOnInit() {
    this.fecharModal();
    this.page = this.route.snapshot.data.page;
    this.filtrar();
  }

  filtrar() {
    this.filtro.de = this.getDataHora(this.de, this.deHora);
    this.filtro.ate = this.getDataHora(this.ate, this.ateHora);
    this.service.listarPorFiltro(this.filtro).subscribe(
      page => {
        this.page = page;
        console.log(this.page);
      },
      error => { }
    );
  }

  getDataHora(data: Date, hora: String) {
    let dataHora: string = "";
    if (data) {
      let pipe = new DatePipe("en-US");
      dataHora = pipe.transform(data, this.formatterHelper.DATA);
      hora = hora ? hora : "00:00:00.000";
      dataHora += " " + hora;
    }
    return dataHora;
  }

  limparFiltro() {
    this.de = null;
    this.ate = null;
    this.deHora = "";
    this.ateHora = "";
    this.filtro = { de: "", ate: "", ip: "", status: "", request: "", userAgent: "" };
  }

  limparFiltroEFiltrar() {
    this.limparFiltro();
    this.filtrar();
  }

  onSort(event) {
    this.filtrar();
  }

  handlePage(event) {
    this.service
      .listarPorFiltro(
        this.filtro,
        event.pageIndex,
        event.pageSize,
        this.orderBy,
        this.direction
      )
      .subscribe(
        page => {
          this.page = page;
        },
        error => { }
      );
  }

  abrirModalFiltros() {
    this.modalFiltros = "is-active";
  }

  abrirModalDetalhes(logDTO: LogDTO) {
    this.service.buscarPeloId(logDTO.id).subscribe(log => {
      this.log = log;
      this.modalDetalhes = "is-active";
    });
  }

  abrirModalRemocao(log: Log) {
    this.log = log;
    this.modalRemocao = "is-active";
  }

  fecharModal() {
    this.modalFiltros = "";
    this.modalDetalhes = "";
    this.modalRemocao = "";
  }

  confirmarFiltro() {
    this.filtrar();
    this.fecharModal();
  }

  confirmarRemocao() {
    this.remover(this.log);
    this.fecharModal();
  }

  remover(log: Log) {
    this.service.remover(log).subscribe(res => {
      this.alertService.success("Log removido com sucesso. ID: " + log.id, []);
      this.filtrar();
    },
      error => {
      }
    );
  }

}
