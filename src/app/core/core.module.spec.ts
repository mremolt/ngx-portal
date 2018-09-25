import { CoreModule, getMetaReducers, getReducers } from './core.module';

describe('CoreModule', () => {
  let coreModule: CoreModule;

  beforeEach(() => {
    coreModule = new CoreModule();
  });

  it('should create an instance', () => {
    expect(coreModule).toBeTruthy();
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
