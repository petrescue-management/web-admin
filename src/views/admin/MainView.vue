<template>
  <div>
    <table width="100%" style="border-spacing: 0px;">
      <tr>
        <th colspan="2">
          <Header />
        </th>
      </tr>
      <tr>
        <th width="15%" style="height: 89vh;">
          <Navigation />
        </th>
        <th>
          <router-view />
        </th>
      </tr>
    </table>
    <NotificationBox/>
  </div>
</template>
<script>

import NotificationBox from '@/components/notification/NotificationBox'
import Header from "@/components/admin/Header";
import Navigation from "@/components/admin/Navigation";
import CenterService from "@/services/CenterService";
export default {
  components: {
    Header: Header,
    Navigation: Navigation,
    NotificationBox : NotificationBox
  },

  methods: {
    onDataChange(items) {
      let _noti = [];

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _noti.push({
          key: key,
          id: data.id,
          noti: data.noti
        });
      });

      this.listNoti = _noti;
      console.log(this.listNoti);
    },
  },

  mounted() {
    CenterService.getAll().on("value", this.onDataChange);
  },

  beforeDestroy() {
    CenterService.getAll().off("value", this.onDataChange);
  },
};
</script>
