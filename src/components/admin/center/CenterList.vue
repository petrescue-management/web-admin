<template>
  <div>
    <el-main>
      <div style="text-align: left; padding: 20px 0px">
        <span class="title">Danh sách trung tâm</span>
      </div>
      <div>
        <el-table :data="listCenter" v-loading="loading">
          <el-table-column type="expand">
            <template slot-scope="props">
              <p>Các lần hoạt động cứu hộ gần nhất:</p>
              <ul class="list">
                <li v-for="date in props.row.lastedDocuments" :key="date">
                  {{ getDatetime(date.time) }}
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="Tên trung tâm"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="SĐT"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="Địa chỉ"
            width="450"
          ></el-table-column>
          <el-table-column label="Trạng thái" width="180">
            <template slot-scope="scope">
              <el-tag class="status" :type="scope.row.color" size="small">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          background
          :page-count="4"
          layout="prev, pager, next"
        ></el-pagination> -->
      </div>
    </el-main>
    <!-- <el-dialog title="Chi tiết Giao dịch" :visible.sync="dialogVisible">
      <transaction-detail v-bind:id="id" v-if="dialogVisible" />
    </el-dialog> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { centerStatus } from "@/enum/center-status-enum";
export default {
  data() {
    return {
      listCenter: [],
      totalCenter: 0,
      loading : false
    };
  },
  computed: {
    ...mapGetters("centerInfo", ["getListCenter"]),
    getUser() {
      let user = localStorage.getItem("admin");
      return JSON.parse(user);
    },
  },

  methods: {
    ...mapActions("centerInfo", ["getListCenterPaging"]),
    getDatetime(createdDate) {
      let date = new Date(createdDate);
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      let hh = date.getHours();
      let min = date.getMinutes();
      return (
        (dd > 9 ? "" : "0") +
        dd +
        "-" +
        (mm > 9 ? "" : "0") +
        mm +
        "-" +
        date.getFullYear() +
        " " +
        (hh > 9 ? "" : "0") +
        hh +
        ":" +
        (min > 9 ? "" : "0") +
        min
      );
    },

    getTableData(list) {
      this.listCenter = [];
      list.forEach((data) => {
        let store = {
          name: data.centerName,
          phone: data.phone,
          address: data.address,
          status: centerStatus.get(data.centerStatus).name,
          color: centerStatus.get(data.centerStatus).color,
          lastedDocuments: data.lastedDocuments,
        };
        this.listCenter.push(store);
      });
    },

    async getCenter(page) {
      this.loading = true;
      let data = {
        pageIndex: page,
        token: this.getUser.token,
      };
      console.log(data);
      await this.getListCenterPaging(data);
      this.getTableData(JSON.parse(JSON.stringify(this.getListCenter)));
      this.loading = false
    },
  },

  created() {
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

.list {
  color: #1068bf;
  font-size: 17px;
}
</style>