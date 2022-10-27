import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentData } from 'firebase/firestore';
import { CarClass } from '../classes/car-class';
import { Details } from '../interfaces/details';
import { SearchComponent } from '../search/search.component';
import { FromFirestoreService } from '../sevices/from-firestore.service';
import { ToFirestoreService } from '../sevices/to-firestore.service';

@Component({
  selector: 'app-watch-car',
  templateUrl: './watch-car.component.html',
  styleUrls: ['../app.component.css']
})
export class WatchCarComponent implements OnInit {
  url: any;
  car!: CarClass;
  details!: DocumentData[];
  constructor(public sc: SearchComponent,
    public serviceFromFirestore: FromFirestoreService,
    public serviceToFirestore: ToFirestoreService) { }

  ngOnInit() {
    this.car = this.serviceToFirestore.car;
    this.getDetails()
  }

  addPhoto(event: any) {
    if (event.target.files[0]) {
      if (event.target.files[0].type.match(/image\/*/) == null) {
      } else {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) => {
          this.url = event.target.result;
        }
      }
    }
  }

  close() {
    this.sc.activWatchCar = false;
  }

  async getDetails() {
    const car = this.serviceToFirestore.car;
    await this.serviceFromFirestore.getData(car);
    const obj = this.serviceFromFirestore.carDetails
    for (const i of obj) {
      this.details = i.detail.sort((a,b)=>{
        if (a.date > b.date) {
          return 1;
        }
        if (a.date < b.date) {
          return -1;
        }
        return 0;
      })
    }
  }

}
