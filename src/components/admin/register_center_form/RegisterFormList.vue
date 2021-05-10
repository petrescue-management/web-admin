<template>
  <div>
    <el-main>
      <div style="text-align: left; padding: 20px 0px">
        <span class="title">Đơn đăng ký trung tâm</span>
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
          <el-table-column
            prop="name"
            label="Tên trung tâm"
            width="300"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="Email"
            width="250"
          ></el-table-column>
          <el-table-column
            label="Trạng thái"
            prop="status"
            sortable
          >
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
    <el-dialog title="Lý do từ chối đơn" :visible.sync="dialogDeny">
      <DialogDeny :id="id" v-if="dialogDeny" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { centerRegisterStatus } from "@/enum/center-register-status-enum";
import EventBus from "@/EventBus";
import { changeStatusRegisterCenterFormByIdAPI } from "@/api/admin/registerCenterFormApi";
import CenterService from "@/services/CenterService";
import DialogDeny from "./modal/DialogDeny";
export default {
  components: {
    DialogDeny,
  },
  data() {
    return {
      listForm: [],
      totalForm: 0,
      dialogVisible: false,
      loading: false,
      dialogDeny: false,
    };
  },
  computed: {
    ...mapGetters("registerForm", ["getListForm", "getTotalForm"]),
    getUser() {
      let user = localStorage.getItem("admin");
      return JSON.parse(user);
    },
  },

  methods: {
    ...mapActions("registerForm", ["getListRegisterCenterFormPaging"]),

    getTableData(list) {
      this.listForm = [];
      list.forEach((data) => {
        let store = {
          id: data.centerRegistrationFormId,
          name: data.centerName,
          phone: data.phone,
          address: data.centerAddress,
          email: data.email,
          status: centerRegisterStatus.get(data.centerRegistrationFormStatus).name,
          color: centerRegisterStatus.get(data.centerRegistrationFormStatus).color,
          insertedAt: this.getDatetime(data.insertedAt),
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

    saveCenterToRealtimeDB(id) {
      let today = new Date();
      let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let datetime = date + " " + time;

      let data = {
        Notification: {
          "create-center": {
            date: datetime,
            isCheck: false,
            type: 3,
          },
        },
      };

      CenterService.create(id, data)
        .then(() => {
          console.log("Created new item successfully!");
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async changeStatus(id, status) {
      this.loading = true;
      let data = {
        id: id,
        status,
      };
      await changeStatusRegisterCenterFormByIdAPI(
        data,
        this.getUser.token
      ).then((response) => {
        if (response.status == 200) {
          response.text().then((data) => {
            this.loading = false;
            if (status == 2) {
              this.saveCenterToRealtimeDB(data);
            }
            EventBus.$emit("CloseDialog", false);
          });
        } else {
          console.log("error");
          this.loading = false;
        }
      });
    },

    async getCenter(page) {
      let data = {
        pageIndex: page,
      };
      await this.getListRegisterCenterFormPaging(data);
      this.getTableData(JSON.parse(JSON.stringify(this.getListForm)));
    },

    goToDetail(id) {
       this.$router.push({ name: "RegisterCenterFormDetail", params: { id } });
    },
    showDenyDialog(id) {
      this.id = id;
      this.dialogDeny = true;
    },
  },

  mounted() {
    EventBus.$on("CloseDialog", (value) => {
      this.dialogVisible = value;
      this.getCenter(1);
    });
  },

  created() {
    this.loading = true;
    this.getCenter(1);
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