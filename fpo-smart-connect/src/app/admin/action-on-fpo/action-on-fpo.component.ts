import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { RootAdminService } from '../root-admin.service';
import { ExcelprintService } from 'src/app/service/excelprint.service';

@Component({
  selector: 'app-action-on-fpo',
  templateUrl: './action-on-fpo.component.html',
  styleUrls: ['./action-on-fpo.component.css']
})
export class ActionOnFpoComponent implements OnInit {

  allfpodata: any;
  dataSource: any;
  displayedColumns: string[] = ['slNo', 'fpoName', 'Distict', 'Block','refNo','updated on','viewDetails','download', 'BlockUnblock'];
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort, { static: true }) sort: any
  pagelength = 0
  csIndexToApprove: any
  buttonType: any
  color: ThemePalette = 'accent'
  isChecked: any
  viewData: any = [];



  constructor(private service: RootAdminService, private appServ: AppService, private toastr: ToastrService, private ExcelprintService: ExcelprintService) {
    this.dataSource = new MatTableDataSource()
  }


  ngOnInit(): void {
    this.getFpoData()
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort
  }
  getFpoData() {
    this.service.getFpodata().subscribe(data => {
      // console.log(data,'data');
      this.dataSource.data = data
      this.pagelength = data.length
    },
      error => {
        this.toastr.error('Server error')
      })
  }
  blockUnblockFpo(data: any) {
    // let data = this.dataSource.data[index-1]
    // data.blockStatus=this.isChecked
    this.service.blockUnblockFpo(data).subscribe(
      data => {
        if (data.status == true) {
          this.toastr.success('Blocked successfully')
          // this.getFpoData()
        } else {
          this.toastr.success('Unblocked successfully')

        }
      },
      error => {
        this.toastr.error('Error')
      }
    )

  }

  approveFpo(data:any){
    // let data = this.dataSource.data[index-1]
    
    this.service.approveFpo(data).subscribe(
      result => {
        if (result.status > 0) {
          this.toastr.success('FPO approved successfully')
          this.getFpoData()
        } else {
          this.toastr.warning('Unsuccess')
        }
      },
      error => {
        this.toastr.error('Error')
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewDetails(element:any){
    console.log(element,'elementelement');
    
this.viewData = element;
  }

  downloadDetail(element:any){
    let data =[]
    data.push(element);
    this.ExcelprintService.exportAsExcelFile( data, 'Fpo-Detils ');
  }
  downloadAllFpoDetails() {
    this.ExcelprintService.exportAsExcelFile( this.dataSource.data, 'All-Fpo-List ');
 }

}
