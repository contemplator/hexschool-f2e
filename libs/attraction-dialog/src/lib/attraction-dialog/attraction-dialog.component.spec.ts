import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionDialogComponent } from './attraction-dialog.component';

describe('AttractionDialogComponent', () => {
  let component: AttractionDialogComponent;
  let fixture: ComponentFixture<AttractionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttractionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
