import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { ProfileProvider } from "../../providers/profile/profile";
import { AuthProvider } from "../../providers/auth/auth";

@IonicPage({ name: 'profile' })
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    public userProfile: any;
    public birthDate: string;

    constructor(public navCtrl: NavController, public alertCtrl: AlertController,
        public profileProvider: ProfileProvider, public authProvider: AuthProvider) {
    }

    ionViewDidEnter() {
        this.profileProvider.getUserProfile().then(profileSnap => {
            this.userProfile = profileSnap;
            this.birthDate = this.userProfile.birthDate;
        })
    }

    logOut() {
        this.authProvider.logoutUser()
            .then(() => {
                this.navCtrl.setRoot('login');
            });
    }



}
