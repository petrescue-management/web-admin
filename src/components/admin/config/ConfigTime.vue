<template>
  <div>
    <el-main v-loading="loading">
      <!-- <div style="text-align: left; padding: 20px 0px">
        <span class="title">Cài đặt thời gian</span>
      </div> -->
      <div>
        <b-card header="Cài đặt thời gian" header-tag="header">
          <el-form :model="form" :rules="rules" ref="form" label-width="300px">
            <el-row>
              <el-col>
                <el-form-item
                  label="Thời gian gửi lại thông báo"
                  prop="reNotiTimeForRescue"
                >
                  <el-input-number
                    :controls="false"
                    v-model="form.reNotiTimeForRescue.hour"
                  ></el-input-number>
                  Giờ
                  <el-input-number
                    style="margin-left: 30px"
                    :controls="false"
                    v-model="form.reNotiTimeForRescue.min"
                  ></el-input-number
                  >Phút
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="Thời gian huỷ đơn" prop="breed">
                  <el-input-number
                    :controls="false"
                    v-model="form.destroyNotiTimeForRescue.hour"
                  ></el-input-number>
                  Giờ
                  <el-input-number
                    style="margin-left: 30px"
                    :controls="false"
                    v-model="form.destroyNotiTimeForRescue.min"
                  ></el-input-number
                  >Phút
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item
                  label="Thời gian nhắc nhở sau khi nhận nuôi"
                  prop="breed"
                >
                  <el-input-number
                    :controls="false"
                    v-model="form.remindTimeAfterAdopt.day"
                  ></el-input-number>
                  Ngày
                  <el-input-number
                    :controls="false"
                    style="margin-left: 17px"
                    v-model="form.remindTimeAfterAdopt.hour"
                  ></el-input-number>
                  Giờ
                  <el-input-number
                    :controls="false"
                    style="margin-left: 30px"
                    v-model="form.remindTimeAfterAdopt.min"
                  ></el-input-number>
                  Phút
                </el-form-item>
              </el-col>
            </el-row>
            <el-col style="text-align: center">
              <el-button type="primary" @click="saveConfigTime()">
                Lưu</el-button
              >
            </el-col>
          </el-form>
        </b-card>
        <br />
        <b-card header="Cài đặt số lượng ảnh" header-tag="header">
          <el-form :model="form" ref="form" label-width="300px">
            <el-row>
              <el-col>
                <el-form-item
                  label="Số lượng ảnh tối đa của member"
                  prop="reNotiTimeForRescue"
                >
                  <el-input-number
                    :controls="false"
                    v-model="form.limitImgForMember"
                  ></el-input-number>
                  Ảnh
                </el-form-item>
                <el-form-item
                  label="Số lượng ảnh tối đa của tình nguyện viên"
                  prop="reNotiTimeForRescue"
                >
                  <el-input-number
                    :controls="false"
                    v-model="form.limitImgForVolunteer"
                  ></el-input-number>
                  Ảnh
                </el-form-item>
              </el-col>
            </el-row>
            <el-col style="text-align: center">
              <el-button type="primary" @click="saveLimitImg()"> Lưu</el-button>
            </el-col>
          </el-form>
        </b-card>
      </div>
    </el-main>
  </div>
</template>

