import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/models/page';
import { Log } from 'src/app/models/log';
import { LogService } from 'src/app/services/log.service';
import { DialogLogComponent } from '../dialog-log/dialog-log.component';
import { LogDTO } from 'src/app/models/log.dto';

@Component({
  selector: 'log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {

  filtroPeloIP = '';
  orderBy = '';
  direction = '';

  page: Page<LogDTO>;

  constructor(
    private service: LogService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.page = this.route.snapshot.data.page;
    this.filtrar();
  }

  changeFiltro(select: any) {
    let valor: any = select.options[select.selectedIndex].value;    
    this.filtrar();
  }

  filtrar() {   
  }

  limparFiltro() {
    this.filtroPeloIP = '';
    this.filtrar();
  }

  onSort(event) {   
  }

  handlePage(event) {   
      this.service
      .listarPorPagina(
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

  abrirDialog(log: Log) {
    const dialogRef = this.dialog.open(DialogLogComponent, {
      width: '80%',
      maxHeight: '95%',
      disableClose: true,
      data: log
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  remover(log: Log) {
    this.service.remover(log).subscribe(res => {
      this.openSnackBar('Log de ID: ' + log.id + " removido com sucesso", 'Info');
      this.filtrar();
    },
      error => {
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
      direction: 'rtl',
      panelClass: 'snackbar-alerta'
    });
  }

}
