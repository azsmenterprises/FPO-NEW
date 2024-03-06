import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RootAdminService } from '../root-admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ia-cbbo-fpo-mapping',
  templateUrl: './ia-cbbo-fpo-mapping.component.html',
  styleUrls: ['./ia-cbbo-fpo-mapping.component.css']
})
export class IaCbboFpoMappingComponent implements OnInit {
  getIaData: any;
  getCbboData: any;
  getFpoData: any;
  assignData: any;
  IaCbboFpodata: any;
  cbboCode: any;
  cbboName: any;
  displayedColumns: string[] = ['slNo', 'year', 'iaName', 'cbboName', 'fpoName', 'delete'];
  pagelength = 0
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild('inputFile') inputFile!: ElementRef;
  dataSource: any;

  constructor(private service: RootAdminService, private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource()

  }

  ngOnInit(): void {
    this.getIa();
    // this.gettingCbbo();
    this.getFpo();
    this.getIaCbboFpo()
  }
  // ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort
  // }
  mappForm = new FormGroup({
    iaName: new FormControl('', [Validators.required]),
    cbboName: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    fpoName: new FormControl('', [Validators.required]),
  })

  getIa() {
    this.service.getIa().subscribe(result => {
      this.getIaData = result;
    })
  }
  gettingCbbo() {
    // console.log(this.mappForm.value.iaName,'this.mappForm.value.iaName');
    // this.mappForm.value.cbboName = "";
    this.getCbboData = [];
    this.service.gettingCbbo(this.mappForm.value.iaName.iaName).subscribe(result => {
      this.getCbboData = result;
      // console.log(this.getCbboData, 'this.getCbboData');

    })
  }
  getFpo() {
    this.getFpoData = [];
    this.service.getFpo().subscribe(result => {
      this.getFpoData = result;
    })
  }

  assign() {
    console.log(this.mappForm.value, "ass");

    if (this.mappForm.valid) {
      let dropdownVals = this.mappForm.value['cbboName'].split(':');
      this.cbboCode = dropdownVals[0];
      this.cbboName = dropdownVals[1];
      const data = {
        iaName: this.mappForm.value.iaName.iaName,
        cbboName: this.cbboName,
        cbboCode: this.cbboCode,
        year: this.mappForm.value.year,
        fpoName: this.mappForm.value.fpoName.fpoName,
      }
      // console.log(data,"stkrhd");

      this.service.assign(data).subscribe(result => {
        this.assignData = result;
        alert("Details Assigned")
        this.toastr.success('Data Assigned successfully')
        this.mappForm.reset();
        this.getIaCbboFpo()
        this.getFpo()
      })
    } else {
      this.toastr.warning('Please fill all the required fields')
    }
  }

  getIaCbboFpo() {
    this.service.getIaCbboFpo().subscribe(result => {
      this.IaCbboFpodata = result;
      this.IaCbboFpodata = new MatTableDataSource(this.IaCbboFpodata);
      setTimeout(() => { this.IaCbboFpodata.paginator = this.paginator; });
      // this.pagelength = result.length

    })
  }

  deleteRowMaping(map: any) {
    if (confirm('Are you sure to delete ?')) {
      this.service.deleteRowMaping(map).subscribe(result => {
        if (result) {
          this.toastr.success('Deleted successfully')
          this.getIaCbboFpo();
        }
        this.getFpo();
      }, error => this.toastr.error('Something went wrong')
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.IaCbboFpodata.filter = filterValue.trim().toLowerCase();
  }

}