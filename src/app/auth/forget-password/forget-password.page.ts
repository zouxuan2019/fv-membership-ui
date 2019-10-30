import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { RestProvider } from '../../../providers/rest/rest';
import { Router, NavigationExtras } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
loader: any;
  constructor(private router: Router, public rest: RestProvider,
              public alertCtrl: AlertController, public loadingCtrl: LoadingController) { }

  ngOnInit() {
  }


  async presentLoading() {
    this.loader = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loader.present();
  }
  async loaderDismiss(){
    this.loader = await this.loadingCtrl.dismiss();
 }

  sendOtpPassword(form: NgForm) {
    console.log(form.value.email);

    if (form.value.email !== '') {
      this.presentLoading();

      this.rest.SendOTP(form.value.email).subscribe(
        outcome => this.ProcessResult(outcome),
        error => this.ErrorToast('Sorry, email not registered.'));
    } else {
      this.ErrorToast('Sorry, Your email can not be empty.');
    }
  }


  ProcessResult(data: any) {
    this.loaderDismiss();
    console.log(data);
    if (data.status === 1) {
      this.presentConfirm(data.email);

    } else {
      this.ErrorToast(data.message);
    }

  }

  async ErrorToast(error: any) {
    console.log(error);
    const alert = await this.alertCtrl.create({
      header: 'Info',
      message: error,
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentConfirm(data: string) {
    const alert = await this.alertCtrl.create({
      header: 'Info',
      message: 'Otp send successfully. You can use your token to reset the password now.',
      buttons: [
        {
          text: 'Proceed',
          handler: () => {
            console.log('ok clicked');
            const navigationExtras: NavigationExtras = {
              queryParams: {
                email: data
              }
            };

            this.router.navigate(['/reset-password'], navigationExtras);
          }
        },
      ]
    });
    alert.present();
  }


}
