import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as sha512 from 'js-sha512';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userTypeForDisplay: any
  data: any
  saltValue: any
  constructor(private queryRoute: ActivatedRoute, private toastr: ToastrService, private authServ: AuthService, private router: Router, private appServ: AppService) {
    this.data = environment;
  }
  loginForm = new FormGroup({
    userid: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {

    // this.queryRoute.queryParams
    //   .subscribe(params => {
    //     ////console.log(params); // { orderby: "price" }
    //     this.userTypeForDisplay = params.userType;
    //     ////console.log('params',this.userTypeForDisplay); // price
    //   }
    // );
    // this.authServ.getUserType().subscribe(
    //   data => {
    //     this.userTypeForDisplay = data.userType
    //   }
    // )

    this.authServ.getSalt().subscribe(
      data => {
        this.saltValue = data.salt
      }
    )

  }
  onSubmit() {
    let pass1 = sha512.sha512(this.loginForm.value.password)
    let pass2 = sha512.sha512(pass1 + this.saltValue)
    this.loginForm.patchValue({
      password: pass2
    })
    this.authServ.login(this.loginForm.value).subscribe(
      data => {
        console.log(data,"data");
        
        if (data.status == 'success') {
          if (data.userType == 'FIG') {
            this.appServ.figRefNo = data.refNo
            this.router.navigate(['/fig'])
          } else if (data.userType == 'FPO') {
            this.appServ.fpoRefNo = data.refNo
            this.appServ.fpoId = data.fpoId
            this.router.navigate(['/fpo'])
          } else if (data.userType == 'Admin') {
            this.appServ.adminRefNo = data.refNo
            this.router.navigate(['/admin'])
          } else if (data.userType == 'ConsumerGroup') {
            this.appServ.cgRefNo = data.refNo
            this.router.navigate(['/consumerGroup'])
          } else if (data.userType == 'Trader') {
            this.appServ.cgRefNo = data.refNo
            this.router.navigate(['/consumerGroup'])
          } else if (data.userType == 'Cbbo') {
            this.appServ.cbboCode = data.cbboCode
            this.router.navigate(['/cbbo'])
          } else if (data.userType == 'ia') {
            this.appServ.iaRefNo = data.refNo
            this.router.navigate(['/ia'])
          } else if (data.userType == 'ADH') {
            this.appServ.adhrefNo = data.refNo
            this.router.navigate(['/adh'])
          } else if (data.userType == 'AHO'){
            this.appServ.ahorefNo = data.refNo
            this.router.navigate(['/aho'])
          } else {
            this.appServ.farmerRefNo = data.refNo
            this.router.navigate(['/login'])
          }
        } else if (data.status == 'mismatch') {
          this.toastr.warning('Wrong UserId/Password')
          this.loginForm.reset()
        }else if( data.status == 'fail'){
          this.toastr.warning('Your Id is not Active');
          this.loginForm.reset();
        } else {
          this.toastr.warning('Wrong credential')
          this.loginForm.reset()
        }


      }
    )
  }

  showPassword(){
    var x = document.getElementById("password") as HTMLInputElement;
			if (x.type === "password") {
				x.type = "text";
			} else {
				x.type = "password";
			}
  }


}
