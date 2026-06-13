import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../store/store';
import Settings from './Settings';

// Mock Chart.js completely
vi.mock('react-chartjs-2', () => ({
  Line: () => null,
  Doughnut: () => null,
  Bar: () => null,
}));

describe('Settings Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Settings />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toBeTruthy();
  });
});
