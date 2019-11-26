import { TrainingService } from './../training/training.service';
import { Subject } from 'rxjs/Subject';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {

  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingServices: TrainingService,
    private uiService: UIService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingServices.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      // console.log(result);
      this.uiService.loadingStateChanged.next(false);
    })
    .catch(error => {
     // console.log(error);
     this.uiService.loadingStateChanged.next(false);
     // this.snackbar.open(error.message, null, {duration: 3000});
     this.uiService.showSnackbar(error.message, null, 3000);
    });

  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // console.log(result);
        this.uiService.loadingStateChanged.next(false);
      })
      .catch(error => {
        // console.log(error);
        this.uiService.loadingStateChanged.next(false);
        // this.snackbar.open(error.message, null, {duration: 3000});
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
