import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddTeam } from '../addTeam';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

addForm: FormGroup;
editForm: FormGroup;
newTeam: AddTeam = new AddTeam;
teams: Team[] = [];
statuses: String[] = ["Available", "Busy"];
selectedStatus!: string;
selectedTeamId!: number;
message:string="";

  constructor(private teamService: TeamService, private formBuilder:FormBuilder) {
    this.addForm = this.formBuilder.group({
      name:[''],
      status:['']
    })
    this.editForm = this.formBuilder.group({
      name:[''],
      status:['']
    })
  }


  ngOnInit(): void {
    this.getTeams();
  }

  getTeams() {
    this.teamService.getTeams().subscribe( res => {
      this.teams = res;
    })
  }

  addTeam(){
    console.log(this.newTeam);
    this.newTeam.name= this.addForm.get('name')?.value;
    this.newTeam.status = this.addForm.value.status;
    console.log(this.newTeam);
    this.teamService.addTeam(this.newTeam).subscribe( res => {
      this.message="added";
        this.closeModal(false);
       this.showAlert();
        
    })

  }

  editTeam(){
      this.newTeam.name= this.editForm.value.name;
      this.newTeam.status = this.editForm.value.status;
      console.log(this.newTeam.name)
    this.teamService.updateTeam(this.selectedTeamId, this.newTeam).subscribe(res => {
        this.message="edited"
        this.showAlert();
        this.closeModal(true);
    })
  }

  selectedTeam(event:any){
    this.selectedTeamId = event; 
    this.teamService.getTeamById(this.selectedTeamId).subscribe( res => {
      console.log(res);
      this.editForm.get('name')?.setValue(res.name);
      this.editForm.get('status')?.setValue(res.status);
    })
  }

  deleteTeam(event:any){
      this.message="deleted";
      this.showAlert();
      console.log(this.message);
  }

  @ViewChild('alert', { static: true })
  alert!: ElementRef;

  @ViewChild('closeTeamModal', {static: true})
  myTeamModal!: ElementRef;

  @ViewChild('closeEditTeamModal', {static: true})
  myEditTeamModal!: ElementRef;

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }

  showAlert(){
    this.alert.nativeElement.classList.add('show');
  }

  closeModal(edit: boolean){
    if(!edit){
    this.myTeamModal.nativeElement.click();}
    else 
    this.myEditTeamModal.nativeElement.click();
  }
}
