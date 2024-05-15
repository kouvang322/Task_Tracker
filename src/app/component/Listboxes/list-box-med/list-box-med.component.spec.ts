import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBoxMedComponent } from './list-box-med.component';

describe('ListBoxMedComponent', () => {
  let component: ListBoxMedComponent;
  let fixture: ComponentFixture<ListBoxMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBoxMedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListBoxMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
