import {shallowMount} from "@vue/test-utils";
import UpdateTodo from "@/pages/UpdateTodo.vue";

describe('Client', () => {
	it('should mount Client', async () => {
		const wrapper = shallowMount(UpdateTodo, {
			global: {
				mocks: {
					$route: {params: { id: 1}},
				}
			}
		})
		expect(wrapper.exists()).toBe(true);
	});
});