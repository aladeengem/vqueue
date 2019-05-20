import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private firestore: AngularFirestore) { }

  async addNewEvent(data){
    return await this.firestore
      .collection("event")
      .add(data)
      .then(response => { return response },
        error => { return error })
  }

  getCurrentEvent(data){
    return this.firestore
      .collection("event", ref => ref.where("added_by", "==", "test@gmail.com"))
      .snapshotChanges();

  }
}
