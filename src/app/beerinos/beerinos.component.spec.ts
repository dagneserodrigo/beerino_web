/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BeerinosComponent } from './beerinos.component';

describe('BeerinosComponent', () => {
  let component: BeerinosComponent;
  let fixture: ComponentFixture<BeerinosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerinosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
