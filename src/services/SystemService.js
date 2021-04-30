import firebase from '../firebase';

const db = firebase.database().ref("/sys_admin");
class SystemService {
    getListNoti() {
        return db.child(`Notification/`).orderByChild('date');
    }

    updateNoti(notiId, value) {
        return db.child(`/Notification/${notiId}`).update(value);
    }
}

export default new SystemService();