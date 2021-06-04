<template>
  <el-table
    :data="
      listForm
    "
    v-loading="loading"
  >
    <el-table-column label="Ảnh cá nhân" width="130">
      <template slot-scope="scope">
        <img :src="scope.row.img" width="70px" height="70px" />
      </template>
    </el-table-column>
    <el-table-column prop="email" label="Email" ></el-table-column>
    <el-table-column prop="name" label="Tên"></el-table-column>
    <el-table-column prop="dob" label="Ngày sinh" ></el-table-column>
    <el-table-column prop="phone" label="Số điện thoại" ></el-table-column>
    <!-- <el-table-column prop="dateStarted" label="Ngày bắt đầu"></el-table-column> -->
  </el-table>
</template>

<script>
import { getListMemberAPI } from "@/api/admin/userApi";
export default {
  data() {
    return {
      listForm: [],
      dialogVisible: false,
      loading: false,
      img: require("@/assets/img/avatar.jpg"),
      search: "",
    };
  },

  computed: {
    getUser() {
      let user = localStorage.getItem("admin");
      return JSON.parse(user);
    },
  },

  methods: {

    getTableData(list) {
      this.listForm = [];
      list.forEach((data) => {
        let form = {
          id: data.userId,
          img: data.imgUrl ? data.imgUrl : this.img,
          email: data.email,
          name: data.lastName + " " + data.firstName,
          phone: data.phone,
          dob: this.getDate(data.doB),
          address: data.address,
          dateStarted: this.getDate(data.dateStarted)
        };
        this.listForm.push(form);
      });
    },

    getDate(createdDate) {
      let date = new Date(createdDate);
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      return (
        (dd > 9 ? "" : "0") +
        dd +
        "-" +
        (mm > 9 ? "" : "0") +
        mm +
        "-" +
        date.getFullYear()
      );
    },

    async getList(page) {
      this.loading = true;
      let data = {
        page,
        token: this.getUser.token,
      };
      await getListMemberAPI(data).then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            this.getTableData(JSON.parse(JSON.stringify(data.result)));
          });
        }
      });
      this.loading = false;
    },
  },

  created() {
    this.getList(0);
  },
};
</script>

<style>
</style>