import { removeProp, removeProps } from './helpers';
import { User, user1 } from './test.fixtures';

describe('helpers', () => {
  describe('mergeNormalizedEntities', () => {});

  describe('removeProps', () => {
    let subject: User;

    beforeEach(() => {
      subject = { ...user1 };
    });

    it('removes given properties from the target object', () => {
      expect(removeProps(subject, ['firstname', 'planet'])).toMatchSnapshot();
    });

    it('does not change the original object', () => {
      removeProps(subject, ['planet', 'id', 'lastname']);
      expect(subject).toEqual(user1);
    });
  });

  describe('removeProp', () => {
    let subject: User;

    beforeEach(() => {
      subject = { ...user1 };
    });

    it('removes given property from the target object', () => {
      expect(removeProp(subject, 'firstname')).toMatchSnapshot();
    });

    it('does not change the original object', () => {
      removeProp(subject, 'planet');
      expect(subject).toEqual(user1);
    });
  });
});
