import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { ConsumerGroupService } from '../consumer-group.service';

@Component({
  selector: 'app-relevant-fpos',
  templateUrl: './relevant-fpos.component.html',
  styleUrls: ['./relevant-fpos.component.css']
})
export class RelevantFposComponent implements OnInit {

  dataSource: any
  displayedColumns: string[] = ['slNo', 'dist', 'Name', 'csMail', 'csMobNo', 'csCity'];
  pagelength = 0
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort, { static: true }) sort: any

  constructor(private appServ:AppService,private cgServ:ConsumerGroupService,private toastr:ToastrService) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.getFpoListForCg()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort
  }

  getFpoListForCg() {
    this.cgServ.getFpoListForCg(this.appServ.cgRefNo).subscribe(
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
