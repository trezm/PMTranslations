import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationUploaderComponent } from './translation-uploader.component';

describe('TranslationUploaderComponent', () => {
  let component: TranslationUploaderComponent;
  let fixture: ComponentFixture<TranslationUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
