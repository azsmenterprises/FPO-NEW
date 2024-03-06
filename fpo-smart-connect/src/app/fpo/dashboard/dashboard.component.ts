import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../admin.service';
//============================= below imports are for calender scheduler start 
// import {ChangeDetectionStrategy,ViewChild,TemplateRef} from '@angular/core';
// import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours,} from 'date-fns';
// import { Subject } from 'rxjs';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView,} from 'angular-calendar';

// const colors: any = {
//   red: {
//     primary: '#ad2121',
//     secondary: '#FAE3E3',
//   },
//   blue: {
//     primary: '#1e90ff',
//     secondary: '#D1E8FF',
//   },
//   yellow: {
//     primary: '#e3bc08',
//     secondary: '#FDF1BA',
//   },
// };

//=========================================== below imports are for calender scheduler end 


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  findDate: any;
  meeting_scheduled: any;
  meeting_conducted: any;
  cropProduction_count: any;
  directors_count: any;
  countDashboardData: any;
  notification: any;
  notificationss: any;
  notificationByStat="All";
  Likes: any;
  farmerMember: any;
  turnOver_amount: any;
  // ===============================================Calender scheduler start=============================================
  // @ViewChild('modalContent') modalContent: any;

  // view: CalendarView = CalendarView.Month;

  // CalendarView = CalendarView;

  // viewDate: Date = new Date();

  // modalData:any={
  // }

  // actions: CalendarEventAction[] = [
  //   {
  //     label: '<i class="fas fa-fw fa-pencil-alt"></i>',
  //     a11yLabel: 'Edit',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent('Edited', event);
  //     },
  //   },
  //   {
  //     label: '<i class="fas fa-fw fa-trash-alt"></i>',
  //     a11yLabel: 'Delete',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.events = this.events.filter((iEvent) => iEvent !== event);
  //       this.handleEvent('Deleted', event);
  //     },
  //   },
  // ];

  // refresh: Subject<any> = new Subject();

  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: colors.red,
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //     actions: this.actions,
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue,
  //     allDay: true,
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  // ];

  // activeDayIsOpen: boolean = true;
  // ===============================================Calender scheduler end=============================================

  constructor(private service: AdminService, private appServ: AppService) { }

  ngOnInit(): void {
    this.getDataForDashboard();
    this.dateForDashboard();
    this.getNotifications();
    // this.loadCalender()
    this.myFunc(this.id,this.status);
    this.getLikes()
   
  }
  id(id: any, status: (id: any, status: any) => void) {
    throw new Error('Method not implemented.');
  }
  status(id: any, status: any) {
    throw new Error('Method not implemented.');
  }

  getNotifications() {
    this.service.getNotifications(this.appServ.fpoId).subscribe((response) => {
      this.notification = response;
      //console.log(response,4444);
      
      
    }, (error) => {
      ////console.log('Error is', error);
    })
  }

  getLikes() {
   
    this.service.getLikes(this.appServ.fpoId).subscribe((response) => {
  
      this.Likes = response;
    
      
     
      //console.log(this.Likes,"Likesss");
      
      
    }, (error) => {
      ////console.log('Error is', error);
    })
  }
 
  getDataForDashboard() {
    this.service.getDataForDashboard(this.appServ.fpoId).subscribe((response) => {
      this.countDashboardData = response;
      
      this.cropProduction_count = response.cropProduction_count[0]?.myCount;
      this.farmerMember = response.directors_count[0]?.noOfFarmerMember;
      this.directors_count = response.directors_count[0]?.numberOfDirectors;
      this.turnOver_amount = response.turnOver_amount[0]?.turnoverAmount;
      // .toLocaleString('en-IN', {maximumFractionDigits: 2,minimumFractionDigits: 2,});
    }, (error) => {
      ////console.log('Error is', error);
    })
  }

  dateForDashboard() {
    this.service.dateForDashboard(this.appServ.fpoId).subscribe((response) => {
      this.findDate = response;
    //console.log(response.meeting_scheduled);
      this.meeting_scheduled = response.meeting_scheduled;
      this.meeting_conducted = response.meeting_conducted
    }, (error) => {
      ////console.log('Error is', error);
    })
  }

  myFunc(id: any,status:any){
  // //console.log(id,"222222"); 
  
    this.service.updateNotificationsStatus(id,status).subscribe((response) => {
      this.notificationss = response;
    }, (error) => {
      ////console.log('Error is', error);
    })
    
  }
  getNotificationByStatus(status:any){
  //  //console.log(status);
   if(status=="All")
   {
    this.getNotifications();
   }
   else{ 
    this.service.getNotificationByStatus(this.appServ.fpoId,status).subscribe((response) => {
      this.notification = response;
      }, (error) => {
        ////console.log('Error is', error);
      })
    }
    }
  // =============================================Calender scheduler start=======================================
  // dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  //   if (isSameMonth(date, this.viewDate)) {
  //     if (
  //       (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
  //       events.length === 0
  //     ) {
  //       this.activeDayIsOpen = false;
  //     } else {
  //       this.activeDayIsOpen = true;
  //     }
  //     this.viewDate = date;
  //   }
  // }

  // eventTimesChanged({
  //   event,
  //   newStart,
  //   newEnd,
  // }: CalendarEventTimesChangedEvent): void {
  //   this.events = this.events.map((iEvent) => {
  //     if (iEvent === event) {
  //       return {
  //         ...event,
  //         start: newStart,
  //         end: newEnd,
  //       };
  //     }
  //     return iEvent;
  //   });
  //   this.handleEvent('Dropped or resized', event);
  // }

  // handleEvent(action: string, event: CalendarEvent): void {
  //   this.modalData = { event, action };
  //   this.modal.open(this.modalContent, { size: 'lg' });
  // }

  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors.red,
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true,
  //       },
  //     },
  //   ];
  // }

  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter((event) => event !== eventToDelete);
  // }

  // setView(view: CalendarView) {
  //   this.view = view;
  // }

  // closeOpenMonthViewDay() {
  //   this.activeDayIsOpen = false;
  // }

  // =============================================Calender scheduler end=======================================


}
