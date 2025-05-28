import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVariablesFormComponent } from './add-variables-form.component';

describe('AddVariablesFormComponent', () => {
  let component: AddVariablesFormComponent;
  let fixture: ComponentFixture<AddVariablesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVariablesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVariablesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
