import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SologanModalComponent } from './sologan-modal.component';

describe('SologanModalComponent', () => {
  let component: SologanModalComponent;
  let fixture: ComponentFixture<SologanModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SologanModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SologanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
