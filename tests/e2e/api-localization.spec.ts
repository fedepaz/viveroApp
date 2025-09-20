import { test, expect } from '@playwright/test';

test.describe('Backend Localized API Responses', () => {
  test('should return localized messages for a valid locale', async ({ request }) => {
    const response = await request.get('http://localhost:3001/messages/es'); // Assuming backend runs on port 3001
    expect(response.ok()).toBeTruthy();
    const messages = await response.json();
    expect(typeof messages).toBe('object');
    expect(messages).not.toBeNull();
    // Add more specific assertions based on expected Spanish messages
    // expect(messages.welcome).toBe('Bienvenido');
  });

  test('should return 404 for an invalid locale', async ({ request }) => {
    const response = await request.get('http://localhost:3001/messages/xx');
    expect(response.status()).toBe(404);
  });
});
