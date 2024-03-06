import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-relevant-consumer-groups',
  templateUrl: './relevant-consumer-groups.component.html',
  styleUrls: ['./relevant-consumer-groups.component.css']
})
export class RelevantConsumerGroupsComponent implements OnInit {
  
  dataSource: any
  displayedColumns: string[] = ['slNo', 'Name', 'Mob', 'Mail', 'city', 'dist','cropType'];
  pagelength = 0
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort, { static: true }) sort: any

  constructor(private appServ:AppService,private fpoServ:AdminService,private toastr:ToastrService) {
    this.dataSource = new MatTableDataSource()
   }

  ngOnInit(): void {
    this.getCGListForFpo()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort
  }

  getCGListForFpo() {
    this.fpoServ.getCGListForFpo(this.appServ.fpoId).subscribe(
      data=>{
        this.dataSource.data = data
        ////console.log(this.dataSource.MatTableDataSource);
        this.pagelength = data.length
      },
      error=>{
        this.toastr.error('Unexpected error')
      }
    )
    
  }

}
