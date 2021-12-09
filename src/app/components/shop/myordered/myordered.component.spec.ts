import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyorderedComponent } from './myordered.component';

describe('MyorderedComponent', () => {
  let component: MyorderedComponent;
  let fixture: ComponentFixture<MyorderedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyorderedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyorderedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
