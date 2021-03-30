<template>
  <div class="vertical-center">
    <div class="inner-block">
      <div class="vue-tempalte">
        <form v-loading.fullscreen.lock="fullscreenLoading">
          <h3>Sign In</h3>

          <div class="form-group">
            <label>Username</label>
            <input
              type="email"
              v-model="email"
              class="form-control form-control-lg"
            />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              v-model="password"
              class="form-control form-control-lg"
            />
          </div>

          <button @click="login()" class="btn btn-dark btn-lg btn-block">
            Sign In
          </button>

          <!-- <p class="forgot-password text-right mt-2 mb-4">
            <router-link to="/forgot-password">Forgot password ?</router-link>
          </p> -->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { loginApi, getDetailUser } from "@/api/admin/loginApi";
import { mapActions } from "vuex";
import firebase from "firebase";
export default {
  data() {
    return {
      fullscreenLoading: false,
      email: "petrescue2021@gmail.com",
      password: "pet012345",
      jwtToken: null,
    };
  },

  methods: {
    ...mapActions("user", ["loginUser"]),

    async login() {
      this.fullscreenLoading = true;
      let deviceToken = await firebase.messaging().getToken();
      let data = {
        email: this.email,
        password: this.password,
        deviceToken,
      };

      await loginApi(data)
        .then((response) => response.text())
        .then((data) => {
          this.jwtToken = data;
        });

      await getDetailUser(this.jwtToken)
        .then((response) => response.json())
        .then((data) => {
          if (data.roles.includes("sysadmin")) {
            data.token = this.jwtToken;
            this.loginUser(data);
            this.fullscreenLoading = false;
            this.$message({
              message: "Login thành công",
              type: "success",
            });
            this.$router.push({ name: "MainAdmin" });
          } else {
            this.fullscreenLoading = false;
            this.$message({
              message: "Tài khoản này không tồn tại",
              type: "error",
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.vertical-center {
  background: #2554ff;
}
</style>

