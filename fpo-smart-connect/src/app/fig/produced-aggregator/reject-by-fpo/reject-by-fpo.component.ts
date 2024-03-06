import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FigServiceService } from '../../fig-service.service';

@Component({
  selector: 'app-reject-by-fpo',
  templateUrl: './reject-by-fpo.component.html',
  styleUrls: ['./reject-by-fpo.component.css'],
})
export class RejectByFpoComponent implements OnInit {
  constructor(
    private figServ: FigServiceService,
    private appServ: AppService
  ) {}

  ngOnInit(): void {
    this.getRejectedIndents();
  }

  rejectedData: any;

  getRejectedIndents() {
    this.figServ.getRejectedIndents(this.appServ.figRefNo).subscribe((data) => {
      this.rejectedData = data;
    });
  }
}
