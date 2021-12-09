import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSearchProductsComponent } from './modal-search-products.component';

describe('ModalSearchProductsComponent', () => {
  let component: ModalSearchProductsComponent;
  let fixture: ComponentFixture<ModalSearchProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSearchProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSearchProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
