import { Component, OnInit } from '@angular/core';
import { LogEstatistica } from 'src/app/models/log-estatistica.model';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  quantIps: number = 0;
  quantUserAgents: number = 0;
  quantLogs: number = 0;
  ip: string;
  estatisticas: LogEstatistica[];

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.logService.buscarQuantidadeIpsUnicos().subscribe(quant => {
      this.quantIps = quant;
    });
    this.logService.buscarQuantidadeUserAgentsUnicos().subscribe(quant => {
      this.quantUserAgents = quant;
    });
    this.logService.buscarQuantidadeLogs().subscribe(quant => {
      this.quantLogs = quant;
    });
  }

  listarEstatisticasPorIp() {
    if (this.ip && this.ip.trim() != "") {
      this.logService.listarEstatisticasPorIp(this.ip).subscribe(estatisticas => {
        this.estatisticas = estatisticas;
      });
    }
  }

}
