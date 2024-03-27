import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTextSkeletonComponent } from './ngx-text-skeleton.component';

describe('NgxTextSkeletonComponent', () => {
  let component: NgxTextSkeletonComponent;
  let fixture: ComponentFixture<NgxTextSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxTextSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxTextSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
