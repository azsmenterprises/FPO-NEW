import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FigServiceService } from '../../fig-service.service';

@Component({
  selector: 'app-indent-rejected-by-fpo',
  templateUrl: './indent-rejected-by-fpo.component.html',
  styleUrls: ['./indent-rejected-by-fpo.component.css']
})
export class IndentRejectedByFpoComponent implements OnInit {
  rejecteddata: any;

  constructor(private service: FigServiceService,private appServ:AppService) { }

  ngOnInit(): void {
    this.getRejectedFpo();
  }
  getRejectedFpo() {
    this.service.getRejectedFpo(this.appServ.figRefNo).subscribe((response) => {
      this.rejecteddata = response;
    }, (error) => {
    })
  }

}
