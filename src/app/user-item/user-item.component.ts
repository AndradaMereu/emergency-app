import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Team } from '../team';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input() name: string | undefined;
  @Input() badgeNumber: string | undefined;    
  @Input() role: string | undefined;   
  @Input() team: string | undefined; 
  @Input() id: number | undefined; 
  @Input() teams: Team[] | undefined;
  @Output() useridEvent = new EventEmitter<number>();
  @Output() useridDeleteEvent = new EventEmitter<number>();

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
  }

  delete(){
    this.useridDeleteEvent.emit(this.id);
  }

  editUser(){
      this.useridEvent.emit(this.id);
  }


}
