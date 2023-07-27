import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokeTableComponent } from './joke-table.component';

describe('JokeTableComponent', () => {
  let component: JokeTableComponent;
  let fixture: ComponentFixture<JokeTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JokeTableComponent]
    });
    fixture = TestBed.createComponent(JokeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
