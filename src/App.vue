<template>
  <div id="app">
    <div id="nav">
      <router-link to="/login-admin"></router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    if (localStorage.getItem("admin") == null) {
      this.$router.replace({ name: "LoginAdmin" });
    } else {
      if (this.$router.history.current.fullPath == "/")
        this.$router.replace({ name: "MainAdmin" });
    }
  },
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  width: 100%;
}

.el-dialog{
  margin-top: 5vh !important;
}
</style>
