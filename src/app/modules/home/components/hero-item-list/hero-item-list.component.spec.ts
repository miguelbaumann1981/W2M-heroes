import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroItemListComponent } from './hero-item-list.component';

describe('HeroItemListComponent', () => {
  let component: HeroItemListComponent;
  let fixture: ComponentFixture<HeroItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroItemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
