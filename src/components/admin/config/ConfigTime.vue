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
                  label="Thời gian gửi lại thông báo cho các tình nguyện viên online"
                >
                  <el-input-number
                    :controls="false"
                    v-model="form.reNotiTimeForOnline.hour"
                  ></el-input-number>
                  Giờ
                  <el-input-number
                    style="margin-left: 30px"
                    :controls="false"
                    v-model="form.reNotiTimeForOnline.min"
                  ></el-input-number
                  >Phút
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item
                  label="Thời gian gửi lại thông báo cho tất cả các tình nguyện viên"
                >
                  <el-input-number
                    :controls="false"
                    v-model="form.reNotiTimeForAll.hour"
                  ></el-input-number>
                  Giờ
                  <el-input-number
                    style="margin-left: 30px"
                    :controls="false"
                    v-model="form.reNotiTimeForAll.min"
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
            <el-row>
              <el-col>
                <el-form-item
                  label="Số lượng ảnh tối đa của member"
                >
                  <el-input-number
                    :controls="false"
                    v-model="form.limitImgForMember"
                  ></el-input-number>
                  Ảnh
                </el-form-item>
                <el-form-item
                  label="Số lượng ảnh tối đa của tình nguyện viên"
                >
                  <el-input-number
                    :controls="false"
                    v-model="form.limitImgForVolunteer"
                  ></el-input-number>
                  Ảnh
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item
                  label="Khoảnh cách gần nhất"
                  prop="nearestDistance"
                >
                  <el-input-number
                    :controls="false"
                    v-model="form.nearestDistance"
                  ></el-input-number>
                  m
                </el-form-item>
              </el-col>
            </el-row>
            <el-col style="text-align: center">
              <el-button type="primary" @click="saveConfigTime('form')">
                Lưu</el-button
              >
            </el-col>
          </el-form>
        </b-card>
        <br />
      </div>
    </el-main>
  </div>
</template>

<script>
import { getConfigTimeAPI, configTimeAPI } from "@/api/admin/configApi";
export default {
  data() {
    var checkNearestDistance = (rule, value, callback) => {
      console.log(rule);
      setTimeout(() => {
        if (value < 5000) {
          callback(new Error("Phải lớn hơn 5000m"));
        } else {
          callback();
        }
      }, 1000);
    };
    return {
      loading: false,
      rules: {
        reNotiTimeForRescue: {
          required: true,
          message: "Không được để trống",
          trigger: "blur",
        },
        nearestDistance: {
          validator: checkNearestDistance,
          trigger: "blur",
        },
      },
      form: {
        reNotiTimeForOnline: {
          hour: 0,
          min: 0,
        },
        reNotiTimeForAll: {
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
        limitImgForMember: 0,
        nearestDistance: 0,
      },
    };
  },
  computed: {
    getUser() {
      let user = localStorage.getItem("admin");
      return JSON.parse(user);
    },
  },

  methods: {
    async getConfig() {
      this.loading = true;
      await getConfigTimeAPI(this.getUser.token)
        .then((response) => response.json())
        .then((data) => {
          this.form.reNotiTimeForOnline = {
            hour: this.covertMinToHrs(data.reNotiTimeForOnlineRescue),
            min: this.covertMinToMin(data.reNotiTimeForOnlineRescue),
          };
          this.form.reNotiTimeForAll = {
            hour: this.covertMinToHrs(data.reNotiTimeForAllRescue),
            min: this.covertMinToMin(data.reNotiTimeForAllRescue),
          };
          this.form.destroyNotiTimeForRescue = {
            hour: this.covertMinToHrs(data.notiTimeForDestroyRescue),
            min: this.covertMinToMin(data.notiTimeForDestroyRescue),
          };
          this.form.remindTimeAfterAdopt = {
            day: this.covertMinToDay(data.remindTimeAfterAdopt),
            hour: this.covertMinToDayHours(data.remindTimeAfterAdopt),
            min: this.covertMinToMin(data.remindTimeAfterAdopt),
          };
          this.form.limitImgForVolunteer = data.imageForPicker;
          this.form.limitImgForMember = data.imageForFinder;
          this.form.nearestDistance = data.nearestDistance;
        });
      this.loading = false;
    },

    saveConfigTime(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            token: this.getUser.token,
            reNotiTimeForOnline: this.covertDayHoursMinToMin(
              0,
              this.form.reNotiTimeForOnline.hour,
              this.form.reNotiTimeForOnline.min
            ),
            reNotiTimeForAll: this.covertDayHoursMinToMin(
              0,
              this.form.reNotiTimeForAll.hour,
              this.form.reNotiTimeForAll.min
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
            imgPicker: this.form.limitImgForVolunteer,
            imgFinder: this.form.limitImgForMember,
            nearestDistance: this.form.nearestDistance,
          };
          if (data.destroyNotiTime > data.reNotiTimeForAll) {
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
        } else {
          this.$message({
              message: "Số nhập không hợp lệ",
              type: "error",
            });
          return false;
        }
      });
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