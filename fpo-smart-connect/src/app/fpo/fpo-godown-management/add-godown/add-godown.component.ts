import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-godown',
  templateUrl: './add-godown.component.html',
  styleUrls: ['./add-godown.component.css']
})
export class AddGodownComponent implements OnInit {

  allDistricts: any

  constructor(private appServ: AppService, private fpoServ: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fpoServ.getDistListForFpo().subscribe(
      data => {
        this.allDistricts = data
      }
    )
  }

  addGodownForm = new FormGroup({
    godownName: new FormControl('', Validators.required),
    districtCode: new FormControl('', Validators.required),
    fpoId: new FormControl('')
  })

  onSubmit() {
    this.addGodownForm.patchValue({
      fpoId: this.appServ.fpoId
    })
    this.fpoServ.addGodownSubmit(this.addGodownForm.value).subscribe(
      data => {
        if (data.status > 0) {
          this.toastr.success('Submitted successfully')
          this.addGodownForm.reset()
        } else {
          this.toastr.error('Unsuccessful')

        }
      }
    )
  }

}
