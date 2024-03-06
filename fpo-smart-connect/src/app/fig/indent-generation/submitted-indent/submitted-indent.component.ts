import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FigServiceService } from '../../fig-service.service';

@Component({
  selector: 'app-submitted-indent',
  templateUrl: './submitted-indent.component.html',
  styleUrls: ['./submitted-indent.component.css'],
})
export class SubmittedIndentComponent implements OnInit {

  cropCatData:any
  crops:any
  crop:any
  variety:any
  varieties:any
  appliedSaleIndentData: any;
  selectedItemType: any;
  showTable: any;
  showCard = false;
  cropCatagory:any

  constructor(
    private appServ: AppService,
    private figServ: FigServiceService
  ) {}

  ngOnInit(): void {
    this.figServ.getCropCata().subscribe((data) => {
      this.cropCatData = data;
    });
  }

  getCropAccToCatagory() {
    this.figServ
      .getCropAccToCatagory(this.cropCatagory)
      .subscribe((data) => {
        this.crops = data;
      });
  }

  getAllVarieties() {
    this.figServ
      .getAllVarieties(this.crop.Crop_Code)
      .subscribe((data) => {
        this.varieties = data;
      });
  }

  getAppliedSaleIndents() {
    this.figServ
      .getAppliedSaleIndents(this.appServ.figRefNo, this.selectedItemType,this.crop,this.variety)
      .subscribe((data) => {
        this.appliedSaleIndentData = data;
        this.showTable = this.selectedItemType;
        this.showCard = true;
      });
  }
}
