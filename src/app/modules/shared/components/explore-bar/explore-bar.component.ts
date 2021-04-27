import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { CategoriesService, UsersService } from '../../../../services';

@Component({
  selector: 'app-explore-bar',
  templateUrl: './explore-bar.component.html',
  styleUrls: ['./explore-bar.component.css']
})
export class ExploreBarComponent implements OnInit {
  constructor(private usersService: UsersService, private categoriesService: CategoriesService) { }

  public roles: string[] = ['Новачок', 'Любитель', 'Гуру'];

  public explore: number = 0;
  public role: string = this.roles[0];

  public color: ThemePalette = 'primary';
  public mode: ProgressBarMode = 'determinate';

  public categoryName: string;
  @Input() categoryId: string;

  private updateRole(explore: number): void {
    if (explore >= 0 && explore <= 33) { this.role = this.roles[0]; }
    if (explore >= 34 && explore <= 66) { this.role = this.roles[1]; }
    if (explore >= 67 && explore <= 100) { this.role = this.roles[2]; }
  }

  ngOnInit(): void {
    if (this.categoryId) {
      this.categoryName = this.categoriesService.getCategoryNameById(this.categoryId);
    }
    this.usersService.getExplore(this.categoryId).subscribe(
      (data) => {
        this.explore = data.explore;
        this.updateRole(data.explore);
      },
      () => {
        this.explore = 0;
        this.updateRole(0);
      }
    );
  }

}
