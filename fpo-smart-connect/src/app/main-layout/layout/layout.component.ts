import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  viewSideBar: boolean = true;
  width: any;
  pageWidth: any;
  constructor() { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.viewSideBar = !this.viewSideBar;


    // if (!this.viewSideBar) {
    //   this.width = 0
    //   this.pageWidth = 100
    // } else {
    //   this.width = 225
    //   this.pageWidth = 88.5
    // }
    // if (!this.viewSideBar) {
    // let x= document.getElementById("mySidebar") as HTMLElement;
    // x.style.width = "0px"
    // let y= document.getElementById("main") as HTMLElement;
    // y.style.width = "100%"
    // }else{
    //   let x= document.getElementById("mySidebar") as HTMLElement;
    //   x.style.width = "225px"
    //   let y= document.getElementById("main") as HTMLElement;
    //   y.style.width = "100%"
    //   y.style.marginLeft = "300px"
    // }
    // let x = document.getElementById("mySidebar") as HTMLElement;
    // x.addEventListener("click", function () {
    //   var button = document.getElementById("myButton") as HTMLElement;
    //   button.classList.remove("page");
    //   button.classList.add("page-active");
    // });
    var button = document.getElementById("main") as HTMLElement;
    if (!this.viewSideBar) {
      button.classList.remove("page");
      button.classList.add("page-active");
    } else {
      button.classList.add("page");
      button.classList.remove("page-active");
    }

  }

}
