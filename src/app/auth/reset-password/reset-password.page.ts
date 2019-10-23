import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController} from 'ionic-angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})

export class ResetPasswordPage implements OnInit {
  public user='';
  public password='';
  public rpassword='';
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public rest:RestProvider,public toastCtrl: ToastController,public alertCtrl: AlertController) {
  
   
   }

  ngOnInit() {
  }

  resetPassword(form){
    if(form.valid){
      if(this.password!=this.rpassword){

        alert('Password not match');
      }else if(this.password.length<6){
        alert('Password not valid');

      }else{
        this.rest.UpdatePassword(this.user,this.password) .subscribe(
          outcome => this.ProcessResult(JSON.parse(outcome)),
          error => this.ErrorToast(error)); 
     
        }
      }
      else{
        console.log("not success!")
        console.log(this.reset.value);
        
      } 
  }

  ProcessResult(data){ 
    console.log(data);
    if(data["Result"]){
      this.storage.set('password',this.password);
     this.ShowAlert(data["ResultData"]);    
    }
    else{
      this.ErrorToast(data["ResultData"]);
    }
    
    
   
   }
  
   ErrorToast(error){
    console.log(error);
    let toast = this.toastCtrl.create({
      message: error,
      duration: 3000,
      position: 'center'
    });
    toast.present();
  }
  ShowAlert(msg){
    let alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: msg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.popToRoot(); 
          }
        }
      ]
    });
    alert.present();
  }
}



