import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core'
import { TeamService } from '../team.service';

@Component({
  selector: 'app-teamcard',
  templateUrl: './teamcard.component.html',
  styleUrls: ['./teamcard.component.scss']
})
export class TeamcardComponent implements OnInit {

  @Input() id!: number;
  @Input() name: string | undefined;
  @Input() status: string | undefined;    
  @Output() editEvent = new EventEmitter<number>();

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
  }

  editTeam(){
      this.editEvent.emit(this.id);
  }



}
