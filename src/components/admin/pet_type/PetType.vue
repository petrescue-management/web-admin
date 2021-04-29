<template>
  <div>
    <el-main>
      <div style="text-align: left; padding: 20px 0px">
        <span class="title">Danh sánh loại thú cưng</span>
      </div>
      <div>
        <b-card header="Thêm loại thú cưng" header-tag="header">
          <el-form :model="form" :rules="rules" ref="form" label-width="120px">
            <el-col :span="7">
              <el-form-item label="Nhập loại Pet" prop="type">
                <el-input v-model="form.type"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" style="padding-left: 10px">
              <el-button @click="addNewPetType" type="primary"> + Thêm</el-button>
            </el-col>
          </el-form>
        </b-card>
        <br />
        <el-table :data="listType" style="width: 400px" v-loading="loading">
          <el-table-column type="index"> </el-table-column>
          <el-table-column label="Loại thú cưng" prop="petTypeName">
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
import { getAllPetTypeAPI, createNewPetTypeAPI } from "@/api/admin/configApi";
export default {
  data() {
    return {
      listType: [],
      totalCenter: 0,
      loading: false,
      rules: {
        type: {
          required: true,
          message: "Không được để trống",
          trigger: "blur",
        },
      },
      form: {
        type: "",
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
    async getPetType() {
      this.loading = true;
      this.listType = [];
      await getAllPetTypeAPI()
        .then((response) => response.json())
        .then((data) => {
          data.forEach((element) => {
            let type = {
              petTypeId: element.petTypeId,
              petTypeName: element.petTypeName,
            };
            this.listType.push(type);
          });
        });
      this.loading = false;
    },

    addNewPetType() {
      this.$confirm("Bạn có chắc chắn muốn thêm ?", {
        confirmButtonText: "Có",
        cancelButtonText: "Không",
      }).then(async () => {
        let data = {
          type: this.form.type,
          token: this.getUser.token
        };
        await createNewPetTypeAPI(data).then((response) => {
          if (response.status == 200) {
            this.$message({
              message: "Thao tác thành công",
              type: "success",
            });
            this.getPetType();
          }
        });
      });
    },
  },

  created() {
    this.getPetType();
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