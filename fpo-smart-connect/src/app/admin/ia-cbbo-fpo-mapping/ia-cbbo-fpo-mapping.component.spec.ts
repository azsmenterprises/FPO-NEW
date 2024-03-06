import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaCbboFpoMappingComponent } from './ia-cbbo-fpo-mapping.component';

describe('IaCbboFpoMappingComponent', () => {
  let component: IaCbboFpoMappingComponent;
  let fixture: ComponentFixture<IaCbboFpoMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IaCbboFpoMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IaCbboFpoMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
