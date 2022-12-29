import {mount,shallowMount} from "@vue/test-utils"
import AddTodo from "@/pages/AddTodo.vue";
import moxios from "moxios";
import sinon from "sinon";
import axios from "axios";
import {equal} from "assert";
const {
	createRouterMock,
	injectRouterMock,
} = require('vue-router-mock')

const mockRouter = {
	push: jest.fn()
}


describe("Adding Data", () => {
	const router = createRouterMock({
	})
	beforeEach(() => {
		injectRouterMock(router)
	})
	test("renders title and body text", async () => {
		let wrapper = mount(AddTodo)
		
		await wrapper.find('[data-test="title"]').setValue('title')
		await wrapper.find('[data-test="body"]').setValue('body')
		
		await wrapper.find("button").trigger("click")
		
		expect(wrapper.vm.title).toMatch('title')
		
		expect(wrapper.vm.body).toMatch('body')
	})
	
	test('update the list', async()=> {
		moxios.withMock( ()=> {
			let wrapper = mount(AddTodo,{
				global: {
					mocks: {
						$router: mockRouter
					}
				}
			})
			wrapper.find("button").trigger("click")
			wrapper = sinon.spy()
			axios.post('https://jsonplaceholder.typicode.com/posts').then(wrapper)
			
			moxios.wait(()=> {
				let request = moxios.requests.mostRecent()
				request.respondWith({
						status: 200,
						response: {
							title: 'title1', body: 'body1'
						}
					})
					.then(()=> {
						equal(wrapper.called, true)
						
					})
			})
			expect(mockRouter.push).toHaveBeenCalledTimes(1)
			expect(mockRouter.push).toHaveBeenCalledWith('/home')
		})
	})
	})
	
	