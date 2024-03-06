import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FigServiceService } from '../../fig-service.service';

@Component({
  selector: 'app-indent-approved-by-fpo',
  templateUrl: './indent-approved-by-fpo.component.html',
  styleUrls: ['./indent-approved-by-fpo.component.css']
})
export class IndentApprovedByFpoComponent implements OnInit {
  result: any;

  constructor(private service: FigServiceService,private appServ:AppService) { }

  ngOnInit(): void {
    this. getapprovedData() ;
  }
  getapprovedData() {
    this.service.getapprovedFpo(this.appServ.figRefNo).subscribe((response) => {
      this.result = response;
    }, (error) => {
    })
  }

}
