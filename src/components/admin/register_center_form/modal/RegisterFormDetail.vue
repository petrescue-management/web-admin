<template>
  <div>
    <el-main v-loading="loading">
      <div class="rowInline" style="width: 100px">
        <img
          src="@/assets/img/Logo 4_circle.png"
          width="100px"
          height="100px"
        />
      </div>
      <div class="rowInline" style="padding: 20px 20px 0px 20px">
        <span class="header">{{ form.name }}</span>
        <br />
        <span>Create form : 21/08/1999</span>
      </div>
      <div class="table">
        <el-row>
          <el-col :span="14" class="title"> Email </el-col>
          <el-col :span="10" class="title"> Phone </el-col>
        </el-row>
        <el-row>
          <el-col :span="14" class="content">
            <p>{{ form.email }}</p>
          </el-col>
          <el-col :span="10" class="content">
            <p>{{ form.phone }}</p>
          </el-col>
        </el-row>
      </div>
      <hr />
      <el-row>
        <el-col :span="2" class="location">
          <i class="el-icon-location icon" />
        </el-col>
        <el-col :span="22" class="location">
          <span>{{ form.address }}</span>
        </el-col>
      </el-row>
      <hr />
      <div class="table">
        <el-row>
          <el-col class="title"> Mô tả </el-col>
        </el-row>
        <el-row>
          <el-col class="content">
            <p>{{ form.description }}</p>
          </el-col>
        </el-row>
      </div>
      <div class="button" v-if="form.status != 2 || form.status != 3">
        <el-button type="success" @click="changeStatus(2)">Accept</el-button>
        <el-button type="danger" @click="changeStatus(3)">Reject</el-button>
      </div>
    </el-main>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { changeStatusRegisterCenterFormByIdAPI } from "@/api/admin/registerCenterFormApi";
import EventBus from "@/EventBus";
import CenterService from "@/services/CenterService";
export default {
  props: ["id"],
  name: "RegisterFormDetail",
  data() {
    return {
      form: {
        id: null,
        name: null,
        phone: null,
        address: null,
        email: null,
        description: null,
        status: null,
        color: null,
      },
      loading: false,
      storeId: null,
    };
  },
  computed: {
    // ...mapGetters("user", ["user"]),
    ...mapGetters("registerForm", ["getFormDetail"]),

    getUser() {
      let user = localStorage.getItem("admin");
      return JSON.parse(user);
    },
  },
  methods: {
    ...mapActions("registerForm", ["getRegisterFormDetail"]),

    getDetail() {
      this.form = {
        id: this.getFormDetail.id,
        name: this.getFormDetail.name,
        phone: this.getFormDetail.phone,
        address: this.getFormDetail.address,
        email: this.getFormDetail.email,
        description: this.getFormDetail.description,
        status: this.getFormDetail.status,
      };
      this.loading = false;
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
            'create-center': {
              date: datetime,
              isCheck: false,
              type: 3,
            },
          },
      };

      CenterService.create(id,data)
        .then(() => {
          console.log("Created new item successfully!");
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async changeStatus(status) {
      this.loading = true;
      let data = {
        id: this.id,
        status,
        idToken: this.getUser.token,
      };
      await changeStatusRegisterCenterFormByIdAPI(data).then((response) => {
        if (response.status == 200) {
          response.text().then((data) => {
            this.loading = false;
            if(status == 2){
              this.saveCenterToRealtimeDB(data);
            }
            EventBus.$emit("CloseDialog", false);
          });
        }else{
          console.log("error")
          this.loading = false;
        }
      })
    },
  },

  created() {
    this.loading = true;
    let data = {
      id: this.id,
    };
    this.getRegisterFormDetail(data).then(() => {
      this.getDetail();
    });
  },
};
</script>
<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: auto;
}
.rowInline {
  float: left;
  text-align: left;
  height: 100px;
}
.location {
  text-align: left;
  font-size: 16px;
}
.icon {
  font-size: 40px;
  color: #808080;
}
.header {
  font-size: 27px;
  color: #5d6f92;
}
.date {
  font-size: 18px;
}
.title {
  font-size: 16px;
  color: #808080;
}
.content {
  font-size: 20px;
  color: #1f1e1e;
}
.table {
  clear: both;
  padding-top: 20px;
  margin-bottom: 0;
}
.row {
  font-size: 17px;
}
hr {
  margin: 5px 0;
  clear: both;
}
.button {
  text-align: center;
}
.status1 {
  text-align: left;
  padding: 30px 0px 0px 120px;
  width: 100px;
}

.status2 {
  text-align: left;
  padding: 30px 0px 0px 90px;
  width: 100px;
}
</style>
