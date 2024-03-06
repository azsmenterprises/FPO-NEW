import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-figs-approved',
  templateUrl: './figs-approved.component.html',
  styleUrls: ['./figs-approved.component.css']
})
export class FigsApprovedComponent implements OnInit {

  dataSource: any
  displayedColumns: string[] = ['slNo', 'Name', 'Village', 'Block','Grampanchyat', 'District', 'LeaderId'];
  pagelength = 0
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort, { static: true }) sort: any

  constructor(private appServ:AppService,private fpoServ:AdminService,private toastr:ToastrService) {
    this.dataSource = new MatTableDataSource()
   }

  ngOnInit(): void {
    this.getFigApprovedListForFpo()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort
  }

  getFigApprovedListForFpo() {
    this.fpoServ.getFigApprovedListForFpo(this.appServ.fpoRefNo).subscribe(
      data=>{
        this.dataSource.data = data
        this.pagelength = data.length
      },
      error=>{
        this.toastr.error('Unexpected error')
      }
    )
    
  }

}
