import { shallowMount } from '@vue/test-utils';
import BottomNav from '@/components/BottomNav.vue';

describe('BottomNav.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Dashboard';
    const wrapper = shallowMount(BottomNav);
    expect(wrapper.text()).toMatch(msg);
  });
});
