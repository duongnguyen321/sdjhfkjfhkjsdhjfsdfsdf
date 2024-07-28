<template>
<div class="over">
    <div class="container flex gap-4 py-8">
        <div class="grow">
            abc
            <div>
                <p class="mt-8 mb-4 news__more">Tin khac</p>
                <div class="p-6 flex flex-col gap-4 rounded" style="background-color: #fafbff;">
                    <p class="item__news--more">Bảo Hiểm</p>
                    <p class="item__news--more">Hướng dẫn xác minh tài khoản ngân hàng KYC</p>
                    <p class="item__news--more">Cảnh Báo Lừa Đảo</p>
                </div>
            </div>
        </div>
        <InstructAndTags />
    </div>
</div>
</template>

<script>
import InstructAndTags from '@/components/InstructAndTags.vue';

export default {
    components: {
        InstructAndTags
    }
}
</script>

<style lang="scss">
.news__more {
    font-size: 13px;
    display: inline-block;
    color: #fff;
    padding: 5px 10px;
    border-radius: 20px;
    background: #134687;
    cursor: pointer;
}

.item__news--more {
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    position: relative;
}

.item__news--more::after {
    position:absolute;
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 100px;
    background-color: #000;
    top: 50%;
    left: -10px;
    transform: translateY(-50%);
}
</style>
