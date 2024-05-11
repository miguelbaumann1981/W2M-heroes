import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHeroViewComponent } from './edit-hero-view.component';

describe('EditHeroViewComponent', () => {
  let component: EditHeroViewComponent;
  let fixture: ComponentFixture<EditHeroViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHeroViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHeroViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
