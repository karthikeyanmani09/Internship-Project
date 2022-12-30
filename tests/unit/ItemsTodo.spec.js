import {shallowMount,mount} from "@vue/test-utils"
import HeaderNav from "@/components/HeaderNav.vue";
import SideNav from "@/components/SideNav.vue";
import ContentSpace from "@/pages/ContentSpace.vue";
import App from "@/App.vue"


const {
	createRouterMock,
	injectRouterMock
}= require('vue-router-mock')


import axios from 'axios'
import moxios from 'moxios'
import sinon from 'sinon'
import { equal } from 'assert'
import ItemsTodo from "@/components/ItemsTodo.vue";

// rendering the Nav bars
describe("ItemsTodo.Vue", () => {
	const router = createRouterMock({
	})
	
	beforeEach(()=>{
		injectRouterMock(router)
	})
	let wrapper;
	
	const mockRouter={
		push: jest.fn()
	}
	const updateWrapper = ()=>{
		wrapper = shallowMount(ItemsTodo,{
			computed:{
				users: jest.fn(),
				displayedPosts: jest.fn()
			},
			created: jest.fn(),
			global:{
				mocks:{
					$router: mockRouter
				}
			},
			stubs:['router-link']
		})
	}
test("rendering AdminLte themes",()=>{
	const wrapper = shallowMount(App)
	expect(wrapper.findComponent(SideNav).exists()).toBe(true)
	expect(wrapper.findComponent(HeaderNav).exists()).toBe(true)
	expect(wrapper.findComponent(ContentSpace).exists()).toBe(true)
})

	beforeEach(function () {
		
		updateWrapper();
		
		moxios.install();
	})
	
	afterEach(function () {
		moxios.uninstall()
	})
	
	it('ItemsTodo be mounted', () => {
		expect(wrapper.exists()).toBeTruthy()
	})
	
	//mocking the axios to check get method
	test('testing for the getData', async()=> {
		
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
	
	test('route on buttons',async()=>{
		wrapper.vm.redirectTo()
		await wrapper.find(".button1").trigger("click")
		expect(mockRouter.push).toHaveBeenCalledTimes(2)
		expect(mockRouter.push).toHaveBeenCalledWith('/add')
	})
	
	test('checking the routes passing id',async()=>{
		const id = 1
		await expect(wrapper.exists(id)).toBe(true);
	})
	
	
})