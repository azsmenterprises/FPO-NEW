import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { RootAdminService } from '../../../root-admin.service';

@Component({
  selector: 'app-targetvsachievment',
  templateUrl: './targetvsachievment.component.html',
  styleUrls: ['./targetvsachievment.component.css']
})
export class TargetvsachievmentComponent implements OnInit {
  k: any;
  l:any;
  getbarchartDetailsData: any;
  targets: any;
  achievements: any;
  gettargetDetailsData: any;
  year1:boolean=false;
  year2:boolean=false;
  year3:boolean=false;
  fdc:boolean=false;
  nfd:boolean=false;
  sfc:boolean=false;
  nbd:boolean=false;
  ncdc:boolean=false;
  chartAll:boolean=true;
  constructor(private service: RootAdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dashboardForm.value.year="2022-2023";
    this.dashboardForm.value.iaName="ALL";
    this.chartbarData();
    this.getbarchartDetails();
  
    // this.gettargetDetails()
    this.chartData()
    this.dashboardForm.patchValue({
      year:"2022-2023"
    })
    this.dashboardForm.patchValue({
      iaName:"ALL"
    })

  }
  dashboardForm = new FormGroup({
    year: new FormControl('', [Validators.required]),
    iaName: new FormControl('',[Validators.required]),
  })
 

  getbarchartDetails(){
      this.service.getbarchartDetails(this.dashboardForm.value.year).subscribe(result=>{
        this.getbarchartDetailsData=result;
        this.targets = result[0]?.targets;
        this.achievements = result[0]?.achievements;
        this.chartData();
        this.chartbarData()
      })
  }

  getyeardata(){
    this.getbarchartDetails();
  }

  getiadata(){
    // this.gettargetDetails();
   
  }

  chartData() {
    if(this.dashboardForm.value.year == "2020-2021"){
      this.year1=true;
      this.year2=false;
      this.year3=false;
      this.k = new Chart("canvasDoughnut3", {
        type: 'horizontalBar',
        data: {
          labels: ['Total'],
          datasets: [{
            label: "Target",
            data: [this.targets],
            backgroundColor: ["#00ffbf"],
            hoverBackgroundColor: ["#00ffbf"],
            barThickness:50
          }, {
            label: "Achievement",
            data: [this.achievements],
            backgroundColor: ["#00bfff"],
            hoverBackgroundColor: ["#00bfff"],
            barThickness:50
          }
          ],
        },
        options: {
          // indexAxis: 'y',
          scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        }
      });
    }else if(this.dashboardForm.value.year == "2021-2022"){
      this.year1=false;
      this.year2=true;
      this.year3=false;
      this.k = new Chart("canvasDoughnut4", {
        type: 'horizontalBar',
        data: {
          labels: ['Total'],
          datasets: [{
            label: "Target",
            data: [this.targets],
            backgroundColor: ["#00ffbf"],
            hoverBackgroundColor: ["#00ffbf"],
            barThickness:50
          }, {
            label: "Achievement",
            data: [this.achievements],
            backgroundColor: ["#00bfff"],
            hoverBackgroundColor: ["#00bfff"],
            barThickness:50
          }
          ],
        },
        options: {
          // indexAxis: 'y',
          scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        }
      });
    }else{
      this.year1=false;
      this.year2=false;
      this.year3=true;
      this.k = new Chart("canvasDoughnut5", {
        type: 'horizontalBar',
        data: {
          labels: ['Total'],
          datasets: [{
            label: "Target",
            data: [this.targets],
            backgroundColor: ["#00ffbf"],
            hoverBackgroundColor: ["#00ffbf"],
            barThickness:50
          }, {
            label: "Achievement",
            data: [this.achievements],
            backgroundColor: ["#00bfff"],
            hoverBackgroundColor: ["#00bfff"],
            barThickness:50
          }
          ],
        },
        options: {
          // indexAxis: 'y',
          scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        }
      });
    }
    
  }

