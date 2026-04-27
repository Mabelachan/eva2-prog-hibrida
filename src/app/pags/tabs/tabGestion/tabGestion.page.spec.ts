import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPage } from './tabGestion.page';

describe('GestionPage', () => {
  let component: GestionPage;
  let fixture: ComponentFixture<GestionPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(GestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
