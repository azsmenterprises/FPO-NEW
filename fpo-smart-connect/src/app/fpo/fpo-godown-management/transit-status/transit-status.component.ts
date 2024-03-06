import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-transit-status',
  templateUrl: './transit-status.component.html',
  styleUrls: ['./transit-status.component.css']
})
export class TransitStatusComponent implements OnInit {
  dataSource: any
  displayedColumns: string[] = ['slNo','fpoName','Crop', 'Variety', 'Quantity', 'District', 'Godown','Status'];
  pagelength = 0
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort, { static: true }) sort: any
  
  constructor(private appserv:AppService,private fpoServ:AdminService) { 
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.getAllStockInTransitData()
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort
  }

  getAllStockInTransitData(){
    this.fpoServ.getAllStockInTransitData(this.appserv.fpoId).subscribe(
      data=>{
        this.dataSource.data = data
        this.pagelength = data.length
      }
    )
  }

}
