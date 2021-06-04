//export const baseURL = "https://localhost:44305/"
export const baseURL = "https://petrescuecapston.azurewebsites.net/"

export const Notification = new Map([
    [1, {
        message: "Bạn có đơn đăng kí tạo trung tâm",
        logo: "https://firebasestorage.googleapis.com/v0/b/pet-rescue-fb.appspot.com/o/pet-img%2FLogo_notitle_circle.png?alt=media&token=359eb314-a538-46f5-baf3-ae9183260b2c"
    }]
]);

export const volunteerRegistrationFormStatus = new Map([
    [1, { name: "Chờ xử lý", color: "warning" }],
    [2, { name: "Chấp thuận", color: "success" }],
    [3, { name: "Từ chối", color: "danger" }],
]);