import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from './alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'alert',
  templateUrl: 'alert.component.html'
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  onlyOne: boolean = true;
  alerts: Alert[] = [];
  alertSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit() {

    this.alertSubscription = this.alertService.onAlert(this.id).subscribe(alert => {

      if (!alert.message) {
        this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);
        this.alerts.forEach(x => delete x.keepAfterRouteChange);
        return;
      }

      if (this.onlyOne) {
        if (this.alerts.length === 0) {
          this.alerts.push(alert);
        }
      } else {
        this.alerts.push(alert);
      }

      if (alert.autoClose) {
        setTimeout(() => this.removeAlert(alert), 3000);
      }
    });

    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {

    if (!this.alerts.includes(alert)) return;

    if (this.fade) {

      this.alerts.find(x => x === alert).fade = true;

      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['notification mt-5 ml-5 mr-5', ''];

    const alertTypeClass = {
      [AlertType.Success]: 'is-success is-light',
      [AlertType.Error]: 'is-danger is-light',
      [AlertType.Info]: 'is-info is-light',
      [AlertType.Warning]: 'is-warning is-light'
    }

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }
}