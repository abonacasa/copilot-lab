import { ComplaintFilterComponent } from './complaint-filter.component';
import { ComplaintFilterCriteria } from '../models/complaint.model';
import { signal, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

@Component({
  selector: 'test-host',
  template: `
    <app-complaint-filter
      [criteria]="criteria"
      [loading]="loading"
      [error]="error"
      (criteriaChange)="onCriteriaChange($event)"
    ></app-complaint-filter>
  `,
  standalone: true,
  imports: [ComplaintFilterComponent],
})
class TestHostComponent {
  criteria = signal<ComplaintFilterCriteria | undefined>(undefined);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  emitted: ComplaintFilterCriteria | undefined;
  onCriteriaChange(value: ComplaintFilterCriteria) {
    this.emitted = value;
  }
}

describe('ComplaintFilterComponent', () => {
  let initialCriteria: ComplaintFilterCriteria;

  beforeEach(() => {
    initialCriteria = {
      dateRange: { from: null, to: null },
      medios: [],
      status: [],
      type: [],
      search: '',
    };
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    });
  });

  function createHost() {
    return TestBed.createComponent(TestHostComponent);
  }

  it('should render all filter controls', () => {
    const ref = createHost();
    ref.componentInstance.criteria.set(initialCriteria);
    ref.detectChanges();
    const el = ref.nativeElement as HTMLElement;
    expect(el.querySelector('input[type="date"]')).toBeTruthy();
    expect(el.querySelector('select#medios')).toBeTruthy();
    expect(el.querySelector('select#status')).toBeTruthy();
    expect(el.querySelector('select#type')).toBeTruthy();
    expect(el.querySelector('input[type="search"]')).toBeTruthy();
  });

  it('should emit updated criteria when filters change', () => {
    const ref = createHost();
    ref.componentInstance.criteria.set(initialCriteria);
    ref.detectChanges();
    const searchInput = ref.nativeElement.querySelector('input[type="search"]') as HTMLInputElement;
    searchInput.value = 'test';
    searchInput.dispatchEvent(new Event('input'));
    ref.detectChanges();
    expect(ref.componentInstance.emitted).toEqual(jasmine.objectContaining({ search: 'test' }));
  });

  it('should be accessible and have i18n attributes', () => {
    const ref = createHost();
    ref.componentInstance.criteria.set(initialCriteria);
    ref.detectChanges();
    const el = ref.nativeElement as HTMLElement;
    // Verifica que las etiquetas sean legibles
    const labels = Array.from(el.querySelectorAll('label')).map(l => l.textContent?.trim());
    expect(labels).toContain('Search');
    expect(labels).toContain('Status');
    expect(labels).toContain('Type');

    // Verifica que los campos tengan aria-labels válidos
    const inputs = Array.from(el.querySelectorAll('[aria-label]'));
    expect(inputs.length).toBeGreaterThan(0);
    expect(inputs.some(i => i.getAttribute('aria-label') === 'Search')).toBeTrue();
  });

  it('should show loading state when loading', () => {
    const ref = createHost();
    ref.componentInstance.criteria.set(initialCriteria);
    ref.componentInstance.loading.set(true);
    ref.detectChanges();
    const el = ref.nativeElement as HTMLElement;
    expect(el.querySelector('[data-testid="filter-loading"]')).toBeTruthy();
  });

  it('should show error state when error occurs', () => {
    const ref = createHost();
    ref.componentInstance.criteria.set(initialCriteria);
    ref.componentInstance.error.set('Network error');
    ref.detectChanges();
    const el = ref.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Network error');
  });
});
