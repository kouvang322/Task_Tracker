import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBoxHighComponent } from './list-box-high.component';

describe('ListBoxHighComponent', () => {
  let component: ListBoxHighComponent;
  let fixture: ComponentFixture<ListBoxHighComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBoxHighComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListBoxHighComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
