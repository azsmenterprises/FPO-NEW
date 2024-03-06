import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { FigServiceService } from '../../fig-service.service';

@Component({
  selector: 'app-forward-to-fpo',
  templateUrl: './forward-to-fpo.component.html',
  styleUrls: ['./forward-to-fpo.component.css']
})
export class ForwardToFpoComponent implements OnInit {

  constructor(private figServ:FigServiceService,private appServ:AppService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.fetchAllProducedDataForForwardToFpo()
  }

  allProducedDataForForwardToFpo:any
  dataForForwardToFpo:any

  fetchAllProducedDataForForwardToFpo(){
    this.figServ.fetchAllProducedDataForForwardToFpo(this.appServ.figRefNo).subscribe(
      data=>{
        this.allProducedDataForForwardToFpo=data
        ////console.log(555,this.allProducedDataForForwardToFpo);
        
      }
    )
  }

  getDataForForwardToFpo(x:any){
    x.figRefNo=this.appServ.figRefNo
    this.dataForForwardToFpo=x
  }

  forwardProducedDataToFpo(){
    this.figServ.forwardProducedDataToFpo(this.dataForForwardToFpo).subscribe(
      data=>{
        if(data.status>0){
          this.toastr.success('Forwarded to FPO successfully','Success')
          this.fetchAllProducedDataForForwardToFpo();
        }else{
          this.toastr.error('Forward to FPO error','Unsuccessful')
        }
      },
      error=>{
        this.toastr.error('Unexpected Error')
      }
    )
  }

}
