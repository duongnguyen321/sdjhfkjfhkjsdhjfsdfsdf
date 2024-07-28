<template>
<div class="over pt-8">
    <el-button @click="openDialogTrade(false, '')">Thêm Trade</el-button>
    <el-table :data="dataListTrade" style="width: 100%" class="mt-4" :border="true">
        <!-- <el-table-column prop="_id" label="ID" /> -->
        <!-- <el-table-column prop="idCoin" label="idCoin" /> -->
        <el-table-column prop="nameCoin" label="Tên Coin" />
        <!-- <el-table-column prop="unitCoin" label="Viết tắt coin" /> -->
        <el-table-column prop="quantity" label="Số lượng coin" />
        <el-table-column prop="walletAddress" label="Địa chỉ ví" />
        <!-- <el-table-column prop="userName" label="Tên người dùng" /> -->
        <el-table-column prop="accountNumber" label="Số tài khoản" />
        <el-table-column prop="bankName" label="Tên ngân hàng" />
        <el-table-column prop="bankAccount" label="Tên tài khoản" />
        <el-table-column prop="moneyTrade" label="Tiền giao dịch" >
            <template #default="scope">{{ formatCurrency(scope.row.moneyTrade) }}</template>
        </el-table-column>
        <el-table-column prop="transactionFees" label="Phí giao dịch" >
            <template #default="scope">{{ formatCurrency(scope.row.transactionFees) }}</template>
        </el-table-column>
        <el-table-column prop="oderStatus" label="Đơn mua/bán" >
            <template #default="scope">{{ listOrderStatus.find(i=>i.value===scope.row.oderStatus).label }}</template>
        </el-table-column>
        <el-table-column prop="tradeStatus" label="Trạng thái đơn hàng" >
            <template #default="scope">{{ listTradeStatus.find(i=>i.value===scope.row.tradeStatus).label }}</template>
        </el-table-column>
        <el-table-column prop="tradingCode" label="Mã giao dịch" />
        <!-- <el-table-column label="Tiền bán" prop="moneySell">
            <template #default="scope">{{ formatCurrency(scope.row.moneySell)}}</template>
        </el-table-column> -->
        <el-table-column label="Thao tác" min-width="150px">
            <template #default="scope">
                <el-button @click="openDialogTrade(true, scope.row )">
                    Sửa
                </el-button>
                <el-button @click="deleteTrade(scope.row)">
                    Xóa
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="Total" class="my-4" @current-change="changePage" />

    <el-dialog v-model="dialogTrade" :title="isEditForm?'Sửa thông tin': 'Thêm mới'" width="500">
        <el-form label-width="auto" class="demo-ruleForm mt-4">
            <el-form-item label="idCoin">
                <el-input v-model="dataTrade.idCoin" autocomplete="off" />
            </el-form-item>
            <el-form-item label="nameCoin">
                <el-input v-model="dataTrade.nameCoin" autocomplete="off" />
            </el-form-item>
            <el-form-item label="unitCoin">
                <el-input v-model="dataTrade.unitCoin" autocomplete="off" />
            </el-form-item>
            <el-form-item label="quantity">
                <el-input v-model="dataTrade.quantity" autocomplete="off" />
            </el-form-item>
            <el-form-item label="walletAddress">
                <el-input v-model="dataTrade.walletAddress" autocomplete="off" />
            </el-form-item>
            <el-form-item label="userName">
                <el-input v-model="dataTrade.userName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="accountNumber">
                <el-input v-model="dataTrade.accountNumber" autocomplete="off" />
            </el-form-item>
            <el-form-item label="bankName">
                <el-input v-model="dataTrade.bankName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="bankAccount">
                <el-input v-model="dataTrade.bankAccount" autocomplete="off" />
            </el-form-item>
            <el-form-item label="moneyTrade">
                <el-input v-model="dataTrade.moneyTrade" autocomplete="off" />
            </el-form-item>
            <el-form-item label="transactionFees">
                <el-input v-model="dataTrade.transactionFees" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Trạng thái đơn hàng">
                <el-select v-model="dataTrade.oderStatus" placeholder="Chọn trạng thái đơn hàng" style="width: 100%">
                    <el-option v-for="item in listOrderStatus" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="Trạng thái giao dịch">
                <el-select v-model="dataTrade.tradeStatus" placeholder="Chọn trạng thái giao dịch" style="width: 100%">
                    <el-option v-for="item in listTradeStatus" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="tradingCode">
                <el-input v-model="dataTrade.tradingCode" autocomplete="off" />
            </el-form-item>

        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogTrade = false">Cancel</el-button>
                <el-button type="primary" @click="isEditForm ? updateTrade() : addTrade()">
                    {{ isEditForm ? 'Cập nhật' : 'Xác nhận' }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</div>
</template>

<script>
import {
    apiAddTrade,
    apiDeleteTrade,
    apiUpdateTrade,
    listTrade
} from '@/api/trade';

export default {
    data() {
        return {
            Query: {
                page: 1,
                limit: 10
            },
            Total: 0,
            listTradeStatus: [{
                label: 'Thành công',
                value: 1
            }, {
                label: 'Hủy đơn',
                value: 2
            }, {
                label: 'Đang xử lý',
                value: 3
            }, ],
            listOrderStatus: [{
                    label: 'Mua',
                    value: 1
                },
                {
                    label: 'Bán',
                    value: 2
                }
            ],
            dialogTrade: false,
            dataTrade: {
                idCoin: '',
                nameCoin: '',
                unitCoin: '',
                quantity: null,
                walletAddress: '',
                userName: '',
                accountNumber: '',
                bankName: '',
                bankAccount: '',
                moneyTrade: null,
                transactionFees: null,
                oderStatus: null,
                tradeStatus: null,
                tradingCode: '',
            },
            dataListTrade: [],
            isEditForm: false
        }
    },
    created() {
        this.getListTrade()
    },
    methods: {
        changePage(item) {
            this.Query.page = item
            this.getListTrade()
        },
        openDialogTrade(item, trade) {
            this.isEditForm = item
            this.dialogTrade = true
            if (trade.length !== 0) {
                this.dataTrade = {
                    ...trade
                }
            } else {
                this.dataTrade = {
                    idCoin: '',
                    nameCoin: '',
                    unitCoin: '',
                    quantity: null,
                    walletAddress: '',
                    userName: '',
                    accountNumber: '',
                    bankName: '',
                    bankAccount: '',
                    moneyTrade: null,
                    transactionFees: null,
                    oderStatus: null,
                    tradeStatus: null,
                    tradingCode: '',
                }
            }
        },
        updateTrade() {
            this.dialogTrade = false
            apiUpdateTrade(this.dataTrade._id, this.dataTrade).then(() => {
                this.$message.success('Cập nhật thành công')
                this.getListTrade()
            })
        },
        addTrade() {
            this.dialogTrade = false
            apiAddTrade(this.dataTrade).then(() => {
                this.$message.success('Thêm thành công')
                this.getListTrade()
            })
        },
        getListTrade() {
            listTrade(this.Query).then(result => {
                this.dataListTrade = result.data
                this.Total = result.total
            })
        },
        deleteTrade(item) {
            apiDeleteTrade(item._id).then(() => {
                this.$message.success('Xóa thành công')
                this.getListTrade()
            })
        },
        formatCurrency(value) {
            return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND`;
        }
    },
}
</script>

<style lang="scss">

    </style>
