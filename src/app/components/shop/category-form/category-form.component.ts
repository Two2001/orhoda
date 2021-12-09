import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.sass']
})
export class CategoryFormComponent implements OnInit {

  isCreated: boolean;
  errorMessage: string = "La création de catégirie a échoué";
  successMessage: string = "Catégorie créée avec succès!";


  constructor(private catService: CategoriesService,
    private router: Router) { }

ngOnInit() {
}


onSubmit(form: NgForm) {
  const name = form.value['name'];
  const description = form.value['description'];

  console.log('name: '+ name);
  console.log('description: '+ description);

  const newCategory = new Category(name, description);

  console.log('newUser: ',newCategory);


  this.catService.saveCategory(newCategory).subscribe(
    (data: any) => {
      console.log('sucess',data)
      this.isCreated = true;
      this.router.navigate(['/orhoda/shop']);
    },
    (err: any) => {
      console.log('error',err);
      this.isCreated = false;
    }
  );
}

}
