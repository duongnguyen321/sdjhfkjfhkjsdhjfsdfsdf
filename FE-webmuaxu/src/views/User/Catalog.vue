<template>
    <div class="over">
        <div class="container">
            <div class="container">
                <div class="over__container pb-8 ">
                    <InstructAndTags/>
                    <div class="content">
                        <p>Hwowngs dan</p>
                        <div class="form__trade flex flex-col gap-8">
                            <div class="flex justify-between gap-3 cursor-pointer" @click="this.$router.push('/news')">
                                <img src="https://i.ibb.co/5xFVdxw/th-4.jpg" alt="anh" class="w-48 h-28 object-contain">
                                <div class="flex flex-col gap-2">
                                    <p class="text-lg">Điều Kiện Và Điều Khoản Sử Dụng</p>
                                    <p class="text-sm">Bảo hiểm 2000$/Giao dịch. WebMuaXu.com là hệ thống đóng bảo hiểm giao dịch lớn nhất trên diễn đàn MMO4ME tại Việt Nam</p>
                                </div>
                            </div>
                            <div class="flex justify-between gap-3 cursor-pointer">
                                <img src="https://i.ibb.co/5xFVdxw/th-4.jpg" alt="anh" class="w-48 h-28 object-contain">
                                <div class="flex flex-col gap-2">
                                    <p class="text-lg">Điều Kiện Và Điều Khoản Sử Dụng</p>
                                    <p class="text-sm">Bảo hiểm 2000$/Giao dịch. WebMuaXu.com là hệ thống đóng bảo hiểm giao dịch lớn nhất trên diễn đàn MMO4ME tại Việt Nam</p>
                                </div>
                            </div>
                            <div class="flex justify-between gap-3 cursor-pointer">
                                <img src="https://i.ibb.co/5xFVdxw/th-4.jpg" alt="anh" class="w-48 h-28 object-contain">
                                <div class="flex flex-col gap-2">
                                    <p class="text-lg">Điều Kiện Và Điều Khoản Sử Dụng</p>
                                    <p class="text-sm">Bảo hiểm 2000$/Giao dịch. WebMuaXu.com là hệ thống đóng bảo hiểm giao dịch lớn nhất trên diễn đàn MMO4ME tại Việt Nam</p>
                                </div>
                            </div>
                            <el-pagination layout="prev, pager, next" :total="50" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    import InstructAndTags from '../../components/InstructAndTags.vue'
    export default {
        components: {InstructAndTags}
    }
    </script>
    
    <style lang="scss">
    
    </style>
    