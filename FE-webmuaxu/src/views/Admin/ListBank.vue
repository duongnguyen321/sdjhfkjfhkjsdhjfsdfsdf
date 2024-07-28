<template>
<div class="over pt-8">
    <el-button @click="openDialogBank(false, '')">Thêm Bank</el-button>
    <el-table :data="dataListBank" style="width: 100%" class="mt-4" :border="true">
        <el-table-column prop="name" label="Tên ngân hàng" />
        <el-table-column prop="icon" label="Icon" />
        <el-table-column prop="bin" label="Mã Bin" />
        <el-table-column prop="userName" label="Tên tài khoản" />
        <el-table-column prop="accountNumber" label="Số tài khoản" />
        <el-table-column label="Số dư ngân hàng">
            <template #default="scope">
                <p>{{ formatCurrency(scope.row.bankBalance) }}</p>
            </template>
        </el-table-column>
        <el-table-column prop="status" label="Trạng thái" />
        <el-table-column label="Thao tác" min-width="150px">
            <template #default="scope">
                <el-button @click="openDialogBank(true, scope.row )">
                    Sửa
                </el-button>
                <el-button @click="deleteBank(scope.row)">
                    Xóa
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="dialogBank" :title="isEditForm?'Sửa thông tin': 'Thêm mới'" width="500">
        <el-form label-width="auto" class="demo-ruleForm mt-4">
            <el-form-item label="Tên Bank">
                <el-input v-model="dataBank.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Icon">
                <el-input v-model="dataBank.icon" />
            </el-form-item>
            <el-form-item label="Mã Bin">
                <el-input v-model="dataBank.bin" />
            </el-form-item>
            <el-form-item label="Số tài khoản">
                <el-input v-model="dataBank.accountNumber" />
            </el-form-item>
            <el-form-item label="Tên tài khoản">
                <el-input v-model="dataBank.userName" />
            </el-form-item>
            <el-form-item label="Số dư ngân hàng">
                <el-input v-model="dataBank.bankBalance" />
            </el-form-item>
            <el-form-item label="Tình trạng ngân hàng">
                <el-input v-model="dataBank.status" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogBank = false">Cancel</el-button>
                <el-button type="primary" @click="isEditForm ? updateBank() : addBank()">
                    {{ isEditForm ? 'Cập nhật' : 'Xác nhận' }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</div>
</template>

<script>
import {
    apiAddBank,
    apiDeleteBank,
    apiUpdateBank,
    listBank
} from '@/api/bank';

export default {
    data() {
        return {
            dialogBank: false,
            dataBank: {
                name: '',
                icon: '',
                bin: null,
                accountNumber: '',
                userName: '',
                status: null,
                bankBalance: null
            },
            dataListBank: [],
            isEditForm: false
        }
    },
    created() {
        this.getListBank()
    },
    methods: {
        openDialogBank(item, coin) {
            this.isEditForm = item
            this.dialogBank = true
            if (coin.length !== 0) {
                this.dataBank = {
                    ...coin
                }
            } else {
                this.dataBank = {
                    name: '',
                    icon: '',
                    bin: null,
                    accountNumber: '',
                    userName: '',
                    status: null,
                    bankBalance: null
                }
            }
        },
        updateBank() {
            this.dialogBank = false
            apiUpdateBank(this.dataBank._id, this.dataBank).then(() => {
                this.$message.success('Cập nhật thành công')
                this.getListBank()
            })
        },
        addBank() {
            this.dialogBank = false
            apiAddBank(this.dataBank).then(() => {
                this.$message.success('Thêm thành công')
                this.getListBank()
            })
        },
        getListBank() {
            listBank().then(result => {
                this.dataListBank = result
            })
        },
        deleteBank(item) {
            apiDeleteBank(item._id).then(() => {
                this.$message.success('Xóa thành công')
                this.getListBank()
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
