import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVacanteComponent } from './detalle-vacante.component';

describe('DetalleVacanteComponent', () => {
  let component: DetalleVacanteComponent;
  let fixture: ComponentFixture<DetalleVacanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleVacanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleVacanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
