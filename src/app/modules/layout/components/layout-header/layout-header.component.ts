import { Component, OnInit } from '@angular/core';
import { AuthorizationService, DataService, UsersService } from '../../../../services';
import { IUser } from '../../../../static/type';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.css']
})
export class LayoutHeaderComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private authorizationService: AuthorizationService,
    private router: Router,
  ) { }

  public searchGroup: FormGroup = new FormGroup({
    search: new FormControl('', {})
  });

  public user: IUser;

  public logout(): void {
    this.authorizationService.logout().subscribe(
      (value) => { this.authorizationService.removeSession(); },
      (error) => { console.log(error); }
    );
  }

  public search(): void {
    const searchText: string = this.searchGroup.get('search').value;
    if (searchText.trim() === '') { return; }
    if (this.router.url !== '/search') {
      this.router.navigateByUrl('/search', { state: { data: searchText } });
      return;
    }
    this.dataService.setSearchText(searchText);
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => { this.user = (data.user) ? data.user : undefined; });
  }
}
