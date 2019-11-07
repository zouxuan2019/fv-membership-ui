import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestProvider } from '../../../providers/rest/rest';
import { ToastController , AlertController } from '@ionic/angular';
import { Router, NavigationExtras} from '@angular/router';

import { HttpClient } from '@angular/common/http';
// import { LoginPage } from '../login/login.page';
// import { from } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  constructor(private rest: RestProvider, private router: Router,
              public alertCtrl: AlertController, public http: HttpClient) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    if (form.valid) {
      if (form.value.password !== form.value.confirm) {

        alert('Password not match');
      } else if (form.value.password.length < 8) {
        alert('Password not valid');

      } else {
    this.rest.Register(form.value.password, form.value.email).subscribe(
        (res: any) => { console.log(res.status); this.ProcessResult(res); });

      }
    } else {
      console.log('not success!');

    }
  }
  ProcessResult(data: any) {
    if (data.status === '1') {
      console.log(data);
      this.presentConfirm();
    } else {
      console.error(data.message);
      this.ErrorToast(data.message);
    }

  }
  async ErrorToast(error: string) {
    const alert = await this.alertCtrl.create({
      header: 'Info',
      message: error,
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Info',
      message: 'You have successfully registered. Please login again.',
      buttons: [
        {
          text: 'Proceed',
          handler: () => {
            console.log('ok clicked');
            this.router.navigateByUrl('menu/home');
          }
        },
      ]
    });
    alert.present();
  }

}
