<template>
  <div>
    <el-main>
      <div style="text-align: left; padding: 20px 0px">
        <span class="title">Danh sánh giống loài của thú cưng</span>
      </div>
      <div>
        <b-card header="Thêm giống loại của thú cưng" header-tag="header">
          <el-form :model="form" :rules="rules" ref="form" label-width="120px">
            <el-row>
              <el-col :span="7">
                <el-form-item label="Chọn loại pet" prop="petTypeId">
                  <el-select
                    v-model="form.petTypeId"
                    placeholder="Chọn loại Pet"
                  >
                    <el-option
                      v-for="item in listPetType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7">
                <el-form-item label="Nhập giống loại Pet" class="label-inline" prop="breed">
                  <el-input v-model="form.breed"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-col :span="10" style="padding-left: 10px">
              <el-button @click="createNewPetBreed" type="primary"> + Thêm</el-button>
            </el-col>
          </el-form>
        </b-card>
        <br />
        <el-table :data="listBreed" style="width: 400px" v-loading="loading">
          <el-table-column type="index"> </el-table-column>
          <el-table-column label="Loại" prop="petTypeName"> </el-table-column>
          <el-table-column label="Giống" prop="petBreedName"> </el-table-column>
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
import {
  getAllPetBreedsAPI,
  getAllPetTypeAPI,
  createNewPetBreedAPI,
} from "@/api/admin/configApi";
export default {
  data() {
    return {
      listBreed: [],
      totalCenter: 0,
      loading: false,
      rules: {
        breed: {
          required: true,
          message: "Không được để trống",
          trigger: "blur",
        },
        petTypeId: {
          required: true,
          message: "Không được để trống",
          trigger: "blur",
        },
      },
      form: {
        breed: "",
        petTypeId: "",
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
      this.listBreed = [];
      await getAllPetBreedsAPI()
        .then((response) => response.json())
        .then((data) => {
          data.forEach((element) => {
            let breed = {
              petBreedId: element.petBreedId,
              petBreedName: element.petBreedName,
              petTypeName: element.petTypeName,
            };
            this.listBreed.push(breed);
          });
        });
      this.loading = false;
    },

    async getAllPetType() {
      this.listPetType = [];
      await getAllPetTypeAPI()
        .then((response) => response.json())
        .then((data) =>
          data.forEach((element) => {
            let petType = {
              id: element.petTypeId,
              name: element.petTypeName,
            };
            this.listPetType.push(petType);
          })
        );
    },

    createNewPetBreed() {
      this.$confirm("Bạn có chắc chắn muốn thêm ?", {
        confirmButtonText: "Có",
        cancelButtonText: "Không",
      }).then(async () => {
        let data = {
          petBreedName: this.form.breed,
          petTypeId: this.form.petTypeId,
          token: this.getUser.token
        };
        await createNewPetBreedAPI(data).then((response) => {
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
    this.getAllPetType();
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

.label-inline >>> .el-form-item__label {
  line-height: initial;
} 
</style>