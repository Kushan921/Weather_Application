import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, test, beforeAll, afterAll, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';


const server = setupServer(
  http.get('https://api.openweathermap.org/geo/1.0/direct', () => {
    return HttpResponse.json([{ name: 'London', lat: 51.5, lon: -0.12, country: 'GB' }]);
  })
);

beforeAll(()=>server.listen());
afterAll(()=>server.close());
afterEach(()=>server.resetHandlers());

test('shows suggestions', async () => {
  const onSelect = vi.fn();
  render(<SearchBar onSelect={onSelect} />);
  fireEvent.change(screen.getByPlaceholderText(/search city/i), { target: { value: 'Lon' }});
  await waitFor(()=> expect(screen.getByText(/London/)).toBeInTheDocument());
});
