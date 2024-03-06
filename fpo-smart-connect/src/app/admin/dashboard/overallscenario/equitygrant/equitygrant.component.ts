import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { RootAdminService } from '../../../root-admin.service';

@Component({
  selector: 'app-equitygrant',
  templateUrl: './equitygrant.component.html',
  styleUrls: ['./equitygrant.component.css']
})
export class EquitygrantComponent implements OnInit {
  mychart: any;
  equitychart: any;
  getequityGrantData: any;
  pendingequity: any;
  availedequity: any;
  all: any;
  allpendingequity: any;
  allavailedequity: any;
  getequityGrantyearwiseData: any;
  pendinggrant: any;
  availedgrant: any;
  allgrant: any;
  allpendinggrant: any;
  allavailedgrant: any;
  getequitygrantagencywiseData: any;
  pendingequity1: any;
  availedequity1: any;
  allequity1: any;
  allpendingequity1: any;
  pendingequity2: any;
  availedequity2: any;
  allequity2: any;
  allpendingequity2: any;
  pendingequity3: any;
  availedequity3: any;
  allequity3: any;
  allpendingequity3: any;
  allavailedequity1: any;
  allavailedequity2: any;
  allavailedequity3: any;
  // fdc: boolean = false;
  // nfd: boolean = false;
  // sfc: boolean = false;
  // nbd: boolean = false;
  // ncdc: boolean = false;
  // chartAll: boolean = true;
  // year1: boolean = false;
  // year2: boolean = false;
  // year3: boolean = false;
  pendingequity4: any;
  availedequity4: any;
  allequity4: any;
  allpendingequity4: any;
  allavailedequity4: any;
  pendingequity5: any;
  availedequity5: any;
  allpendingequity5: any;
  allequity5: any;
  allavailedequity5: any;
  constructor(private service: RootAdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.chartData()
    this.chartequityData()
    this.equityForm.patchValue({
      year: "2022-2023"
    })
    this.equityForm.patchValue({
      iaName: "ALL"
    })
    // this.getequityGrant()
    this.getequityGrantyearwise()
    this.getequitygrantagencywise()
  }
  equityForm = new FormGroup({
    year: new FormControl('', [Validators.required]),
    iaName: new FormControl('', [Validators.required]),
    byvalue: new FormControl('', [Validators.required])
  })

  // getequityGrant() {
  //   this.service.getequityGrant().subscribe(result => {
  //     this.getequityGrantData = result;
  //     console.log(result,"resultgrant");

  //     this.pendingequity = result[0]?.EquityGrantPending
  //     this.availedequity = result[0]?.EquityGrantAvailed
  //     this.all = result[0]?.total
  //     this.allpendingequity = ((this.pendingequity / this.all) * 100).toFixed()
  //     this.allavailedequity = ((this.availedequity / this.all) * 100).toFixed()
  //     this.mychart.destroy();
  //     this.chartData()
  //   })
  // }

  getequityData() {
    this.getequityGrantyearwise();
    this.getequitygrantagencywise();
  }

