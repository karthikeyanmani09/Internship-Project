<template>
	 
  <HeaderNav></HeaderNav>
	 
  <SideBar></SideBar>
	 
  <ContentSpace></ContentSpace>
	 
</template>

<script>

import HeaderNav from "@/components/HeaderNav";

import ContentSpace from "@/pages/ContentSpace";

import SideBar from "@/components/SideNav";

export default {
	 
  name: 'App',
	 
  components: {
		
    SideBar,
		
    ContentSpace,
		
    HeaderNav
		
  }
  
}

</script>

<style>

</style>
