import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { Camera } from '@ionic-native/camera';

@IonicPage({
    name: 'event-detail',
    segment: 'event-detail/:eventId'
})
@Component({
    selector: 'page-event-detail',
    templateUrl: 'event-detail.html',
})
export class EventDetailPage {

    public currentEvent: any;
    public guestName: string = null;
    public guestPicture: any = null;

    constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider,
        public alertCtrl: AlertController, public cameraPlugin: Camera) {

    }

    ionViewDidEnter() {
        this.eventProvider.getEventDetails(this.navParams.get('eventId'))
            .then(eventSnap => {
                this.currentEvent = eventSnap;
            })
    }

    addGuest(guestName) {
        this.eventProvider.addGuest(guestName, this.currentEvent.id, this.currentEvent.price, this.guestPicture)
            .then(() => {
                this.guestName = '';
                this.guestPicture = null;
            }, (error) => {
                let alert = this.alertCtrl.create({
                    message: error.message,
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel'
                        }
                    ]
                });
                alert.present();
            });
    }

    takePicture() {
        this.cameraPlugin.getPicture({
            quality: 95,
            destinationType: this.cameraPlugin.DestinationType.DATA_URL,
            sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: this.cameraPlugin.EncodingType.PNG,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: true
        }).then(imageData => {
            this.guestPicture = ImageData;
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    }

}
