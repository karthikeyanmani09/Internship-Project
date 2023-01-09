<template>

<div class="content-wrapper">
		
  <section class="content-header">
		  
    <div class="container-fluid">
		    
      <div class="row mb-2">
		      
        <div class="col-sm-6">
		        
          <h1>Post</h1>
		        
        </div>
		      
        <div class="col-sm-6">
		        
          <ol class="breadcrumb float-sm-right">
		          
            <li class="breadcrumb-item">
		           
	            <router-link to="/home">List</router-link>
		           
            </li>
		          
            <li class="breadcrumb-item active">Create</li>
		          
          </ol>
		        
        </div>
		      
      </div>
		    
    </div>
		  
  </section>
		
  <section class="content">
		  
    <div class="row">
		    
      <div class="col-md-12">
		      
        <div class="card card-primary">
			  
			  <div class="card-header">
					
					<h3 class="card-title">Post</h3>
           
            </div>
			  
          <div class="card-body">
				
            <Form @submit="">
				  
              <div class="form-group">
					
                <label for="postTitle"> Title </label>
					
                <Field type="text" :rules="validateForm" name="title" id="title" data-test="title" placeholder="Title"  v-model="title" class="form-control" />
					
			              <ErrorMessage class="text-red" name="title"/>
					
              </div>
				  
              <div class="form-group">
					
                <label for="postBody"> Body </label>
					
                <Field  type="text" name="body" :rules="validateForm"  id="body" placeholder="Body" data-test="body"  v-model="body" class="form-control body" rows="3"/>
	             
	              <ErrorMessage class="text-red" name="body"/>
              
			  </div>
	     
				  <div class="row">
		           
		            <div class="col-12">
			           
						  <button class="btn btn-secondary Cancel" @click="addRedirect()"><i class="fas fa-times"></i>  Cancel</button>
			     
						  <button class="btn btn-success swalDefaultSuccess float-right" id="Add"  type="submit"  @click="onPost()"><i class="fas fa-plus"></i>  Add</button>
		           
		            </div>
	           
	            </div>
            
			</Form>
				
          </div>
			  
		        <div class="overlay" v-if="loading">
					  
					  <i class=" fa fa-spinner fa-3x fa-spin"></i>
					  
		        </div>
        </div>
			
      </div>
		  
	    </div>
		
  </section>
	 
</div>
	
	<footer class="main-footer">
		
		<div class="float-right d-none d-sm-block">
			
			<b>Version</b> 3.2.0
			
		</div>
		
		<strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights reserved.
		
	</footer>
	
	<aside class="control-sidebar control-sidebar-dark">
	
	</aside>
	
</template>

<script>

import axios from 'axios'

import {Form,Field,ErrorMessage} from "vee-validate";

export default {
	 
  name:"AddTodo",
	 
	components:{
	
	Form,Field,ErrorMessage
	},
	 
  data(){
		
    return{
		  
      userId:null,
		  
      title:'',
		  
      body:'',
		  
		  baseUrl:'https://jsonplaceholder.typicode.com/posts',
		  
		  loading:false,
    };
	
  },
	 
	methods:{
		
	  onPost(){
			
			if(this.title == ''|| this.body == '' ){
				
				return false
				
			}else{
				 
					this.loading = true;
					
				axios
				
				.post(this.baseUrl,{
					
					title:this.title,body:this.body,
					
				})
				.then(response => {
					 
						this.loading = false;
						
					console.log(response)
					
					this.res="Post created successfully!";
					
					this.$swal({
						icon: 'success',
						title: 'Success...',
						text: this.res,
						timer: 1500
					});
					
					setTimeout(this.addRedirect,3000)
				})
				
				.catch(err => {
					 
						this.loading = false;
						
					this.$swal({
						icon: 'error',
						title: 'Error...',
						text: 'Something went wrong.',
					});
					
				});
				
			}
			
	  },
		  
				validateForm(value) {
					  
							if (!value) {
								  
										return 'This field is required';
										
							}
							
							else{
								  
										return ''

							}
							
				},
		  
	  addRedirect(){

		  this.$router.push('/home')

	  },
		 
	},
	
}

</script>

<style scoped>

</style>