import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;
    zone: NgZone;
    
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

      this.zone = new NgZone({});

      firebase.initializeApp({
          apiKey: "AIzaSyAAvI5q_0qwaYtjaREYWoyh0RocFrq7LfE",
          authDomain: "eventmanager-e2b51.firebaseapp.com",
          databaseURL: "https://eventmanager-e2b51.firebaseio.com",
          projectId: "eventmanager-e2b51",
          storageBucket: "eventmanager-e2b51.appspot.com",
          messagingSenderId: "979273209472"
      });

      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          this.zone.run(() => {
              if (!user) {
                  this.rootPage = 'login';
                  unsubscribe();
              } else {
                  this.rootPage = HomePage;
                  unsubscribe();
              }
          });
      });

      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

