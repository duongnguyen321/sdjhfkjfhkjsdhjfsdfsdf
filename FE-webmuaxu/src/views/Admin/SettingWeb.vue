<template>
<div class="over">
    <div class="form__trade my-8">
        <el-form label-width="auto" class="demo-ruleForm mt-6">
            <el-form-item label="Tên khách sạn">
                <el-input v-model="dataWeb.nameWeb" />
            </el-form-item>
            <el-form-item label="Tên viết tắt khách sạn">
                <el-input v-model="dataWeb.abbreviationName" />
            </el-form-item>
            <el-form-item label="Logo web">
                <div class="flex gap-4">
                    <el-upload v-model="dataWeb.logo" name="image" class="upload-demo" :action="uploadImg" :on-success="successLogo">
                        <el-button type="primary">Thêm ảnh</el-button>
                    </el-upload>
                    <img class="w-10 h-10 object-contain" :src="baseImg+dataWeb.logo" alt="logo">
                </div>
            </el-form-item>
            <el-form-item label="Email">
                <el-input v-model="dataWeb.email" />
            </el-form-item>
            <el-form-item label="Phone">
                <el-input v-model="dataWeb.phone" />
            </el-form-item>
            <el-form-item label="Copy Right">
                <el-input v-model="dataWeb.copyRight" />
            </el-form-item>
            <el-form-item label="Note Footer">
                <el-input v-model="dataWeb.noteFooter" />
            </el-form-item>
            <el-form-item label="Link Support Tele">
                <el-input v-model="dataWeb.linkSupportTele" />
            </el-form-item>
            <el-form-item label="Trade Note">
                <el-input v-model="dataWeb.tradeNote" />
            </el-form-item>
            <el-form-item label="Find Note">
                <el-input v-model="dataWeb.findNote" />
            </el-form-item>
            <el-form-item label="Social Network">
                <el-button @click="addSocial()">Thêm mạng xã hội</el-button>
            </el-form-item>
            <el-form-item v-for="(item, index) in listSocial" :label="`Social Network ${index + 1}`" :key="index">
                <div class="grid grid-cols-1 md:grid-cols-4 w-full gap-2 md:gap-4" >
                    <div class="flex gap-4">
                        <el-upload v-model="item.logo" name="image" class="upload-demo" :action="uploadImg" :on-success="(value) => successSocial(value, index)">
                            <el-button type="primary">Thêm ảnh</el-button>
                        </el-upload>
                        <img class="w-5 h-5 object-contain" :src="baseImg+item.logo" alt="logo">
                    </div>
                    <el-input v-model="item.name" placeholder="Nhập tên mạng xã hội" />
                    <el-input v-model="item.url" placeholder="Nhập url mạng xã hội" />
                    <el-button class="!h-full" @click="deleteSocial(index)" type="danger">Xóa mạng xã hội</el-button>
                </div>
            </el-form-item>
            <el-form-item label="Những câu hỏi chung">
                <el-button @click="addQuestion()">Thêm câu hỏi chung</el-button>
            </el-form-item>
            <el-form-item v-for="(item, index) in listQuestion" :label="`Câu hỏi ${index + 1}`" :key="index">
                <div class="grid grid-cols-1 md:grid-cols-3 w-full gap-2 md:gap-4" >
                    <el-input v-model="item.title" placeholder="Nhập tiêu đề" />
                    <el-input v-model="item.content" placeholder="Nhập nội dung" />
                    <el-button class="!h-full" @click="deleteQuestion(index)" type="danger">Xóa câu hỏi</el-button>
                </div>
            </el-form-item>
            <el-form-item label="Ảnh trên phần quảng cáo">
                <div class="flex gap-4">
                    <el-upload v-model="dataWeb.imgDialogShow" name="image" class="upload-demo" :action="uploadImg" :on-success="successImgDialog">
                        <el-button type="primary">Thêm ảnh</el-button>
                    </el-upload>
                    <img class="w-10 h-10 object-contain" :src="baseImg+dataWeb.imgDialogShow" alt="img dialog show">
                </div>
            </el-form-item>
            <el-form-item label="Nội dung phần quảng cáo">
                <el-input v-model="dataWeb.contentDialogShow" />
            </el-form-item>
            <el-form-item label="Favicon của web">
                <div class="flex gap-4">
                    <el-upload v-model="dataWeb.favicon" name="image" class="upload-demo" :action="uploadImg" :on-success="successImgFavicon">
                        <el-button type="primary">Thêm ảnh</el-button>
                    </el-upload>
                    <img class="w-10 h-10 object-contain" :src="baseImg+dataWeb.favicon" alt="favicon">
                </div>
            </el-form-item>
            <el-form-item label="Nội dung trên trình duyệt">
                <el-input v-model="dataWeb.titleWeb" />
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary" @click="updateSetting()">
                    Cập nhật
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
import {
    apiUpdateWeb,
    listWeb
} from '@/api/web';
import {
    baseImg,
    uploadImg
} from '@/api/img';

export default {
    data() {
        return {
            baseImg: baseImg,
            uploadImg: uploadImg,
            dataWeb: {
                nameWeb: "",
                abbreviationName: "",
                logo: "",
                email: "",
                phone: "",
                copyRight: "",
                noteFooter: "",
                linkSupportTele: "",
                socialNetwork: [],
                tradeNote: "",
                findNote: "",
                qandaList: [],
                favicon: "",
                titleWeb: ""
            },
            listSocial: [],
            listQuestion: []
        }
    },
    created() {
        this.callApiSetting()
    },
    methods: {
        deleteQuestion(index) {
            this.listQuestion.splice(index, 1)
        },
        addQuestion() {
            this.listQuestion.push({
                title: "",
                content: ""
            })
        },
        addSocial() {
            this.listSocial.push({
                name: "",
                url: "",
                logo: ""
            })
        },
        deleteSocial(index) {
            this.listSocial.splice(index, 1)
        },
        successSocial(item, index) {
            if (item.message === 'Success') {
                this.listSocial[index].logo = item.file.filename
            }
        },
        successImgFavicon(item) {
            if (item.message === 'Success') {
                this.dataWeb.favicon = item.file.filename
            }
        },
        successImgDialog(item) {
            if (item.message === 'Success') {
                this.dataWeb.imgDialogShow = item.file.filename
            }
        },
        successLogo(item) {
            if (item.message === 'Success') {
                this.dataWeb.logo = item.file.filename
            }
        },
        callApiSetting() {
            listWeb().then(result => {
                this.dataWeb = result[0]
                this.listSocial = this.dataWeb.socialNetwork
                this.listQuestion = this.dataWeb.qandaList
            })
        },
        updateSetting() {
            this.dataWeb.socialNetwork = this.listSocial
            this.dataWeb.qandaList = this.listQuestion
            apiUpdateWeb(this.dataWeb._id, this.dataWeb).then(result => {
                this.$message.success('Đã cập nhật thành công')
            })
        }
    },
}
</script>

<style lang="scss">

</style>
