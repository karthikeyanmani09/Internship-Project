import {mount} from "@vue/test-utils";

import UpdateTodo from "@/pages/UpdateTodo.vue";

import moxios from "moxios";

import sinon from "sinon";

import axios from "axios";

import {equal} from "assert";

import Swal from 'sweetalert2';

import flushPromises from "flush-promises";

const {
	
	createRouterMock,
	
	injectRouterMock
	
}= require('vue-router-mock')


describe('UpdateTodo.vue', () => {
	
	let wrapper;
	
	const router = createRouterMock({
	
	})
	
	beforeEach(()=>{
		
		injectRouterMock(router)
		
	})
	const updateWrapper=()=>{
		
		wrapper = mount(UpdateTodo,{
			
			global: {
				
				mocks: {
					
					$router: {params: { id: 1}},
					loading: false,
				}
				
			},
			data(){
			return{
				loading:false
			}
			},
			
			created:jest.fn(),
			
			stubs:['router-link','required','loading','Swal']
			
		})
		
	}
	
	
	test('UpdateTodo be mounted', async () => {
		
		await expect(wrapper.exists()).toBeTruthy()
		
	})
	
	test('route params id', async () => {
		
		const id = 1
		
		expect(wrapper.exists(id)).toBe(true);
		
	});
	
	beforeEach(function () {
		
		moxios.install()
		
		updateWrapper();
		
	})
	
	afterEach(function () {
		
		moxios.uninstall()
		
	})
	
	test('testing for the post', async()=> {
		
		wrapper.vm.onSubmit()

		expect(wrapper.findAll('button').at(0).trigger("click"))
		
		moxios.withMock( ()=> {
			
			wrapper = sinon.spy()
			
			axios.get('https://jsonplaceholder.typicode.com/posts/id').then(wrapper).loading=true
			
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
			
		})
		
	})
	
	test('testing the label',async()=>{
		
		const wrapper = mount(UpdateTodo)
		
		expect(wrapper.findAll('label').length).toEqual(2)
		
		expect(wrapper.findAll('label').at(0).text()).toMatch('Title')
		
		expect(wrapper.findAll('label').at(1).text()).toMatch('Body')
		
	})
	
	test('testing the button in vm',async()=>{
		
		expect(wrapper.findAll('button').length).toEqual(2)
		
		expect(wrapper.findAll('button').at(0).text()).toMatch('Save Changes')
		
		expect(wrapper.findAll('button').at(1).text()).toMatch('Cancel')
		
	})
	
	test('testing the input field', async()=>{

	
		expect(wrapper.findAll('input').length).toEqual(2)
		
		expect(wrapper.findAll('input').at(0).text()).toMatch('')
		
		expect(wrapper.findAll('input').at(1).text()).toMatch('')
		
	})

	test('testCases on `Loader` ',async()=>{
		expect(wrapper.vm.loading).toBe(false)

		expect(wrapper.findAll('input').at(0).trigger('click'))

		wrapper.vm.loading = true

		expect(wrapper.vm.loading).toBe(true)
	})

	test('post id fetching ',async ()=>{

		wrapper.vm.getPosts()

		moxios.withMock( ()=> {

			wrapper = sinon.spy()

			axios.get('https://jsonplaceholder.typicode.com/posts').then(wrapper)

			moxios.wait(()=> {

				let request = moxios.requests.mostRecent()

				request.respondWith({

					status: 200,

					response: {

						id: 1, userid:1, title: 'title1', body: 'body1'

					}

				})

					.then(()=> {

						equal(wrapper.called, true)

					})

			})
		})
	})


});
