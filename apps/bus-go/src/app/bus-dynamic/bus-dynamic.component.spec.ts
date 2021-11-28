import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusDynamicComponent } from './bus-dynamic.component';

describe('BusDynamicComponent', () => {
  let component: BusDynamicComponent;
  let fixture: ComponentFixture<BusDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusDynamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
