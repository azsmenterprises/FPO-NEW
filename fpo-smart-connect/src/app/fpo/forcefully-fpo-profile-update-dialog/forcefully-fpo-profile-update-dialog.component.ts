import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-forcefully-fpo-profile-update-dialog',
  templateUrl: './forcefully-fpo-profile-update-dialog.component.html',
  styleUrls: ['./forcefully-fpo-profile-update-dialog.component.css']
})
export class ForcefullyFpoProfileUpdateDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<any>,private authServ:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  dialogueClose() {
    this.dialogRef.close();
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
