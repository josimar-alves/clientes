import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteFilterExample } from './autocomplete-filter-example.component';

describe('AutocompleteFilterExampleComponent', () => {
  let component: AutocompleteFilterExample;
  let fixture: ComponentFixture<AutocompleteFilterExample>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteFilterExample ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteFilterExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
