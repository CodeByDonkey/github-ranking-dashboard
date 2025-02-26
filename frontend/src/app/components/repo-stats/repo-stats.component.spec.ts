import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoStatsComponent } from './repo-stats.component';

describe('RepoStatsComponent', () => {
  let component: RepoStatsComponent;
  let fixture: ComponentFixture<RepoStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepoStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepoStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
