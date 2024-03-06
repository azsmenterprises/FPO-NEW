import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fpo-smart-connect';
  constructor(private router: Router,private appServ:AppService) { }
  ngOnInit() {

    this.appServ.getFigFpoCgId().subscribe(
      data=>{
        if(data.userType=='FPO'){
          this.appServ.fpoId=data.fpoId
          this.appServ.fpoRefNo=data.refNo
        }
        if(data.userType=='FIG'){
          this.appServ.figRefNo=data.refNo
        }
        if(data.userType=='ConsumerGroup'){
          this.appServ.cgRefNo=data.refNo
        }
        if(data.userType=='Trader'){
          this.appServ.cgRefNo=data.refNo
        }
        if(data.userType=='ia'){
          this.appServ.iaRefNo=data.refNo
        }
        if(data.userType=='Cbbo'){
          this.appServ.cbboCode=data.cbboCode
        }
        if(data.userType=='ADH'){
          this.appServ.adhrefNo=data.refNo
        }
        if(data.userType=='AHO'){
          this.appServ.ahorefNo=data.refNo
        }
      }
    )
    
    // below code is for=>on every routing show page from top
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

  }
}
