import { Component, OnInit } from '@angular/core';
import { LogDTO } from 'src/app/models/log.dto';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  logs: LogDTO[];  
  dados = [{id: '1'}, {id: '2'}]

  constructor(public logService: LogService) { }

  ngOnInit(): void {
    this.logService.listar().subscribe(response => {
      this.logs = response;
      console.log(response);
    },
      error => {}
    );
  }

}
