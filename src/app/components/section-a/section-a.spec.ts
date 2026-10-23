import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionA } from './section-a';

describe('SectionA', () => {
  let component: SectionA;
  let fixture: ComponentFixture<SectionA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionA],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionA);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
