import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTranslationViewerComponent } from './single-translation-viewer.component';

describe('SingleTranslationViewerComponent', () => {
  let component: SingleTranslationViewerComponent;
  let fixture: ComponentFixture<SingleTranslationViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTranslationViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTranslationViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
