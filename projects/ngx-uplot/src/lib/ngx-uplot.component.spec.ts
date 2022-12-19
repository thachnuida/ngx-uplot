import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxUplotComponent } from './ngx-uplot.component';

describe('NgxUplotComponent', () => {
  let component: NgxUplotComponent;
  let fixture: ComponentFixture<NgxUplotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxUplotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxUplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
