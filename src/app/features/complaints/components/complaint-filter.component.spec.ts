import { ComplaintFilterComponent } from './complaint-filter.component';
import { render, screen, fireEvent } from '@testing-library/angular';
import { ComplaintFilterCriteria } from '../models/complaint.model';
import { signal } from '@angular/core';

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
  });

  it('should render all filter controls', async () => {
    await render(ComplaintFilterComponent, {
      componentInputs: { criteria: signal(initialCriteria) },
    });
    expect(screen.getByLabelText(/date range/i)).toBeTruthy();
    expect(screen.getByLabelText(/medios de comunicación/i)).toBeTruthy();
    expect(screen.getByLabelText(/status/i)).toBeTruthy();
    expect(screen.getByLabelText(/type/i)).toBeTruthy();
    expect(screen.getByLabelText(/search/i)).toBeTruthy();
  });

  it('should emit updated criteria when filters change', async () => {
    const onCriteriaChange = jasmine.createSpy('onCriteriaChange');
    await render(ComplaintFilterComponent, {
      componentInputs: { criteria: signal(initialCriteria) },
      componentOutputs: { criteriaChange: onCriteriaChange },
    });
    fireEvent.change(screen.getByLabelText(/search/i), { target: { value: 'test' } });
    expect(onCriteriaChange).toHaveBeenCalledWith(jasmine.objectContaining({ search: 'test' }));
  });

  it('should be accessible and have i18n attributes', async () => {
    await render(ComplaintFilterComponent, {
      componentInputs: { criteria: signal(initialCriteria) },
    });
  expect(screen.getByLabelText(/date range/i).getAttribute('i18n')).toBeTruthy();
  expect(screen.getByLabelText(/medios de comunicación/i).getAttribute('i18n')).toBeTruthy();
  expect(screen.getByLabelText(/status/i).getAttribute('i18n')).toBeTruthy();
  expect(screen.getByLabelText(/type/i).getAttribute('i18n')).toBeTruthy();
  expect(screen.getByLabelText(/search/i).getAttribute('i18n')).toBeTruthy();
  });

  it('should show loading state when loading', async () => {
    await render(ComplaintFilterComponent, {
      componentInputs: { criteria: signal(initialCriteria), loading: signal(true) },
    });
    expect(screen.getByTestId('filter-loading')).toBeTruthy();
  });

  it('should show error state when error occurs', async () => {
    await render(ComplaintFilterComponent, {
      componentInputs: { criteria: signal(initialCriteria), error: signal('Network error') },
    });
    expect(screen.getByText(/network error/i)).toBeTruthy();
  });
});
