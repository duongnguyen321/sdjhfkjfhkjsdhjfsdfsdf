<template>
<div>
    <div class="over menu">
        <div class="container containerMenu">
            <img :src="baseImg+dataWeb.logo" alt="logo" @click="this.$router.push('/')" class="cursor-pointer logo__menu" />
            <div v-if="windowWidth > 750" class="flex gap-6 cursor-pointer items-center w-auto ">
                <p :style="{color: menuChoise===0 ? '#2097ff': ''}" class="flex items-center font-medium" @click="this.$router.push('/trade')">{{ $t('menu.purchase') }}</p>
                <p :style="{color: menuChoise===1 ? '#2097ff': ''}" class="flex items-center font-medium" @click="this.$router.push('/find')">{{ $t('menu.findOrders') }}</p>
                <p :style="{color: menuChoise===2 ? '#2097ff': ''}" class="flex items-center font-medium" @click="this.$router.push('/qanda')">{{ $t('menu.QA') }}</p>
                <el-dropdown class="custom__dropdown" trigger="click">
                    <span class="el-dropdown-link">
                        <img :style="{display: $i18n.locale !== 'en'? 'none': ''}" src="../assets/img/flag-en.svg" alt="translate" class="w-6 h-6 object-cover rounded-[1000px]" />
                        <img :style="{display: $i18n.locale !== 'vi'? 'none': ''}" src="../assets/img/flag-vi.webp" alt="translate" class="w-6 h-6 object-cover rounded-[1000px]" />
                        <img :style="{display: $i18n.locale !== 'zh'? 'none': ''}" src="../assets/img/flag-zh.webp" alt="translate" class="w-6 h-6 object-cover rounded-[1000px]" />
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-if="this.$i18n.locale !== 'vi'" @click="this.$i18n.locale = 'vi'">
                                <img src="../assets/img/flag-vi.webp" alt="translate" class="w-6 h-6 object-cover rounded-[1000px]" />
                            </el-dropdown-item>
                            <el-dropdown-item v-if="this.$i18n.locale !== 'en'" @click="this.$i18n.locale = 'en'">
                                <img src="../assets/img/flag-en.svg" alt="translate" class="w-6 h-6 object-cover rounded-[1000px]" />
                            </el-dropdown-item>
                            <el-dropdown-item v-if="this.$i18n.locale !== 'zh'" @click="this.$i18n.locale = 'zh'">
                                <img src="../assets/img/flag-zh.webp" alt="translate" class="w-6 h-6 object-cover rounded-[1000px]" />
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-dropdown trigger="click" v-if="!checkLogin()">
                    <img src="../assets/img/icon-avatar.png" alt="translate" class="w-6 h-6" />
                    <template #dropdown>
                        <el-dropdown-menu class="py-8">
                            <el-dropdown-item @click="this.$router.push('/login')">{{ $t('menu.Login') }}</el-dropdown-item>
                            <el-dropdown-item @click="this.$router.push('/signup')">{{ $t('menu.Signup') }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-dropdown trigger="click" v-if="checkLogin()">
                    <img src="../assets/img/icon-avatar.png" alt="translate" class="w-6 h-6" />
                    <template #dropdown>
                        <el-dropdown-menu class="py-8">
                            <el-dropdown-item disabled>Xem thông tin</el-dropdown-item>
                            <el-dropdown-item divided @click="logout()">{{ $t('menu.Logout') }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div v-else class="flex gap-4">
                <el-dropdown trigger="click" class="custom__dropdown">
                    <img src="../assets/img/icon-menu.png" alt="translate" class="w-6 h-6" />
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="this.$router.push('/trade')">{{ $t('menu.purchase') }}</el-dropdown-item>
                            <el-dropdown-item @click="this.$router.push('/find')">{{ $t('menu.findOrders') }}</el-dropdown-item>
                            <el-dropdown-item @click="this.$router.push('/qanda')">{{ $t('menu.QA') }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-dropdown class="custom__dropdown" trigger="click">
                    <span class="el-dropdown-link">
                        <img :style="{display: $i18n.locale !== 'en'? 'none': ''}" src="../assets/img/flag-en.svg" alt="translate" class="w-6 h-6 object-cover rounded-[1000px]" />
                        <img :style="{display: $i18n.locale !== 'vi'? 'none': ''}" src="../assets/img/flag-vi.webp" alt="translate" class="w-6 h-6 object-cover rounded-[1000px]" />
                        <img :style="{display: $i18n.locale !== 'zh'? 'none': ''}" src="../assets/img/flag-zh.webp" alt="translate" class="w-6 h-6 object-cover rounded-[1000px]" />
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-if="this.$i18n.locale !== 'vi'" @click="this.$i18n.locale = 'vi'">
                                <img src="../assets/img/flag-vi.webp" alt="translate" class="w-6 h-6 object-cover rounded-[1000px]" />
                            </el-dropdown-item>
                            <el-dropdown-item v-if="this.$i18n.locale !== 'en'" @click="this.$i18n.locale = 'en'">
                                <img src="../assets/img/flag-en.svg" alt="translate" class="w-6 h-6 object-cover rounded-[1000px]" />
                            </el-dropdown-item>
                            <el-dropdown-item v-if="this.$i18n.locale !== 'zh'" @click="this.$i18n.locale = 'zh'">
                                <img src="../assets/img/flag-zh.webp" alt="translate" class="w-6 h-6 object-cover rounded-[1000px]" />
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-dropdown trigger="click" v-if="checkLogin()">
                    <img src="../assets/img/icon-avatar.png" alt="translate" class="w-6 h-6" />
                    <template #dropdown>
                        <el-dropdown-menu class="py-8">
                            <el-dropdown-item disabled>Xem thông tin</el-dropdown-item>
                            <el-dropdown-item divided @click="logout()">{{ $t('menu.Logout') }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="flex justify-between">
            <img src="https://coin.webmau68.com/wp-content/uploads/2021/08/l-main-bg.svg" alt="bg-over" class="bg__over left-0" />
            <img src="https://coin.webmau68.com/wp-content/uploads/2021/08/l-main-bg.svg" alt="bg-over" class="bg__over right-0" />
        </div>
    </div>
    <div class="content__layout">
        <router-view />
    </div>
    <div class="footer">
        <div class="container flex justify-between pt-5 text-sm md:flex-row flex-col">
            <div class="w-full md:w-auto text-center md:text-left pt-6 md:pt-0">
                <img :src="baseImg+dataWeb.logo" alt="logo" class="w-44 h-24 mx-auto" />
                <div class="pt-4 flex flex-col gap-1">
                    <p>{{ $t('home.titleEmail') }}: {{ dataWeb.email }}</p>
                    <p>{{ $t('home.titlePhone') }}: {{ dataWeb.phone }}</p>
                    <p class="hover:text-cyan-600 cursor-pointer">{{ dataWeb.noteFooter }}</p>
                </div>
            </div>
            <div class="flex flex-col gap-2 w-full md:w-auto text-center md:text-left pt-6 md:pt-5">
                <p class="text-xl font-semibold">{{ $t('home.titleSupport') }}</p>
                <p @click="this.$router.push('/find')" class="hover:text-cyan-600 cursor-pointer">{{ $t('menu.findOrders') }}</p>
                <p @click="this.$router.push('/qanda')" class="hover:text-cyan-600 cursor-pointer">{{ $t('menu.QA') }}</p>
                <a :href="dataWeb.linkSupportTele" target="_blank" class="hover:text-cyan-600 cursor-pointer">{{ $t('home.chatTelegram') }}</a>
            </div>
            <div class="w-full md:w-auto text-center md:text-left pt-6 md:pt-5">
                <p class="text-xl mb-2 font-semibold">{{ $t('home.socialNetwork') }}</p>
                <div class="flex flex-col gap-2">
                    <div class="flex justify-center" v-for="item in dataWeb.socialNetwork" :key="item.url">
                        <a :href="item.url" class="flex gap-2 hover:text-cyan-600 cursor-pointer">
                            <img class="w-4 h-4 object-contain" :src="baseImg+item.logo" :alt="item.name">
                            <p>{{ item.name }}</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="container text-center py-4">{{ dataWeb.copyRight }}</div>
    </div>

    <el-dialog v-model="dialogVisible" width="500" class="!rounded-lg !mt-10" :show-close="false">
        <div class="!mt-[-16px]">
            <img class="w-full object-contain" :src="baseImg+dataWeb.imgDialogShow" alt="ảnh quảng cáo">
            <p class="text-base py-4 text-center">{{ dataWeb.contentDialogShow }}</p>
            <el-button class="w-full" type="danger" @click="dialogVisible = false">Đóng thông báo</el-button>
        </div>
    </el-dialog>

</div>
</template>

<script>
import {
    baseImg
} from '@/api/img';
import {
    listWeb
} from '@/api/web';
import {
    ElNotification
} from 'element-plus';
import Cookies from 'js-cookie';

export default {
    data() {
        return {
            dataUser: '',
            dataWeb: {},
            windowWidth: window.innerWidth,
            menuChoise: null,
            showMenuLanguage: false,
            baseImg: baseImg,
            notificationInterval: '',
            dialogVisible: true,
            dataShowTrade: [{
                name: 'TrungPhong',
                content: 'VietComBank » Mua 55 WMZ',
                feedback: 'nhanh',
                time: 'Từ 10p trước'
            }, {
                name: 'NhatNam',
                content: 'TienPhongBank » Mua 5 WMZ',
                feedback: 'Quá nhanh, 10đ',
                time: 'Từ 12p trước'
            }, {
                name: 'DinhTrong',
                content: 'VietComBank » Mua 13 WMZ',
                feedback: 'quá nhanh',
                time: 'Từ 13 trước'
            }, {
                name: 'NamHai',
                content: 'Bán 51.48 WMZ » TechComBank',
                feedback: 'được, uy tín, nhận tiền ngay sau khi giao dịch',
                time: 'Từ 16p trước'
            },{
                name: 'HaiYen',
                content: 'Bán 130 WMZ » VP Bank',
                feedback: 'Uy tín',
                time: 'Từ 4p trước'
            },{
                name: 'DinhTuong',
                content: 'Bán 60 WMZ » VietComBank',
                feedback: 'good, giao dịch nhanh lẹ .Thank you',
                time: 'Từ 6p trước'
            },{
                name: 'ThuHuong',
                content: 'Bán 30 WMZ » BIDV',
                feedback: 'Nhanh và uy tín.',
                time: 'Từ 1p trước'
            }]
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.notificationInterval = setInterval(() => {
            this.showNotify();
        }, 360000); // 20 seconds 20000  360000
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
        clearInterval(this.notificationInterval);
    },
    created() {
        this.getInfo()
        this.getSettingWeb()
        this.getMenuChoise()
    },
    watch: {
        '$router.currentRoute.value.name': function (search) {
            this.getMenuChoise()
        }
    },
    methods: {
        showNotify() {
            const randomIndex = Math.floor(Math.random() * this.dataShowTrade.length);
            const randomTrade = this.dataShowTrade[randomIndex];

            ElNotification({
                dangerouslyUseHTMLString: true,
                message: `<div class="flex flex-col">
                    <p class="font-semibold">${randomTrade.name} ${randomTrade.content}</p>
                    <p class="mt-2">${randomTrade.feedback}</p>
                    <p class="text-xs text-right">${randomTrade.time}</p>
                    </div>`,
                position: 'bottom-left',
                duration: 4500
            });
        },
        getMenuChoise() {
            switch (this.$router.currentRoute.value.name) {
                case 'trade':
                case 'transaction':
                    this.menuChoise = 0
                    break;
                case 'find':
                    this.menuChoise = 1
                    break;
                case 'qanda':
                    this.menuChoise = 2
                    break;
                default:
                    this.menuChoise = null
                    break;
            }
        },
        handleResize() {
            this.windowWidth = window.innerWidth;
        },
        async getSettingWeb() {
            await listWeb().then(result => {
                this.dataWeb = result[0]
                Cookies.set('web', JSON.stringify(result[0]))
            })
        },
        getInfo() {
            if (Cookies.get('user')) {
                this.dataUser = JSON.parse(Cookies.get('user'))
            } else {
                this.dataUser = ''
            }
        },
        logout() {
            Cookies.remove('user')
            this.$router.push('/')
            window.location.reload();
        },
        checkLogin() {
            if (this.dataUser && this.dataUser.username) {
                return true
            }
            return false
        }
    },
}
</script>

<style lang="scss" scoped>
.bg__over {
    width: 350px;
    height: auto;
    position: fixed;
    top: 50%;
    z-index: -100;
    opacity: .3;
}

.menu {
    height: 70px;
    // background-color: #404564
    box-shadow: 1px 1px 10px rgba(0, 0, 0, .15);
}

.containerMenu {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo__menu {
        width: 200px;
        height: 60px;
        object-fit: contain;
    }
}

.footer {
    background-color: rgba(242,242,242,0.54);
}

.content__layout {
    min-height: calc(100vh - 270px);
}

.custom__dropdown {
    &:focus-visible {
        outline: none;

        .el-tooltip__trigger {
            &:focus-visible {
                outline: none;
            }
        }
    }
}
</style>
