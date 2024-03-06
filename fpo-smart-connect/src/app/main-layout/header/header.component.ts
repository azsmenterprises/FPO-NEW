import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';
import { AdminService } from 'src/app/fpo/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userRole: any;
  userName: any;
  @Output() menuButtonClickEvent = new EventEmitter<boolean>();
  PasswordChangedOrNot: boolean = false;
  constructor(private dialog: MatDialog, private appServ: AppService, private authService: AuthService, private router: Router, private fpoServ: AdminService,) {
    this.userRole = this.authService.userRole;
    this.userName = this.authService.userName;
  }

  ngOnInit(): void {
    if (this.userRole == "FPO") {
      this.checkForPasswordChangedOrNot();
    }
  }

  checkForPasswordChangedOrNot() {
    this.fpoServ.checkForPasswordChangedOrNot(this.appServ.fpoId).subscribe(
      data => {
        if (data.changed == true) {
          this.PasswordChangedOrNot = true;
        } else {
          this.PasswordChangedOrNot = false
          this.openDialogForPasswordChange()
        }
      }
    )
  }

  openDialogForPasswordChange() {

    var refNo;
    if (this.userRole == "FPO") {
      refNo = this.appServ.fpoRefNo;
    }
    if (this.userRole == "Admin") {
      refNo = this.appServ.adminRefNo;
    }
    if (this.userRole == "ia") {
      refNo = this.appServ.iaRefNo;
    }
    if (this.userRole == "ADH") {
      refNo = this.appServ.adhrefNo;
    }
    if (this.userRole == "AHO") {
      refNo = this.appServ.ahorefNo;
    }
    if (this.userRole == "Cbbo") {
      refNo = this.appServ.cbboRefNo;
    }
    if (this.userRole == "FIG") {
      refNo = this.appServ.figRefNo;
    }

    var dialogConfig = new MatDialogConfig();
    if (this.userRole == "FPO") {
      dialogConfig.disableClose = !this.PasswordChangedOrNot;
    }

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.width='300px'
    // dialogConfig.height='420px'
    dialogConfig.data = {
      id: refNo,
      type: this.userRole,
      passwordChangedOrNot:this.PasswordChangedOrNot
    }

    this.dialog.open(ChangePasswordComponent, dialogConfig).afterClosed().subscribe(
      () => {
        // this.approvedProduced()
      }
    );
  }

  logout() {
    this.authService.logout().subscribe(
      data => {
        if (data.status == true) {
          this.router.navigate(['/login'])
        }
      }
    )
  }
  menuButtonClick() {
    this.menuButtonClickEvent.emit();
    // $('toggle-btn').toggleClass('click');
    // $('.side-navbar').toggleClass('active');
  }
  // ngAfterViewInit() {
  //   document.getElementById("menu-action")?.addEventListener("click", function () {
  //     document.getElementsByClassName("side-navbar")[0].classList.toggle("active");
  //     document.getElementsByClassName("main")[0]?.classList.toggle("active");
  //     document.getElementsByClassName("header")[0]?.classList.toggle("active");
  //     document.getElementById("page")?.classList.toggle("active");

  //     if (document.getElementsByClassName('side-navbar')[0].classList.contains('active')) {
  //       document.getElementById("menu-action")?.querySelector('i')?.classList.add('fa-close');
  //       document.getElementById("menu-action")?.querySelector('i')?.classList.remove('fa-bars');
  //     } else {
  //       document.getElementById("menu-action")?.querySelector('i')?.classList.add('fa-bars');
  //       document.getElementById("menu-action")?.querySelector('i')?.classList.remove('fa-close');
  //     }
  //   });
  // }
}
