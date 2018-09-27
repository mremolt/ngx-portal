import { ReducersModule, getMetaReducers, getReducers } from './reducers.module';

describe('ReducersModule', () => {
  let reducersModule: ReducersModule;

  beforeEach(() => {
    reducersModule = new ReducersModule();
  });

  it('should create an instance', () => {
    expect(reducersModule).toBeTruthy();
  });

  describe('getReducers', () => {
    it('returns the reducers', () => {
      expect(getReducers()).toMatchSnapshot();
    });
  });

  describe('getMetaReducers', () => {
    it('returns an Array of meta reducers', () => {
      const subject = getMetaReducers();
      expect(subject).toEqual(expect.any(Array));

      expect(subject).toMatchSnapshot();
    });
  });
});
