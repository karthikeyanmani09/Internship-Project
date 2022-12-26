import {shallowMount} from '@vue/test-utils'
import UpdateTodo from "@/pages/UpdateTodo.vue";

jest.mock('axios',()=>({
	params : 1
}))

test('put async when button is clicked',async()=>{
	const wrapper = shallowMount(UpdateTodo)
	await wrapper.find('button').trigger('click')
	expect(wrapper.text()).toBe('1')
})
