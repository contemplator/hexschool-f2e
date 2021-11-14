import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriateComponent } from './favoriate.component';

describe('FavoriateComponent', () => {
  let component: FavoriateComponent;
  let fixture: ComponentFixture<FavoriateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
