import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { RootAdminService } from '../../../root-admin.service';

@Component({
  selector: 'app-womeninboard',
  templateUrl: './womeninboard.component.html',
  styleUrls: ['./womeninboard.component.css']
})
export class WomeninboardComponent implements OnInit {
  R: any;
  S: any;
  getwomenBodData: any;
  male: any;
  female: any;
  total: any;
  totalmale: any;
  totalfemale: any;
  getwomenBodyearwiseData: any;
  totalmaleyear: any;
  totalfemaleyear: any;
  getwomenBodagencywiseData:any;
  male1: any;
  female1: any;
  total1: any;
  totalmaleyear1: any;
  totalfemaleyear1: any;
  male2: any;
  female2: any;
  total2: any;
  totalmaleyear2: any;
  totalfemaleyear2: any;
  male3: any;
  female3: any;
  total3: any;
  totalmaleyear3: any;
  totalfemaleyear3: any;
  fdc:boolean=false;
  nfd:boolean=false;
  sfc:boolean=false;
  nbd:boolean=false;
  ncdc:boolean=false;
  chartAll:boolean=true;
  year1:boolean=false;
  year2:boolean=false;
  year3:boolean=false;
  male4: any;
  female4: any;
  total4: any;
  totalmaleyear4: any;
  totalfemaleyear4: any;
  male5: any;
  female5: any;
  total5: any;
  totalmaleyear5: any;
  totalfemaleyear5: any;
  constructor(private service: RootAdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getwomenBod()
    this.chartbodData(this.getwomenBodagencywiseData)
    this.getwomenBodagencywise()
    this.bodForm.patchValue({
      year:"CUMULATIVE"
    })
    this.bodForm.patchValue({
      iaName:"ALL"
    })
  }

  bodForm = new FormGroup({
    year: new FormControl('', [Validators.required]),
    iaName: new FormControl('',[Validators.required]),
    byvalue: new FormControl('',[Validators.required])
  })

  getwomenBod() {
    this.service.getwomenBod().subscribe(result => {
      this.getwomenBodData = result;
      this.male = result[0].male
      this.female = result[0].female,
      this.total = result[0].total
      this.totalmale = ((this.male / this.total) * 100).toFixed()
      this.totalfemale = ((this.female / this.total) * 100).toFixed()
      this.chartData(this.getwomenBodData);
    })
  }

  getBod(){
    this.getwomenBodyearwise();
  }

  agencywise(){
    this.getwomenBodagencywise();
  }

  getwomenBodyearwise(){
    this.service.getwomenBodyearwise(this.bodForm.value.year).subscribe(result=>{
      this.getwomenBodyearwiseData = result;
      this.male = result[0]?.male
      this.female = result[0]?.female,
      this.total = result[0]?.total
      this.totalmaleyear = ((this.male / this.total) * 100).toFixed()
      this.totalfemaleyear = ((this.female / this.total) * 100).toFixed()
      this.chartData(this.getwomenBodyearwiseData );
    })
  }

  chartData(a:any) {
    if(this.bodForm.value.year == "2020-2021"){
      this.year1=true;
      this.year2=false;
      this.year3=false;
      this.R = new Chart("canvasDoughnut3", {
        type: 'pie',
        data: {
          labels: ['FPO with minimun 1 women bod in %', 'FPO with out women bod in %'],
          datasets: [{
            data: [this.totalfemaleyear,this.totalmaleyear],
            backgroundColor: ["#a5edd5", "#4e73df"],
            hoverBackgroundColor: ["#a5edd5", "#4e73df"]
          }],
        }
      });
    }else if(this.bodForm.value.year == "2021-2022"){
      this.year1=false;
      this.year2=true;
      this.year3=false;
      this.R = new Chart("canvasDoughnut4", {
        type: 'pie',
        data: {
          labels: ['FPO with minimun 1 women bod in %', 'FPO with out women bod in %'],
          datasets: [{
            data: [this.totalfemaleyear,this.totalmaleyear],
            backgroundColor: ["#a5edd5", "#4e73df"],
            hoverBackgroundColor: ["#a5edd5", "#4e73df"]
          }],
        }
      });
    }else{
      this.year1=false;
      this.year2=false;
      this.year3=true;
      this.R = new Chart("canvasDoughnut5", {
        type: 'pie',
        data: {
          labels: ['FPO with minimun 1 women bod in %', 'FPO with out women bod in %'],
          datasets: [{
            data: [this.totalfemale,this.totalmale],
            backgroundColor: ["#a5edd5", "#4e73df"],
            hoverBackgroundColor: ["#a5edd5", "#4e73df"]
          }],
        }
      });
    }
    
  }


