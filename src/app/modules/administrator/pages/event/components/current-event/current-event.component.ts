import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../../../core/services/admin.service';
import { UserService } from '../../../../../../core/services/user.service';

@Component({
  selector: 'app-current-event',
  templateUrl: './current-event.component.html',
  styleUrls: ['./current-event.component.scss']
})
export class CurrentEventComponent implements OnInit {

  currentDate;
  currentTime;
  currentEvent: Array<any> = [];
  currentUser: any;
  eventState : boolean = false;

  constructor(private adminService: AdminService, private userService: UserService) { }

  ngOnInit() {

    this.formatEventTimeAndDate();
    this.initUserForCurrEvt();
  }

  async initUserForCurrEvt(){
    
    await this.userService.userState
      .subscribe(user => {
        this.currentUser = user;
      })
    await this.adminService.getCurrentEvent(this.currentUser.email) 
      .subscribe(events => {
        this.getCurrentEvent(events);
      }) 
  }

  initDateTimeEvent(data){
    return {
      startDate: this.splitInput(data.start_date, '/'),
      endDate: this.splitInput(data.end_date, '/'),
      startTime: this.splitInput(data.start_time, ':'),
      endTime: this.splitInput(data.end_time, ':')
    }
  }

  async getCurrentEvent(events){
    await events.map(event => {
      let events = event.payload.doc.data();
      let dates = this.initDateTimeEvent(events);

      let firstCond = dates.startDate == this.currentDate && dates.endDate >= this.currentDate;
      let secondCond = dates.endDate > this.currentDate;
      let secondSubCond = dates.endTime <= this.currentTime || dates.endTime >= this.currentTime;
      let thirdCond = dates.startTime <= this.currentTime && dates.endTime >= this.currentTime;

      firstCond ? 
        secondCond ? 
          secondSubCond ? 
            this.currentEvent.push(events) : ''
        : 
        thirdCond ? 
          this.currentEvent.push(events) : ''
      : ''

    })

    this.eventState = await this.checkEvent(this.currentEvent);
  }

  checkEvent(event){
    if(event.length > 0){
      return false;
    }
    else{
      return true;
    }
  }

  formatEventTimeAndDate(){
    let current_datetime = new Date()
    let date = this.convertMonth(current_datetime.getMonth()) + '-' + current_datetime.getDate()+ '-' + current_datetime.getFullYear()
    let time = this.convertTime(current_datetime.getHours()) + ':' + this.convertTime(current_datetime.getMinutes());
    this.currentDate = this.splitInput(date, '-');
    this.currentTime = this.splitInput(time, ':');
  }

  splitInput(str, split){
    return str.split(split).join('')
  }

  convertMonth(str){
    let month = str.toString();
    if(month.length == 1) {
      return '0' + (parseInt(month) + 1)
    }  
    else{
      return str;
    }
  }

  convertTime(str){
    let time = str.toString();
      if(time.length == 1) {
        return '0' + (parseInt(time))
      }  
      else{
        return str;
      }
    }
  


}
