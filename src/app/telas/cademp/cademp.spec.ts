import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cademp } from './cademp';

describe('Cademp', () => {
  let component: Cademp;
  let fixture: ComponentFixture<Cademp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cademp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cademp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
