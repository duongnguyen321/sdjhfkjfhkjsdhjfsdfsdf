<template>
<div class="over">
    <div class="container">
        <div class="text_transaction mt-8">{{ $t('transaction.noteTrans') }}</div>
        <div style="box-shadow: 0 0 40px -3px rgb(0 0 0 / 20%);">
            <p class="text-base font-bold py-2 text-center">{{dataTransaction.oderStatus===1 ? 'Mua' : 'Bán'}} {{ dataTransaction.nameCoin }}</p>
            <el-descriptions class="margin-top des__custom" :column="1" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            {{ $t('transaction.codeTrans') }}
                        </div>
                    </template>
                    <span style="color: #3c763d; font-weight: bold;" class="flex items-center gap-2">
                        {{ dataTransaction.tradingCode }}
                        <img src="../../assets/img/icon-copy.png" alt="copy" class="w-4 h-4 cursor-pointer" @click="copyToClipboard( dataTransaction.tradingCode )">
                    </span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            {{ $t('transaction.yourPaid') }}
                        </div>
                    </template>
                    <div class="flex items-center gap-2">
                        <span style="color: #dc3545; font-weight: 700">
                            {{dataTransaction.oderStatus===1 ? formatCurrency(dataTransaction.moneyTrade) : dataTransaction.quantity}}
                        </span>
                        {{dataTransaction.oderStatus===1 ? 'VND' : dataTransaction.unitCoin}}
                        <img src="../../assets/img/icon-copy.png" alt="copy" class="w-4 h-4 cursor-pointer" @click="copyToClipboard(dataTransaction.oderStatus===1 ? dataTransaction.moneyTrade : dataTransaction.quantity)">
                    </div>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">{{ $t('transaction.youReceive') }}</div>
                    </template>
                    <span style="color: #dc3545; font-weight: 700">
                        <!-- {{ dataTransaction.quantity }} -->
                        {{dataTransaction.oderStatus!==1 ? formatCurrency(dataTransaction.moneyTrade) : dataTransaction.quantity}}
                    </span>
                    {{dataTransaction.oderStatus!==1 ? 'VND' : dataTransaction.unitCoin}}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            {{ $t('transaction.exchangeRate') }}
                        </div>
                    </template>
                    {{ formatCurrency(dataTransaction.exchangeRate) }} VND
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">{{ $t('transaction.initializationTime') }}</div>
                    </template>
                    {{ moment(dataTransaction.timeCreate).format('DD-MM-YYYY HH:mm:ss') }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">{{ $t('transaction.autoCancelTime') }}</div>
                    </template>
                    {{ moment(dataTransaction.timeEnd).format('DD-MM-YYYY HH:mm:ss') }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">{{ $t('transaction.status') }}</div>
                    </template>
                    <div class="flex gap-2 items-center" v-if="dataTransaction.tradeStatus === 3">
                        <span style="color: #a94442; font-weight: 700;">
                            {{ $t('transaction.loading') }}
                        </span>
                        <el-icon class="rotating-icon">
                            <Loading />
                        </el-icon>
                    </div>
                    <div class="flex gap-2 items-center" v-if="dataTransaction.tradeStatus === 2">
                        <span style="color: #a94442; font-weight: 700;">
                            {{ $t('transaction.failed') }}
                        </span>
                        <el-icon class="fail-icon">
                            <CircleCloseFilled />
                        </el-icon>
                    </div>
                    <div class="flex gap-2 items-center" v-if="dataTransaction.tradeStatus === 1">
                        <span style="color: #3c763d; font-weight: 700;">
                            {{ $t('transaction.success') }}
                        </span>
                        <el-icon class="success-icon">
                            <SuccessFilled />
                        </el-icon>
                    </div>
                </el-descriptions-item>
            </el-descriptions>

            <div v-if="dataTransaction.oderStatus!==1" class="bg-white text-sm" style="padding: 8px 11px; border-bottom: 1px solid #d5d5d5">
                <p class="font-bold">{{ $t('transaction.bankReceives') }}</p>
                <p style="color: #134687;">{{ maskString(dataTransaction.accountNumber) }} - {{ dataTransaction.bankAccount }} - MBB</p>
            </div>
            <div v-if="dataTransaction.oderStatus!==1" class="bg-white text-sm text" style="padding: 8px 11px;">
                <p class="">{{ $t('transaction.pleaseCheck1') }} <span style="color: #dc3545;">{{ dataTransaction.quantity }}</span> {{ dataTransaction.unitCoin }} {{ $t('transaction.pleaseCheck2') }} {{ dataTransaction.nameCoin }} {{ $t('transaction.pleaseCheck3') }}</p>
                <div class="flex gap-2 items-center pb-4 pt-2">
                    <p style="color: #134687; font-style: italic">{{ dataTransaction.walletAddress }}</p>
                    <img src="../../assets/img/icon-copy.png" alt="copy" class="w-4 h-4 cursor-pointer" @click="copyToClipboard(dataTransaction.walletAddress)">
                </div>
                <img style="width: 150px; height: 150px;" :src="baseImg+dataTransaction.qrCoin" :alt='dataTransaction.unitCoin'>
            </div>

            <div v-if="dataTransaction.oderStatus===1" style="padding: 8px 11px; font-size: 14px; background-color: #FFF;">
                <p class="font-bold">{{ $t('transaction.receivingAddress') }}</p>
                <p style="color: #134687">{{ dataTransaction.walletAddress }}</p>
                <p style="font-style: italic;">({{ $t('transaction.checkAddress') }} {{ dataTransaction.nameCoin }} )</p>
            </div>
            <div class="bg-white p-4 border mb-8 text-sm">
                <div v-if="dataTransaction.oderStatus===1">
                    <div class="flex gap-4 flex-wrap">
                        <p class="font-bold">{{ $t('transaction.suggestQR') }}</p>
                        <p class="cursor-pointer" @click="showQR()">{{isShowQR ? 'Ẩn QR' : 'Hiện QR'}}</p>
                        <p style="color: #337ab7">({{ $t('transaction.instructQR') }})</p>
                    </div>
                    <div class="flex flex-col items-center" v-if="isShowQR">
                        <img style="width: 300px; height: 300px;" :src="qrBank" alt="QR">
                        <p class="flex items-center gap-1 flex-wrap">({{ $t('transaction.noteQR1') }} <img src="../../assets/img/scan.png" alt="scan" class="w-3 h-3"> {{ $t('transaction.noteQR2') }})</p>
                    </div>
                    <div class="flex flex-col gap-4 my-4">
                        <p class="font-semibold">{{ $t('transaction.suggestQRAfter') }} {{ dataTransaction.bankName }}</p>
                        <p v-for="item in dataBank" :key="item.label" class="flex gap-2 items-center">
                            <img class="w-4 h-4" :src="imageSrc(item.url)" :alt="item.value">
                            <span class="font-bold">{{ item.label }} :</span> <span class="font-semibold mr-1 text-red-600"> {{ item.value }}</span>
                            <img src="../../assets/img/icon-copy.png" alt="copy" class="w-4 h-4 cursor-pointer" @click="copyToClipboard(item.value)">
                        </p>
                    </div>
                    <!-- <p style="color: #d9534f; font-weight: 700; font-style: italic; border-bottom: 1px solid #d5d5d5; padding-bottom: 10px">Bạn hãy chuyển chính xác số tiền (kể cả số lẻ) và nội dung chuyển khoản như hướng dẫn (phần in đậm). Nếu không chúng tôi sẽ không xử lý.</p> -->
                    <div style="color: #31708f; border-top: 1px solid #d5d5d5" class="text-sm mt-2 pt-2">
                        <p class="font-bold mb-2">{{ $t('transaction.titleNoteTrans') }}</p>
                        <p class="flex gap-2 items-center">
                            <img src="../../assets/img/icon-i-xanh.png" alt="icon i" class="w-3 h-3"> {{ $t('transaction.noteTrans1') }}
                        </p>
                        <p class="flex gap-2 items-center">
                            <img src="../../assets/img/icon-i-xanh.png" alt="icon i" class="w-3 h-3"> {{ $t('transaction.noteTrans2') }}
                        </p>
                        <p class="flex gap-2 items-center">
                            <img src="../../assets/img/icon-i-xanh.png" alt="icon i" class="w-3 h-3"> {{ $t('transaction.noteTrans3') }}
                        </p>
                        <p class="flex gap-2 items-center">
                            <img src="../../assets/img/icon-i-xanh.png" alt="icon i" class="w-3 h-3"> {{ $t('transaction.noteTrans4') }}
                        </p>
                    </div>
                    <div class="my-2 py-4 border-y flex gap-2 items-center">
                        <img src="../../assets/img/i-warning.png" alt="i warning" class="w-3 h-3">
                        <p class="font-bold" style="color: rgb(220 38 38);">{{ $t('transaction.confirmBuy1') }} {{ dataTransaction.quantity }} {{ dataTransaction.nameCoin }} {{ $t('transaction.confirmBuy2') }}</p>
                    </div>
                </div>

                <div class="text-sm">
                    <p class="font-bold mb-2">{{ $t('transaction.titleNoteAfter') }}</p>
                    <p class="flex gap-2 items-center">
                        <img src="../../assets/img/i-warning.png" alt="i warning" class="w-3 h-3">
                        {{ $t('transaction.noteAfter1') }}
                    </p>
                    <p class="flex gap-2 items-center">
                        <img src="../../assets/img/i-warning.png" alt="i warning" class="w-3 h-3">
                        <div class="flex flex-wrap gap-1 w-full">
                            {{ $t('transaction.noteAfter2_1') }} <span style="color: #a94442; font-weight: bold">{{ dataTransaction.tradingCode }}</span> <p class="flex flex-wrap whitespace-normal">{{ $t('transaction.noteAfter2_2') }}</p>
                        </div>
                    </p>
                    <p class="flex gap-2 items-center">
                        <img src="../../assets/img/i-warning.png" alt="i warning" class="w-3 h-3">
                        {{ $t('transaction.noteAfter3') }}
                    </p>
                    <p class="flex gap-2 items-center">
                        <img src="../../assets/img/i-warning.png" alt="i warning" class="w-3 h-3">
                        {{ $t('transaction.noteAfter4') }}
                    </p>
                    <p class="flex gap-2 items-center">
                        <img src="../../assets/img/i-warning.png" alt="i warning" class="w-3 h-3">
                        {{ $t('transaction.noteAfter5') }}
                    </p>
                    <p class="flex gap-2 items-center">
                        <img src="../../assets/img/i-warning.png" alt="i warning" class="w-3 h-3">
                        {{ $t('transaction.noteAfter6') }}
                    </p>
                    <p class="flex gap-2 items-center">
                        <img src="../../assets/img/i-warning.png" alt="i warning" class="w-3 h-3">
                        {{ $t('transaction.noteAfter7') }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    listTrade
} from '@/api/trade';
import moment from 'moment';
import {
    io
} from "socket.io-client";
import {
    baseImg
} from '@/api/img';
import {
    createQRBank
} from '@/api/vietqr';

export default {
    computed: {
        dataBank() {
            return [{
                    label: this.$t('transaction.accountNumber'),
                    value: '0801000263959',
                    url: '../../assets/img/number-bank.png'
                },
                {
                    label: this.$t('transaction.accountName'),
                    value: 'Phạm Trung Kiên',
                    url: '../../assets/img/user-bank.png'
                },
                {
                    label: this.$t('transaction.money'),
                    value: '269,398',
                    url: '../../assets/img/money-bank.png'
                },
                {
                    label: this.$t('transaction.transferContent'),
                    value: 'CKW WMXBYZ54GXS WMX0382997999',
                    url: '../../assets/img/info-bank.png'
                },
            ];
        }
    },
    data() {
        return {
            baseImg: baseImg,
            moment: moment,
            isShowQR: true,
            statusForm: 'Ban',
            dataTransaction: {},
            qrBank: '',
            listBankAdmin: []
        }
    },
    mounted() {
        this.socket = io(process.env.API_URL);

        this.socket.on("connect", () => {
            console.log("Connected to server");
        });

        this.socket.on("tradeUpdate", (trade) => {
            if (trade._id === this.dataTransaction._id) {
                this.dataTransaction = trade
            } else {
                console.log('Khong phai la giao dich thay doi');
            }
        });
    },
    async created() {
        await this.getDataTransaction()
        await this.getQRCode()
    },
    methods: {
        async getQRCode() {
            var dataCreateQR = {
                accountNo: this.dataTransaction.accountNumber,
                accountName: this.dataTransaction.bankAccount,
                acqId: this.dataTransaction.binBank,
                amount: Number(this.dataTransaction.exchangeRate),
                addInfo: `${this.dataTransaction.tradingCode} ${this.dataTransaction.accountNumber}`,
                format: "text",
                template: "compact"
            }
            await createQRBank(dataCreateQR).then(result => {
                this.qrBank = result.data.qrDataURL
            })
        },
        setDataBank() {
            this.dataBank[0].value = this.dataTransaction.accountNumber
            this.dataBank[1].value = this.dataTransaction.bankAccount
            this.dataBank[2].value = this.formatCurrency(this.dataTransaction.moneyTrade)
            this.dataBank[3].value = `${this.dataTransaction.tradingCode} ${this.dataTransaction.accountNumber}`
        },
        maskString(str) {
            if (!str || str.length <= 4) {
                return str;
            }
            const lastFourChars = str.slice(-4);
            const maskedChars = '*'.repeat(str.length - 4);
            return maskedChars + lastFourChars;
        },
        formatCurrency(value) {
            if (value === undefined || value === null) {
                return '';
            }
            return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
        },
        async getDataTransaction() {
            await listTrade({
                id: this.$route.query.id
            }).then(result => {
                this.dataTransaction = result
                this.setDataBank()
            })
        },
        async copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                // alert('Sao chép thành công!');
                this.$message.success('Sao chép thành công!');
            } catch (err) {
                console.error('Lỗi khi sao chép: ', err);
            }
        },
        showQR() {
            this.isShowQR = !this.isShowQR
        },
        imageSrc(url) {
            return new URL(`${url}`,
                import.meta.url).href;
        }
    },
    beforeDestroy() {
        // Đóng kết nối khi component bị hủy
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}
</script>

<style lang="scss">
.text_transaction {
    color: #3c763d;
    background-color: #dff0d8;
    border-color: #d6e9c6;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 14px
}

.des__custom {
    .el-descriptions__body .el-descriptions__table.is-bordered .el-descriptions__cell {
        background-color: #FFF;
    }
}

.success-icon {
    display: inline-block;
    color: #3c763d;

    svg {
        fill: currentColor;
        stroke: currentColor;
    }
}

.fail-icon {
    display: inline-block;
    color: #a94442;

    svg {
        fill: currentColor;
        stroke: currentColor;
    }
}

.rotating-icon {
    display: inline-block;
    animation: rotate360 2s linear infinite;
    color: #a94442;
    transform: scale(2);

    svg {
        fill: currentColor;
        stroke: currentColor;
        stroke-width: 2;
    }
}

@keyframes rotate360 {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
