/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SvgzpdComponent } from './svgzpd.component';

describe('SvgzpdComponent', () => {
  let component: SvgzpdComponent;
  let fixture: ComponentFixture<SvgzpdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgzpdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgzpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
