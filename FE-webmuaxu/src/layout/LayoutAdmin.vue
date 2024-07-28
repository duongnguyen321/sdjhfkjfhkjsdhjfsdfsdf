<template>
<div class="over__admin">
    <div class="menu__admin">
        <el-menu class="el-menu-vertical-demo" @select="handleSelect">
            <el-menu-item v-for="item in menu" :index="item.ID" :key="item.ID">
                <el-icon>
                    <document />
                </el-icon>
                <template #title>{{ item.Name }}</template>
            </el-menu-item>
        </el-menu>
    </div>
    <div class="menu__admin--mobile">
        <img src="../assets/img/logo.png" alt="logo" class="w-[100px] h-[40px]" />
        <el-dropdown trigger="click" class="custom__dropdown">
            <img src="../assets/img/icon-menu.png" alt="translate" class="w-6 h-6" />
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="item in menu" :index="item.ID" :key="item.ID" @click="handleSelect(item.ID)">
                        {{ item.Name }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
    <div class="content__admin px-4">
        <router-view />
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            windowWidth: window.innerWidth,
            isCollapse: true,
            menu: [{
                    Name: 'Cài đặt web',
                    ID: '1',
                },
                {
                    Name: 'Lịch sử đơn hàng',
                    ID: '2',
                },
                {
                    Name: 'Tiền điện tử',
                    ID: '3',
                },
                {
                    Name: 'Danh sách ngân hàng',
                    ID: '4',
                },
                {
                    Name: 'Danh sách đánh giá',
                    ID: '5',
                },
                {
                    Name: 'Danh sách giao dịch',
                    ID: '6',
                },
            ]
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.windowWidth = window.innerWidth;
            console.log('windowWidth', this.windowWidth);
        },
        handleSelect(key, keyPath) {
            switch (key) {
                case '1':
                    this.$router.push('/admin/setting')
                    break;
                case '2':
                    this.$router.push('/admin/history')
                    break;
                case '3':
                    this.$router.push('/admin/coin')
                    break;
                case '4':
                    this.$router.push('/admin/bank')
                    break;
                case '5':
                    this.$router.push('/admin/evaluate')
                    break;
                case '6':
                    this.$router.push('/admin/transaction')
                    break;
                default:
                    break;
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.menu__admin--mobile {
    display: none;
}

.over__admin {
    width: 100%;
    height: 100vh;
    display: flex;
    gap: 20px
}

.menu__admin {
    width: 250px;
    height: 100vh;
    overflow-y: auto;
}

.content__admin {
    flex-grow: 1;
    height: 100vh;
    overflow-y: auto;
}

@media only screen and (max-width: 600px) {
    .over__admin {
        width: 100%;
        height: auto;
        display: flex;
        gap: 20px;
        flex-direction: column;

        .menu__admin {
            display: none;
        }

        .menu__admin--mobile {
            display: flex;
            width: 100%;
            height: 60px;
            align-items: center;
            padding: 0 10px;
            justify-content: space-between;
            box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
        }
    }
}
</style>
