<template>
  <div>
    <el-form label-position="top">
      <el-checkbox v-model="form.isWorking" name="type"
        >Không hoạt động</el-checkbox
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
import EventBus from "@/EventBus";
import { getRemoveRoleVolunteerAPI } from "@/api/admin/userApi";
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
        isWorking: false,
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
        isWorking: this.form.isAddressWro,
        anotherReason: this.form.desc,
        token : this.getUser.token,
      };
      await getRemoveRoleVolunteerAPI(data).then(
        (response) => {
          if (response.status == 200) {
            EventBus.$emit("CloseDisDialog");
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