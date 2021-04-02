import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Log } from 'src/app/models/log';

@Component({
  selector: 'app-dialog-log',
  templateUrl: './dialog-log.component.html',
  styleUrls: ['./dialog-log.component.css']
})
export class DialogLogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogLogComponent>,
    @Inject(MAT_DIALOG_DATA) public log: Log
  ) { }

  ngOnInit() {
    console.log("TESTE");
  }

  fechar() {
    this.dialogRef.close();
  }

}
