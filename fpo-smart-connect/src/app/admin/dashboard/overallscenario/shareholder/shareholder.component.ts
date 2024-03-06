import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { RootAdminService } from '../../../root-admin.service';

@Component({
  selector: 'app-shareholder',
  templateUrl: './shareholder.component.html',
  styleUrls: ['./shareholder.component.css']
})
export class ShareholderComponent implements OnInit {
  N: any;
  getshareHolderData: any;
  getshareHolderyearwiseData: any;
  shareHolder: boolean = true;
  getholderagencywiseData: any;
  holder1: any;
  holder2: any;
  holder3: any;
  getholderaverageData: any;
  avg1: any;
  avg2: any;
  avg3: any;
  fdc:boolean=false;
  nbd:boolean=false;
  nfd:boolean=false;
  sfc:boolean=false;
  ncdc:boolean=false;
  chartAll:boolean=true;
  chartAvg:boolean=false;
  holder4: any;
  holder5: any;
  avg4: any;
  avg5: any;
  constructor(private service: RootAdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.getshareHolder()
    this.getholderbyIa();
    this.shareholderForm.patchValue({
      year:'CUMULATIVE'
    })
    this.shareholderForm.patchValue({
      iaName:"ALL"
    })
    this.shareholderForm.patchValue({
      byvalue:"TOTAL"
    })
    this.getholderbyyear()

  }

  shareholderForm = new FormGroup({
    year: new FormControl('', [Validators.required]),
    iaName: new FormControl('', [Validators.required]),
    byvalue: new FormControl('', [Validators.required])
  })

  getshareHolder() {
    this.service.getshareHolder().subscribe(result => {
      this.getshareHolderData = result;
      this.shareHolder = true;
    })
  }
  

  getholderbyyear() {
    this.service.getshareHolderyearwise(this.shareholderForm.value.year).subscribe(result => {
      this.getshareHolderyearwiseData = result;
      if (this.shareholderForm.value.year == 'CUMULATIVE') {
        this.shareHolder = true;
      } else {
        this.shareHolder = false;
      }
    })
  }

  getholderbyIa(){
    this.service.getholderagencywise().subscribe(result=>{
      this.getholderagencywiseData = result;
      this.holder1 = result[0]?.total
      this.holder2 = result[1]?.total
      this.holder3 = result[2]?.total
      this.holder4 = result[3]?.total
      this.holder5 = result[4]?.total

      this. chartshareholderData(this.getholderagencywiseData)
    })
  }

  getholderaverage(){
    this.service.getholderaverage().subscribe(result=>{
      this.getholderaverageData = result;
      this.avg1 = result[0]?.total
      this.avg2 = result[1]?.total
      this.avg3 = result[2]?.total
      this.avg4 = result[3]?.total
      this.avg5 = result[4]?.total

      this.chartshareholderData(this.getholderaverageData)
    })
  }

