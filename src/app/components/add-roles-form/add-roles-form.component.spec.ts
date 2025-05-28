import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRolesFormComponent } from './add-roles-form.component';

describe('AddRolesFormComponent', () => {
  let component: AddRolesFormComponent;
  let fixture: ComponentFixture<AddRolesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRolesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRolesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
