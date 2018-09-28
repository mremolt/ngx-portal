import * as api from './public_api';

describe('public API', () => {
  it('exports without error', () => {
    expect(api).toEqual(expect.any(Object));
  });
});
