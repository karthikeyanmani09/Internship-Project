import {shallowMount} from "@vue/test-utils";
import UpdateTodo from "@/pages/UpdateTodo.vue";
import moxios from "moxios";
import sinon from "sinon";
import axios from "axios";
import {equal} from "assert";

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
	
	beforeEach(function () {
		moxios.install()
	})
	
	afterEach(function () {
		moxios.uninstall()
	})
	
	test('testing for the post', async()=> {
		moxios.withMock( ()=> {
			let wrapper = shallowMount(UpdateTodo,{
				global: {
					mocks: {
						$route: {params: { id: 1}},
					}
				}
			})
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