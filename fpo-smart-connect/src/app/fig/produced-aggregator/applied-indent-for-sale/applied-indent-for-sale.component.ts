import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FigServiceService } from '../../fig-service.service';

@Component({
  selector: 'app-applied-indent-for-sale',
  templateUrl: './applied-indent-for-sale.component.html',
  styleUrls: ['./applied-indent-for-sale.component.css'],
})
export class AppliedIndentForSaleComponent implements OnInit {
  constructor(
    private appServ: AppService,
    private figServ: FigServiceService
  ) {}

  ngOnInit(): void {
    this.getAppliedProducedAggregator();
  }

  appliedSaleIndentData: any;

  getAppliedProducedAggregator() {
    this.figServ
      .getAppliedProducedAggregator(this.appServ.figRefNo)
      .subscribe((data) => {
        this.appliedSaleIndentData = data;
      });
  }
}
