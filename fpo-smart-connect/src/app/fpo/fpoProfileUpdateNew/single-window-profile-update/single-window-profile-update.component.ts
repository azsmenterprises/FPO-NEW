import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-single-window-profile-update',
  templateUrl: './single-window-profile-update.component.html',
  styleUrls: ['./single-window-profile-update.component.css']
})
export class SingleWindowProfileUpdateComponent implements OnInit {
  value = 100;
  bufferValue = 0
  mode: ProgressBarMode = 'buffer'
  constructor(private authServ:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

}
