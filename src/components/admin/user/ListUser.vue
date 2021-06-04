<template>
  <div>
    <el-main>
      <div class="row bg-title form-adoption">
        <div style="width: 5%"></div>
        <div style="width: 90%; margin: auto; z-index: 2">
          <h1 class="title">Danh sách người dùng</h1>
        </div>
      </div>
      <br />

      <div style="padding: 0 10px">
        <b-card header="Danh sách người dùng" header-tag="header">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="Thành viên" name="1">
              <Member  v-if="activeName == '1'"/>
            </el-tab-pane>
            <el-tab-pane label="Tình nguyện viên" name="2">
              <volunteer v-if="activeName == '2'"/>
            </el-tab-pane>
          </el-tabs>
        </b-card>
      </div>
    </el-main>
  </div>
</template>

<script>
import Member from './modal/Member.vue';
import Volunteer from './modal/Volunteer.vue';
export default {
  components: { Member,Volunteer },
  computed: {
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  data() {
    return {
      dialogVisible: false,
      dialogAddVisible: false,
      img: require("@/assets/img/avatar.jpg"),
      activeName: '1',
    };
  },

  created() {
  },
};
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 0;
}
.title {
  font-size: 35px;
  color: #fff;
  text-transform: capitalize;
  font-weight: 700;
}
.small {
  max-width: 500px;
}
</style>