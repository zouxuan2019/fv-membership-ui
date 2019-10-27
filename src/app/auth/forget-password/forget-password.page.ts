import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { RestProvider } from '../../../providers/rest/rest';
import { Router, NavigationExtras } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  constructor(private router: Router, public rest: RestProvider,
              public alertCtrl: AlertController, public loadingCtrl: LoadingController) { }

  ngOnInit() {
  }


  goResetPasswordPage(form: NgForm) {
    console.log(form.value.email);

    if (form.value.email !== '') {

      this.rest.SendOTP(form.value.email).subscribe(
        outcome => this.ProcessResult(JSON.parse(outcome)),
        error => this.ErrorToast(error));
    } else {
      this.ErrorToast('Can not be empty');
    }
  }


  ProcessResult(data: { status: any; message: any; }) {
    console.log(data);
    if (data.status) {
      // this.ErrorToast(data.message);
      this.router.navigateByUrl('/reset-password');

    } else {
      this.ErrorToast(data.message);
    }

  }

  async ErrorToast(error: string) {
    console.log(error);
    const alert = await this.alertCtrl.create({
      header: 'Info',
      message: error,
      buttons: ['OK']
    });

    await alert.present();
  }



}
