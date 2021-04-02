import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Log } from 'src/app/models/log';
import { LogDTO } from 'src/app/models/log.dto';
import { LogService } from 'src/app/services/log.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { FormHelper } from 'src/app/shared/helpers/form.helper';
import { FormatterHelper } from 'src/app/shared/helpers/formatter.helper';
import { blankStringValidator } from 'src/app/shared/validators/blank-string.validator';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  edicao = false;
  routeParams: Params;
  formGroup: FormGroup;
  logDTO: LogDTO = { id: null, data: null, ip: '', status: '', request: '' };

  constructor(
    private service: LogService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private formHelper: FormHelper,
    public formatterHelper: FormatterHelper
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.routeParams = params;
      if (this.routeParams.id) {
        this.edicao = true;
      }
    });

    if (this.edicao) {
      this.service.buscarPeloId(this.routeParams.id).subscribe(log => {
        this.logDTO = log;
        this.formGroup = this.formBuilder.group({
          data: [log.data, [Validators.required]],
          ip: [log.ip, [Validators.required, Validators.maxLength(15), Validators.pattern(this.formatterHelper.IP_REGEX)]],
          status: [log.status, [Validators.required, Validators.pattern(this.formatterHelper.STATUS_REGEX)]],
          request: [log.request, [Validators.required, Validators.maxLength(255), blankStringValidator]],
          userAgent: [log.userAgent, [Validators.required, Validators.maxLength(255), blankStringValidator]]
        });
      });
    } else {
      this.formGroup = this.formBuilder.group({
        data: [null, [Validators.required]],
        ip: ['', [Validators.required, Validators.maxLength(15), Validators.pattern(this.formatterHelper.IP_REGEX)]],
        status: ['', [Validators.required,Validators.pattern(this.formatterHelper.STATUS_REGEX) ]],
        request: ['', [Validators.required, Validators.maxLength(255), blankStringValidator]],
        userAgent: ['', [Validators.required, Validators.maxLength(255), blankStringValidator]],
      });
    }
  }

  salvar() {

    let log: Log = {
      id: this.logDTO.id,
      data: this.f.data.value,
      ip: this.f.ip.value,
      status: this.f.status.value,
      request: this.f.request.value,
      userAgent: this.f.userAgent.value
    }

    let errorDetails: any[] = this.formHelper.getErrorsDetail(this.formGroup);
    let warnAlertOptions = { autoClose: false, keepAfterRouteChange: false };
    let successAlertOptions = { autoClose: false, keepAfterRouteChange: true };

    console.log(log);

    if (this.formGroup.invalid) {
      this.alertService.warn("Opa! Os campos abaixo precisam ser corrigidos:", errorDetails, warnAlertOptions);
      return;
    }

    if (this.edicao) {
      const id = log.id;
      this.service.editar(log).subscribe(log => {
        this.alertService.success("Log editado com sucesso. ID: " + id, [], successAlertOptions);
        this.router.navigate(['../..'], { relativeTo: this.route });
      }, error => {
        //console.log(error);
        //this.alertService.error("Não foi possível editar", errorDetails, warnAlertOptions);
      });
    } else {
      this.service.adicionar(log).subscribe(log => {
        this.alertService.success("Log cadastrado com sucesso", [], successAlertOptions);
        this.router.navigate(['..'], { relativeTo: this.route });
      }, error => {
        console.log(error);
        //this.alertService.error("Não foi possível cadastrar", errorDetails, warnAlertOptions);
      });
    }

  }

  get f() {
    return this.formGroup.controls;
  }

}