  getwomenBodagencywise(){
    this.service.getwomenBodagencywise().subscribe(result=>{
      this.getwomenBodagencywiseData=result;
      this.male1 = result[0]?.male
      this.female1 = result[0]?.female,
      this.total1= result[0]?.total
      this.totalmaleyear1 = ((this.male1 / this.total1) * 100).toFixed()
      this.totalfemaleyear1 = ((this.female1 / this.total1) * 100).toFixed()
      this.male2 = result[1]?.male
      this.female2 = result[1]?.female,
      this.total2 = result[1]?.total
      this.totalmaleyear2 = ((this.male2 / this.total2) * 100).toFixed()
      this.totalfemaleyear2 = ((this.female2 / this.total2) * 100).toFixed()
      this.male3 = result[2]?.male
      this.female3 = result[2]?.female,
      this.total3 = result[2]?.total
      this.totalmaleyear3 = ((this.male3 / this.total3) * 100).toFixed()
      this.totalfemaleyear3 = ((this.female3 / this.total3) * 100).toFixed()
      this.male4 = result[3]?.male
      this.female4 = result[3]?.female,
      this.total4 = result[3]?.total
      this.totalmaleyear4 = ((this.male4 / this.total4) * 100).toFixed()
      this.totalfemaleyear4 = ((this.female4 / this.total4) * 100).toFixed()
      this.male5 = result[4]?.male
      this.female5 = result[4]?.female,
      this.total5 = result[4]?.total
      this.totalmaleyear5 = ((this.male5 / this.total5) * 100).toFixed()
      this.totalfemaleyear5 = ((this.female5 / this.total5) * 100).toFixed()
      this.chartbodData(this.getwomenBodagencywiseData)
    })
  }



