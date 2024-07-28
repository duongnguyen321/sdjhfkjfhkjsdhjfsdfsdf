<template>
<div class="over">
    <div class="container">
        <div class="mt-8">
            <p class="text-center text-3xl mb-5">{{ $t('signup.title') }}</p>
            <div class="formLogin">
                <el-form ref="refDataUser" :model="dataUser" label-width="auto" class="demo-ruleForm">
                    <el-form-item :label="$t('signup.user')" prop="username" :rules="nameRules">
                        <el-input v-model="dataUser.username" />
                    </el-form-item>
                    <el-form-item :label="$t('signup.password')" prop="password" :rules="passwordRules">
                        <el-input v-model="dataUser.password" type="password" show-password />
                    </el-form-item>
                    <el-form-item :label="$t('signup.repassword')" prop="password" :rules="passwordRules">
                        <el-input v-model="dataUser.re_password" type="password" show-password />
                    </el-form-item>
                    <el-form-item>
                        <div class="text-right w-full">
                            <el-button type="primary" @click="submitForm($refs.refDataUser)">
                                {{ $t('signup.title') }}
                            </el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <p class="text-sm text-center">{{ $t('signup.note1') }}
                    <span class="text-cyan-700 cursor-pointer" @click="this.$router.push('./login')">{{ $t('signup.note2') }}</span>
                </p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    register
} from '@/api';

export default {
    data() {
        return {
            dataUser: {
                username: '',
                password: '',
                re_password: ''
            }
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
                    try {
                        const token = await this.$recaptcha('register');
                        var dataRegister = {
                            username: this.dataUser.username,
                            password: this.dataUser.password,
                            recaptchaToken: token
                        };
                        register(dataRegister).then(() => {
                            this.$message.success('Đã đăng ký thành công');
                            this.$router.push('/login');
                        })
                        .catch(error=>{
                            this.$message.error(error.message || error);
                        })
                    } catch (error) {
                        this.$message.error('Lỗi reCAPTCHA');
                    }
                } else {
                    console.log('error submit!', fields);
                }
            });
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
