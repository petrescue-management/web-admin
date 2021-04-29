import Vue from 'vue'
import Router from 'vue-router'

import LoginAdmin from '@/views/admin/LoginView'
import MainAdmin from '@/views/admin/MainView'
import CenterList from '@/components/admin/center/CenterList'
import RegisterCenterFormList from '@/components/admin/register_center_form/RegisterFormList'
import RegisterCenterFormDetail from '@/components/admin/register_center_form/RegisterFormDetail'
import PetType from '@/components/admin/pet_type/PetType'
import PetColor from '@/components/admin/pet_color/PetColor'
import PetBreed from '@/components/admin/pet_breed/PetBreed'
import ConfigTime from '@/components/admin/config/ConfigTime'
import User from '@/components/admin/user/ListUser'
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
                {
                    path: "/main-admin/register-form-detail/:id",
                    name: "RegisterCenterFormDetail",
                    component: RegisterCenterFormDetail
                },
                {
                    path: "/main-admin/pet-type",
                    name: "PetType",
                    component: PetType
                },
                {
                    path: "/main-admin/pet-color",
                    name: "PetColor",
                    component: PetColor
                },
                {
                    path: "/main-admin/pet-breed",
                    name: "PetBreed",
                    component: PetBreed
                },
                {
                    path: "/main-admin/setting",
                    name: "ConfigTime",
                    component: ConfigTime
                },
                {
                    path: "/main-admin/user",
                    name: "User",
                    component: User
                },
            ]
        },
    ]
})