  chartbodData(a:any){
    if(this.bodForm.value.iaName == "FDRVC"){
      this.fdc=true;
      this.nbd=false;
      this.ncdc=false;
      this.nfd=false;
      this.sfc=false;
      this.chartAll=false;
      this.S = new Chart("canvasDoughnut6", {
        type: 'bar',
        data: {
          labels: ['FDRVC'],
          datasets: [{
            label: "FPO with minimun 1 women bod in %",
            data: [this.totalfemaleyear1],
            backgroundColor: ["#00bfff"],
            hoverBackgroundColor: ["#00bfff"],
            barThickness:40
          }, {
            label: "FPO with out women bod in %",
            data: [this.totalmaleyear1],
            backgroundColor: ["#4e73df"],
            hoverBackgroundColor: ["#4e73df"],
            barThickness:40
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
    else if(this.bodForm.value.iaName == "NABARD"){
      this.fdc=false;
      this.nbd=true;
      this.ncdc=false;
      this.nfd=false;
      this.sfc=false;
      this.chartAll=false;
      this.S = new Chart("canvasDoughnut7", {
        type: 'bar',
        data: {
          labels: ['NABARD'],
          datasets: [{
            label: "FPO with minimun 1 women bod in %",
            data: [this.totalfemaleyear2],
            backgroundColor: ["#00bfff"],
            hoverBackgroundColor: ["#00bfff"],
            barThickness:40
          }, {
            label: "FPO with out women bod in %",
            data: [this.totalmaleyear2],
            backgroundColor: ["#4e73df"],
            hoverBackgroundColor: ["#4e73df"],
            barThickness:40
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
    }else if(this.bodForm.value.iaName == "NAFED"){
      this.fdc=false;
      this.nbd=false;
      this.ncdc=false;
      this.nfd=true;
      this.sfc=false;
      this.chartAll=false;
      this.S = new Chart("canvasDoughnut8", {
        type: 'bar',
        data: {
          labels: ['NAFED'],
          datasets: [{
            label: "FPO with minimun 1 women bod in %",
            data: [this.totalfemaleyear3],
            backgroundColor: ["#00bfff"],
            hoverBackgroundColor: ["#00bfff"],
            barThickness:40
          }, {
            label: "FPO with out women bod in %",
            data: [this.totalmaleyear3],
            backgroundColor: ["#4e73df"],
            hoverBackgroundColor: ["#4e73df"],
            barThickness:40
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
    else if(this.bodForm.value.iaName == "NCDC"){
      this.fdc=false;
      this.nbd=false;
      this.ncdc=true;
      this.nfd=false;
      this.sfc=false;
      this.chartAll=false;
      this.S = new Chart("canvasDoughnut9", {
        type: 'bar',
        data: {
          labels: ['NCDC'],
          datasets: [{
            label: "FPO with minimun 1 women bod in %",
            data: [this.totalfemaleyear4],
            backgroundColor: ["#00bfff"],
            hoverBackgroundColor: ["#00bfff"],
            barThickness:40
          }, {
            label: "FPO with out women bod in %",
            data: [this.totalmaleyear4],
            backgroundColor: ["#4e73df"],
            hoverBackgroundColor: ["#4e73df"],
            barThickness:40
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
    } else if(this.bodForm.value.iaName == "SFAC"){
      this.fdc=false;
      this.nbd=false;
      this.ncdc=false;
      this.nfd=false;
      this.sfc=true;
      this.chartAll=false;
      this.S = new Chart("canvasDoughnut10", {
        type: 'bar',
        data: {
          labels: ['SFAC'],
          datasets: [{
            label: "FPO with minimun 1 women bod in %",
            data: [this.totalfemaleyear5],
            backgroundColor: ["#00bfff"],
            hoverBackgroundColor: ["#00bfff"],
            barThickness:40
          }, {
            label: "FPO with out women bod in %",
            data: [this.totalmaleyear5],
            backgroundColor: ["#4e73df"],
            hoverBackgroundColor: ["#4e73df"],
            barThickness:40
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
    else{
      this.fdc=false;
      this.nbd=false;
      this.ncdc=false;
      this.nfd=false;
      this.sfc=false;
      this.chartAll=true;
      this.S = new Chart("canvasDoughnut11", {
      type: 'bar',
      data: {
        labels: ['FDRVC','NABARD','NAFED','NCDC','SFAC'],
        datasets: [{
          label: "FPO with minimun 1 women bod in %",
          data: [this.totalfemaleyear1,this.totalfemaleyear2,this.totalfemaleyear3,this.totalfemaleyear4,this.totalfemaleyear5],
          backgroundColor: ["#00bfff","#00bfff","#00bfff","#00bfff","#00bfff"],
          // hoverBackgroundColor: ["#00bfff","#00bfff","#00bfff"],
          barThickness:40
        }, {
          label: "FPO with out women bod in %",
          data: [this.totalmaleyear1,this.totalmaleyear2,this.totalmaleyear3,this.totalmaleyear4,this.totalmaleyear5],
          backgroundColor: ["#4e73df","#4e73df","#4e73df","#4e73df","#4e73df"],
          // hoverBackgroundColor: ["#4e73df","#4e73df","#4e73df"],
          barThickness:40
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
