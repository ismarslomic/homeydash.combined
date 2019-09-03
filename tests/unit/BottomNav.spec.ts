import BottomNav from '@/components/BottomNav.vue';
import routes from '@/router/routes';
import VueTestUtils, { createLocalVue, mount, Wrapper } from '@vue/test-utils';
import Router from 'vue-router';
import Vuetify from 'vuetify';
// @ts-ignore
import { Breakpoint } from 'vuetify/lib/services';

const localVue = createLocalVue();
localVue.use(Router);

/* tslint:disable:no-empty */
// @ts-ignore
VueTestUtils.config.mocks.$t = () => {
};

describe('BottomNav', () => {
    let vuetify: any;
    let router: Router;
    const breakpoint: Breakpoint = new Breakpoint();
    const tresholds = {
        lg: breakpoint.thresholds.md - breakpoint.scrollbarWidth,
        xl: breakpoint.thresholds.lg - breakpoint.scrollbarWidth,
        md: breakpoint.thresholds.md - breakpoint.scrollbarWidth - 1,
        sm: breakpoint.thresholds.sm - breakpoint.scrollbarWidth - 1
    };
    let wrapper: Wrapper<BottomNav>;

    beforeEach(() => {
        vuetify = new Vuetify();
        router = new Router({routes});
        wrapper = mount(BottomNav, {
            localVue,
            vuetify,
            router
        });
    });

    it('hides more button when lg', async () => {
        await resizeWindow(tresholds.lg, 1024);
        expect(wrapper.find('#bottomsheet-overflow').exists()).toBeFalsy();
    });

    it('hides more button when xl', async () => {
        await resizeWindow(tresholds.xl, 1024);
        expect(wrapper.find('#bottomsheet-overflow').exists()).toBeFalsy();
    });

    it('shows more button when md', async () => {
        await resizeWindow(tresholds.md, 1024);
        expect(wrapper.find('#bottomsheet-overflow').exists()).toBeTruthy();
    });

    it('shows more button when sm', async () => {
        await resizeWindow(tresholds.sm, 1024);
        expect(wrapper.find('#bottomsheet-overflow').exists()).toBeTruthy();
    });
});

export const resizeWindow = (width = window.innerWidth, height = window.innerHeight) => {
    (window as any).innerWidth = width;
    (window as any).innerHeight = height;
    window.dispatchEvent(new Event('resize'));
    return new Promise((resolve) => setTimeout(resolve, 200));
};
