import { shallowMount} from "@vue/test-utils"
import HeaderNav from "@/components/HeaderNav.vue";
import SideNav from "@/components/SideNav.vue";
import ContentSpace from "@/pages/ContentSpace.vue";
import App from "@/App.vue"

import axios from 'axios'
import moxios from 'moxios'
import sinon from 'sinon'
import { equal } from 'assert'
import ItemsTodo from "@/components/ItemsTodo.vue";

describe("App.vue", () => {
	
it("rendering",()=>{
	const wrapper = shallowMount(App)
	
	expect(wrapper.findComponent(SideNav).exists()).toBe(true)
	expect(wrapper.findComponent(HeaderNav).exists()).toBe(true)
	expect(wrapper.findComponent(ContentSpace).exists()).toBe(true)
})

	beforeEach(function () {
		moxios.install()
	})
	
	afterEach(function () {
		moxios.uninstall()
	})
	
	test('testing for the post', async()=> {
		moxios.withMock( ()=> {
		let wrapper = shallowMount(ItemsTodo)
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
	
	test('route on buttons',()=>{
		const wrapper = shallowMount(ItemsTodo)
		expect(wrapper.html()).toHaveLength(1)
		wrapper.find('.button3').trigger('click')
		expect(wrapper.html()).toHaveLength(0)
	})
	
	test('checking the routes passing id',async()=>{
		const id = 1
		const wrapper = shallowMount(ItemsTodo,{
			global:{
				mocks:{
					$route:{
						params:{id}
					}
				}
			}
		})
		await wrapper.find(".button2").trigger("click")
		
		expect(wrapper.find("id").number()).toBe(id)
	})
	
})