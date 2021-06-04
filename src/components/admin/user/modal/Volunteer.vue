<template>
  <div>
    <el-table
      :data="
        listForm.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      v-loading="loading"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>Ngày sinh : {{ props.row.dob }}</p>
          <p>Số ca cứu hộ thành công : {{ props.row.successCase }}</p>
          <p>Số ca cứu hộ đã huỷ : {{ props.row.cancelCase }}</p>
        </template>
      </el-table-column>
      <el-table-column label="Ảnh cá nhân" width="130">
        <template slot-scope="scope">
          <img :src="scope.row.img" width="70px" height="70px" />
        </template>
      </el-table-column>
      <el-table-column prop="email" label="Email" ></el-table-column>
      <el-table-column prop="name" label="Tên"></el-table-column>
      <!-- <el-table-column
        prop="dob"
        label="Ngày sinh"
        width="150"
      ></el-table-column> -->
      <el-table-column
        prop="phone"
        label="Số điện thoại"
      ></el-table-column>
      <el-table-column
        prop="dateStarted"
        label="Ngày bắt đầu"
      ></el-table-column>
      <el-table-column fixed="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="Gõ tên"
            :name="scope"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="showDenyDialog(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="Lý do từ chối" :visible.sync="dialogDeny">
      <DialogDeny :id="id" v-if="dialogDeny" />
    </el-dialog>
  </div>
</template>

<script>
import EventBus from "@/EventBus";
import { getListVolunteerAPI } from "@/api/admin/userApi";
import DialogDeny from "./DialogDeny.vue";
export default {
  components: { DialogDeny },
  data() {
    return {
      listForm: [],
      dialogVisible: false,
      loading: false,
      img: require("@/assets/img/avatar.jpg"),
      search: "",
      dialogDeny: false,
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
          dateStarted: this.getDate(data.dateStarted),
          successCase: data.successCase,
          cancelCase: data.cancelCase,
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

    showDenyDialog(id) {
      this.id = id;
      this.dialogDeny = true;
    },

    async getList(page) {
      this.loading = true;
      let data = {
        page,
        token: this.getUser.token,
      };
      await getListVolunteerAPI(data).then((response) => {
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

  mounted() {
    EventBus.$on("CloseDisDialog", () => {
      this.dialogDeny = false,
      this.getList(0);
    });
  },
};
</script>

<style>
</style>