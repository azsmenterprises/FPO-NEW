import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { RootAdminService } from '../../../root-admin.service';

@Component({
  selector: 'app-sharecapital',
  templateUrl: './sharecapital.component.html',
  styleUrls: ['./sharecapital.component.css']
})
export class SharecapitalComponent implements OnInit {
  O: any;
  getshareCapitalData: any;
  getshareCapitalyearwiseData: any;
  getcapitalagencywiseData: any;
  capital1: any;
  capital2: any;
  capital3: any;
  capital4: any;
  capital5: any;
  shareCapital: boolean = true;
  getcapitalaverageData: any;
  avg1: any;
  avg2: any;
  avg3: any;
  fdc: boolean = false;
  nbd: boolean = false;
  nfd: boolean = false;
  sfc: boolean = false;
  ncdc: boolean = false;
  chartAll: boolean = true;
  chartAvg: boolean = false;
  avg4: any;
  avg5: any;
  constructor(private service: RootAdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.getshareCapital();


    this.getsharebyIa();
    this.sharecapitalForm.patchValue({
      year: "CUMULATIVE"
    })
    this.sharecapitalForm.patchValue({
      iaName: "ALL"
    })
    this.sharecapitalForm.patchValue({
      byvalue: "TOTAL"
    })

    this.getsharebyYear();

  }

  sharecapitalForm = new FormGroup({
    year: new FormControl('', [Validators.required]),
    iaName: new FormControl('', [Validators.required]),
    byvalue: new FormControl('', [Validators.required])
  })

  getshareCapital() {
    this.service.getshareCapital().subscribe(result => {
      this.getshareCapitalData = result;
      this.shareCapital = true;
    })
  }

  getsharebyYear() {
    this.service.getshareCapitalyearwise(this.sharecapitalForm.value.year).subscribe(result => {
      this.getshareCapitalyearwiseData = result;
      if (this.sharecapitalForm.value.year == 'CUMULATIVE') {
        this.shareCapital = true;
      } else {
        this.shareCapital = false;
      }
    })

  }

  getsharebyIa() {
    this.service.getcapitalagencywise().subscribe(result => {
      this.getcapitalagencywiseData = result;
      this.capital1 = result[0]?.total
      this.capital2 = result[1]?.total
      this.capital3 = result[2]?.total
      this.capital4 = result[3]?.total
      this.capital5 = result[4]?.total
      if (this.getcapitalagencywiseData) {
        this.chartsharecapitalData(this.getcapitalagencywiseData)
      }
      console.log(result[0]?.total);
      
    })
  }

  getcapitalaverage() {
    this.service.getcapitalaverage().subscribe(result => {
      this.getcapitalaverageData = result;
      this.avg1 = result[0]?.total
      this.avg2 = result[1]?.total
      this.avg3 = result[2]?.total
      this.avg4 = result[3]?.total
      this.avg5 = result[4]?.total

      this.chartsharecapitalData(this.getcapitalaverageData)
    })
  }

  chartsharecapitalData(C: any) {
    if (this.sharecapitalForm.value.iaName == 'FDRVC') {
      this.fdc = true;
      this.nbd = false;
      this.ncdc = false;
      this.chartAll = false;
      this.chartAvg = false;
      this.nfd = false;
      this.sfc = false;
      this.O = new Chart("canvasDoughnut6", {
        type: 'bar',
        data: {
          labels: ['FDRVC'],
          datasets: [{
            label: "Total amount of sharecapital mobilized(INR)",
            data: [this.capital1],
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
    } else if (this.sharecapitalForm.value.iaName == 'NABARD') {
      this.fdc = false;
      this.nbd = true;
      this.ncdc = false;
      this.chartAll = false;
      this.chartAvg = false;
      this.nfd = false;
      this.sfc = false;
      this.O = new Chart("canvasDoughnut7", {
        type: 'bar',
        data: {
          labels: ['NABARD'],
          datasets: [{
            label: "Total amount of sharecapital mobilized(INR)",
            data: [this.capital2],
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
    } else if (this.sharecapitalForm.value.iaName == 'NAFED') {
      this.fdc = false;
      this.nbd = false;
      this.ncdc = false;
      this.chartAll = false;
      this.chartAvg = false;
      this.nfd = true;
      this.sfc = false;
      this.O = new Chart("canvasDoughnut8", {
        type: 'bar',
        data: {
          labels: ['NAFED'],
          datasets: [{
            label: "Total amount of sharecapital mobilized(INR)",
            data: [this.capital3],
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
    else if (this.sharecapitalForm.value.iaName == 'NCDC') {
      this.fdc = false;
      this.nbd = false;
      this.ncdc = true;
      this.chartAll = false;
      this.chartAvg = false;
      this.nfd = false;
      this.sfc = false;
      this.O = new Chart("canvasDoughnut9", {
        type: 'bar',
        data: {
          labels: ['NCDC'],
          datasets: [{
            label: "Total amount of sharecapital mobilized(INR)",
            data: [this.capital4],
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
    else if (this.sharecapitalForm.value.iaName == 'SFAC') {
      this.fdc = false;
      this.nbd = false;
      this.ncdc = false;
      this.chartAll = false;
      this.chartAvg = false;
      this.nfd = false;
      this.sfc = true;
      this.O = new Chart("canvasDoughnut10", {
        type: 'bar',
        data: {
          labels: ['SFAC'],
          datasets: [{
            label: "Total amount of sharecapital mobilized(INR)",
            data: [this.capital5],
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
    else if (this.sharecapitalForm.value.byvalue == 'AVERAGE') {
      this.fdc = false;
      this.nbd = false;
      this.ncdc = false;
      this.chartAll = false;
      this.chartAvg = true;
      this.nfd = false;
      this.sfc = false;
      this.O = new Chart("canvasDoughnut12", {
        type: 'bar',
        data: {
          labels: ['FDRVC', 'NABARD', 'NAFED', 'NCDC', 'SFAC'],
          datasets: [{
            label: "Total amount of sharecapital mobilized(INR)",
            data: [this.avg1, this.avg2, this.avg3, this.avg4, this.avg5],
            backgroundColor: ["#00bfff", "#00bfff", "#00bfff", "#00bfff", "#00bfff"],
            // hoverBackgroundColor: ["#00bfff","#00bfff","#00bfff"],
            barThickness: 60
          }],
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
      this.fdc = false;
      this.nbd = false;
      this.ncdc = false;
      this.chartAll = true;
      this.chartAvg = false;
      this.nfd = false;
      this.sfc = false;

      this.O = new Chart("canvasDoughnut11", {
        type: 'bar',
        data: {
          labels: ['FDRVC', 'NABARD', 'NAFED', 'NCDC', 'SFAC'],
          datasets: [{
            label: "Total amount of sharecapital mobilized(INR)",
            data: [this.capital1, this.capital2, this.capital3, this.capital4, this.capital5],
            backgroundColor: ["#00bfff", "#00bfff", "#00bfff", "#00bfff", "#00bfff"],
            // hoverBackgroundColor: ["#00bfff","#00bfff","#00bfff"],
            barThickness: 60
          }],
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
