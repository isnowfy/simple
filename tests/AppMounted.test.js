import { shallowMount } from '@vue/test-utils';
import App from '../src/client/App.vue';

describe('App Mounted', () => {
  let originalLocation;

  beforeAll(() => {
    originalLocation = window.location;
    delete window.location;
    window.location = { href: 'http://example.com', protocol: 'http:' };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  test('should redirect to HTTPS if protocol is HTTP', () => {
    shallowMount(App);
    expect(window.location.href).toBe('https://example.com');
  });

  test('should not redirect if protocol is already HTTPS', () => {
    window.location.protocol = 'https:';
    window.location.href = 'https://example.com';
    shallowMount(App);
    expect(window.location.href).toBe('https://example.com');
  });
});