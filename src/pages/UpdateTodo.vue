<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Update</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
	              <router-link to="/home">List</router-link>
              </li>
              <li class="breadcrumb-item active">Update</li>
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
              <h3 class="card-title">Update</h3>
            </div>
            <div class="card-body" v-if="posts">
              <Form @submit="" >
                <div class="form-group">
                  <label for="postTitle"> Title </label>
                  <Field type="text" :rules="validateEmail" name="title" id="inputTitle"  v-model="posts.title" class="form-control"/>
	                <ErrorMessage class="text-red" name="title"/>
                </div>
                <div class="form-group">
                  <label for="postBody"> Body </label>
                  <Field type="text" name="body" :rules="validateEmail" id="inputBody"  placeholder="Body" v-model="posts.body" class="form-control" rows="3"/>
	                <ErrorMessage class="text-red" name="body"/>
                </div>
	              <div class="row">
		              <div class="col-12">
		              </div>
	              </div>
              </Form>
			            <button class="btn btn-success float-right" @click="onSubmit()"><i class="fas fa-pencil-alt"></i> Save Changes </button>
			            <button class="btn btn-secondary" @click="updateRedirect()"> <i class="fas fa-times"></i> Cancel</button>
            </div>
          <div class="overlay" v-if="loading">
		          <i class=" fa fa-spinner fa-3x fa-spin"></i>
          </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<footer class="main-footer">
<div class="float-right d-none d-sm-block">
	<b>Version</b> 3.2.0
</div>
<strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights reserved.
</footer>
<script>
import axios from "axios";
import {ErrorMessage,Field,Form} from "vee-validate";
export default {
  name:"UpdateTodo",
	components:{
		Form,Field,ErrorMessage
	},
    data(){
      return {
	      baseUrl:'https://jsonplaceholder.typicode.com/posts/',
	      posts:[],
		      loading:false,
		      params:null
      };
    },
methods:{
	onSubmit(id) {
		if(this.posts.title == ''|| this.posts.body == '' ){
			return false
		}else {
				this.loading = true;
			axios.put(this.baseUrl+this.posts.id,{
					id:this.posts.title,
					userId:this.posts.userId,
			    title:this.posts.title,
				  body:this.posts.body
			})
			.then(response => {
					this.loading = false;
				console.log(response)
				this.res="Updated Successfully";
				this.$swal({
				    icon: 'success',
						title: 'Success...',
						text: this.res,
						timer: 1500
			});
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
			validateEmail(value) {
						if (!value) {
									return 'This field is required';
						}
						else{
									return ''
						}
			},
	updateRedirect(){
		this.$router.push('/home')
	},
	getPosts(id) {
		axios.get(this.baseUrl+id)
		.then(response => {
			this.posts=response.data;
		})
		.catch(response => {
			console.log(response);
		});
	}
},
	created() {
		this.getPosts(this.$route.params.id);
	}
}
</script>

<style scoped>


</style>