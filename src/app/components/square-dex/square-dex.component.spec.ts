import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareDexComponent } from './square-dex.component';

describe('SquareDexComponent', () => {
  let component: SquareDexComponent;
  let fixture: ComponentFixture<SquareDexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquareDexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SquareDexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
