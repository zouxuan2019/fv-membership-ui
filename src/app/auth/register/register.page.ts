import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestProvider } from '../../../providers/rest/rest';
import { ToastController } from '@ionic/angular';
import { Router, NavigationExtras} from '@angular/router';
// import { LoginPage } from '../login/login.page';
// import { from } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  constructor(private rest: RestProvider, private router: Router, public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    this.rest.Register(form.value.password, form.value.email)
      .subscribe(
        outcome => this.ProcessResult(JSON.parse(outcome)));
  }
  ProcessResult(data: any) {
    if (data.username) {
      console.log(data);
      this.router.navigateByUrl('menu/home');
      // this.navCtrl.push(LoginPage);
    } else {
      console.error(data);
      this.ErrorToast('Sorry, user register failed. Please try again.');
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
