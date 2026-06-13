import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../store/store';
import PomodoroTimer from './PomodoroTimer';

// Mock Chart.js completely
vi.mock('react-chartjs-2', () => ({
  Line: () => null,
  Doughnut: () => null,
  Bar: () => null,
}));

describe('PomodoroTimer Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PomodoroTimer />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toBeTruthy();
  });
});
