<template>
	<aside class="main-sidebar sidebar-dark-primary">
		<!-- Brand Logo -->
		<a href="#" class="brand-link">
			<img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3">
			<span class="brand-text font-weight-light">AdminLTE 3</span>
		</a>
		
		<!-- Sidebar -->
		<div class="sidebar">
			<!-- Sidebar user panel (optional) -->
			<nav class="mt-2">
				<ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
					<li class="nav-item menu-open">
						<a  href="#" class="nav-link active">
							<i class="nav-icon fas fa-tachometer-alt"></i>
							<p>
								Posts
								<i class="right fas fa-angle-left"></i>
							</p>
						</a>
						<ul class="nav nav-treeview">
							<li class="nav-item">
								<a href="#" class="nav-link" :class="{active: isActive}"  @click="homeRedirect();setActive()">
									<i class="far fa-circle nav-icon"></i>
									<p>List</p>
								</a>
							</li>
							<li class="nav-item">
								<router-link class="nav-link " :class="{active: notActive}" to="/add" @click="setActives()">
									<i class="far fa-circle nav-icon"></i>
									<p >Create</p>
							</router-link>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</div>
	</aside>
</template>

<script>
export default {
  name:"SideBar",
	data(){
		return{
			isActive: true,
			notActive: false,
		}
	},
	methods:{
	addRedirect() {
			this.$router.push('/add')
			
		},homeRedirect() {
			this.$router.push('/home')
		},
		setActive(){
		this.isActive = true;
		this.notActive = false;
		},
		setActives(){
			this.notActive = true;
			this.isActive = false;
		}
		
		},
	}

</script>

<style scoped>

</style>