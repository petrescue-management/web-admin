<template>
  <div id="app">
    <div id="nav">
      <router-link to="/login-admin"></router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { getDetailUser } from "@/api/admin/loginApi";
export default {
  name: "App",

  computed: {
    getUser() {
      let user = localStorage.getItem("admin");
      return JSON.parse(user);
    },
  },

  methods: {
    async checkExpire() {
      console.log(this.$router.history.current.name);
      if (this.$router.history.current.name != "LoginAdmin") {
        await getDetailUser(this.getUser.token).then((response) => {
          if (response.status == 200) return true;
          else if (response.status == 401 || response.status == 403) {
            this.$store.dispatch("user/logout");
            this.$router.push({
              name: "LoginAdmin",
            });
            this.$message({
              message: "Phiên bản đăng nhập này đã hết hạn",
              type: "error",
            });
          }
        });
      }
    },
  },
  created() {
    this.checkExpire();
    if (localStorage.getItem("admin") == null) {
      this.$router.replace({ name: "LoginAdmin" });
    } else {
      if (this.$router.history.current.fullPath == "/")
        this.$router.replace({ name: "CenterList" });
    }
  },
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-y: hidden;
}

.el-dialog {
  margin-top: 5vh !important;
}
</style>
