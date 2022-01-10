import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturefieldComponent } from './picturefield.component';

describe('PicturefieldComponent', () => {
  let component: PicturefieldComponent;
  let fixture: ComponentFixture<PicturefieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicturefieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
