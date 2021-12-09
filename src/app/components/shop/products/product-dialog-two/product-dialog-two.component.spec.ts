import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDialogTwoComponent } from './product-dialog-two.component';

describe('ProductDialogTwoComponent', () => {
  let component: ProductDialogTwoComponent;
  let fixture: ComponentFixture<ProductDialogTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDialogTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDialogTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
