import { describe, it, expect } from 'vitest';

describe('Example API test', () => {
  it('should fetch data from API', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    expect(data).toHaveProperty('id', 1);
  });
});
