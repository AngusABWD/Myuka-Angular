import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyukaComponent } from './myuka.component';

describe('MyukaComponent', () => {
  let component: MyukaComponent;
  let fixture: ComponentFixture<MyukaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyukaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyukaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
