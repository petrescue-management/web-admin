<template>
  <div>
    <el-main>
      <div style="text-align: left; padding: 20px 0px">
        <span class="title">Danh sánh màu sắc thú cưng</span>
      </div>
      <div>
        <b-card header="Thêm màu sắc cho thú cưng" header-tag="header">
          <el-form :model="form" :rules="rules" ref="form" label-width="120px">
            <el-col :span="7">
              <el-form-item label="Nhập màu" prop="color">
                <el-input v-model="form.color"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" style="padding-left: 10px">
              <el-button @click="addNewColorType" type="primary"> + Thêm</el-button>
            </el-col>
          </el-form>
        </b-card>
        <br />
        <el-table :data="listColor" style="width: 400px">
          <el-table-column type="index"> </el-table-column>
          <el-table-column label="Màu" prop="petFurColorName">
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          background
          :page-count="4"
          layout="prev, pager, next"
        ></el-pagination> -->
      </div>
    </el-main>
  </div>
</template>

<script>
import {
  getAllPetColorsAPI,
  createNewPetFurColorAPI,
} from "@/api/admin/configApi";
export default {
  data() {
    return {
      listColor: [],
      totalCenter: 0,
      rules: {
        color: {
          required: true,
          message: "Không được để trống",
          trigger: "blur",
        },
      },
      form: {
        color: "",
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
      this.listColor = [];
      await getAllPetColorsAPI()
        .then((response) => response.json())
        .then((data) => {
          data.forEach((element) => {
            let type = {
              petFurColorId: element.petFurColorId,
              petFurColorName: element.petFurColorName,
            };
            this.listColor.push(type);
          });
        });
    },

    addNewColorType() {
      this.$confirm("Bạn có chắc chắn muốn thêm ?", {
        confirmButtonText: "Có",
        cancelButtonText: "Không",
      }).then(async () => {
        let data = {
          color: this.form.color,
        };
        await createNewPetFurColorAPI(data).then((response) => {
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