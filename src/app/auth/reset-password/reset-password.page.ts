import { Component, OnInit } from '@angular/core';
import { ToastController} from '@ionic/angular';
import { RestProvider } from '../../../providers/rest/rest';
import { NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  submitAttempt = false;

  constructor(private router: Router, public rest: RestProvider, public toastCtrl: ToastController) {


  }

  ngOnInit() {
  }

  resetPassword(form: NgForm) {
    if (form.valid) {
      if (form.value.password !== form.value.rpassword) {

        alert('Password not match');
      } else if (form.value.password.length < 6) {
        alert('Password not valid');

      } else {
        this.rest.ResetPassword(form.value.token, form.value.password, form.value.rpassword, form.value.email).subscribe(
          outcome => this.ProcessResult(JSON.parse(outcome)),
          error => this.ErrorToast(error));

      }
    } else {
      console.log('not success!');

    }
  }

  ProcessResult(data: any) {
    console.log(data);
    if (data.status) {
      this.ErrorToast(data.message);
      this.router.navigateByUrl('/login');
    } else {
      this.ErrorToast(data.messsage);
    }



  }

  async ErrorToast(error: string) {
    const toast = await this.toastCtrl.create({
      message: error,
      duration: 2000
    });
    toast.present();
  }
}
