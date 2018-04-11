/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RectSelctComponent } from './rect-selct.component';

describe('RectSelctComponent', () => {
  let component: RectSelctComponent;
  let fixture: ComponentFixture<RectSelctComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RectSelctComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectSelctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