  getequityGrantyearwise() {
    this.service.getequityGrantyearwise(this.equityForm.value.year, this.equityForm.value.iaName).subscribe(result => {
      this.getequityGrantyearwiseData = result;
      console.log(result, "resultyear");

      this.pendinggrant = result[0]?.EquityGrantPending
      this.availedgrant = result[0]?.EquityGrantAvailed
      this.allgrant = result[0]?.total
      this.allpendinggrant = ((this.pendinggrant / this.allgrant) * 100).toFixed()
      this.allavailedgrant = ((this.availedgrant / this.allgrant) * 100).toFixed()
      this.mychart.destroy();
      this.chartData();
    })
  }

  
  getequitygrantagencywise() {
    this.service.getequitygrantagencywise(this.equityForm.value.year, this.equityForm.value.iaName).subscribe(result => {
      this.getequitygrantagencywiseData = result;
      console.log(result, "resultagncy");

      if (result.length > 0) {
        this.allpendingequity1 = 0;
        this.allpendingequity2 = 0;
        this.allpendingequity3 = 0;
        this.allpendingequity4 = 0;
        this.allpendingequity5 = 0;
        this.allavailedequity1 = 0;
        this.allavailedequity2 = 0;
        this.allavailedequity3 = 0;
        this.allavailedequity4 = 0;
        this.allavailedequity5 = 0;
        if (this.equityForm.value.iaName != 'ALL') {
          if (result[0].iaName == "FDRVC") {
            this.pendingequity1 = result[0]?.pending
            this.availedequity1 = result[0]?.availed
            this.allequity1 = result[0]?.total
            this.allpendingequity1 = ((this.pendingequity1 / this.allequity1) * 100).toFixed()
            this.allavailedequity1 = ((this.availedequity1 / this.allequity1) * 100).toFixed()
          }
          if (result[0].iaName == "NABARD") {
            this.pendingequity2 = result[0]?.pending
            this.availedequity2 = result[0]?.availed
            this.allequity2 = result[0]?.total
            this.allpendingequity2 = ((this.pendingequity2 / this.allequity2) * 100).toFixed()
            this.allavailedequity2 = ((this.availedequity2 / this.allequity2) * 100).toFixed()
          }
          if (result[0].iaName == "NAFED") {
            this.pendingequity3 = result[0]?.pending
            this.availedequity3 = result[0]?.availed
            this.allequity3 = result[0]?.total
            this.allpendingequity3 = ((this.pendingequity3 / this.allequity3) * 100).toFixed()
            this.allavailedequity3 = ((this.availedequity3 / this.allequity3) * 100).toFixed()
          }
          if (result[0].iaName == "NCDC") {
            this.pendingequity4 = result[0]?.pending
            this.availedequity4 = result[0]?.availed
            this.allequity4 = result[0]?.total
            this.allpendingequity4 = ((this.pendingequity4 / this.allequity4) * 100).toFixed()
            this.allavailedequity4 = ((this.availedequity4 / this.allequity4) * 100).toFixed()
          }
          if (result[0].iaName == "SFAC") {
            this.pendingequity5 = result[0]?.pending
            this.availedequity5 = result[0]?.availed
            this.allequity5 = result[0]?.total
            this.allpendingequity5 = ((this.pendingequity5 / this.allequity5) * 100).toFixed()
            this.allavailedequity5 = ((this.availedequity5 / this.allequity5) * 100).toFixed()
          }
          this.equitychart.destroy();
          this.chartequityData()
        } else {
          for (let i = 0; i < result.length; i++) {
            if (result[i].iaName == "FDRVC") {
              this.pendingequity1 = result[i]?.pending
              this.availedequity1 = result[i]?.availed
              this.allequity1 = result[i]?.total
              this.allpendingequity1 = ((this.pendingequity1 / this.allequity1) * 100).toFixed()
              this.allavailedequity1 = ((this.availedequity1 / this.allequity1) * 100).toFixed()
            }
            if (result[i].iaName == "NABARD") {
              this.pendingequity2 = result[i]?.pending
              this.availedequity2 = result[i]?.availed
              this.allequity2 = result[i]?.total
              this.allpendingequity2 = ((this.pendingequity2 / this.allequity2) * 100).toFixed()
              this.allavailedequity2 = ((this.availedequity2 / this.allequity2) * 100).toFixed()
            }
            if (result[i].iaName == "NAFED") {
              this.pendingequity3 = result[i]?.pending
              this.availedequity3 = result[i]?.availed
              this.allequity3 = result[i]?.total
              this.allpendingequity3 = ((this.pendingequity3 / this.allequity3) * 100).toFixed()
              this.allavailedequity3 = ((this.availedequity3 / this.allequity3) * 100).toFixed()
            }
            if (result[i].iaName == "NCDC") {
              this.pendingequity4 = result[i]?.pending
              this.availedequity4 = result[i]?.availed
              this.allequity4 = result[i]?.total
              this.allpendingequity4 = ((this.pendingequity4 / this.allequity4) * 100).toFixed()
              this.allavailedequity4 = ((this.availedequity4 / this.allequity4) * 100).toFixed()
            }
            if (result[i].iaName == "SFAC") {
              this.pendingequity5 = result[i]?.pending
              this.availedequity5 = result[i]?.availed
              this.allequity5 = result[i]?.total
              this.allpendingequity5 = ((this.pendingequity5 / this.allequity5) * 100).toFixed()
              this.allavailedequity5 = ((this.availedequity5 / this.allequity5) * 100).toFixed()
            }
            if (result.length == i + 1) {
              this.equitychart.destroy();
              this.chartequityData()
            }
          }
        }
      }
      else {
        this.allpendingequity1 = 0;
        this.allpendingequity2 = 0;
        this.allpendingequity3 = 0;
        this.allpendingequity4 = 0;
        this.allpendingequity5 = 0;
        this.allavailedequity1 = 0;
        this.allavailedequity2 = 0;
        this.allavailedequity3 = 0;
        this.allavailedequity4 = 0;
        this.allavailedequity5 = 0;
        this.equitychart.destroy();
        this.chartequityData()
      }



      // this.pendingequity1 = result[0]?.pending
      // this.availedequity1 = result[0]?.availed
      // this.allequity1 = result[0]?.total
      // this.allpendingequity1 = ((this.pendingequity1 / this.allequity1) * 100).toFixed()
      // this.allavailedequity1 = ((this.availedequity1 / this.allequity1) * 100).toFixed()
      // this.pendingequity2 = result[1]?.pending
      // this.availedequity2 = result[1]?.availed
      // this.allequity2 = result[1]?.total
      // this.allpendingequity2 = ((this.pendingequity2 / this.allequity2) * 100).toFixed()
      // this.allavailedequity2 = ((this.availedequity2 / this.allequity2) * 100).toFixed()
      // this.pendingequity3 = result[2]?.pending
      // this.availedequity3 = result[2]?.availed
      // this.allequity3 = result[2]?.total
      // this.allpendingequity3 = ((this.pendingequity3 / this.allequity3) * 100).toFixed()
      // this.allavailedequity3 = ((this.availedequity3 / this.allequity3) * 100).toFixed()
      // this.pendingequity4 = result[3]?.pending
      // this.availedequity4 = result[3]?.availed
      // this.allequity4 = result[3]?.total
      // this.allpendingequity4 = ((this.pendingequity4 / this.allequity4) * 100).toFixed()
      // this.allavailedequity4 = ((this.availedequity4 / this.allequity4) * 100).toFixed()
      // this.pendingequity5 = result[4]?.pending
      // this.availedequity5 = result[4]?.availed
      // this.allequity5 = result[4]?.total
      // this.allpendingequity5 = ((this.pendingequity5 / this.allequity5) * 100).toFixed()
      // this.allavailedequity5 = ((this.availedequity5 / this.allequity5) * 100).toFixed()
      // this.chartequityData(this.getequitygrantagencywiseData)
    })
  }

