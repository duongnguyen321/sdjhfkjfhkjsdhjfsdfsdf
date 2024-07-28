<template>
<div class='over'>
    <div class="container">
        <div class="home__view mt-6 flex flex-col gap-4 md:flex-row ">
            <div class="w-full md:w-1/2">
                <p style="font-size: 30px;">{{ $t('home.titleHome') }}</p>
                <p style="font-size: 13px;" class="my-10 leading-6">{{ $t('home.desHome') }}</p>
                <div class="flex flex-col gap-4">
                    <p class="flex items-center gap-2">
                        <img class="w-4 h-4" src="../../assets/img/arrowRight.png" alt="mũi tên phải" />
                        {{ $t('home.note1') }}
                    </p>
                    <p class="flex items-center gap-2">
                        <img class="w-4 h-4" src="../../assets/img/arrowRight.png" alt="mũi tên phải" />
                        {{ $t('home.note2') }}
                    </p>
                    <p class="flex items-center gap-2">
                        <img class="w-4 h-4" src="../../assets/img/arrowRight.png" alt="mũi tên phải" />
                        {{ $t('home.note3') }}
                    </p>
                </div>
                <el-button @click="this.$router.push('/signup')" class="mt-5">{{ $t('home.signUpNow') }}</el-button>
            </div>
            <div class="w-full md:w-1/2">
                <img src="../../assets/img/bg3.png" alt="anh giao dich" />
            </div>
        </div>
    </div>
    <div class="mt-8">
        <p class="text-center text-[28px] md:text-[40px] font-bold">{{ $t('home.textPayment') }} <span style="-webkit-background-clip: text;-webkit-text-fill-color: transparent;background-image: linear-gradient(to right, #501e9c 0%, #8169f1 30%, #8169f1 30%, #a44cee 73%, #ff847f 100%);">{{ $t('home.spanPayment') }}</span></p>
        <p class="text-center text-[16px] md:text-[18px]">{{ $t('home.desPayment') }}</p>
    </div>
    <div class="support__home mt-4 flex flex-col md:py-[50px] py-[10px] md:min-h-[240px] min-h-[150px] ">
        <div class="container flex justify-between">
            <img src="../../assets/img/coin1.png" alt="coin 1" class="w-[50px] md:w-[100px] object-contain mt-[30px]" />
            <img src="../../assets/img/coin2.png" alt="coin 2" class="w-[75px] md:w-[150px] object-contain mt-[60px]" />
            <img src="../../assets/img/coin3.png" alt="coin 3" class="w-[65px] md:w-[130px] object-contain mt-5" />
            <img src="../../assets/img/coin4.png" alt="coin 4" class="w-[50px] md:w-[100px] object-contain mt-5" />
            <img src="../../assets/img/coin5.png" alt="coin 5" class="w-[65px] md:w-[130px] object-contain mt-5" />
        </div>
    </div>
    <div class="container">
        <p class="text-center text-3xl mt-10 font-semibold">{{ $t('home.paymentPartner') }}</p>
        <p class="text-center text-base">{{ $t('home.desPaymentPartner') }}</p>
        <div class=" grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 mt-10 mb-14 gap-4">
            <img src="../../assets/img/napas.png" alt="icon_atm" class="" />
            <img src="../../assets/img/visa.png" alt="icon_atm" class="" />
            <img src="../../assets/img/mastercard.png" alt="icon_atm" class="" />
            <img src="../../assets/img/american.png" alt="icon_atm" class="" />
            <img src="../../assets/img/jcb.png" alt="icon_atm" class="" />
            <img src="../../assets/img/vcb.png" alt="icon_atm" class="" />
            <img src="../../assets/img/bidv.png" alt="icon_atm" class="" />
            <img src="../../assets/img/mb.png" alt="icon_atm" class="" />
            <img src="../../assets/img/shb.png" alt="icon_atm" class="" />
            <img src="../../assets/img/vib.png" alt="icon_atm" class="" />
            <img src="../../assets/img/tpbank.png" alt="icon_atm" class="" />
            <img src="../../assets/img/ocean.png" alt="icon_atm" class="" />
            <img src="../../assets/img/vpp.png" alt="icon_atm" class="" />
            <img src="../../assets/img/vtb.png" alt="icon_atm" class="" />
            <img src="../../assets/img/agribank.png" alt="icon_atm" class="" />
            <img src="../../assets/img/40bank.png" alt="icon_atm" class="" />
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {

    },
}
</script>

<style lang="scss">
.img__atm {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    opacity: 1;

    &:hover {
        -webkit-filter: grayscale(0);
        filter: grayscale(0);
        opacity: 1;
    }
}

.support__home {
    width: 100%;
    background: rgba(0, 0, 0, 0) url('../../assets/img/bg2.png') no-repeat left top;
    background-size: cover;

    img {
        animation: slide_up_down 1.7s ease-in-out infinite alternate both;
    }

    img:nth-child(1) {
        -webkit-animation-delay: -0.5s;
        animation-delay: -0.5s;
    }

    img:nth-child(2) {
        -webkit-animation-delay: -1s;
        animation-delay: -1s;
    }

    img:nth-child(3) {
        -webkit-animation-delay: -1.5s;
        animation-delay: -1.5s;
    }

    img:nth-child(4) {
        -webkit-animation-delay: -2s;
        animation-delay: -2s;
    }
}

@keyframes slide_up_down {
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }

    100% {
        -webkit-transform: translateY(-20px);
        transform: translateY(-20px);
    }
}
</style>
