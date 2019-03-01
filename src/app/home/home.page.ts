import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Observable, from, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private localStorage: LocalStorageService) {  }

  selectedSegment;

  localPlaces = [];
  remotePlaces = [];

  ngOnInit() {
    console.log("getting data");

    this.localStorage.getPlaces().subscribe(res => {
      console.log(res);
      this.localPlaces = res;
    });

    this.selectedSegment = "local";
    
  }

  segmentChanged(ev: any) {
    console.log(this.selectedSegment);
  }

  doRefresh(event){
    this.localStorage.getPlaces().subscribe(res => {
      this.localPlaces = res;
      event.target.complete();
    });
  }




}
