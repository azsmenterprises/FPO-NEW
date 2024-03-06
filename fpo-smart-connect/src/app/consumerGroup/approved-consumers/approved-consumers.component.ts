import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { ConsumerGroupService } from '../consumer-group.service';

@Component({
  selector: 'app-approved-consumers',
  templateUrl: './approved-consumers.component.html',
  styleUrls: ['./approved-consumers.component.css']
})
export class ApprovedConsumersComponent implements OnInit {
  
  dataSource: any
  displayedColumns: string[] = ['slNo', 'dist', 'csName', 'csMail', 'csMobNo', 'csCity', 'BlockUnblock'];
  pagelength = 0
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort, { static: true }) sort: any
  csIndexToApprove:any
  buttonType:any
  color:ThemePalette = 'accent'
  isChecked:any

  constructor(private cgServ: ConsumerGroupService, private appServ: AppService, private toastr: ToastrService) { 
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.getApprovedConsumerList()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort
  }

  getApprovedConsumerList() {
    this.cgServ.getApprovedConsumerList(this.appServ.cgRefNo).subscribe(
      data => {
        this.dataSource.data = data
        this.pagelength = data.length
      },
      error => {
        this.toastr.error('Server error')
      }
    )
  }

  blockUnblockConsumer(index:any){
    let data=this.dataSource.data[index]
    // data.blockStatus=this.isChecked
    this.cgServ.blockUnblockConsumer(data).subscribe(
      data=>{
        if(data.status>0){
          this.toastr.success('Success')
        }else{
          this.toastr.warning('Unsuccess')
        }
      },
      error=>{
        this.toastr.error('Error')
      }
    )
    
  }

}
