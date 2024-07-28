<template>
<div class="over">
    <div class="container py-8">
        <p>{{ $t('find.title') }}</p>
        <el-table :data="dataListTrade" style="width: 100%" class="mt-4" :border="true">
            <el-table-column prop="nameCoin" label="Tên Coin" />
            <el-table-column prop="quantity" label="Số lượng coin" />
            <el-table-column prop="walletAddress" label="Địa chỉ ví" />
            <el-table-column prop="accountNumber" label="Số tài khoản" />
            <el-table-column prop="bankName" label="Tên ngân hàng" />
            <el-table-column prop="bankAccount" label="Tên tài khoản" />
            <el-table-column prop="moneyTrade" label="Tiền giao dịch">
                <template #default="scope">{{ formatCurrency(scope.row.moneyTrade) }}</template>
            </el-table-column>
            <el-table-column prop="transactionFees" label="Phí giao dịch">
                <template #default="scope">{{ formatCurrency(scope.row.transactionFees) }}</template>
            </el-table-column>
            <el-table-column prop="oderStatus" label="Đơn mua/bán">
                <template #default="scope">{{ listOrderStatus.find(i=>i.value===scope.row.oderStatus).label }}</template>
            </el-table-column>
            <el-table-column prop="tradingCode" label="Mã giao dịch" />
            <el-table-column prop="tradeStatus" label="Trạng thái đơn hàng">
                <template #default="scope">{{ listTradeStatus.find(i=>i.value===scope.row.tradeStatus).label }}</template>
            </el-table-column>
            <!-- <el-table-column label="Thao tác" min-width="150px">
                <template #default="scope">
                    <el-button @click="openDetailTrade(scope.row )">
                        Xem chi tiết
                    </el-button>
                </template>
            </el-table-column> -->
        </el-table>

    </div>
</div>
</template>

<script>
import {
    listTrade
} from '@/api/trade';
import Cookies from 'js-cookie';
export default {
    data() {
        return {
            CodeOrder: '',
            Query: {
                page: 1,
                limit: 10,
                idUser: ''
            },
            dataListTrade: [],
            listTradeStatus: [{
                label: 'Thành công',
                value: 1
            }, {
                label: 'Hủy đơn',
                value: 2
            }, {
                label: 'Đang xử lý',
                value: 3
            }],
            listOrderStatus: [{
                    label: 'Mua',
                    value: 1
                },
                {
                    label: 'Bán',
                    value: 2
                }
            ],
        }
    },
    created() {
        this.getListTrade()
    },
    methods: {
        getListTrade() {
            var dataUser = JSON.parse(Cookies.get('user'))
            this.Query = {
                ...this.Query,
                idUser: dataUser.userId
            }
            listTrade(this.Query).then(result => {
                this.dataListTrade = result.data
            })
        },
        openDetailTrade(item) {
            console.log('item', item);
        },
        formatCurrency(value) {
            return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND`;
        }
    },
}
</script>

<style lang="scss">

</style>
