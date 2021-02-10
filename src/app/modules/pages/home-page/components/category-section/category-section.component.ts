import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../../services';
import { IPlacesCategories } from '../../../../../static/type';

@Component({
  selector: 'app-category-section',
  templateUrl: './category-section.component.html',
  styleUrls: ['./category-section.component.css']
})
export class CategorySectionComponent implements OnInit {
  public randomCategory: string;

  constructor(private categoryService: CategoriesService) { }

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
