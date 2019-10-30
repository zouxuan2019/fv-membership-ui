import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { RestProvider } from '../../../providers/rest/rest';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  submitAttempt = false;
  email: any;



  constructor(private router: Router, private route: ActivatedRoute, public rest: RestProvider, public alertCtrl: AlertController) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('Received on forget password Page:', params);
      this.email = params.email;
      console.log(this.email);
    });
  }

  resetPassword(form: NgForm) {
    if (form.valid) {
      if (form.value.password !== form.value.rpassword) {

        alert('Password not match');
      } else if (form.value.password.length < 6) {
        alert('Password not valid');

      } else {
        this.rest.ResetPassword(form.value.token, form.value.password, form.value.rpassword, form.value.email).subscribe(
          outcome => this.ProcessResult(outcome),
          error => this.ErrorToast(error));

      }
    } else {
      console.log('not success!');

    }
  }

  ProcessResult(data: any) {
    console.log(data);
    if (data.status === '1') {
      this.presentConfirm(data.message);
    } else {
      this.ErrorToast(data.messsage);
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
      message: 'Your password has been reset successfully! Please login again.',
      buttons: [
        {
          text: 'Proceed',
          handler: () => {
            console.log('ok clicked');
            this.router.navigateByUrl('/login');
          }
        },
      ]
    });
    alert.present();
  }
}
