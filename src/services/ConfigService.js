import firebase from '../firebase';

const db = firebase.database().ref("/config");

class ConfigService {
    getLimitImg() {
        return db;
    }

    update(value) {
        return db.update(value);
    }
}

export default new ConfigService();