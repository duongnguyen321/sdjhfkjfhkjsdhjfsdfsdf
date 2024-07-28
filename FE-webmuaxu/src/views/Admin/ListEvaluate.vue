<template>
<div class="over pt-8">
    <el-button @click="openDialogEvaluate(false, '')">Thêm đánh giá</el-button>
    <el-table :data="dataListEvaluate" style="width: 100%" class="mt-4" :border="true">
        <el-table-column prop="userName" label="Tên ngân hàng" />
        <el-table-column prop="comment" label="Đánh giá" />
        <el-table-column label="Thao tác" min-width="150px">
            <template #default="scope">
                <el-button @click="openDialogEvaluate(true, scope.row )">
                    Sửa
                </el-button>
                <el-button @click="deleteEvaluate(scope.row)">
                    Xóa
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="dialogEvaluate" :title="isEditForm?'Sửa thông tin': 'Thêm mới'" width="500">
        <el-form label-width="auto" class="demo-ruleForm mt-4">
            <el-form-item label="Tên Evaluate">
                <el-input v-model="dataEvaluate.userName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Đánh giá">
                <el-input v-model="dataEvaluate.comment" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogEvaluate = false">Cancel</el-button>
                <el-button type="primary" @click="isEditForm ? updateEvaluate() : addEvaluate()">
                    {{ isEditForm ? 'Cập nhật' : 'Xác nhận' }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</div>
</template>

<script>
import {
    apiAddEvaluate,
    apiDeleteEvaluate,
    apiUpdateEvaluate,
    listEvaluate
} from '@/api/evaluate';

export default {
    data() {
        return {
            dialogEvaluate: false,
            dataEvaluate: {
                userName: "",
                idUser: "",
                comment: ""
            },
            dataListEvaluate: [],
            isEditForm: false
        }
    },
    created() {
        this.getListEvaluate()
    },
    methods: {
        openDialogEvaluate(item, coin) {
            this.isEditForm = item
            this.dialogEvaluate = true
            if (coin.length !== 0) {
                this.dataEvaluate = {
                    ...coin
                }
            } else {
                this.dataEvaluate = {
                    userName: "",
                    idUser: "",
                    comment: ""
                }
            }
        },
        updateEvaluate() {
            this.dialogEvaluate = false
            apiUpdateEvaluate(this.dataEvaluate._id, this.dataEvaluate).then(() => {
                this.$message.success('Cập nhật thành công')
                this.getListEvaluate()
            })
        },
        addEvaluate() {
            this.dialogEvaluate = false
            apiAddEvaluate(this.dataEvaluate).then(() => {
                this.$message.success('Thêm thành công')
                this.getListEvaluate()
            })
        },
        getListEvaluate() {
            listEvaluate().then(result => {
                this.dataListEvaluate = result
            })
        },
        deleteEvaluate(item) {
            apiDeleteEvaluate(item._id).then(() => {
                this.$message.success('Xóa thành công')
                this.getListEvaluate()
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
