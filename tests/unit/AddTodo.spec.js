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

	let wrapper;
	
	const router = createRouterMock({
	
	})
	
	beforeEach(() => {
		
		injectRouterMock(router)
		
	})

	const addWrapper=()=>{
		wrapper = mount(AddTodo,{

			global: {

				mocks: {

					$router: mockRouter,
					loading:false
				}

			},

			stubs:['router-link','required','Swal','loading']

		})
	}
	
	test('checking the input field',async()=>{
		
		expect(wrapper.findAll('label').length).toEqual(2)
		
		expect(wrapper.findAll('label').at(0).text()).toMatch('Title')
		
		expect(wrapper.findAll('label').at(1).text()).toMatch('Body')
		
	})
	
	test('checking the input field',async()=>{
		
		expect(wrapper.findAll('button').length).toEqual(2)
		
		expect(wrapper.findAll('button').at(0).text()).toMatch('Cancel')
		
		expect(wrapper.findAll('button').at(1).text()).toMatch('Add')
		
	})
	
	test("renders title and body text", async () => {
		
		await wrapper.find('[data-test="title"]').setValue('title1')
		
		await wrapper.find('[data-test="body"]').setValue('body1')
		
		await wrapper.findAll("button").at(1).trigger("click")
		
		expect(wrapper.vm.title).toBe('title1')
		
		expect(wrapper.vm.body).toBe('body1')
	})

	beforeEach(function () {

		moxios.install()

		addWrapper();

	})

	afterEach(function () {

		moxios.uninstall()

	})

	test('Add the list', async()=> {
		
		moxios.withMock( ()=> {

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

		wrapper.vm.addRedirect()
		
		await wrapper.findAll("button").at(0).trigger("click")
		
		expect(mockRouter.push).toHaveBeenCalledTimes(3)
		
		expect(mockRouter.push).toHaveBeenCalledWith('/home')
		
	})

	test('testCases on `Loader` ',async()=>{

		expect(wrapper.vm.loading).toEqual(false)

		expect(wrapper.findAll('button').at(1).trigger('click'))

		wrapper.vm.loading = true

		expect(wrapper.vm.loading).toEqual(true)
	})
	
	})
	
	