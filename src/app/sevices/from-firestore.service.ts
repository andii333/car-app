import { Injectable } from '@angular/core';
import { arrayUnion, collection, doc, DocumentData, getDoc, getDocs, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { CarClass } from 'src/app/classes/car-class';
import { Details } from 'src/app/interfaces/details';
import { DetailInterface } from '../interfaces/detail-interface';

@Injectable({
  providedIn: 'root'
})

export class FromFirestoreService {
  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);
  carDetails: DetailInterface[] = []
  constructor() {
    
  }
  

  async getData(car: CarClass) {
    const docRef = doc(this.db, "cars", `${car.name + ' ' + car.year + 'p'}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    this.carDetails.push(docSnap.data() as DetailInterface)
  }


  // async addDetails(details:Details){
  //   const carRef = doc(this.db, "cars", `${this.car.name + ' ' + this.car.year + 'p'}`);
  //   await updateDoc(carRef, {
  //     regions: arrayUnion(details)
  //   });
  // }
}
}
