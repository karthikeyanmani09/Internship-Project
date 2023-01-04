import {mount} from "@vue/test-utils"

import AddTodo from "@/pages/AddTodo.vue";

import moxios from "moxios";

import sinon from "sinon";

import axios from "axios";

import {equal} from "assert";

import Swal from "sweetalert2";

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
	
	test('checking the input field',async()=>{
		
		const wrapper = mount(AddTodo)
		
		expect(wrapper.findAll('label').length).toEqual(2)
		
		expect(wrapper.findAll('label').at(0).text()).toMatch('Title')
		
		expect(wrapper.findAll('label').at(1).text()).toMatch('Body')
		
	})
	
	test('checking the input field',async()=>{
		
		const wrapper = mount(AddTodo)
		
		expect(wrapper.findAll('button').length).toEqual(2)
		
		expect(wrapper.findAll('button').at(0).text()).toMatch('Cancel')
		
		expect(wrapper.findAll('button').at(1).text()).toMatch('Add')
		
	})
	
	test("renders title and body text", async () => {
		
		let wrapper = mount(AddTodo,{
			
			stubs:['router-link','required','Swal']
			
		})
		
		await wrapper.find('[data-test="title"]').setValue('title1')
		
		await wrapper.find('[data-test="body"]').setValue('body1')
		
		await wrapper.findAll("button").at(1).trigger("click")
		
		expect(wrapper.vm.title).toBe('title1')
		
		expect(wrapper.vm.body).toBe('body1')
	})
	
	test('Add the list', async()=> {
		
		moxios.withMock( ()=> {
			
			let wrapper = mount(AddTodo,{
				
				global: {
					
					mocks: {
						
						$router: mockRouter,
						loading:false
					}
					
				},
				
				stubs:['router-link','required','Swal','loading']
				
			})
			
			wrapper.vm.onPost()

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
	
	test("testing the route to home on cancel",async()=>{
		
		const wrapper = mount(AddTodo)
		
		wrapper.vm.addRedirect()
		
		await wrapper.findAll("button").at(0).trigger("click")
		
		expect(mockRouter.push).toHaveBeenCalledTimes(1)
		
		expect(mockRouter.push).toHaveBeenCalledWith('/home')
		
	})

	test('testCases on `Loader` ',async()=>{
		
		const wrapper = mount(AddTodo,{
			data()
			{
				return {
					
					loading: false
					
				}
				
			},

			global: {

				mocks: {

					$router: mockRouter,
					loading:false

				}

			},

			stubs:['router-link','required','loading','Swal']
			
		})
		
		expect(wrapper.vm.loading).toBe(false)

		expect(wrapper.findAll('button').at(1).trigger('click'))

		wrapper.vm.loading = true

		expect(wrapper.vm.loading).toBe(true)
	})
	
	})
	
	