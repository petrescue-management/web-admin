<template>
  <el-aside width="100%" style="background-color: #f8f9fa">
    <el-menu
      text-color="#545454"
      background-color="#F8F9FA"
      active-text-color="#55A6FD"
      :default-active="activeIndex"
      :route="true"
    >
      <el-menu-item
        index="1"
        :route="{ name: 'CenterList' }"
        @click="goTo('CenterList')"
      >
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>Trung tâm</span>
        </template>
      </el-menu-item>
      <el-menu-item
        index="2"
        :route="{ name: 'RegisterCenterFormList' }"
        @click="goTo('RegisterCenterFormList')"
      >
        <template slot="title">
          <i class="el-icon-s-claim"></i>
          <span>Đơn đăng kí trung tâm</span>
        </template>
      </el-menu-item>
       <el-menu-item
        index="3"
        :route="{ name: 'User' }"
        @click="goTo('User')"
      >
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>Người dùng</span>
        </template>
      </el-menu-item>
      <el-submenu>
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>Thông tin pet</span>
        </template>
        <el-menu-item
          index="4"
          :route="{ name: 'PetType' }"
          @click="goTo('PetType')"
          >Loại pet</el-menu-item
        >
        <el-menu-item
          index="5"
          :route="{ name: 'PetColor' }"
          @click="goTo('PetColor')"
          >Màu sắc</el-menu-item
        >
        <el-menu-item
          index="6"
          :route="{ name: 'PetBreed' }"
          @click="goTo('PetBreed')"
          >Giống loài</el-menu-item
        >
      </el-submenu>
      <el-menu-item
        index="7"
        :route="{ name: 'ConfigTime' }"
        @click="goTo('ConfigTime')"
      >
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>Cài đặt</span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  name: "Navigation",
  data() {
    return {
      activeIndex: "1",
    };
  },

  mounted() {
    console.log(this.$router.history.current.name);
    switch (this.$router.history.current.name) {
      case "CenterList":
        this.activeIndex = "1";
        break;
      case "RegisterCenterFormList":
      case "RegisterCenterFormDetail":
        this.activeIndex = "2";
        break;
      case "User":
        this.activeIndex = "3";
        break;
      case "PetType":
        this.activeIndex = "4";
        break;
      case "PetColor":
        this.activeIndex = "5";
        break;
      case "PetBreed":
        this.activeIndex = "6";
        break;
      case "ConfigTime":
        this.activeIndex = "7";
        break;
      default:
        break;
    }
    // this.activeIndex = this.$router.history.current.fullPath;
  },

  methods: {
    goTo(link) {
      this.$router.replace({ name: link });
    },
  },
};
</script>
<style scoped>
.el-aside {
  background-color: aqua;
  height: 89vh;
  text-align: left;
}
</style>
