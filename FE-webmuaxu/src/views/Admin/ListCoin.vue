<template>
<div class="over pt-8">
    <el-button @click="openDialogCoin(false, '')">Thêm Coin</el-button>
    <el-table :data="dataListCoin" style="width: 100%" class="mt-4" :border="true">
        <el-table-column prop="name" label="Tên" />
        <el-table-column prop="unit" label="Đơn vị" />
        <el-table-column prop="quantity" label="Tổng đang có" />
        <el-table-column label="Icon" >
            <template #default="scope">
                <img :src="baseImg+scope.row.icon" alt="coin">
            </template>
        </el-table-column>
        <el-table-column label="QR Coin">
            <template #default="scope">
                <img :src="baseImg+scope.row.qrCoin" alt="qrcoin">
            </template>
        </el-table-column>
        <el-table-column prop="walletAddress" label="Địa chỉ ví nhận coin" />
        <el-table-column label="Tiền bán" prop="moneySell">
            <template #default="scope">{{ formatCurrency(scope.row.moneySell)}}</template>
        </el-table-column>
        <el-table-column label="Phí bán coin" prop="serviceChargeSell">
            <template #default="scope">{{ formatCurrency(scope.row.serviceChargeSell)}}</template>
        </el-table-column>
        <el-table-column label="Trạng thái bán" prop="statusSell" />
        <el-table-column label="Tiền mua" prop="moneyBuy">
            <template #default="scope">{{ formatCurrency(scope.row.moneyBuy)}}</template>
        </el-table-column>
        <el-table-column label="Phí mua coin" prop="serviceChargeBuy">
            <template #default="scope">{{ formatCurrency(scope.row.serviceChargeBuy)}}</template>
        </el-table-column>
        <el-table-column label="Trạng thái mua" prop="statusBuy" />
        <el-table-column label="Giá trị mua nhỏ nhất" prop="min" />
        <el-table-column label="Thao tác" min-width="150px">
            <template #default="scope">
                <el-button @click="openDialogCoin(true, scope.row )">
                    Sửa
                </el-button>
                <el-button @click="deleteCoin(scope.row)">
                    Xóa
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="dialogCoin" :title="isEditForm?'Sửa thông tin': 'Thêm mới'" width="500">
        <el-form label-width="auto" class="demo-ruleForm mt-4">
            <el-form-item label="Tên Coin">
                <el-input v-model="dataCoin.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Đơn vị">
                <el-input v-model.number="dataCoin.unit" />
            </el-form-item>
            <el-form-item label="Tổng số coin">
                <el-input v-model.number="dataCoin.quantity" />
            </el-form-item>
            <el-form-item label="Icon coin">
                <el-upload v-model="dataCoin.icon" name="image" class="upload-demo" :action="uploadImg" :on-success="successImage" >
                    <el-button type="primary">Thêm ảnh</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="QR Coin">
                <el-upload v-model="dataCoin.qrCoin" name="image" class="upload-demo" :action="uploadImg" :on-success="successQRCoin" >
                    <el-button type="primary">Thêm ảnh</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="Địa chỉ ví nhận coin">
                <el-input v-model="dataCoin.walletAddress" />
            </el-form-item>
            <el-form-item label="Số tiền bán coin">
                <el-input v-model="dataCoin.moneySell" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Phí giao dịch bán coin">
                <el-input v-model.number="dataCoin.serviceChargeSell" />
            </el-form-item>
            <el-form-item label="Trạng thái bán">
                <el-input v-model.number="dataCoin.statusSell" />
            </el-form-item>
            <el-form-item label="Số tiền mua coin">
                <el-input v-model.number="dataCoin.moneyBuy" />
            </el-form-item>
            <el-form-item label="Phí giao dịch mua coin">
                <el-input v-model.number="dataCoin.serviceChargeBuy" />
            </el-form-item>
            <el-form-item label="Trạng thái mua">
                <el-input v-model.number="dataCoin.statusBuy" />
            </el-form-item>
            <el-form-item label="Giá trị mua nhỏ nhất">
                <el-input v-model="dataCoin.min" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogCoin = false">Cancel</el-button>
                <el-button type="primary" @click="isEditForm ? updateCoin() : addCoin()">
                    {{ isEditForm ? 'Cập nhật' : 'Xác nhận' }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</div>
</template>

<script>
import {
    apiAddCoin,
    apiDeleteCoin,
    apiUpdateCoin,
    listCoin
} from '@/api/coin';
import { baseImg, uploadImg } from '@/api/img';

export default {
    data() {
        return {
            dialogCoin: false,
            dataCoin: {
                name: '',
                unit: '',
                quantity: null,
                icon: '',
                qrCoin: '',
                walletAddress: '',
                moneySell: null,
                serviceChargeSell: null,
                statusSell: null,
                moneyBuy: null,
                serviceChargeBuy: null,
                statusBuy: null,
                min: null
            },
            dataListCoin: [],
            isEditForm: false,
            uploadImg: uploadImg,
            baseImg: baseImg
        }
    },
    created() {
        this.getListCoin()
    },
    methods: {
        successQRCoin(item) {
            if(item.message === 'Success') {
                this.dataCoin.qrCoin = item.file.filename
            }
        },
        successImage(item) {
            if(item.message === 'Success') {
                this.dataCoin.icon = item.file.filename
            }
        },
        openDialogCoin(item, coin) {
            this.isEditForm = item
            this.dialogCoin = true
            if (coin.length !== 0) {
                this.dataCoin = {
                    ...coin
                }
            } else {
                this.dataCoin = {
                    name: '',
                    unit: '',
                    quantity: null,
                    icon: '',
                    qrCoin: '',
                    walletAddress: '',
                    moneySell: null,
                    serviceChargeSell: null,
                    statusSell: null,
                    moneyBuy: null,
                    serviceChargeBuy: null,
                    statusBuy: null,
                    min: null
                }
            }
        },
        updateCoin() {
            this.dialogCoin = false
            apiUpdateCoin(this.dataCoin._id, this.dataCoin).then(() => {
                this.$message.success('Cập nhật thành công')
                this.getListCoin()
            })
        },
        addCoin() {
            this.dialogCoin = false
            apiAddCoin(this.dataCoin).then(() => {
                this.$message.success('Thêm thành công')
                this.getListCoin()
            })
        },
        getListCoin() {
            listCoin().then(result => {
                this.dataListCoin = result
            })
        },
        deleteCoin(item) {
            apiDeleteCoin(item._id).then(() => {
                this.$message.success('Xóa thành công')
                this.getListCoin()
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
