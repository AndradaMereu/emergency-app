import { Team } from "./team";
import { UserType } from "./userType";

export class User{
    id!: number;
    name!: string;
    badgeNumber!: string;
    role!: UserType;
    team!: Team;
    // password!: string;
}