  chartData() {
    // if (this.equityForm.value.year == "2020-2021") {
    //   this.year1 = true;
    //   this.year2 = false;
    //   this.year3 = false;
    //   this.mychart = new Chart("canvasDoughnut3", {
    //     type: 'pie',
    //     data: {
    //       labels: ['Equity Grant Availed in %', 'Equity Grant Pending in %'],
    //       datasets: [{
    //         data: [this.allavailedgrant, this.allpendinggrant],
    //         backgroundColor: ["#a5edd5", "#4e73df"],
    //         hoverBackgroundColor: ["#a5edd5", "#4e73df"]
    //       }],
    //     }
    //   });
    // } else if (this.equityForm.value.year == "2021-2022") {
    //   this.year1 = false;
    //   this.year2 = true;
    //   this.year3 = false;
    //   this.mychart = new Chart("canvasDoughnut4", {
    //     type: 'pie',
    //     data: {
    //       labels: ['Equity Grant Availed in %', 'Equity Grant Pending in %'],
    //       datasets: [{
    //         data: [this.allavailedgrant, this.allpendinggrant],
    //         backgroundColor: ["#a5edd5", "#4e73df"],
    //         hoverBackgroundColor: ["#a5edd5", "#4e73df"]
    //       }],
    //     }
    //   });
    // } else {
    //   this.year1 = false;
    //   this.year2 = false;
    //   this.year3 = true;
    this.mychart = new Chart("canvasDoughnut5", {
      type: 'pie',
      data: {
        labels: ['Equity Grant Availed in %', 'Equity Grant Pending in %'],
        datasets: [{
          data: [this.allavailedgrant, this.allpendinggrant],
          backgroundColor: ["#a5edd5", "#4e73df"],
          hoverBackgroundColor: ["#a5edd5", "#4e73df"]
        }],
      }
    });
    // }

  }

