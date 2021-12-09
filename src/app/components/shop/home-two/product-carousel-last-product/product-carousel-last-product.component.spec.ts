import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCarouselLastProductComponent } from './product-carousel-last-product.component';

describe('ProductCarouselLastProductComponent', () => {
  let component: ProductCarouselLastProductComponent;
  let fixture: ComponentFixture<ProductCarouselLastProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCarouselLastProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCarouselLastProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
