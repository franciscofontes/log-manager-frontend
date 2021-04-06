import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  public loading: boolean;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.onLoading().subscribe(status => {
      this.loading = status;
      console.log(status);
    });
  }

  ngOnDestroy() {
  }
}
