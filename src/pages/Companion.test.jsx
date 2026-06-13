import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store/store';
import Companion from './Companion';

// Mock Chart.js completely
vi.mock('react-chartjs-2', () => ({
  Line: () => null,
  Doughnut: () => null,
  Bar: () => null,
}));

describe('Companion Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Companion />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toBeTruthy();
  });
});
