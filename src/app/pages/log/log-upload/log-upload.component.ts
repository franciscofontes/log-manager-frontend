import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-log-upload',
  templateUrl: './log-upload.component.html',
  styleUrls: ['./log-upload.component.css']
})
export class LogUploadComponent implements OnInit {

  file: File;
  progress = 0;
  maxSize: number = 30000000;
  quantidadeLinhas: number = -1;
  sending: boolean;

  warnAlertOptions = { autoClose: false, keepAfterRouteChange: false };
  successAlertOptions = { autoClose: false, keepAfterRouteChange: true };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private uploadService: UploadFileService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  async selectFile(event) {
    let selected = event.target.files[0];
    if (selected.size > this.maxSize) {
      this.alertService.warn("Atenção", ["Este arquivo tem " + 20059499 + " bytes. Maximo permitido:" + this.maxSize + " bytes"], this.warnAlertOptions);
    } else {
      let text = await selected.text();
      let linhas = text.trim().split("\n");
      this.quantidadeLinhas = linhas.length;
      this.file = selected;
    }
  }

  async upload() {
    this.sending = true;
    this.progress = 0;
    await this.uploadService.upload(this.file, "logs").toPromise().then(event => {
      this.alertService.success("Arquivo extraido com sucesso: Adicionado(s) " + this.quantidadeLinhas + " novo(s) log(s)", [], this.successAlertOptions);
      this.sending = false;
      this.router.navigate(['..'], { relativeTo: this.route });
    },
      err => {
        this.progress = 0;
        this.file = undefined;
        this.sending = false;
      });
  }

}
