import { Component, OnInit } from '@angular/core';
import { ExcelprintService } from 'src/app/service/excelprint.service';
import { CbboService } from '../cbbo.service';

@Component({
  selector: 'app-targetachievement',
  templateUrl: './targetachievement.component.html',
  styleUrls: ['./targetachievement.component.css']
})
export class TargetachievementComponent implements OnInit {
  searchText1: any = {};
  searchText2: any = {};
  getCbbotargetdata: any;
  constructor(private ExcelprintService:ExcelprintService,private service: CbboService) { }

  ngOnInit(): void {
    this.getCbbotarget();
   this.searchText1.year=""
   this.searchText2.iaName=""

  }
  getCbbotarget(){
    this.service.getCbbotarget().subscribe(result =>{
      this.getCbbotargetdata = result;
    })
  }

  exportAsXLSX(): void {
    this.ExcelprintService.exportAsExcelFile(this.getCbbotargetdata, 'CBBO WISE FPO WISE PUBLISHED TABLE');
  }
}
