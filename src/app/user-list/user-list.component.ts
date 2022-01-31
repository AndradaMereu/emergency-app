import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../User';
import {MatTabsModule} from '@angular/material/tabs';
import { UserServiceService } from '../user-service.service';
import { TeamService } from '../team.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddUser } from '../addUser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {


  users: any[] = [];
  categories: any[] = [
   { id: "5", name: "Firefighter"}, {id:"3" , name: "Policeman" }, {id: "4", name: "Doctor"}, {id: "2", name:"Dispatcher"}
  ]

  teams:any[] =[
  ]
  selectedCategory: any;
  selectedTeams: any;
  teamNames: String[]=[];
  addForm: FormGroup;
  editForm: FormGroup;
  user: AddUser = new AddUser;
  selecteduserid!: number;
  message:  string= "";

  constructor(private userService: UserServiceService, private teamService: TeamService, private formBuilder:FormBuilder) {
      this.addForm = this.formBuilder.group({
        name:[''],
        badgenumber:[''],
        password:[''],
        role:[''],
        team:['']
      })

      this.editForm = this.formBuilder.group({
        name:[''],
        badgenumber:[''],
        password:[''],
        role:[''],
        team:['']
      })
   }

  ngOnInit(): void {
    this.getUsers()
    this.getTeams()
  }


  getUsers(){
    this.userService.getUsers().subscribe( result => {
      this.users = result;
      console.log(this.users);
    })
  }

  getTeams(){
    this.teamService.getTeams().subscribe( result => {
      this.teams = result;
      this.getTeamNames();
      console.log(this.teams);
    })
  }

  getTeamNames(){
      for(let team of this.teams){
          this.teamNames.push(team.name);
          
      }
      console.log(this.teamNames);
  }

  getDispatcherUsers(){
    let dispatchers: User[] =[];
    for( let user of this.users ){
        if (user.role.authority === 'DISPATCHER')
        dispatchers.push(user);
    }
    return dispatchers;
  }

  getPolicemanUsers(){
    let dispatchers: User[] =[];
    for( let user of this.users ){
        if (user.role.authority === 'POLICEMAN')
        dispatchers.push(user);
    }
    return dispatchers;
  }

  getEMTUsers(){
    let dispatchers: User[] =[];
    for( let user of this.users ){
        if (user.role.authority === 'DOCTOR')
        dispatchers.push(user);
    }
    return dispatchers;
  }

  getFirefighterUsers(){
    let dispatchers: User[] =[];
    for( let user of this.users ){
        if (user.role.authority === 'FIREFIGHTER')
        dispatchers.push(user);
    }
    return dispatchers;
  }

  addUser(){
    this.user.name= this.addForm.value.name;
    this.user.password = this.addForm.value.password;
    this.user.badgeNumber = this.addForm.value.badgenumber;
    this.user.team = this.addForm.value.team;
    this.user.userType = this.addForm.value.role;
    this.userService.addUser(this.user).subscribe( res => {
      this.message="added"
        this.closeModal(false);
       this.showAlert();
    })

  }

  editUser(){
    this.user.name= this.editForm.value.name;
    this.user.password = this.editForm.value.password;
    this.user.badgeNumber = this.editForm.value.badgenumber;
    this.user.team = this.editForm.value.team;
    this.user.userType = this.editForm.value.role;
    this.userService.editUser(this.selecteduserid, this.user).subscribe( res => {
      this.message="edited";
      this.closeModal(true);
      this.showAlert();
      console.log(this.user);
    })
  }

  selected(event: any){
    console.log(event);
  }

  selectedTeam(event: any){
    
  }

  selectedUser(event: any){
    this.selecteduserid = event;
    this.userService.getUserById(this.selecteduserid).subscribe( res => {
      console.log(res);
      this.editForm.get('name')?.setValue(res.name);
      this.editForm.get('badgenumber')?.setValue(res.badgeNumber);
      this.editForm.get('role')?.setValue(res.role.id);
      this.editForm.get('team')?.setValue(res.team.id);
    })
  }

  deleteUser(event: any){
    this.userService.deleteUser(event).subscribe(res => {

        this.message="deleted";
        this.showAlert();
    })
  }

  @ViewChild('alert', { static: true })
  alert!: ElementRef;

  @ViewChild('closeModal', {static: true})
  myModal!: ElementRef;

  @ViewChild('closeEditModal', {static: true})
  myEditModal!: ElementRef;

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }

  showAlert(){
    this.alert.nativeElement.classList.add('show');
  }

  closeModal(edit: boolean){
    if(!edit){
    this.myModal.nativeElement.click();}
    else 
    this.myEditModal.nativeElement.click();
  }


}
