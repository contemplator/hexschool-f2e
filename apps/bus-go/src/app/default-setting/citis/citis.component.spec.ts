import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitisComponent } from './citis.component';

describe('CitisComponent', () => {
  let component: CitisComponent;
  let fixture: ComponentFixture<CitisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
