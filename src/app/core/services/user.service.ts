import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  showLoading : BehaviorSubject<any> = new BehaviorSubject<any>(false);
  loadingState = this.showLoading.asObservable();

  currentUser : BehaviorSubject<any> = new BehaviorSubject<any>({});
  userState = this.currentUser.asObservable();

  constructor(private _afAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  

  getCurrentUser(){
    return new Promise((resolve, reject) => {
      this._afAuth.auth.onAuthStateChanged(user => { 
        if(user){
          this.currentUser.next(user);
          resolve(user);
        } 
        else reject('No user session') 
      });
    })
  }

  async register(email, password){
    let register = await this._afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(response => { return response })
      .catch(err => { return err });

    return register;
  }


  async userLogin(email, password){
    let login = await this._afAuth.auth.signInWithEmailAndPassword(email, password).then(response => {
     return response
    }).catch(err => {
      return err
    });

    return login;
  }

  async signOut(){
   return await this._afAuth.auth.signOut().then(response => {
      return response
    }).catch(error => {
      return error
    });
  }

  async addUserAdmin(data){
    return await this.firestore
      .collection("administrator")
      .add(data)
      .then(response => { return response },
        error => { return error })
  }

  changeLoadingState(state){
    if(state){
      this.showLoading.next(true);
    }
    else{
      this.showLoading.next(false);
    }
  }

}
