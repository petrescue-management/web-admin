import Vue from 'vue'
import Router from 'vue-router'

import LoginAdmin from '@/views/admin/LoginView'
import MainAdmin from '@/views/admin/MainView'
import CenterList from '@/components/admin/center/CenterList'
import RegisterCenterFormList from '@/components/admin/register_center_form/RegisterFormList'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/login-admin',
            name: 'LoginAdmin',
            component: LoginAdmin
        },
        {
            path: '/main-admin',
            name: 'MainAdmin',
            component: MainAdmin,
            children: [{
                    path: "/main-admin/center-list",
                    name: "CenterList",
                    component: CenterList
                },
                {
                    path: "/main-admin/register-form-list",
                    name: "RegisterCenterFormList",
                    component: RegisterCenterFormList
                },
            ]
        },
    ]
})