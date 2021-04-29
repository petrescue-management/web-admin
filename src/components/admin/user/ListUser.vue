<template>
  <div>
    <el-main>
      <div style="text-align: left; padding: 20px 0px">
        <span class="title">Danh sách người dùng</span>
      </div>
      <div>
        <el-table :data="listForm" v-loading="loading">
          <el-table-column width="200" height="180">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="Gõ tên"
                :name="scope"
              />
            </template>
            <template slot-scope="scope">
              <img :src="scope.row.imgUrl" width="70px" />
            </template>
          </el-table-column>
          <el-table-column prop="email" label="Email"></el-table-column>
          <el-table-column prop="name" label="Name"></el-table-column>
          <el-table-column prop="doB" label="Ngày sinh"></el-table-column>
          <el-table-column prop="phone" label="Phone"></el-table-column>
        </el-table>
        <!-- <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :total="length"
          layout="prev, pager, next"
        ></el-pagination> -->
      </div>
    </el-main>
  </div>
</template>

<script>
import { getListUserAPI } from "@/api/admin/userApi";
export default {
  data() {
    return {
      listForm: [],
      totalForm: 0,
      loading: false,
      search: '',
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
        let user = {
          email: data.email,
          userId: data.userId,
          name: data.lastName + " " + data.firstName,
          doB: this.getDatetime(data.doB),
          gender: data.gender,
          phone: data.phone,
          imgUrl: data.imgUrl,
        };
        this.listForm.push(user);
      });
      this.loading = false;
    },

    getDatetime(createdDate) {
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
        date.getFullYear() +
        " "
      );
    },

    async getCenter(page) {
      this.loading = true;
      let data = {
        page,
        token: this.getUser.token,
      };
      await getListUserAPI(data).then((response) => {
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
    this.getCenter(0);
  },
};
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 89vh;
}
.title {
  font-size: 25px;
}
.small {
  max-width: 500px;
}
</style>