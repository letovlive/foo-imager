import { shallowMount } from '@vue/test-utils';
import TheApp from '@/pages/TheApp.vue';

const wrapper = shallowMount(TheApp, {
  mocks: {
    $t: (msg: any) => msg
  }
}).vm;

describe('TheApp', () => {
  it('name', () => {
    expect(wrapper.$options.name).toEqual('TheApp');
  });
});