import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionB } from './section-b';

describe('SectionB', () => {
  let component: SectionB;
  let fixture: ComponentFixture<SectionB>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionB],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionB);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
