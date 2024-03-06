import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin.service';
import { DialogForSaleComponent } from '../dialog-for-sale/dialog-for-sale.component';

@Component({
  selector: 'app-produced-list',
  templateUrl: './produced-list.component.html',
  styleUrls: ['./produced-list.component.css'],
})
export class ProducedListComponent implements OnInit {
  constructor(
    private adminservice: AdminService,
    private appServ: AppService,
    private dialog: MatDialog,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void { }

  figIndentList: any;
  year = new Date().getFullYear();
  // figIndentList1=new MatTableDataSource()

  // displayedColumns:string[] = ['position', 'Category', 'Crop', 'Variety','Quantity','Action'];

  producedApproveForm = new FormGroup({
    type: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    season: new FormControl('', Validators.required),
    fpoId: new FormControl(),
  });

  approvedProduced() {
    this.producedApproveForm.patchValue({
      fpoId: this.appServ.fpoId,
    });
    this.adminservice
      .approvedProduced(this.producedApproveForm.value)
      .subscribe((data) => {
       //console.log(data);
        this.figIndentList = data;
        
        // this.figIndentList1.data=data

      });
  }

  openDialog(dataFromList:any) {

    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='600px'
    dialogConfig.height='450px'
    dialogConfig.data={
      catagory:dataFromList._id.cropCatagory,
      cropCode:dataFromList._id.crop,
      cropName:dataFromList._id.cropName,
      variety:dataFromList._id.variety,
      varietyName:dataFromList._id.varietyName,
      quantity:dataFromList.quantity
    }

    this.dialog.open(DialogForSaleComponent,dialogConfig).afterClosed().subscribe(
      ()=>{
        this.approvedProduced()
      }
    );
  }

  dataForAddToGodown:any
  allGodowns:any
  selectedGodown:any
  getAddToGodownData(x:any){
    this.dataForAddToGodown=x

    this.adminservice.getAllFpoGodowns(this.appServ.fpoId).subscribe(
      data=>{
        this.allGodowns=data
      }
    )
  }

  addToGodown(){
    this.adminservice.producedAddToGodown(this.dataForAddToGodown,this.selectedGodown).subscribe(
      data=>{
        if(data.status>0){
          this.toastr.success('Product added to godown')
        }else{
          this.toastr.warning('Unable to add')
        }
      },
      error=>{
        this.toastr.error('Unexpected error')

      }
    )
  }

}
