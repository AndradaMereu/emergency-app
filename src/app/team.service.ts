import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddTeam } from './addTeam';
import { Team } from './team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }



  getTeams(): Observable<Team[]>{
    return this.httpClient.get<Team[]>(`${this.baseUrl}/api/teams`);
  }

  addTeam(addTeam: AddTeam) {
    return this.httpClient.post(`${this.baseUrl}/api/teams`, addTeam);
  }

  deleteTeam(id: number){
    return this.httpClient.delete(`${this.baseUrl}/api/teams/${id}`);
  }

  updateTeam(id: number, team:AddTeam){
    return this.httpClient.put(`${this.baseUrl}/api/teams/${id}`,team );
  }

  getTeamById(id: number): Observable<Team>{
    return this.httpClient.get<Team>(`${this.baseUrl}/api/teams/${id}`);
  }
}