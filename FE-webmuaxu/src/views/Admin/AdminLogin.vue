<template>
<div class="over">
    <div class="mt-8">
        <p class="text-center text-3xl mb-5">Đăng nhập</p>
        <div class="formLogin">
            <el-form ref="refDataUser" :model="dataUser" label-width="auto" class="demo-ruleForm">
                <el-form-item label="User" prop="username" :rules="{required: true,message: 'Không được để trống tên',trigger: 'blur'}">
                    <el-input v-model="dataUser.username" />
                </el-form-item>
                <el-form-item label="Password" prop="password" :rules="{required: true,message: 'Không được để trống mật khẩu',trigger: 'blur'}">
                    <el-input v-model="dataUser.password" type="password" placeholder="Please input password" show-password />
                </el-form-item>
                <el-form-item>
                    <div class="text-right w-full">
                        <el-button type="primary" @click="submitForm()">
                            Đăng nhập
                        </el-button>
                    </div>
                </el-form-item>
            </el-form>
            <!-- <p class="text-sm text-center">Bạn chưa có tài khoản?
                <span class="text-cyan-700 cursor-pointer" @click="this.$router.push('/signup')"> Đăng ký tại đây</span>
            </p> -->
        </div>
    </div>
</div>
</template>

<script>
import { loginAdmin } from '@/api';
import Cookies from 'js-cookie';
import {
    ElLoading
} from 'element-plus'

export default {
    data() {
        return {
            dataUser: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async submitForm() {
            const loading = ElLoading.service({
                lock: true,
                text: 'Đang đăng nhập',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            await loginAdmin(this.dataUser).then(result => {
                Cookies.set('admin', JSON.stringify(result))
                this.$message.success('Đăng nhập thành công')
                loading.close()
                this.$router.push('/admin')
                window.location.reload();
            }).catch(error => {
                this.$message.error('Đăng nhập thất bại, kiểm tra lại tài khoản mật khẩu')
                loading.close()
            })
        }
    },
}
</script>

<style lang="scss">
.formLogin {
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    max-width: 450px;
    margin: 0 auto;
    padding: 30px 15px;
    border-radius: 4px
}
</style>
