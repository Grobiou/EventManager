﻿import { Component } from '@angular/core';import { IonicPage, NavController, AlertController } from 'ionic-angular';import { ProfileProvider } from "../../providers/profile/profile";import { AuthProvider } from "../../providers/auth/auth";@IonicPage({ name: 'profile' })@Component({    selector: 'page-profile',    templateUrl: 'profile.html',})export class ProfilePage {    public userProfile: any;    public birthDate: string;    constructor(public navCtrl: NavController, public alertCtrl: AlertController,        public profileProvider: ProfileProvider, public authProvider: AuthProvider) {    }    updatePage() {        this.profileProvider.getUserProfile().then(profileSnap => {            this.userProfile = profileSnap;            this.birthDate = this.userProfile.birthDate;        })    }    ionViewDidEnter() {        this.updatePage();    }    logOut() {        this.authProvider.logoutUser()            .then(() => {                this.navCtrl.setRoot('login');            });    }    updateName() {        let alert = this.alertCtrl.create({            message: "Your first name & lastname",            inputs: [                {                    name: 'firstName',                    placeholder: 'Your firstname',                    value: this.userProfile.firstname                },                {                    name: 'lastName',                    placeholder: 'Your last name',                    value: this.userProfile.lastName                },            ],            buttons: [                {                    text: 'Cancel'                },                {                    text: 'Save',                    handler: data => {                        this.profileProvider.updateName(data.firstName, data.lastName)                            .then(() => {                                this.updatePage();                            });                    }                }            ]        });        alert.present();    }    updateBOD(birthDate) {        this.profileProvider.updateBirthDate(birthDate)    }    updateEmail() {        let alert = this.alertCtrl.create({            inputs: [                {                    name: 'newEmail',                    placeholder: 'Your new email',                    value: this.userProfile.firstname                },                {                    name: 'password',                    placeholder: 'Your password',                    type: 'password'                },            ],            buttons: [                {                    text: 'Cancel'                },                {                    text: 'Save',                    handler: data => {                        this.profileProvider.updateEmail(data.newEmail, data.password)                            .then(() => {                                this.updatePage();                            });                    }                }            ]        });        alert.present();    }    updatePassword() {        let alert = this.alertCtrl.create({            inputs: [                {                    name: 'newPassword',                    placeholder: 'Your new password',                    type: 'password'                },                {                    name: 'oldPassword',                    placeholder: 'Your old password',                    type: 'password'                },            ],            buttons: [                {                    text: 'Cancel'                },                {                    text: 'Save',                    handler: data => {                        this.profileProvider.updatePassword(data.newPassword, data.oldPassword);                    }                }            ]        });        alert.present();    }}