  chartshareholderData(F:any) {
    if(this.shareholderForm.value.iaName == 'FDRVC'){
      this.fdc=true;
      this.nbd=false;
      this.ncdc=false;
      this.nfd=false;
      this.sfc=false;
      this.chartAll=false;
      this.chartAvg=false;
      this.N = new Chart("canvasDoughnut6", {
        type: 'bar',
        data: {
          labels: ['FDRVC'],
          datasets: [{
            label: "No. Of Shareholder Mobilized",
            data: [this.holder1],
            backgroundColor: ["#00bfff"],
            hoverBackgroundColor: ["#00bfff"],
            barThickness: 60
          }],
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
        }
      });
    }
    else if(this.shareholderForm.value.iaName == 'NABARD'){
      this.fdc=false;
      this.nbd=true;
      this.ncdc=false;
      this.nfd=false;
      this.sfc=false;
      this.chartAll=false;
      this.chartAvg=false;
      this.N = new Chart("canvasDoughnut7", {
        type: 'bar',
        data: {
          labels: ['NABARD'],
          datasets: [{
            label: "No. Of Shareholder Mobilized",
            data: [this.holder2],
            backgroundColor: ["#00bfff"],
            hoverBackgroundColor: ["#00bfff"],
            barThickness: 60
          }],
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
        }
      });
    } else if(this.shareholderForm.value.iaName == 'NAFED'){
      this.fdc=false;
      this.nbd=false;
      this.nfd=true;
      this.sfc=false;
      this.ncdc=false;
      this.chartAll=false;
      this.chartAvg=false;
      this.N = new Chart("canvasDoughnut8", {
        type: 'bar',
        data: {
          labels: ['NAFED'],
          datasets: [{
            label: "No. Of Shareholder Mobilized",
            data: [this.holder3],
            backgroundColor: ["#00bfff"],
            hoverBackgroundColor: ["#00bfff"],
            barThickness: 60
          }],
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
        }
      });
    }
    else if(this.shareholderForm.value.iaName == 'NCDC'){
      this.fdc=false;
      this.nbd=false;
      this.ncdc=true;
      this.nfd=false;
      this.sfc=false;
      this.chartAll=false;
      this.chartAvg=false;
      this.N = new Chart("canvasDoughnut9", {
        type: 'bar',
        data: {
          labels: ['NCDC'],
          datasets: [{
            label: "No. Of Shareholder Mobilized",
            data: [this.holder4],
            backgroundColor: ["#00bfff"],
            hoverBackgroundColor: ["#00bfff"],
            barThickness: 60
          }],
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
        }
      });
    } else if(this.shareholderForm.value.iaName == 'SFAC'){
      this.fdc=false;
      this.nbd=false;
      this.ncdc=false;
      this.nfd=false;
      this.sfc=true;
      this.chartAll=false;
      this.chartAvg=false;
      this.N = new Chart("canvasDoughnut10", {
        type: 'bar',
        data: {
          labels: ['SFAC'],
          datasets: [{
            label: "No. Of Shareholder Mobilized",
            data: [this.holder5],
            backgroundColor: ["#00bfff"],
            hoverBackgroundColor: ["#00bfff"],
            barThickness: 60
          }],
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
        }
      });
    }
    else if(this.shareholderForm.value.byvalue == 'AVERAGE'){
      this.fdc=false;
      this.nbd=false;
      this.ncdc=false;
      this.nfd=false;
      this.sfc=false;
      this.chartAll=false;
      this.chartAvg=true;
      this.N = new Chart("canvasDoughnut12", {
        type: 'bar',
        data: {
          labels: ['FDRVC', 'NABARD','NAFED','NCDC','SFAC'],
          datasets: [{
            label: "No. Of Shareholder Mobilized",
            data: [this.avg1, this.avg2,this.avg3,this.avg4,this.avg5],
            backgroundColor: ["#00bfff", "#00bfff", "#00bfff","#00bfff","#00bfff"],
            // hoverBackgroundColor: ["#00bfff", "#00bfff", "#00bfff"],
            barThickness: 60
          }],
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
        }
      });
    }else{
      this.fdc=false;
      this.nbd=false;
      this.ncdc=false;
      this.nfd=false;
      this.sfc=false;
      this.chartAll=true;
      this.chartAvg=false;
      this.N = new Chart("canvasDoughnut11", {
        type: 'bar',
        data: {
          labels: ['FDRVC', 'NABARD','NAFED','NCDC','SFAC'],
          datasets: [{
            label: "No. Of Shareholder Mobilized",
            data: [this.holder1, this.holder2, this.holder3,this.holder4,this.holder5],
            backgroundColor: ["#00bfff", "#00bfff", "#00bfff","#00bfff","#00bfff"],
            // hoverBackgroundColor: ["#00bfff", "#00bfff", "#00bfff"],
            barThickness: 60
          }],
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
        }
      });
    }
    
  }

}

