
<template>
  <div v-if="notify">
    <div id="notification-box" class="notification-box">
      <a href="#" id="notification-close" @click="closed()" title="close">x</a>
      <div class="contain_img">
        <img src="@/assets/img/Logo 4_circle.png" width="50px" height="50px" />
      </div>
      <div class="notification-data">
        <div class="notification-title">
          <p id="title">
            {{ title }}
          </p>
        </div>

        <div class="notification-notice">
          <p id="subject">{{ subject }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "NotificationBox",

  data() {
    return {
      title: "Đơn tạo center mới",
      from: "",
      subject: "Bạn nhận được 1 yêu cầu tạo Center mới",
      messaging: firebase.messaging(),
      currentMessage: "",
      notify: false,
    };
  },

  methods: {
    receiveMessage() {
      try {
        this.messaging.onMessage((payload) => {
          this.currentMessage = payload;
          console.log("Message received. ", payload);
          // let message;
          // message =
          //     payload.data.username + ":\n\n" + payload.data.message;
          this.setNotificationBoxForm(
            payload.notification.title,
            payload.notification.body
          );
          // console.log(message)
          this.notify = true;
          setTimeout(() => {
            this.notify = false;
          }, 5000);
        });
      } catch (e) {
        console.log(e);
      }
    },

    setNotificationBoxForm(title, subject) {
      this.title = title;
      this.subject = subject;
    },
  },

  created() {
    this.receiveMessage();
  },

  validations: function () {
    return {};
  },

  computed: {},
};
</script>

<style scoped>
.notification-box {
  display: flex;
  position: absolute;
  right: 5px;
  bottom: 10px;
  width: 30%;
  height: 100px;
  background-color: rgb(241, 238, 238);
  z-index: 999;
  border-radius: 10px;
}
#notification-close {
  position: absolute;
  color: #777;
  font: 15px;
  right: 5px;
  text-decoration: none;
  text-shadow: 0 1px 0 #fff;
  top: 2px;
  z-index: 10;
  cursor: pointer;
}

.notification-data {
  margin: 0 20px;
}
.notification-data p {
  margin: 10px 0;
}
.notification-notice p {
  font-size: 14px;
  font-weight: 400;
}
.notification-title p {
  font-size: 18px;
  font-weight: bold;
  line-height: 18px;
}
.notification-time small {
  font-size: 12px;
}

.notification-wall-number small {
  font-size: 8px;
}

.contain_img {
  margin: auto 15px;
}
</style>