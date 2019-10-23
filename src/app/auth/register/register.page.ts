import { Component, OnInit } from '@angular/core';
import { NavController,ToastController} from 'ionic-angular';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import {RestProvider} from '../../../providers/rest/rest';
import {LoginPage} from '../login/login.page'
import { from } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  constructor(private authService:AuthService,private router:Router,private rest: RestProvider,public navCtrl: NavController,public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  register(form:NgForm){
    this.rest.Register(form.value.name,form.value.password,form.value.email)
    .subscribe(
      outcome => this.ProcessResult(JSON.parse(outcome)));    
  }
  ProcessResult(data){  
    if(data.username) {
      console.log(data);
      // this.router.navigateByUrl('menu/home');
      this.navCtrl.push(LoginPage);   
    }
    else{
      console.error(data);  
      this.ErrorToast("Sorry, user register failed. Please try again.");  
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
    // this.authService.register(form.value).subscribe((res)=>{
    //   this.router.navigateByUrl('menu/home');
    // })
  

}
