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

import NotificationBox from '../src/components/notification/NotificationBox'
import Header from "@/components/admin/Header";
import Navigation from "@/components/admin/Navigation";
export default {
  components: {
    Header: Header,
    Navigation: Navigation,
    NotificationBox : NotificationBox
  }
};
</script>
