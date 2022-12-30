import {shallowMount,mount} from "@vue/test-utils";

import UpdateTodo from "@/pages/UpdateTodo.vue";
import moxios from "moxios";
import sinon from "sinon";
import axios from "axios";
import {equal} from "assert";
import AddTodo from "@/pages/AddTodo.vue";

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
		wrapper = shallowMount(UpdateTodo,{
			global: {
				mocks: {
					$router: {params: { id: 1}},
				}
			},
			created:jest.fn(),
			stubs:['router-link']
		})
	}
	
	
	test("renders title and body text", async () => {
		
		let wrapper = mount(UpdateTodo,{
			global: {
				mocks: {
					$router: {params: { id: 1}},
				}
			},
			created:jest.fn(),
			stubs:['router-link']
		})
		
		
	})
	
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
		
		moxios.withMock( ()=> {
			wrapper = sinon.spy()
			axios.get('https://jsonplaceholder.typicode.com/posts/id').then(wrapper)
			
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
		const wrapper = mount(UpdateTodo)
	
		expect(wrapper.findAll('input').length).toEqual(2)
		expect(wrapper.findAll('input').at(0).text()).toMatch('')
		expect(wrapper.findAll('input').at(1).text()).toMatch('')
	})
	
});
