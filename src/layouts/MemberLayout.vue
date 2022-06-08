<template>
  <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <b-container fluid>
          <a class="navbar-brand" href="#">Task Manage</a>
          <b-button variant="light" @click="BackToLogin()">SignOut</b-button>
        </b-container>
      </nav>

      <b-container fluid>
        <router-view></router-view>
      </b-container>      
  </div>
</template>

<script>
export default {
  methods:{
    BackToLogin(){
      this.$cookies.remove("UID"); 
      this.$cookies.remove("TOKEN"); 
      this.$router.push('/');
    }
  }
}
</script>

<style>
</style>