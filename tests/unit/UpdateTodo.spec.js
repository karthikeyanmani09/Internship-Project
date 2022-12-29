import {shallowMount} from "@vue/test-utils";
import UpdateTodo from "@/pages/UpdateTodo.vue";
import moxios from "moxios";
import sinon from "sinon";
import axios from "axios";
import {equal} from "assert";

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
	
	test('UpdateTodo be mounted', async () => {
		await expect(wrapper.exists()).toBeTruthy()
	})
	
	test('route params id', async () => {
		await expect(wrapper.exists()).toBe(true);
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
});