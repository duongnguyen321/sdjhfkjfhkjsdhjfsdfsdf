<template>
<div class="over pt-8">
    <el-button @click="openDialogTransaction(false, '')">Thêm Transaction</el-button>
    <el-table :data="dataListTransaction" style="width: 100%" class="mt-4" :border="true">
        <el-table-column prop="userName" label="Tên user" />
        <el-table-column prop="content" label="Nội dung mua/bán" />
        <el-table-column prop="feedback" label="Đánh giá" />
        <el-table-column prop="time" label="Thời gian  giao dịch" />
        <el-table-column label="Thao tác" min-width="150px">
            <template #default="scope">
                <el-button @click="openDialogTransaction(true, scope.row )">
                    Sửa
                </el-button>
                <el-button @click="deleteTransaction(scope.row)">
                    Xóa
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="dialogTransaction" :title="isEditForm?'Sửa thông tin': 'Thêm mới'" style="max-width: 500px;" width="auto">
        <el-form label-width="auto" class="demo-ruleForm mt-4">
            <el-form-item label="Tên giao dịch">
                <el-input v-model="dataTransaction.userName" />
            </el-form-item>
            <el-form-item label="Nội dung">
                <el-input v-model="dataTransaction.content" />
            </el-form-item>
            <el-form-item label="Đánh giá">
                <el-input v-model="dataTransaction.feedback" />
            </el-form-item>
            <el-form-item label="Thời gian">
                <el-input v-model="dataTransaction.time" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogTransaction = false">Cancel</el-button>
                <el-button type="primary" @click="isEditForm ? updateTransaction() : addTransaction()">
                    {{ isEditForm ? 'Cập nhật' : 'Xác nhận' }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</div>
</template>

    
<script>
import {
    apiAddTransaction,
    apiDeleteTransaction,
    apiUpdateTransaction,
    listTransaction
} from '@/api/transaction';

export default {
    data() {
        return {
            dialogTransaction: false,
            dataTransaction: {
                userName: '',
                content: '',
                feedback: '',
                time: '',
            },
            dataListTransaction: [],
            isEditForm: false
        }
    },
    created() {
        this.getListTransaction()
    },
    methods: {
        openDialogTransaction(item, coin) {
            this.isEditForm = item
            this.dialogTransaction = true
            if (coin.length !== 0) {
                this.dataTransaction = {
                    ...coin
                }
            } else {
                this.dataTransaction = {
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
        updateTransaction() {
            this.dialogTransaction = false
            apiUpdateTransaction(this.dataTransaction._id, this.dataTransaction).then(() => {
                this.$message.success('Cập nhật thành công')
                this.getListTransaction()
            })
        },
        addTransaction() {
            this.dialogTransaction = false
            apiAddTransaction(this.dataTransaction).then(() => {
                this.$message.success('Thêm thành công')
                this.getListTransaction()
            })
        },
        getListTransaction() {
            listTransaction().then(result => {
                this.dataListTransaction = result
            })
        },
        deleteTransaction(item) {
            apiDeleteTransaction(item._id).then(() => {
                this.$message.success('Xóa thành công')
                this.getListTransaction()
            })
        },
    },
}
</script>