  chartequityData() {
    // if (this.equityForm.value.iaName == 'FDRVC') {
    //   this.fdc = true;
    //   this.nbd = false;
    //   this.ncdc = false;
    //   this.nfd = false;
    //   this.sfc = false;
    //   this.chartAll = false;
    //   this.equitychart = new Chart("canvasDoughnut6", {
    //     type: 'bar',
    //     data: {
    //       labels: ['FDRVC'],
    //       datasets: [{
    //         label: "Equity Grant Availed in %",
    //         data: [this.allavailedequity1],
    //         backgroundColor: ["#00bfff"],
    //         hoverBackgroundColor: ["#00bfff"],
    //         barThickness: 40
    //       }, {
    //         label: "Equity Grant Pending in %",
    //         data: [this.allpendingequity1],
    //         backgroundColor: ["#4e73df"],
    //         hoverBackgroundColor: ["#4e73df"],
    //         barThickness: 40
    //       }],
    //     },
    //     options: {
    //       // indexAxis: 'y',
    //       scales: {
    //         yAxes: [{
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }]
    //       },
    //     }
    //   });
    // }
    // else if (this.equityForm.value.iaName == 'NABARD') {
    //   this.fdc = false;
    //   this.nbd = true;
    //   this.ncdc = false;
    //   this.nfd = false;
    //   this.sfc = false;
    //   this.chartAll = false;
    //   this.equitychart = new Chart("canvasDoughnut7", {
    //     type: 'bar',
    //     data: {
    //       labels: ['NABARD'],
    //       datasets: [{
    //         label: "Equity Grant Availed in %",
    //         data: [this.allavailedequity2],
    //         backgroundColor: ["#00bfff"],
    //         hoverBackgroundColor: ["#00bfff"],
    //         barThickness: 40
    //       }, {
    //         label: "Equity Grant Pending in %",
    //         data: [this.allpendingequity2],
    //         backgroundColor: ["#4e73df"],
    //         hoverBackgroundColor: ["#4e73df"],
    //         barThickness: 40
    //       }],
    //     },
    //     options: {
    //       // indexAxis: 'y',
    //       scales: {
    //         yAxes: [{
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }]
    //       },
    //     }
    //   });
    // } else if (this.equityForm.value.iaName == 'NAFED') {
    //   this.fdc = false;
    //   this.nbd = false;
    //   this.ncdc = false;
    //   this.nfd = true;
    //   this.sfc = false;
    //   this.chartAll = false;
    //   this.equitychart = new Chart("canvasDoughnut8", {
    //     type: 'bar',
    //     data: {
    //       labels: ['NAFED'],
    //       datasets: [{
    //         label: "Equity Grant Availed in %",
    //         data: [this.allavailedequity3],
    //         backgroundColor: ["#00bfff"],
    //         hoverBackgroundColor: ["#00bfff"],
    //         barThickness: 40
    //       }, {
    //         label: "Equity Grant Pending in %",
    //         data: [this.allpendingequity3],
    //         backgroundColor: ["#4e73df"],
    //         hoverBackgroundColor: ["#4e73df"],
    //         barThickness: 40
    //       }],
    //     },
    //     options: {
    //       // indexAxis: 'y',
    //       scales: {
    //         yAxes: [{
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }]
    //       },
    //     }
    //   });
    // }
    // else if (this.equityForm.value.iaName == 'NCDC') {
    //   this.fdc = false;
    //   this.nbd = false;
    //   this.ncdc = true;
    //   this.nfd = false;
    //   this.sfc = false;
    //   this.chartAll = false;
    //   this.equitychart = new Chart("canvasDoughnut9", {
    //     type: 'bar',
    //     data: {
    //       labels: ['NCDC'],
    //       datasets: [{
    //         label: "Equity Grant Availed in %",
    //         data: [this.allavailedequity4],
    //         backgroundColor: ["#00bfff"],
    //         hoverBackgroundColor: ["#00bfff"],
    //         barThickness: 40
    //       }, {
    //         label: "Equity Grant Pending in %",
    //         data: [this.allpendingequity4],
    //         backgroundColor: ["#4e73df"],
    //         hoverBackgroundColor: ["#4e73df"],
    //         barThickness: 40
    //       }],
    //     },
    //     options: {
    //       // indexAxis: 'y',
    //       scales: {
    //         yAxes: [{
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }]
    //       },
    //     }
    //   });
    // } else if (this.equityForm.value.iaName == 'SFAC') {
    //   this.fdc = false;
    //   this.nbd = false;
    //   this.ncdc = false;
    //   this.nfd = false;
    //   this.sfc = true;
    //   this.chartAll = false;
    //   this.equitychart = new Chart("canvasDoughnut10", {
    //     type: 'bar',
    //     data: {
    //       labels: ['SFAC'],
    //       datasets: [{
    //         label: "Equity Grant Availed in %",
    //         data: [this.allavailedequity5],
    //         backgroundColor: ["#00bfff"],
    //         hoverBackgroundColor: ["#00bfff"],
    //         barThickness: 40
    //       }, {
    //         label: "Equity Grant Pending in %",
    //         data: [this.allpendingequity5],
    //         backgroundColor: ["#4e73df"],
    //         hoverBackgroundColor: ["#4e73df"],
    //         barThickness: 40
    //       }],
    //     },
    //     options: {
    //       // indexAxis: 'y',
    //       scales: {
    //         yAxes: [{
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }]
    //       },
    //     }
    //   });
    // }
    // else {
    //   this.fdc = false;
    //   this.nbd = false;
    //   this.nfd = false;
    //   this.sfc = false;
    //   this.ncdc = false;
    //   this.chartAll = true;
      this.equitychart = new Chart("canvasDoughnut11", {
        type: 'bar',
        data: {
          labels: ['FDRVC', 'NABARD', 'NAFED', 'NCDC', 'SFAC'],
          datasets: [{
            label: "Equity Grant Availed",
            data: [this.allavailedequity1, this.allavailedequity2, this.allavailedequity3, this.allavailedequity4, this.allavailedequity5],
            backgroundColor: ["#00bfff", "#00bfff", "#00bfff", "#00bfff", "#00bfff"],
            // hoverBackgroundColor: ["#00bfff","#00bfff","#00bfff"],
            barThickness: 40
          }, {
            label: "Equity Grant Pending",
            data: [this.allpendingequity1, this.allpendingequity2, this.allpendingequity3, this.allpendingequity4, this.allpendingequity5],
            backgroundColor: ["#4e73df", "#4e73df", "#4e73df", "#4e73df", "#4e73df"],
            // hoverBackgroundColor: ["#4e73df","#4e73df","#4e73df"],
            barThickness: 40
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
    // }
  }
}


