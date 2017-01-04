/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BeerinoComponent } from './beerino.component';

describe('BeerinoComponent', () => {
  let component: BeerinoComponent;
  let fixture: ComponentFixture<BeerinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
