import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { ConsumerGroupService } from '../consumer-group.service';

@Component({
  selector: 'app-approve-consumer',
  templateUrl: './approve-consumer.component.html',
  styleUrls: ['./approve-consumer.component.css']
})
export class ApproveConsumerComponent implements OnInit {

  dataSource: any
  displayedColumns: string[] = ['slNo', 'dist', 'csName', 'csMail', 'csMobNo', 'csCity', 'Action'];
  pagelength = 0
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort, { static: true }) sort: any
  csIndexToApprove:any
  buttonType:any


  constructor(private cgServ: ConsumerGroupService, private appServ: AppService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit(): void {
    this.getConsumerListToApprove()
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort
  }

  getConsumerListToApprove() {
    this.cgServ.getConsumerListToApprove(this.appServ.cgRefNo).subscribe(
      data => {
        this.dataSource.data = data
        this.pagelength = data.length
      },
      error => {
        this.toastr.error('Server error')
      }
    )
  }

  getCSIndexToApprove(index:any,buttonType:any){
    this.csIndexToApprove=index
    this.buttonType=buttonType
  }

  approveOrRejectConsumer() {
    this.cgServ.approveConsumer(this.dataSource.data[this.csIndexToApprove],this.buttonType).subscribe(
      data => {
        if (data.status=='approved') {
          this.getConsumerListToApprove()
          this.toastr.success('Approved successfully')
        }else if(data.status=='rejected'){
          this.toastr.success('Rejection successfull')
          this.getConsumerListToApprove()
        }
        else{
          this.toastr.warning('Approve unsuccessful')
        }
      },
      error => {
        this.toastr.error('Server error')
      }
    )
  }

}
