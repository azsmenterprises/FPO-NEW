import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaCbboMappingComponent } from './ia-cbbo-mapping.component';

describe('IaCbboMappingComponent', () => {
  let component: IaCbboMappingComponent;
  let fixture: ComponentFixture<IaCbboMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IaCbboMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IaCbboMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