  chartbarData() {
    if (this.dashboardForm.value.iaName=="FDRVC") {
      this.fdc=true;
      this.nbd=false;
      this.ncdc=false;
      this.nfd=false;
      this.sfc=false;
      this.chartAll=false;
      this.l = new Chart("canvasDoughnut6", {
        type: 'bar',
       
        data: {
          labels: ['FDRVC'],
          datasets: [{
            label: "Target",
            data: [50],
            backgroundColor: ["#a5edd5"],
            hoverBackgroundColor: ["#a5edd5"],
            barThickness:60
          }, {
            label: "Achievement",
            data: [25],
            backgroundColor: ["#4e73df"],
            hoverBackgroundColor: ["#4e73df"],
            barThickness:60
          }
          ],
        },
        options: {
          // indexAxis: 'y',
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
    else if (this.dashboardForm.value.iaName=="NABARD") {
      this.fdc=false;
      this.nbd=true;
      this.ncdc=false;
      this.nfd=false;
      this.sfc=false;
      this.chartAll=false;
      this.l = new Chart("canvasDoughnut7", {
        type: 'bar',
       
        data: {
          labels: ['NABARD'],
          datasets: [{
            label: "Target",
            data: [131],
            backgroundColor: ["#a5edd5"],
            hoverBackgroundColor: ["#a5edd5"],
            barThickness:60
          }, {
            label: "Achievement",
            data: [107],
            backgroundColor: ["#4e73df"],
            hoverBackgroundColor: ["#4e73df"],
            barThickness:60
          }
          ],
        },
        options: {
          // indexAxis: 'y',
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
    else if (this.dashboardForm.value.iaName=="NAFED") {
      this.fdc=false;
      this.nbd=false;
      this.ncdc=false;
      this.nfd=true;
      this.sfc=false;
      this.chartAll=false;
      this.l = new Chart("canvasDoughnut8", {
        type: 'bar',
       
        data: {
          labels: ['NAFED'],
          datasets: [{
            label: "Target",
            data: [70],
            backgroundColor: ["#a5edd5"],
            hoverBackgroundColor: ["#a5edd5"],
            barThickness:60
          }, {
            label: "Achievement",
            data: [61],
            backgroundColor: ["#4e73df"],
            hoverBackgroundColor: ["#4e73df"],
            barThickness:60
          }
          ],
        },
        options: {
          // indexAxis: 'y',
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
    else if (this.dashboardForm.value.iaName=="NCDC") {
      this.fdc=false;
      this.nbd=false;
      this.ncdc=true;
      this.nfd=false;
      this.sfc=false;
      this.chartAll=false;
      this.l = new Chart("canvasDoughnut9", {
        type: 'bar',
       
        data: {
          labels: ['NCDC'],
          datasets: [{
            label: "Target",
            data: [20],
            backgroundColor: ["#a5edd5"],
            hoverBackgroundColor: ["#a5edd5"],
            barThickness:60
          }, {
            label: "Achievement",
            data: [14],
            backgroundColor: ["#4e73df"],
            hoverBackgroundColor: ["#4e73df"],
            barThickness:60
          }
          ],
        },
        options: {
          // indexAxis: 'y',
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
    else if (this.dashboardForm.value.iaName=="SFAC") {
      this.fdc=false;
      this.nbd=false;
      this.ncdc=false;
      this.nfd=false;
      this.sfc=true;
      this.chartAll=false;
      this.l = new Chart("canvasDoughnut10", {
        type: 'bar',
       
        data: {
          labels: ['SFAC'],
          datasets: [{
            label: "Target",
            data: [154],
            backgroundColor: ["#a5edd5"],
            hoverBackgroundColor: ["#a5edd5"],
            barThickness:60
          }, {
            label: "Achievement",
            data: [96],
            backgroundColor: ["#4e73df"],
            hoverBackgroundColor: ["#4e73df"],
            barThickness:60
          }
          ],
        },
        options: {
          // indexAxis: 'y',
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
    else {
      this.fdc=false;
      this.nbd=false;
      this.ncdc=false;
      this.nfd=false;
      this.sfc=false;
      this.chartAll=true;
      this.l = new Chart("canvasDoughnut11", {
        type: 'bar',
       
        data: {
          labels: ['FDRVC','NABARD','NAFED','NCDC','SFAC'],
          datasets: [{
            label: "Target",
            data: [50,131,70,20,154],
            backgroundColor: ["#a5edd5","#a5edd5","#a5edd5","#a5edd5","#a5edd5"],
            // hoverBackgroundColor: ["#a5edd5","#a5edd5","#a5edd5"],
            barThickness:30
          }, {
            label: "Achievement",
            data: [25,107,61,14,96],
            backgroundColor: ["#4e73df","#4e73df","#4e73df","#4e73df","#4e73df"],
            // hoverBackgroundColor: ["#4e73df","#4e73df","#4e73df"],
            barThickness:30
          }
          ],
        },
        options: {
          // indexAxis: 'y',
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