<script>
import { getConfigTimeAPI, configTimeAPI } from "@/api/admin/configApi";
import ConfigService from "../../../services/ConfigService";
export default {
  data() {
    return {
      loading: false,
      rules: {
        reNotiTimeForRescue: {
          required: true,
          message: "Không được để trống",
          trigger: "blur",
        },
      },
      form: {
        reNotiTimeForRescue: {
          hour: 0,
          min: 0,
        },
        destroyNotiTimeForRescue: {
          hour: 0,
          min: 0,
        },
        remindTimeAfterAdopt: {
          day: 0,
          hour: 0,
          min: 0,
        },
        limitImgForVolunteer: 0,
        limitImgForMember:0,
      },
    };
  },
  computed: {
    getUser() {
      let user = localStorage.getItem("admin");
      return JSON.parse(user);
    },
  },

  mounted() {
    ConfigService.getLimitImg().on("value", this.onDataChange);
  },

  methods: {
    onDataChange(items) {
      this.form.limitImgForVolunteer = items.val().limitImgForVolunteer
      this.form.limitImgForMember = items.val().limitImgForMember
    },

    saveLimitImg() {
      this.$confirm("Bạn có chắc chắn muốn thay đổi ?", {
        confirmButtonText: "Có",
        cancelButtonText: "Không",
      }).then(() => {
        this.loading = true;
        let data = {
          limitImgForVolunteer: this.form.limitImgForVolunteer,
          limitImgForMember: this.form.limitImgForMember,
        };
        ConfigService.update(data)
          .then(() => {
            this.$message({
              message: "Thao tác thành công",
              type: "success",
            });
          })
          .catch((e) => {
            console.log(e);
          });
        this.loading = false;
      });
    },

    async getConfig() {
      this.loading = true;
      await getConfigTimeAPI(this.getUser.token)
        .then((response) => response.json())
        .then((data) => {
          this.form.reNotiTimeForRescue = {
            hour: this.covertMinToHrs(data.reNotiTimeForRescue),
            min: this.covertMinToMin(data.reNotiTimeForRescue),
          };
          this.form.destroyNotiTimeForRescue = {
            hour: this.covertMinToHrs(data.destroyNotiTimeForRescue),
            min: this.covertMinToMin(data.destroyNotiTimeForRescue),
          };
          this.form.remindTimeAfterAdopt = {
            day: this.covertMinToDay(data.remindTimeAfterAdopt),
            hour: this.covertMinToDayHours(data.remindTimeAfterAdopt),
            min: this.covertMinToMin(data.remindTimeAfterAdopt),
          };
        });
      this.loading = false;
    },

    saveConfigTime() {
      let data = {
        token: this.getUser.token,
        reNotiTime: this.covertDayHoursMinToMin(
          0,
          this.form.reNotiTimeForRescue.hour,
          this.form.reNotiTimeForRescue.min
        ),
        destroyNotiTime: this.covertDayHoursMinToMin(
          0,
          this.form.destroyNotiTimeForRescue.hour,
          this.form.destroyNotiTimeForRescue.min
        ),
        remindTime: this.covertDayHoursMinToMin(
          this.form.remindTimeAfterAdopt.day,
          this.form.remindTimeAfterAdopt.hour,
          this.form.remindTimeAfterAdopt.min
        ),
      };
      if (data.destroyNotiTime > data.reNotiTime) {
        this.$confirm("Bạn có chắc chắn muốn thay đổi ?", {
          confirmButtonText: "Có",
          cancelButtonText: "Không",
        })
          .then(async () => {
            this.loading = true;
            await configTimeAPI(data).then((response) => {
              if (response.status == 200) {
                this.$message({
                  message: "Thao tác thành công",
                  type: "success",
                });
              }
            });
            this.loading = false;
          })
          .catch(() => {});
      } else {
        this.$message({
          message: "Thời gian huỷ đơn phải lớn hơn thời gian thông báo lại",
          type: "error",
        });
      }

      console.log(data);
    },

    covertMinToHrs(minutes) {
      let h = Math.floor(minutes / 60);
      return h < 10 ? "0" + h : h;
    },

    covertMinToMin(minutes) {
      let m = minutes % 60;
      return m < 10 ? "0" + m : m;
    },

    covertMinToDay(minutes) {
      let d = Math.floor(minutes / 1440);
      return d < 10 ? "0" + d : d;
    },

    covertMinToDayHours(minutes) {
      let d = Math.floor(minutes / 1440);
      let h = Math.floor((minutes - d * 1440) / 60);
      return h < 10 ? "0" + h : h;
    },

    covertDayHoursMinToMin(dd, hh, mm) {
      return dd * 1440 + hh * 60 + mm;
    },
  },

  created() {
    this.getConfig();
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