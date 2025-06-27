import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCadastro } from './popup-cadastro';

describe('PopupCadastro', () => {
  let component: PopupCadastro;
  let fixture: ComponentFixture<PopupCadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupCadastro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCadastro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
