import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { ConsumerGroupService } from '../consumer-group.service';

@Component({
  selector: 'app-consumer-registration',
  templateUrl: './consumer-registration.component.html',
  styleUrls: ['./consumer-registration.component.css']
})
export class ConsumerRegistrationComponent implements OnInit {

  allDists:any

  constructor(private appServ:AppService,private cgServ:ConsumerGroupService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllDist()
  }

  RegisterConsumerForm = new FormGroup({
    consumerName: new FormControl('', Validators.required),
    consumerMail: new FormControl('', [Validators.required,Validators.email]),
    consumerMobilenumber: new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('^[0-9]*$')]),
    consumerAltmobno: new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('^[0-9]*$')]),
    consumerPlot: new FormControl('', Validators.required),
    consumerCity: new FormControl('', Validators.required),
    consumerLandmark: new FormControl('', Validators.required),
    csDist: new FormControl('', Validators.required),
    consumerPin: new FormControl('', [Validators.required,Validators.maxLength(6),Validators.minLength(6),Validators.pattern('^[0-9]*$')]),
    cgRefNo:new FormControl('')
  })

  getAllDist(){
    this.cgServ.getAllDist().subscribe(
      data=>{
        this.allDists=data
      },
      error=>{

      }
    )
  }

  consumerRegisterSubmit(){
    // ////////console.log(this.RegisterConsumerForm.controls['consumerMobilenumber']);
    
    this.RegisterConsumerForm.patchValue({
      cgRefNo:this.appServ.cgRefNo
    })
    this.cgServ.consumerRegisterSubmit(this.RegisterConsumerForm.value).subscribe(
      data=>{
        if(data.status>0){
          this.toastr.success('Submitted successfully')
          this.RegisterConsumerForm.reset()
        }else{
          this.toastr.warning('Submit unsuccessful')
        }
      },
      error=>{
        this.toastr.error('Unexpected error')
      }
    )
  }

}
