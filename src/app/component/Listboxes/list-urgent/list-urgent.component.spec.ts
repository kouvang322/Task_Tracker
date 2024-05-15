import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUrgentComponent } from './list-urgent.component';

describe('ListUrgentComponent', () => {
  let component: ListUrgentComponent;
  let fixture: ComponentFixture<ListUrgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUrgentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListUrgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
