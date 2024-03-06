import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import * as sha512 from 'js-sha512';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  hide = true;
  hide1 = true;
  hide2 = true;
  closeButton: any

  constructor(private router: Router, private toastr: ToastrService, private authServ: AuthService, public dialogRef: MatDialogRef<any>,
     @Inject(MAT_DIALOG_DATA) public data: { id: string, type: string, passwordChangedOrNot: boolean }) { }

  ngOnInit(): void {
    console.log( this.data," this.data");
    this.changePassword.patchValue({
      id: this.data.id,
      type: this.data.type
    })
    
    if (this.data.type == 'FPO' && this.data.passwordChangedOrNot == true) {
      this.closeButton = true
    } else if (this.data.type == 'FPO' && this.data.passwordChangedOrNot != true) {
      this.closeButton = false
    } else {
      this.closeButton = true
    }

  }

  changePassword = new FormGroup({
    currentPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', [Validators.required, passwordValidatorForNewPass()]),
    confirmPassword: new FormControl('', [Validators.required, passwordValidatorForConfirmPass()]),
    id: new FormControl(),
    type: new FormControl()
  })

  dialogueClose() {
    this.dialogRef.close();
  }

  validateValue1() {
    if (this.changePassword.controls['confirmPassword'].errors) {
      this.changePassword.controls['confirmPassword'].updateValueAndValidity()
    }
  }
  validateValue2() {
    if (this.changePassword.controls['newPassword'].errors) {
      this.changePassword.controls['newPassword'].updateValueAndValidity()
    }
  }


  onClear() {
    this.changePassword.patchValue({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

  onSubmit() {
    let data = this.changePassword.value
    data.currentPassword = sha512.sha512(this.changePassword.value.currentPassword)
    data.newPassword = sha512.sha512(this.changePassword.value.newPassword)
    data.confirmPassword = sha512.sha512(this.changePassword.value.newPassword)

    this.authServ.passwordChange(data).subscribe(
      data => {
        if (data.status == 'changed') {
          this.toastr.success('Password changed successfully')
          this.dialogueClose()
        } else if (data.status == 'unsuccess') {
          this.toastr.warning('Password change unsuccessful')
        } else if (data.status == 'invalid') {
          this.toastr.warning('Current password mismatch')
        } else if (data.status == 'invalid session') {
          this.toastr.warning('Invalid session')
        } else {
          this.toastr.error('Unexpected error')
        }
      },
      error => {
        this.toastr.error('Unexpected error')

      }
    )

  }

  logout() {
    this.authServ.logout().subscribe(
      data => {
        if (data.status == true) {
          this.router.navigate(['/login'])
          this.dialogueClose()
        }
      }
    )
  }

}

function passwordValidatorForConfirmPass() {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.parent?.get('newPassword')?.value != control.parent?.get('confirmPassword')?.value) {
      return { passwordValidator: true }
    } else {
      return null
    }
  }
}

function passwordValidatorForNewPass() {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.parent?.get('confirmPassword')?.pristine == true && control.parent?.get('confirmPassword')?.touched == false) {
      return null
    } else {
      if (control.parent?.get('newPassword')?.value != control.parent?.get('confirmPassword')?.value) {
        return { passwordValidatorForNewPass: true }
      } else {
        return null
      }
    }

  }
}
