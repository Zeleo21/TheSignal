import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExlorer } from './file-exlorer';

describe('FileExlorer', () => {
  let component: FileExlorer;
  let fixture: ComponentFixture<FileExlorer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileExlorer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileExlorer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
