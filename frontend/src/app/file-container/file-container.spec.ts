import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileContainer } from './file-container';

describe('FileContainer', () => {
  let component: FileContainer;
  let fixture: ComponentFixture<FileContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
