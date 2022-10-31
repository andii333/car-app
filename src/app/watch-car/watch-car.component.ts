import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { CarClass } from '../classes/car-class';
import { SearchComponent } from '../search/search.component';
import { FromFirestoreService } from '../sevices/from-firestore.service';
import { ToFirestoreService } from '../sevices/to-firestore.service';

@Component({
  selector: 'app-watch-car',
  templateUrl: './watch-car.component.html',
  styleUrls: ['../app.component.css']
})
export class WatchCarComponent implements OnInit {
  car!: CarClass;
  details!: DocumentData[];


  constructor(public sc: SearchComponent,
    public serviceFromFirestore: FromFirestoreService,
    public serviceToFirestore: ToFirestoreService) { }

  ngOnInit() {
    this.car = this.serviceToFirestore.car;
    this.getDetails()
  }

  close() {
    this.sc.activWatchCar = false;
  }

  async getDetails() {
    const car = this.serviceToFirestore.car;
    await this.serviceFromFirestore.getData(car);
    this.details = this.serviceFromFirestore.carDetails
    for (const i of this.serviceFromFirestore.carDetails) {
      this.details = i.detail.sort((a, b) => {
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
