import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { RestProvider } from '../../../providers/rest/rest';
import { ResetPasswordPage } from '../reset-password/reset-password.page';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  public user = '';

  constructor(public navCtrl: NavController, public rest: RestProvider,
              public alertCtrl: AlertController, public loadingCtrl: LoadingController) {}

  ngOnInit() {
  }

  ionViewDidLoad() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    console.log('ionViewDidLoad ForgetpasswordPage');
  }

  goResetPasswordPage() {
    console.log(this.user);
    this.presentLoading();


    if (this.user !== '') {

      this.rest.SendOTP(this.user).subscribe(
        outcome => this.ProcessResult(JSON.parse(outcome)),
        error => this.ErrorToast(error));
    } else {
      this.ErrorToast('Can not be empty');
    }
  }


  ProcessResult(data: { status: any; message: any; }) {
    console.log(data);
    if (data.status) {
      this.ErrorToast(data.message);

    } else {
      this.ErrorToast(data.message);
    }

  }

  ErrorToast(error: string) {
    console.log(error);

    const alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: error,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.push(ResetPasswordPage);
          }
        }
      ]
    });
    alert.present();

  }

  presentLoading() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }

}



