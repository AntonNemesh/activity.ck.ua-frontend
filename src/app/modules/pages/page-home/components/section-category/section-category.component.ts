import {Component, OnInit} from '@angular/core';
import { CategoriesService } from '../../../../../services';
import { IPlacesCategories } from '../../../../../static/type';
import {TotalPlacesService} from '../../../../../services/totalPlaces.service';

@Component({
  selector: 'app-section-category',
  templateUrl: './section-category.component.html',
  styleUrls: ['./section-category.component.css']
})
export class SectionCategoryComponent implements OnInit {
  public randomCategory: string;
  public totalImpression: number;

  constructor(
    private totalPlaces: TotalPlacesService,
    private categoryService: CategoriesService) {
    console.log(this.totalPlaces.totalPlaces)
    this.totalImpression = this.totalPlaces.totalPlaces;
  }

  get categories(): IPlacesCategories[] {
    return this.categoryService.getCategories();
  }

  public updateRandomCategory(): void {
    this.randomCategory = this.categoryService.getRandomCategory();
  }

  ngOnInit(): void {
    this.updateRandomCategory();
  }

}
