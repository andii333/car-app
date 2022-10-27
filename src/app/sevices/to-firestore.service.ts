import { Injectable } from '@angular/core';
import { arrayUnion, collection, doc, getDocs, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { CarClass } from 'src/app/classes/car-class';
import { Details } from 'src/app/interfaces/details';

@Injectable({
  providedIn: 'root'
})

export class ToFirestoreService {
  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);
car!:CarClass;
  constructor() {
  }

  async addData(car: CarClass) {
    await setDoc(doc(this.db, "cars",
      `${car.name + ' ' + car.year + 'p'}`
    ), {
      car
      });
  }


  async addDetails(details:Details){
    const carRef = doc(this.db, "cars", `${this.car.name + ' ' + this.car.year + 'p'}`);
    await updateDoc(carRef, {
      detail: arrayUnion(details)
    });
  }
}
