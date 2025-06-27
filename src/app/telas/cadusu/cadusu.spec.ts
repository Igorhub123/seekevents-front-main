import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cadusu } from './cadusu';

describe('Cadusu', () => {
  let component: Cadusu;
  let fixture: ComponentFixture<Cadusu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cadusu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cadusu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
