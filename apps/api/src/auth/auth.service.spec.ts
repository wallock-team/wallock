import { Profile } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

const service = new AuthService(null, null);
const prototype = Object.getPrototypeOf(service);
let methods: any;
describe('AuthService', () => {
  beforeEach(() => {
    methods = {
      findGoogleOpenId: jest.spyOn(prototype, 'findGoogleOpenId'),
      createGoogleOpenId: jest.spyOn(prototype, 'createGoogleOpenId'),
      signJwt: jest.spyOn(prototype, 'signJwt'),
    };
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('loginOrSignUpFromGoogle', () => {
    it('returns the existing User and a JWT when `sub` exists in db', async () => {
      const EXISTING_USER = {};
      methods.findGoogleOpenId.mockImplementation(() => EXISTING_USER);

      const SIGNED_JWT = 'Signed JWT';
      methods.signJwt.mockImplementation(() => SIGNED_JWT);

      const returned = await service.loginOrSignUpFromGoogle({} as Profile);

      expect(returned.user).toBe(EXISTING_USER);
      expect(returned.jwt).toBe(SIGNED_JWT);
      expect(methods.createGoogleOpenId).not.toBeCalled();
    });

    it('returns a new User and a JWT when `sub` doesnt exists in db', async () => {
      const USER_NOT_EXIST = null;
      methods.findGoogleOpenId.mockImplementation(() => USER_NOT_EXIST);

      const NEWLY_CREATED_USER = {};
      methods.createGoogleOpenId.mockImplementation(() => NEWLY_CREATED_USER);

      const SIGNED_JWT = 'Signed JWT';
      methods.signJwt.mockImplementation(() => SIGNED_JWT);

      const returned = await service.loginOrSignUpFromGoogle({} as Profile);

      expect(returned.user).toBe(NEWLY_CREATED_USER);
      expect(returned.jwt).toBe(SIGNED_JWT);
    });
  });
});

export {};
