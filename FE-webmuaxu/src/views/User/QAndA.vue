<template>
<div class="over">
    <div class="container">
        <div class="container">
            <div class="over__container pb-8 ">
                <InstructAndTags />
                <div class="content">
                    <p>FAQ</p>
                    <div class="form__trade">
                        <p class="text-2xl mb-4" >{{ $t('qanda.title') }}</p>
                        <el-collapse v-model="activeNames">
                            <el-collapse-item v-for="(item, index) in dataWeb.qandaList" :key="index" :title="item.title" :name="index+1">
                                <div>
                                    {{ item.content }}
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Cookies from 'js-cookie';
import InstructAndTags from '../../components/InstructAndTags.vue'
export default {
    components: {
        InstructAndTags
    },
    data() {
        return {
            activeNames: null,
            dataWeb: ''
        }
    },
    created() {
        this.getSettingWeb()
    },
    methods: {
        getSettingWeb() {
            this.dataWeb = JSON.parse(Cookies.get('web'))
        },
    },
}
</script>

<style lang="scss">

</style>
