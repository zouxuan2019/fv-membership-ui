import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import {RestProvider} from '../../../providers/rest/rest';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})

export class ResetPasswordPage implements OnInit {
  public token='';
  public user='';
  public password='';
  public rpassword='';
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public rest:RestProvider,public toastCtrl: ToastController,public alertCtrl: AlertController) {
  
   
   }

  ngOnInit() {
  }

  resetPassword(form:NgForm){
    if(form.valid){
      if(form.value.password!=form.value.rpassword){

        alert('Password not match');
      }else if(this.password.length<6){
        alert('Password not valid');

      }else{
        this.rest.ResetPassword(this.token,this.password,this.rpassword,this.user) .subscribe(
          outcome => this.ProcessResult(JSON.parse(outcome)),
          error => this.ErrorToast(error)); 
     
        }
      }
      else{
        console.log("not success!")
        
      } 
  }

  ProcessResult(data){ 
    console.log(data);
    if(data["status"]){
     this.ShowAlert(data["message"]);    
    }
    else{
      this.ErrorToast(data["messsage"]);
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



