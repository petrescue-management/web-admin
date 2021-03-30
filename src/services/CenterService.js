import firebase from '../firebase';

const db = firebase.database().ref("/manager");

class CenterService {
    getAll() {
        return db;
    }

    create(centerId, center) {
        return db.child(centerId).set(center);
    }

    update(key, value) {
        return db.child(key).update(value);
    }

    delete(key) {
        return db.child(key).remove();
    }

    deleteAll() {
        return db.remove();
    }
}

export default new CenterService();