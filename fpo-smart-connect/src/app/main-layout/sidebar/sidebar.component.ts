import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userRole: any;
  userName: any;

  constructor(private authService: AuthService) {
    this.userRole = this.authService.userRole;
    this.userName = this.authService.userName;
  }

  ngOnInit(): void {
    // console.log(this.userRole,"this.userRole");
    // console.log(this.userName,"this.userName");
    
  }
  open_dashboardIA(){
    window.open('http://localhost:3000/ dashboardia', '_blank')
  }
  open_dashboardCBBO(){
    window.open('http://localhost:3000/ dashboardcbbo', '_blank')
  }
  open_dashboard(){
    window.open('http://localhost:3000/ dashboard', '_blank')
  }
}
