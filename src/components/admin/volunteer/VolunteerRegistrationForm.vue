<template>
  <div>
    <el-main>
      <div style="text-align: left; padding: 20px 0px">
        <span class="title">Đơn đăng ký tình nguyện viên</span>
      </div>
      <div>
        <el-table
          :data="listForm"
          v-loading="loading"
          :default-sort="{ prop: 'status', order: 'ascending' }"
        >
          <el-table-column
            prop="insertedAt"
            label="Ngày đăng ký"
            width="150"
          ></el-table-column>
          <el-table-column label="Ảnh cá nhân" width="130">
            <template slot-scope="scope">
              <img :src="scope.row.img" width="70px" height="70px" />
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="Tên tình nguyện viên"
          ></el-table-column>
          <el-table-column prop="email" label="Email"></el-table-column>
          <el-table-column label="Trạng thái" prop="status" sortable>
            <template slot-scope="scope">
              <el-tag class="status" :type="scope.row.color" size="small">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Chi tiết">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="info"
                icon="el-icon-view"
                style="font-size: 16px"
                @click="goToDetail(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
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
import { mapGetters, mapActions } from "vuex";
import { volunteerRegistrationFormStatus } from "@/enum/consts";
import EventBus from "@/EventBus";
export default {
  data() {
    return {
      listForm: [],
      totalForm: 0,
      dialogVisible: false,
      loading: false,
      dialogDeny: false,
      img: require("@/assets/img/avatar.jpg"),
    };
  },
  computed: {
    ...mapGetters("volunteer", ["getListForm", "getTotalForm"]),
    getUser() {
      let user = localStorage.getItem("admin");
      return JSON.parse(user);
    },
  },

  methods: {
    ...mapActions("volunteer", ["getListVolunteerRegistrationForm"]),

    getTableData(list) {
      this.listForm = [];
      list.forEach((data) => {
        let store = {
          id: data.formId,
          name: data.lastName + " " + data.firstName,
          img: data.imageUrl ? data.imageUrl : this.img,
          phone: data.phone,
          dob: this.getDatetime(data.dob),
          email: data.email,
          status: volunteerRegistrationFormStatus.get(
            data.status
          ).name,
          color: volunteerRegistrationFormStatus.get(
            data.status
          ).color,
          insertedAt: this.getDatetime(data.insertAt),
        };
        this.listForm.push(store);
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

    async getList() {
      let token = this.getUser.token;
      await this.getListVolunteerRegistrationForm(token);
      this.getTableData(JSON.parse(JSON.stringify(this.getListForm)));
    },

    goToDetail(id) {
      console.log(id);
      this.$router.push({ name: "RegistrationFormDetail", params: { id } });
    },
  },

  mounted() {
    EventBus.$on("CloseDialog", (value) => {
      this.dialogVisible = value;
      this.getList();
    });
  },

  created() {
    this.loading = true;
    this.getList();
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