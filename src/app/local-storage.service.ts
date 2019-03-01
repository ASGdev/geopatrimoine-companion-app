import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/internal/Observable';
import { from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  _storage: Storage;

  constructor(private storage: Storage) { 
    this.storage.ready().then(() => {
      this._storage = this.storage;
    });
  }

  isLocalStorageReady = false;

  savePlace(data){
    this.getPlaces().subscribe(res => {
      if(res == null){
        res = [];
      }
      res.push(data);
      this._storage.set("places", res);
    });  
  }

  getPlaces():Observable<any>{
    return from(this._storage.get("places"));
  }

}
