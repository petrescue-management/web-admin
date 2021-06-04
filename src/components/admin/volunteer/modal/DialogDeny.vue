<template>
  <div>
    <el-form label-position="top">
      <el-checkbox v-model="form.isNameWro" name="type"
        >Tên không hợp lệ</el-checkbox
      ><br />
      <el-checkbox v-model="form.isPhoneWro" name="type"
        >SĐT không hợp lệ</el-checkbox
      ><br />
      <el-checkbox v-model="form.isEmailWro" name="type"
        >Email không hợp lệ</el-checkbox
      ><br />
      <el-checkbox v-model="form.isOtherReason" name="type"
        >Lý do khác</el-checkbox
      >
      <el-form-item v-show="form.isOtherReason" label="Nêu lý do khác: ">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button
        style="text-align: center"
        type="danger"
        @click="denyVolunteerForm()"
        >Từ chối</el-button
      >
      <el-button style="text-align: center" @click="dialogDeny = false"
        >Đóng</el-button
      >
    </div>
  </div>
</template>

<script>
import { changeStatusVolunteerRegistrationFormAPI } from "@/api/admin/userApi";
import EventBus from "@/EventBus";
export default {
  props: ["id"],
  name: "DenyDialog",
  computed: {
    getUser() {
      let user = localStorage.getItem("admin");
      return JSON.parse(user);
    },
  },

  data() {
    return {
      loading: false,
      form: {
        isNameWro: false,
        isPhoneWro: false,
        isEmailWro: false,
        isOtherReason: false,
        desc: "",
      },
    };
  },

  methods: {
    async denyVolunteerForm() {
      this.loading = true;
      let data = {
        token : this.getUser.token,
        id: this.id,
        status: 3,
        isName: this.form.isNameWro,
        isEmail: this.form.isEmailWro,
        isPhone: this.form.isPhoneWro,
        anotherReason: this.form.desc,
      };
      await changeStatusVolunteerRegistrationFormAPI(data).then(
        (response) => {
          if (response.status == 200) {
            EventBus.$emit("CloseVolDenyDialog");
            this.$message({
              message: "Thao tác thành công",
              type: "success",
            });
          }
        }
      );
      this.loading = false;
    },
  },
};
</script>

<style>
</style>