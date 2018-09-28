import { localStorageSyncReducer, logger } from './meta.reducers';

describe('meta reducers', () => {
  describe('logger', () => {
    it('creates', () => {
      const meta = logger((state = {} as any) => state);
      expect(meta).toEqual(expect.any(Function));
    });
  });

  describe('localStorageSyncReducer', () => {
    it('creates', () => {
      const meta = localStorageSyncReducer((state = {} as any) => state);
      expect(meta).toEqual(expect.any(Function));
    });
  });
});
