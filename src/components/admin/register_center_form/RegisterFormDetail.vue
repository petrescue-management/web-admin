<template>
  <div v-loading="loading">
    <el-main>
      <div class="row bg-title pet-detail">
        <div style="width: 5%"></div>
        <div style="width: 90%; margin: auto; z-index: 2">
          <h1 class="title">Thông Tin Đơn Đăng Ký Trung Tâm</h1>
        </div>
      </div>
      <div style="padding: 20px 0 0 20px">
        <el-button type="info" icon="el-icon-back" @click="back()" plain
          >Trở về</el-button
        >
      </div>
      <div class="pet-info">
        <b-row class="info">
          <b-col sm="4" style="display: block">
            <el-carousel height="300px">
              <el-carousel-item v-for="item in form.imageUrl" :key="item">
                <el-image
                  style="width: 100%; height: 100%"
                  :src="item"
                  fit="fit"
                  :preview-src-list="form.imageUrl"
                >
                </el-image>
              </el-carousel-item>
            </el-carousel>
            <div style="text-align: center; margin-top: 20px">
              <span>Tình trạng : </span>
              <span
                ><el-tag class="status" :type="form.color">
                  {{ form.status }}
                </el-tag></span
              >
              <br /><br />
              <el-button
                type="success"
                icon="el-icon-circle-check"
                @click="changeStatus(form.id, 2)"
                v-show="getStatus == 1 ? true : false"
                >Chấp thuận</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-circle-close"
                @click="showDenyDialog(form.id)"
                v-show="getStatus == 1 ? true : false"
                >Từ chối</el-button
              >
            </div>
          </b-col>
          <b-col sm="8">
            <el-tabs type="border-card">
              <el-tab-pane label="Thông tin đơn đăng ký">
                <div v-if="form">
                  <RegisterForm :formRegister="form" />
                </div>
              </el-tab-pane>
            </el-tabs>
          </b-col>
        </b-row>
      </div>
    </el-main>
    <el-dialog title="Lý do từ chối đơn" :visible.sync="dialogDeny">
      <DialogDeny :id="id" v-if="dialogDeny" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RegisterForm from "./modal/RegisterForm.vue";
import { centerRegisterStatus } from "@/enum/center-register-status-enum";
import { changeStatusRegisterCenterFormByIdAPI } from "@/api/admin/registerCenterFormApi";
import DialogDeny from "./modal/DialogDeny";
import CenterService from "@/services/CenterService";
import EventBus from "@/EventBus";
export default {
  components: {
    RegisterForm,
    DialogDeny,
  },
  data() {
    return {
      form: {},
      loading: false,
      dialogDeny: false,
    };
  },

  computed: {
    ...mapGetters("registerForm", ["getFormDetail"]),
    getUser() {
      let user = localStorage.getItem("admin");
      return JSON.parse(user);
    },

    getStatus() {
      return this.form.statusCode;
    },
  },

  methods: {
    ...mapActions("registerForm", ["getRegisterFormDetail"]),

    back() {
      this.$router.push({ name: "RegisterCenterFormList" });
    },

    getDetail() {
      this.form = {
        id: this.getFormDetail.id,
        name: this.getFormDetail.name,
        date: this.getDatetime(this.getFormDetail.date),
        phone: this.getFormDetail.phone,
        address: this.getFormDetail.address,
        email: this.getFormDetail.email,
        description: this.getFormDetail.description,
        status: centerRegisterStatus.get(this.getFormDetail.status).name,
        color: centerRegisterStatus.get(this.getFormDetail.status).color,
        statusCode: this.getFormDetail.status,
        imageUrl: this.getFormDetail.imageUrl
          ? this.getListImg(this.getFormDetail.imageUrl)
          : "",
      };
      console.log(this.form);
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

    getListImg(list) {
      if (list.lastIndexOf(";") != -1) {
        return list.substr(0, list.lastIndexOf(";")).split(";");
      } else {
        return list.split(";");
      }
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
            this.$message({
              message: "Chấp thuận thành công",
              type: "success",
            });
            this.getData();
            EventBus.$emit("CloseDialog", false);
          });
        } else {
          console.log("error");
          this.$message({
              message: "Đã xảy ra lỗi",
              type: "error",
            });
          this.loading = false;
        }
      });
    },

    showDenyDialog(id) {
      this.id = id;
      this.dialogDeny = true;
    },

    mounted() {
      EventBus.$on("CloseDialog", (value) => {
        this.dialogVisible = value;
        this.getData();
      });
    },

    async getData() {
      this.loading = true;
      let id = this.$router.history.current.params.id;
      let data = {
        id,
      };
      this.getRegisterFormDetail(data).then(() => {
        this.getDetail();
      });
      this.loading = false;
    },
  },

  mounted() {},

  async created() {
    await this.getData();
  },
};
</script>

<style scoped>
.el-main {
  padding: 0;
}
.title {
  font-size: 35px;
  color: #fff;
  text-transform: capitalize;
  font-weight: 700;
}
.pet-info {
  padding: 10px 50px 50px 50px;
}
.tag {
  border-top: 1px dashed #8c8b8b;
  margin: 5px;
}

.info {
  font-size: 18px;
}

.value {
  font-weight: 300;
}

.button {
  text-align: center;
  padding-top: 20px;
}

.el-image >>> img {
  max-height: 300px;
}
</style>