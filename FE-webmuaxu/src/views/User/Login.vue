<template>
<div class="over">
    <div class="container">
        <div class="mt-8">
            <p class="text-center text-3xl mb-5">{{ $t('login.title') }}</p>
            <div class="formLogin">
                <el-form ref="refDataUser" :model="dataUser" label-width="auto" class="demo-ruleForm">
                    <el-form-item :label="$t('login.user')" prop="username" :rules="nameRules">
                        <el-input v-model="dataUser.username" />
                    </el-form-item>
                    <el-form-item :label="$t('login.password')" prop="password" :rules="passwordRules">
                        <el-input v-model="dataUser.password" type="password" show-password />
                    </el-form-item>
                    <el-form-item>
                        <div class="text-right w-full">
                            <el-button type="primary" @click="submitForm($refs.refDataUser)">
                                {{ $t('login.title') }}
                            </el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <p class="text-sm text-center">{{ $t('login.note1') }}
                    <span class="text-cyan-700 cursor-pointer" @click="this.$router.push('/signup')"> {{ $t('login.note2') }}</span>
                </p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    login
} from '@/api';
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
            },
        }
    },
    computed: {
        nameRules() {
            return [{
                required: true,
                message: this.$t('login.requireName'),
                trigger: 'blur'
            }, {
                validator: (rule, value, callback) => {
                    if (/\s/.test(value)) {
                        callback(new Error(this.$t('login.noSpaces')));
                    } else {
                        callback();
                    }
                },
                trigger: 'blur'
            }];
        },
        passwordRules() {
            return [{
                    required: true,
                    message: this.$t('login.requirePass1'),
                    trigger: 'blur'
                },
                {
                    min: 8,
                    message: `${this.$t('login.requirePass2')} 8 ${this.$t('login.requirePass3')}`,
                    trigger: 'blur'
                }
            ];
        }
    },
    methods: {
        async submitForm(formEl) {
            if (!formEl) return;
            await formEl.validate(async (valid, fields) => {
                if (valid) {
                    const loading = ElLoading.service({
                        lock: true,
                        text: 'Đang đăng nhập',
                        background: 'rgba(0, 0, 0, 0.7)',
                    })
                    await login(this.dataUser).then(result => {
                        Cookies.set('user', JSON.stringify(result))
                        this.$message.success('Đăng nhập thành công')
                        loading.close()
                        this.$router.push('/trade')
                        window.location.reload();
                    }).catch(error => {
                        this.$message.error('Đăng nhập thất bại, kiểm tra lại tài khoản mật khẩu')
                        loading.close()
                    })
                } else {
                    console.log('error submit!', fields);
                }
            });
        },
        // async submitForm() {
        //     const loading = ElLoading.service({
        //         lock: true,
        //         text: 'Đang đăng nhập',
        //         background: 'rgba(0, 0, 0, 0.7)',
        //     })
        //     await login(this.dataUser).then(result => {
        //         Cookies.set('user', JSON.stringify(result))
        //         this.$message.success('Đăng nhập thành công')
        //         loading.close()
        //         this.$router.push('/trade')
        //         window.location.reload();
        //     }).catch(error => {
        //         this.$message.error('Đăng nhập thất bại, kiểm tra lại tài khoản mật khẩu')
        //         loading.close()
        //     })
        // }
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
