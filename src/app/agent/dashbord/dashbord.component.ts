import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  public clientsNumber :number = 0;
  public agent: User = new User();
  public users: User[] = [];
  private subscriptions : Subscription[] = [];
  constructor(private authenticationService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {
    // this.solde_banque = this.authenticationService.getUserFromLocalCache().agence.banque.solde;
    this.agent = this.authenticationService.getUserFromLocalCache();
    this.getClients();
  }

  public getClients():void {
    this.subscriptions.push(
      this.userService.getUsers().subscribe(
        (response : User[] | any) => {
          this.userService.addUsersToLacalCache(response);
          this.users = response;
            this.clientsNumber = response.length;
        }
      )
    );
  }

}
