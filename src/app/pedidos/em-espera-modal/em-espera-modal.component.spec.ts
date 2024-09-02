import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmEsperaModalComponent } from './em-espera-modal.component';

describe('EmEsperaModalComponent', () => {
  let component: EmEsperaModalComponent;
  let fixture: ComponentFixture<EmEsperaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmEsperaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmEsperaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
