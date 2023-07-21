import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleEventComponent } from './sample-event.component';

describe('SampleEventComponent', () => {
  let component: SampleEventComponent;
  let fixture: ComponentFixture<SampleEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SampleEventComponent]
    });
    fixture = TestBed.createComponent(SampleEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
