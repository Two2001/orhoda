import { Pipe, PipeTransform } from '@angular/core';
import { CategoriesProductsComponent } from './categories-products.component'

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
    /**
     * Transform
     *
     * @param {any[]} items
     * @param {string} searchText
     * @returns {any[]}
     */
    transform(items: any[], searchText: string): any[] {
      if (!items) {
        return [];
      }
      if (!searchText) {
        return items;
      }
      searchText = searchText.toLocaleLowerCase();
  
      return items.filter(it => {
        return it.name.toLocaleLowerCase().includes(searchText);
      });
    }

}


    