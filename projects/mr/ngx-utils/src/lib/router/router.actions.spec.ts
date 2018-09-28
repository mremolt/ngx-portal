import { Back, Forward, Go } from './router.actions';

describe('Router actions', () => {
  describe('Go', () => {
    it('creates the correct action', () => {
      expect(new Go({ path: ['foo'] })).toMatchSnapshot();
    });
  });

  describe('Back', () => {
    it('creates the correct action', () => {
      expect(new Back()).toMatchSnapshot();
    });
  });

  describe('Forward', () => {
    it('creates the correct action', () => {
      expect(new Forward()).toMatchSnapshot();
    });
  });
});
