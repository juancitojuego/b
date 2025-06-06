describe('Sample Test Suite', () => {
  it('should pass a basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should also pass this async test', async () => {
    const promise = new Promise(resolve => setTimeout(() => resolve(5), 10));
    const result = await promise;
    expect(result).toBe(5);
  });
});
