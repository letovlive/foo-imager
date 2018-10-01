import AppComponent from './../App';
import { shallowMount } from '@vue/test-utils';

const App = shallowMount(AppComponent, {
  mocks: {
    $t: (msg) => msg
  }
}).vm;

describe('App', () => {
  it('name', () => {
    expect(App.$options.name).toEqual('App');
  });
});
