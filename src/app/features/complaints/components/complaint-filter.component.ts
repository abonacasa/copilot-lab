import { Component, signal, input, output, ChangeDetectionStrategy } from '@angular/core';
import { ComplaintFilterCriteria } from '../models/complaint.model';

@Component({
  selector: 'app-complaint-filter',
  template: `
    <form class="complaint-filter-form" role="search" aria-label="Complaint Filters">
      <fieldset>
        <legend i18n="@ComplaintFilterComponent date range legend">Date Range</legend>
        <label for="date-from" i18n="@ComplaintFilterComponent date from label">From</label>
  <input id="date-from" type="date" [value]="criteria()?.dateRange?.from ?? ''" (change)="onDateChange('from', $event.target.value)" aria-label="Date from" i18n="@ComplaintFilterComponent date from input" />
        <label for="date-to" i18n="@ComplaintFilterComponent date to label">To</label>
  <input id="date-to" type="date" [value]="criteria()?.dateRange?.to ?? ''" (change)="onDateChange('to', $event.target.value)" aria-label="Date to" i18n="@ComplaintFilterComponent date to input" />
      </fieldset>
      <label for="medios" i18n="@ComplaintFilterComponent medios label">Medios de comunicación</label>
  <select id="medios" multiple [value]="criteria()?.medios ?? []" (change)="onMultiSelectChange('medios', $event)" aria-label="Medios de comunicación" i18n="@ComplaintFilterComponent medios select">
        @for (medio of mediosOptions; track medio) {
          <option [value]="medio">{{ medio }}</option>
        }
      </select>
      <label for="status" i18n="@ComplaintFilterComponent status label">Status</label>
  <select id="status" multiple [value]="criteria()?.status ?? []" (change)="onMultiSelectChange('status', $event)" aria-label="Status" i18n="@ComplaintFilterComponent status select">
        @for (status of statusOptions; track status) {
          <option [value]="status">{{ status }}</option>
        }
      </select>
      <label for="type" i18n="@ComplaintFilterComponent type label">Type</label>
  <select id="type" multiple [value]="criteria()?.type ?? []" (change)="onMultiSelectChange('type', $event)" aria-label="Type" i18n="@ComplaintFilterComponent type select">
        @for (type of typeOptions; track type) {
          <option [value]="type">{{ type }}</option>
        }
      </select>
      <label for="search" i18n="@ComplaintFilterComponent search label">Search</label>
  <input id="search" type="search" [value]="criteria()?.search ?? ''" (input)="onSearchChange($event.target.value)" aria-label="Search" i18n="@ComplaintFilterComponent search input" />
      @if (loading()) {
        <div data-testid="filter-loading" i18n="@ComplaintFilterComponent loading">Loading...</div>
      }
      @if (error()) {
        <div class="error" i18n="@ComplaintFilterComponent error">{{ error() }}</div>
      }
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'complaint-filter',
    'role': 'region',
    'aria-label': 'Complaint Filter',
  },
})
export class ComplaintFilterComponent {
  criteria = input<ComplaintFilterCriteria>();
  loading = input<boolean>(false);
  error = input<string | null>(null);
  criteriaChange = output<ComplaintFilterCriteria>();

  readonly mediosOptions = ['TV', 'Radio', 'Internet', 'Newspaper'];
  readonly statusOptions = ['Open', 'Closed', 'Pending'];
  readonly typeOptions = ['Type1', 'Type2', 'Type3'];

  onDateChange(field: 'from' | 'to', value: string) {
    const current = this.criteria() ?? { dateRange: { from: null, to: null }, medios: [], status: [], type: [], search: '' };
    const next: ComplaintFilterCriteria = {
      ...current,
      dateRange: {
        ...current.dateRange,
        [field]: value ?? null,
      },
      medios: current.medios ?? [],
      status: current.status ?? [],
      type: current.type ?? [],
      search: current.search ?? '',
    };
    this.criteriaChange.emit(next);
  }
  onMultiSelectChange(field: 'medios' | 'status' | 'type', event: Event) {
    const select = event.target as HTMLSelectElement | null;
    const values = select ? Array.from(select.selectedOptions).map(opt => opt.value) : [];
    const current = this.criteria() ?? { dateRange: { from: null, to: null }, medios: [], status: [], type: [], search: '' };
    const next: ComplaintFilterCriteria = {
      ...current,
      [field]: values,
      dateRange: current.dateRange ?? { from: null, to: null },
      medios: field === 'medios' ? values : current.medios ?? [],
      status: field === 'status' ? values : current.status ?? [],
      type: field === 'type' ? values : current.type ?? [],
      search: current.search ?? '',
    };
    this.criteriaChange.emit(next);
  }
  onSearchChange(value: string) {
    const current = this.criteria() ?? { dateRange: { from: null, to: null }, medios: [], status: [], type: [], search: '' };
    const next: ComplaintFilterCriteria = {
      ...current,
      search: value,
      dateRange: current.dateRange ?? { from: null, to: null },
      medios: current.medios ?? [],
      status: current.status ?? [],
      type: current.type ?? [],
    };
    this.criteriaChange.emit(next);
  }
}
