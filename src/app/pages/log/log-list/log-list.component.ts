import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/models/page';
import { Log } from 'src/app/models/log';
import { LogService } from 'src/app/services/log.service';
import { LogDTO } from 'src/app/models/log.dto';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { FormatterHelper } from 'src/app/shared/helpers/formatter.helper';

@Component({
  selector: 'log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {

  filtroPelaData = null;
  filtroPeloIP = "";
  filtroPeloStatus = "";
  filtroPeloRequest = "";
  filtroPeloUserAgent = "";
  orderBy = "";
  direction = "";

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

  changeFiltro(select: any) {
    let valor: any = select.options[select.selectedIndex].value;
    this.filtrar();
  }

  filtrar() {
    this.service.listarPorFiltro(this.filtroPelaData, this.filtroPeloIP, this.filtroPeloStatus, this.filtroPeloRequest, this.filtroPeloUserAgent).subscribe(
      page => {
        this.page = page;
      },
      error => { }
    );
  }

  limparFiltro() {
    this.filtroPelaData = null;
    this.filtroPeloIP = "";
    this.filtrar();
  }

  onSort(event) {
    this.orderBy = event.sorts[0].prop;
    this.direction = event.sorts[0].dir;
    this.service
      .listarPorFiltro(
        this.filtroPelaData,
        this.filtroPeloIP,
        this.filtroPeloStatus,
        this.filtroPeloRequest,
        this.filtroPeloUserAgent,
        0,
        undefined,
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

  handlePage(event) {
    this.service
      .listarPorFiltro(
        this.filtroPelaData,
        this.filtroPeloIP,
        this.filtroPeloStatus,
        this.filtroPeloRequest,
        this.filtroPeloUserAgent,
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
    this.modalDetalhes = "";
    this.modalRemocao = "";
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
