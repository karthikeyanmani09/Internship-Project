import {mount} from "@vue/test-utils"
import AddTodo from "@/pages/AddTodo.vue";
import moxios from "moxios";
import sinon from "sinon";
import axios from "axios";
import {equal} from "assert";
const {
	createRouterMock,
	injectRouterMock,
} = require('vue-router-mock')


describe("Adding Data", () => {
	const router = createRouterMock({
	})
	beforeEach(() => {
		injectRouterMock(router)
	})
	test("renders title and body text", async () => {
		let wrapper = mount(AddTodo)
		
		await wrapper.find("[data-title]").setValue("Title1")
		await wrapper.find("[data-body]").setValue("Body2")
		
		await wrapper.find(".button1").trigger("click")
		
		expect(wrapper.find(".title").text())
		expect(wrapper.find(".body").text())
	})
	
	test('update the list', async()=> {
		const mockRouter = {
			push: jest.fn()
		}
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