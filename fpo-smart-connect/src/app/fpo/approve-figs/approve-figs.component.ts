import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-approve-figs',
  templateUrl: './approve-figs.component.html',
  styleUrls: ['./approve-figs.component.css']
})
export class ApproveFigsComponent implements OnInit {

  dataSource: any
  displayedColumns: string[] = ['slNo', 'Name', 'Village', 'Block','Grampanchyat', 'District', 'LeaderId','Action'];
  pagelength = 0
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort, { static: true }) sort: any

  constructor(private appServ:AppService,private fpoServ:AdminService,private toastr:ToastrService) {
    this.dataSource = new MatTableDataSource()
   }

  ngOnInit(): void {
    this.getFigPendingApproveListForFpo()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort
  }

  getFigPendingApproveListForFpo() {
    this.fpoServ.getFigPendingApproveListForFpo(this.appServ.fpoRefNo).subscribe(
      data=>{
        this.dataSource.data = data
        this.pagelength = data.length
      },
      error=>{
        this.toastr.error('Unexpected error')
      }
    )
    
  }

  ApproveFig(index:any){
    if(confirm('Are you sure to approve ?')){
      let figData=this.dataSource.data[index]
    this.fpoServ.ApproveFig(figData).subscribe(
      data=>{
        if(data.status>0){
          this.toastr.success('Approved successfully')
          this.getFigPendingApproveListForFpo()
        }else{
          this.toastr.warning('Approve unsuccessful')
        }
      },
      error=>{
        this.toastr.error('Unexpected error')

      }
    )
    
    }
  }
}
