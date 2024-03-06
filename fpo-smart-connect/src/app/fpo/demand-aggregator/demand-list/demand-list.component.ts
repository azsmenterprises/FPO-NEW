import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FigServiceService } from 'src/app/fig/fig-service.service';
@Component({
  selector: 'app-demand-list',
  templateUrl: './demand-list.component.html',
  styleUrls: ['./demand-list.component.css']
})
export class DemandListComponent implements OnInit {
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
  season:any

  type:any
  year = new Date().getFullYear();

  demandListForm = new FormGroup({
    selectedItemType: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    season: new FormControl('', Validators.required),
    
  });
  constructor(private appServ: AppService,
    private figServ: FigServiceService) { }

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
    // //console.log(this.season,"TS");
    
   
    
    this.figServ
      .getAppliedSaleIndents(this.appServ.fpoId, this.demandListForm.value.selectedItemType,this.demandListForm.value.year,this.demandListForm.value.season)
      .subscribe((data) => {
        //console.log(data,"TS");
        
        this.appliedSaleIndentData = data;
        this.showTable = this.demandListForm.value.selectedItemType;
        this.showCard = true;
      });
  }

}
