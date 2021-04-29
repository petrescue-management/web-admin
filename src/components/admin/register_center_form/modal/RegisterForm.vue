<template >
  <div>
    <h2>{{ formRegister.name }}</h2>
    <b-row class="info">
      <b-col
        >Đăng ký lúc: <span class="value">{{ formRegister.date }}</span></b-col
      >
    </b-row>
    <hr class="tag" />
    <b-row class="info">
      <b-col
        >Email: <span class="value">{{ formRegister.email }}</span></b-col
      >
    </b-row>
    <hr class="tag" />
    <b-row class="info">
      <b-col>
        SĐT: <span class="value">{{ formRegister.phone }}</span>
      </b-col>
    </b-row>
    <hr class="tag" />
    <b-row class="info">
      <b-col>
        Địa chỉ: <span class="value">{{ formRegister.address }}</span>
      </b-col>
    </b-row>
    <hr class="tag" />
    <b-row class="info">
      <b-col>
        Mô tả: <span class="value">{{ formRegister.description }}</span>
      </b-col>
    </b-row>  
    <hr class="tag" />
  </div>
</template>
<script>

export default {
    props:{
        formRegister: Object,
    }
};
</script>
<style scoped>
.tag {
  border-top: 1px dashed #8c8b8b;
  margin: 5px;
}

.info {
  font-size: 18px;
}

.value {
  font-weight: 400;
}
h2{
  margin: 0 0 10px 0 !important;
}
</style>