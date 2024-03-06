import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FigServiceService } from '../../fig-service.service';

@Component({
  selector: 'app-approved-by-fpo',
  templateUrl: './approved-by-fpo.component.html',
  styleUrls: ['./approved-by-fpo.component.css'],
})
export class ApprovedByFpoComponent implements OnInit {
  constructor(
    private figServ: FigServiceService,
    private appServ: AppService
  ) {}

  ngOnInit(): void {
    this.getApprovedIndents();
  }

  approvedData: any;

  getApprovedIndents() {
    this.figServ.getApprovedIndents(this.appServ.figRefNo).subscribe((data) => {
      this.approvedData = data;
    });
  }
}
