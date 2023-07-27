import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokePaginationComponent } from './joke-pagination.component';

describe('JokePaginationComponent', () => {
  let component: JokePaginationComponent;
  let fixture: ComponentFixture<JokePaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JokePaginationComponent]
    });
    fixture = TestBed.createComponent(JokePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
