<template>
<div class="menu__left">
    <div class="view__more">
        <div class="head__more">Hướng dẫn mua bán xu tại webmuaxu.com</div>
        <div class="flex px-4 py-2 flex-col">
            <p class="py-2 cursor-pointer user__manual">Hướng dẫn mua bán PM và PM Voucher</p>
            <p class="py-2 cursor-pointer user__manual">How to buy and sell PM/PM Voucher (English)</p>
            <p class="py-2 cursor-pointer user__manual">Hướng dẫn login (đăng nhập)</p>
        </div>
    </div>
    <div class="view__more">
        <div class="head__more">Tags</div>
        <div class="py-2 px-4 flex gap-2 flex-wrap">
            <el-tag type="primary" size="large" class="cursor-pointer" @click="this.$router.push('/catalog')">Tin khác</el-tag>
            <el-tag type="primary" size="large" class="cursor-pointer">Tin tức tài chính</el-tag>
            <el-tag type="primary" size="large" class="cursor-pointer">Hướng dẫn</el-tag>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'InstructAndTags'
}
</script>

<style lang="">

</style>
