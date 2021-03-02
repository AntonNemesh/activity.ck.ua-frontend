import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../../services';
import { IPlacesCategories } from '../../../../../static/type';

@Component({
  selector: 'app-section-category',
  templateUrl: './section-category.component.html',
  styleUrls: ['./section-category.component.css']
})
export class SectionCategoryComponent implements OnInit {
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
