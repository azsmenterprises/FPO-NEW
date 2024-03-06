import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-sold-products',
  templateUrl: './sold-products.component.html',
  styleUrls: ['./sold-products.component.css']
})
export class SoldProductsComponent implements OnInit {

  dataSource: any
  displayedColumns: string[] = ['slNo', 'SaleTo','MobileNo', 'Quantity','AmountCollected','Date','Crop','Variety'];
  pagelength = 0
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort, { static: true }) sort: any

  constructor(private appServ:AppService,private fpoServ:AdminService,private toastr:ToastrService) {
    this.dataSource = new MatTableDataSource()
   }

  ngOnInit(): void {
    this.getSoldProductsOfFpo()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort
  }

  getSoldProductsOfFpo() {
    this.fpoServ.getSoldProductsOfFpo(this.appServ.fpoId).subscribe(
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
