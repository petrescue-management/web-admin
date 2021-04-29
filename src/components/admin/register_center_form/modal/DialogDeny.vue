<template>
  <div>
    <el-form label-position="top">
      <el-checkbox v-model="form.isAddressWro" name="type"
        >Địa chỉ không hợp lệ</el-checkbox
      ><br />
      <el-checkbox v-model="form.isPhoneWro" name="type"
        >SĐT không hợp lệ</el-checkbox
      ><br />
      <el-checkbox v-model="form.isEmailWro" name="type"
        >Email không hợp lệ</el-checkbox
      ><br />
      <el-checkbox v-model="form.isImgWro" name="type"
        >Hình ảnh không hợp lệ</el-checkbox
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
        >Huỷ</el-button
      >
    </div>
  </div>
</template>

<script>
import { changeStatusRegisterCenterFormByIdAPI } from "@/api/admin/registerCenterFormApi";
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
        isAddressWro: false,
        isPhoneWro: false,
        isEmailWro: false,
        isImgWro:false,
        isOtherReason: false,
        desc: "",
      },
    };
  },

  methods: {
    async denyVolunteerForm() {
      this.loading = true;
      let data = {
        id: this.id,
        status: 3,
        isAddress: this.form.isAddressWro,
        isMail: this.form.isEmailWro,
        isPhone: this.form.isPhoneWro,
        isImage: this.form.isImgWro,
        anotherReason: this.form.desc,
      };
      let token = this.getUser.token;
      await changeStatusRegisterCenterFormByIdAPI(data, token).then(
        (response) => {
          if (response.status == 200) {
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