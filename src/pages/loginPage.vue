<template>
  <div>
      <b-row>
          <b-col lg="3"></b-col>
          <b-col lg="6">
            <b-card class="text-center mt-4">
                <h3>User Login</h3>
                <b-input-group prepend="Username" class="mt-3">
                    <b-form-input v-model="UNAME"></b-form-input>
                </b-input-group>
                <b-input-group prepend="Password" class="mt-3">
                    <b-form-input v-model="PWD" type="password"></b-form-input>
                </b-input-group>
                <b-button variant="success" class="mt-2" @click="Login()">Login</b-button>
            </b-card>
          </b-col>
          <b-col lg="3"></b-col>
      </b-row>
      
  </div>
</template>

<script>
import authService from '../services/authService.vue'

export default {
    data(){
        return{
            UNAME:"",
            PWD:""
        }
    },
    methods:{
        Login(){
            if(this.UNAME == "" || this.PWD == ""){
                this.$swal({
                        title: 'Login!!!',
                        text: 'Please insert Username and Password',
                        icon: 'error'
                    });
                return;
            }

            authService.AuthCheck(this.UNAME, this.PWD)
                .then(res =>{
                    console.log(res.data);
                    let ATH = res.data;
                    this.$cookies.set("X_UID", ATH.uid);
                    this.$cookies.set("X_TOKEN", ATH.token);
                    this.$router.push('/tasks');
                })
                .catch(err => {
                    console.log(err);
                    this.$swal({
                        title: 'Login!!!',
                        text: err.response.data,
                        icon: 'error'
                    });
                })
        }
    }
}
</script>

<style>

</style>