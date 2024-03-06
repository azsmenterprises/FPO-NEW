import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-stocks-for-receipt',
  templateUrl: './stocks-for-receipt.component.html',
  styleUrls: ['./stocks-for-receipt.component.css']
})
export class StocksForReceiptComponent implements OnInit {
  dataSource: any
  displayedColumns: string[] = ['slNo','fpoName','Crop', 'Variety', 'Quantity', 'District', 'Godown','Action'];
  pagelength = 0
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort, { static: true }) sort: any
  @ViewChild('confirmRegister') confirmRegister: any;
  private modalRef: any;


  
  constructor(private modalService: ModalManager,private appserv:AppService,private fpoServ:AdminService,private toastr:ToastrService) {
    this.dataSource = new MatTableDataSource()

   }

  ngOnInit(): void {
    this.getAllStockForReceiptData()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort
  }

  openConfirmationModal(){
    this.modalRef = this.modalService.open(this.confirmRegister, {
      size: "md",
      modalClass: 'mymodal',
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop"
    })
  }

  closeModal() {
    this.modalService.close(this.modalRef);
    //or this.modalRef.close();
  }

  getAllStockForReceiptData(){
    this.fpoServ.getAllStockForReceiptData(this.appserv.fpoId).subscribe(
      data=>{
        this.dataSource.data = data
        this.pagelength = data.length
      }
    )
  }

  idToReceive:any
  getIdToReceive(_id:any){
    this.openConfirmationModal()
    this.idToReceive=_id
  }

  receiveStock(){
    this.fpoServ.receiveStock(this.idToReceive).subscribe(
      data=>{
        if(data.status>0){
          this.getAllStockForReceiptData()
          this.closeModal()
          this.toastr.success('Received successfully')
        }else{
          this.toastr.warning('Unable to receive')
        }
      }
    )
  }


}
