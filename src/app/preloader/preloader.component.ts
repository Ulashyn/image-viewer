import { PreloaderService } from './../_services/preloader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {
  active!: boolean;

  constructor(public preloader: PreloaderService) {
    preloader.loading$
      .subscribe(status => this.active = status);
  }
  ngOnInit(): void { }

}
