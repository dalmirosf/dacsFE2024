import { ComponentFixture, TestBed } from '@angular/core/testing';

import { recetasDeComponent } from './recetasDe.component';

describe('BuscadorComponent', () => {
  let component: recetasDeComponent;
  let fixture: ComponentFixture<recetasDeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [recetasDeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(recetasDeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
