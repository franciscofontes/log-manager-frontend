import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  appPages = [
    {
      title: 'Log',
      url: 'logs',
      icon: 'article'
    }
  ]

  constructor(private router: Router) { }

  openPage(url: string) {
    this.router.navigate([url]);
  }
}
