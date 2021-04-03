import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoaderService } from 'src/app/services/loader.service';

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
