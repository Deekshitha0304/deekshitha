import { beforeAll, afterAll, afterEach } from 'vitest';
import { server } from './setup';
import { http, HttpResponse } from 'msw';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Simulate 200 OK
server.use(
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({
      id: 1,
      name: 'Deekshi',
    });
  }),
);

// Simulate 401 Unauthorized
server.use(
  http.get('https://api.example.com/user', () => {
    return new HttpResponse(null, { status: 401 });
  }),
);

// Simulate 500 with retries

server.use(
  http.get('https://api.example.com/user', () => {
    return new HttpResponse(null, { status: 500 });
  }),
);

// Simulate timeout

import { delay } from 'msw';

Handler: server.use(
  http.get('https://api.example.com/user', async () => {
    await delay(3000);

    return HttpResponse.json({ id: 1 });
  }),
);
