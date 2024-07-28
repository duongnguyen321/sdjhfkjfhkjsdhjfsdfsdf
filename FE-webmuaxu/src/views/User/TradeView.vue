<template>
<div class='over'>
    <div class="container pb-4">
        <div class="warning mt-8">
            {{ this.dataWeb.tradeNote }}
        </div>
        <div class="over__container ">
            <div class="menu__left">
                <div class="form__new">
                    <div class="header__form">
                        <img src="../../assets/img/icon-ti-gia.png" alt="ti-gia" class="w-5 h-5">
                        <p class="text-xl font-bold">{{ $t('trade.exchangeRate') }}</p>
                    </div>
                    <p class="text-lg mb-2 mt-6">{{ $t('trade.titleExchange') }}</p>
                    <div>
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <el-button size="large" @click="changeShow(true)" :class="[showMenuBuy ? 'button__buy' : 'button__default', 'w-full']">{{ $t('trade.buy') }}</el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-button size="large" @click="changeShow(false)" :class="[showMenuBuy ? 'button__default' : 'button__sell', 'w-full']">{{ $t('trade.sell') }}</el-button>
                            </el-col>
                            <el-col :span="24">
                                <div class="flex flex-col gap-3 mt-4">
                                    <div v-for="item in dataListCoin" :key="item._id">
                                        <div v-if="showMenuBuy && item.statusBuy===1" :style="checkCoinChoise(item) ? 'background-color: #b5b5b5': '' " class="flex justify-between item__coin" @click="choiseCoin(item, 'Buy')">
                                            <div class="flex gap-2 items-center">
                                                <img class="w-5 h-5" :src="baseImg+item.icon" :alt="item.name">
                                                <p class="font-medium">{{ item.name }}</p>
                                            </div>
                                            <p class="money__buy">{{ formatCurrency(item.moneyBuy) }}</p>
                                        </div>
                                        <div v-if="!showMenuBuy && item.statusSell===1" :style="checkCoinChoise(item) ? 'background-color: #b5b5b5': '' " class="flex justify-between item__coin" @click="choiseCoin(item, 'Sell')">
                                            <div class="flex gap-2 items-center">
                                                <img class="w-5 h-5" :src="baseImg+item.icon" :alt="item.name">
                                                <p class="font-medium">{{ item.name }}</p>
                                            </div>
                                            <p class="money__sell">{{ formatCurrency(item.moneySell) }}</p>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <!-- <div class="form__new">
                    <div class="header__form">
                        <img src="../../assets/img/icon-giao-dich.png" alt="giao-dich" class="w-5 h-5">
                        <p class="text-xl font-bold">{{ $t('trade.recentTransactions') }}</p>
                    </div>
                    <div class="flex flex-col gap-3 mt-8 text-sm">
                        <div class="content__fb">
                            <div class="item__fb">
                                <p>Mua 38 USDT từ Vietcombank</p>
                                <div class="flex gap-2 items-center">
                                    <p>icon</p>
                                    <p>2024-07-06 07:28:19</p>
                                </div>
                            </div>
                            <div class="item__fb">
                                <p>Mua 38 USDT từ Vietcombank</p>
                                <div class="flex gap-2 items-center">
                                    <p>icon</p>
                                    <p>2024-07-06 07:28:19</p>
                                </div>
                            </div>
                            <div class="item__fb">
                                <p>Mua 38 USDT từ Vietcombank</p>
                                <div class="flex gap-2 items-center">
                                    <p>icon</p>
                                    <p>2024-07-06 07:28:19</p>
                                </div>
                            </div>
                            <div class="item__fb">
                                <p>Mua 38 USDT từ Vietcombank</p>
                                <div class="flex gap-2 items-center">
                                    <p>icon</p>
                                    <p>2024-07-06 07:28:19</p>
                                </div>
                            </div>
                            <div class="item__fb">
                                <p>Mua 38 USDT từ Vietcombank</p>
                                <div class="flex gap-2 items-center">
                                    <p>icon</p>
                                    <p>2024-07-06 07:28:19</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->

            </div>
            <div class="content">
                <div v-if="showFormBuy">
                    <p>{{ $t('trade.buy') }} {{ this.coinChoise.name }}</p>
                    <div class="form__trade">
                        <div class="info__trade">
                            {{ $t('trade.noteTrade') }}
                        </div>
                        <div>
                            <el-form :label-width="windowWidth < 600 ? '100px' : 'auto'" :label-position="windowWidth < 600 ? 'left' : 'right'" class="demo-ruleForm mt-6">
                                <el-form-item :label=" $t('trade.weHave') ">
                                    <el-input v-model="formBuy.Total" autocomplete="off" :disabled="true">
                                        <template #append>{{ this.coinChoise.unit }}</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item :label="$t('trade.quantityBuy')">
                                    <div class="flex w-full">
                                        <el-input-number @change="handleMoney()" @blur="handleMoney()" v-model="formBuy.QuantityBuy" placeholder="VD: 10" :controls="false" class="inputNumber" :min="coinChoise.min" :max="formBuy.Total" />
                                        <div class="textUnit">{{ this.coinChoise.unit }}</div>
                                    </div>
                                    <div style="font-size: 12px;color: #d9534f;font-style: italic; font-weight: 700;">{{ $t('trade.noteCoin1') }} {{ this.coinChoise.unit }} {{ $t('trade.noteCoin2') }} {{ this.coinChoise.min }} {{ $t('trade.noteCoin3') }} {{ this.formBuy.Total }}</div>
                                </el-form-item>
                                <el-form-item :label="$t('trade.moneyPaid')">
                                    <el-input v-model.number="formBuy.Money" disabled :formatter="(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')">
                                        <template #append>VND</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item :label="$t('trade.bankPaid')">
                                    <el-select v-model="formBuy.Bank" :placeholder="$t('trade.plaBankPaid')" style="width: 100%" @change="setupBinBank">
                                        <el-option v-for="item in listBankAdmin" :key="item._id" :label="item.name" :value="item._id" />
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label="$t('trade.addressCoin')">
                                    <el-input v-model.number="formBuy.Address" placeholder="VD: TG26uD8KTDAZm4od8yE9di9kMsXYZ12345" />
                                    <p style="font-size: 12px;color: #d9534f;font-style: italic; font-weight: 700;">{{ $t('trade.checkAddressCoin') }}</p>
                                </el-form-item>
                                <el-form-item :label="$t('trade.codeDiscount')">
                                    <el-input v-model.number="formBuy.Code" :placeholder="$t('trade.plaCodeDiscount')" />
                                </el-form-item>
                                <el-form-item label=" ">
                                    <el-button type="primary" @click="submitForm()" :disabled="(formBuy.QuantityBuy && formBuy.Address && formBuy.QuantityBuy.length!==0&&formBuy.Address.length!==0) ? false : true">
                                        {{ $t('trade.continue') }}
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="transaction__instructions rounded">
                            <p class="text-sm font-medium">{{ $t('trade.titleInstruct') }}</p>
                            <p class="text__manual">{{ $t('trade.des1') }}</p>
                            <p class="text__manual">{{ $t('trade.des2') }}</p>
                            <p class="text__manual">{{ $t('trade.des3') }}</p>
                            <p class="text__manual">{{ $t('trade.des4') }}</p>
                            <p class="text__manual">{{ $t('trade.des5') }}</p>
                        </div>
                    </div>
                </div>

                <div v-else>
                    <p>{{ $t('trade.sell') }} {{this.coinChoise.name}}</p>
                    <div class="form__trade">
                        <div class="info__trade">
                            {{ $t('trade.noteTrade') }}
                        </div>
                        <div>
                            <el-form label-width="auto" class="demo-ruleForm mt-6">
                                <el-form-item :label="$t('trade.quantitySell')">
                                    <el-input v-model="formSell.Quantity" autocomplete="off" placeholder="VD: 10$" @change="handleSell()">
                                        <template #append>{{ this.coinChoise.unit }}</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item :label="$t('trade.bankPaid')">
                                    <el-select v-model="formSell.Bank" filterable :placeholder="$t('trade.plaBankTo')">
                                        <template #label="{ label, value }">
                                            <div class="flex justify-between items-center">
                                                <span>{{ label }} </span>
                                                <img :src="logoBankSelect(value)" :alt="label" class="w-15 h-7">
                                            </div>
                                        </template>
                                        <el-option v-for="item in listBankVietQR" :key="item.id" :label="item.shortName" :value="item.id">
                                            <span style="float: left">{{ item.shortName }}</span>
                                            <span style="float: right;color: var(--el-text-color-secondary);font-size: 13px;">
                                                <img :src="item.logo" :alt="item.shortName" class="w-15 h-8">
                                            </span>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label="$t('trade.numberAccount')">
                                    <el-input v-model="formSell.NumberBank" :placeholder="$t('trade.plaNumberAccount')" @blur="checkName()">
                                        <template #suffix>
                                            <el-icon v-if="isLoadingCheckBank">
                                                <Loading />
                                            </el-icon>
                                            <el-icon v-else>
                                                <Check />
                                            </el-icon>
                                        </template>
                                    </el-input>

                                    <p v-if="this.isLoadingCheckBank">{{ $t('trade.titleLoading') }}</p>
                                </el-form-item>
                                <el-form-item :label="$t('trade.nameBank')">
                                    <el-input v-model.number="formSell.NameBank" disabled />
                                </el-form-item>
                                <el-form-item :label="$t('trade.moneyReceived')">
                                    <el-input v-model.number="formSell.Money" disabled :formatter="(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')">
                                        <template #append>VND</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item :label="$t('trade.weStillHave')">
                                    <el-input v-model.number="formSell.Total" disabled :formatter="(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')">
                                        <template #append>VND</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item :label="$t('trade.codeDiscount')">
                                    <el-input v-model="formSell.Code" />
                                </el-form-item>
                                <el-form-item label=" ">
                                    <el-button type="primary" @click="submitForm()" :disabled="validBan()">
                                        Tiếp tục
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="transaction__instructions rounded">
                            <p class="text-sm font-medium">{{ $t('trade.titleInstruct') }}</p>
                            <p class="text__manual">{{ $t('trade.des1') }}</p>
                            <p class="text__manual">{{ $t('trade.des2') }}</p>
                            <p class="text__manual">{{ $t('trade.des3') }}</p>
                            <p class="text__manual">{{ $t('trade.des4') }}</p>
                            <p class="text__manual">{{ $t('trade.des5') }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="menu__left">
                <div class="form__new">
                    <div class="header__form">
                        <img src="../../assets/img/icon-search.png" alt="giao-dich" class="w-5 h-5">
                        <p class="text-xl font-bold">{{ $t('trade.searchForOrders') }}</p>
                    </div>
                    <div class="flex flex-col gap-3 mt-8 text-sm">
                        <div class="flex flex-col">
                            <input class="input__search" v-model="code" :placeholder="$t('trade.plaSearchOrders')" />
                            <button class="button__search" @click="searchOrder">{{ $t('trade.search') }}</button>
                        </div>
                    </div>
                </div>
                <div class="form__new">
                    <div class="header__form">
                        <img src="../../assets/img/icon-star.png" alt="giao-dich" class="w-5 h-5">
                        <p class="text-xl font-bold">{{ $t('trade.evaluate') }}</p>
                    </div>
                    <div class="flex flex-col gap-3 mt-8 text-sm content__fb">
                        <div class="flex flex-col" v-for="item in dataEvaluate" :key="item._id">
                            <div class="item__danh--gia">
                                <p class="text-base font-medium">{{ item.userName }}</p>
                                <p>{{item.comment}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form__new">
                    <div class="header__form">
                        <img src="../../assets/img/icon-service.png" alt="support" class="w-5 h-5">
                        <p class="text-xl font-bold">{{ $t('trade.support') }}</p>
                    </div>
                    <div class="flex flex-col gap-3 mt-4 text-sm">
                        <div style="font-size: 13px;">
                            <p class="my-4 font-bold">{{ $t('trade.phone') }}: {{ this.dataWeb.phone }}</p>
                            <p style="color: #5f9ea0;" class="font-bold">{{ $t('trade.noteSupport') }}</p>
                        </div>
                    </div>
                </div>

                <!-- <el-button @click="showNotify">Test notify</el-button> -->

            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    listBank
} from '@/api/bank';
import {
    getListBank
} from '@/api/bankVietqr';
import {
    listCoin
} from '@/api/coin';
import {
    apiAddTrade,
    listTrade
} from '@/api/trade';
import {
    lookupAccount
} from '@/api/vietqr';
import {
    baseImg
} from '@/api/img';
import {
    listEvaluate
} from '@/api/evaluate';
import Cookies from 'js-cookie';
import {
    ElNotification
} from 'element-plus'

export default {
    data() {
        return {
            baseImg: baseImg,
            formBuy: {
                Total: 1,
                QuantityBuy: null,
                Money: null,
                Code: '',
                Address: '',
                Bank: '',
                NumberBank: '',
                binBank: ''
            },
            showMenuBuy: true,
            showFormBuy: true,
            code: '',
            formSell: {
                Quantity: null,
                Bank: '',
                NumberBank: null,
                NameBank: '',
                Money: null,
                Total: null,
                Code: ''
            },
            listBankVietQR: [],
            checkBank: false,
            isLoadingCheckBank: false,
            listBankAdmin: [],
            dataListCoin: [],
            coinChoise: '',
            dataCreateTrade: {
                idCoin: "",
                nameCoin: "",
                unitCoin: '',
                quantity: 0,
                walletAddress: "",
                qrCoin: "",
                userName: "",
                accountNumber: "",
                bankName: "",
                bankAccount: "",
                moneyTrade: 0,
                transactionFees: 0,
                oderStatus: 1,
                tradeStatus: 3,
                tradingCode: ""
            },
            windowWidth: window.innerWidth,
            dataEvaluate: [],
            dataWeb: {}
        }
    },
    created() {
        this.callApiGetListBank()
        this.callApiGetListBankAdmin()
        this.callApiGetListCoin()
        this.callApiGetListEvaluate()
        this.getSettingWeb()
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        showNotify() {
            ElNotification({
                title: 'Custom Position',
                message: "I'm at the bottom left corner",
                position: 'bottom-left',
            })
        },
        getSettingWeb() {
            this.dataWeb = JSON.parse(Cookies.get('web'))
            console.log('data web', this.dataWeb);
        },
        handleResize() {
            this.windowWidth = window.innerWidth;
        },
        setupBinBank() {
            this.formBuy.binBank = this.listBankAdmin.find(i => i._id === this.formBuy.Bank).bin
        },
        handleSell() {
            this.formSell.Money = this.formSell.Quantity * this.coinChoise.moneySell
        },
        handleMoney() {
            this.formBuy.Money = this.formBuy.QuantityBuy * this.coinChoise.moneyBuy
        },
        setDataForm() {
            this.formBuy = {
                ...this.formBuy,
                Total: this.coinChoise.quantity
            }
        },
        checkCoinChoise(item) {
            if (item._id === this.coinChoise._id && this.showFormBuy === this.showMenuBuy) {
                return true
            }
            return false
        },
        choiseCoin(item, status) {
            this.coinChoise = item
            switch (status) {
                case 'Buy':
                    this.showFormBuy = true
                    this.formBuy = {
                        ...this.formBuy,
                        Total: this.coinChoise.quantity
                    }
                    break;
                case 'Sell':
                    this.showFormBuy = false
                    // this.formSell = {
                    //     ...this.formSell,
                    //     Total: this.coinChoise.quantity
                    // }
                    break;
                default:
                    break;
            }
        },
        formatCurrency(value) {
            return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND`;
        },
        callApiGetListEvaluate() {
            listEvaluate().then(result => {
                this.dataEvaluate = result
            })
        },
        callApiGetListCoin() {
            listCoin().then(result => {
                this.dataListCoin = result
                this.coinChoise = result[0]
                this.setDataForm()
            })
        },
        callApiGetListBankAdmin() {
            listBank().then(result => {
                this.listBankAdmin = result
            })
        },
        callApiGetListBank() {
            getListBank().then(result => {
                this.listBankVietQR = result.data
            })
        },
        submitForm() {
            var dataUser = JSON.parse(Cookies.get('user'))
            this.dataCreateTrade = {
                ...this.dataCreateTrade,
                idCoin: this.coinChoise._id,
                nameCoin: this.coinChoise.name,
                unitCoin: this.coinChoise.unit,
                quantity: this.showFormBuy ? this.formBuy.QuantityBuy : this.formSell.Quantity,
                walletAddress: this.showFormBuy ? this.formBuy.Address : this.coinChoise.walletAddress,
                qrCoin: this.showFormBuy ? '' : this.coinChoise.qrCoin,
                userName: dataUser.username,
                idUser: dataUser.userId,
                binBank: this.showFormBuy ? this.formBuy.binBank : '',
                accountNumber: this.showFormBuy ? this.listBankAdmin.find(i => i._id === this.formBuy.Bank).accountNumber : this.formSell.NumberBank,
                bankName: this.showFormBuy ? this.listBankAdmin.find(i => i._id === this.formBuy.Bank).name : this.formSell.Bank,
                bankAccount: this.showFormBuy ? this.listBankAdmin.find(i => i._id === this.formBuy.Bank).userName : this.formSell.NameBank,
                moneyTrade: this.showFormBuy ? this.formBuy.Money : this.formSell.Money,
                transactionFees: this.showFormBuy ? this.coinChoise.serviceChargeBuy : this.coinChoise.serviceChargeSell,
                oderStatus: this.showFormBuy ? 1 : 2,
                tradeStatus: 3,
                tradingCode: '',
                exchangeRate: this.showFormBuy ? this.coinChoise.moneyBuy : this.coinChoise.moneySell
            }
            apiAddTrade(this.dataCreateTrade).then((result) => {
                this.$router.push({
                    path: '/transaction',
                    query: {
                        id: result._id
                    }
                })
            })
        },
        changeShow(item) {
            this.showMenuBuy = item
        },
        validBan() {
            if (this.formSell.Quantity && this.formSell.Bank && this.formSell.NumberBank && this.checkBank) {
                return false
            }
            return true
        },
        logoBankSelect(item) {
            return this.listBankVietQR.find(i => i.id === item).logo
        },
        checkName() {
            this.formSell.NameBank = ''
            this.isLoadingCheckBank = true
            const bankChoise = this.listBankVietQR.find(i => i.id === this.formSell.Bank)
            lookupAccount(bankChoise.bin, this.formSell.NumberBank).then(result => {
                    this.formSell.NameBank = result.data.accountName
                    this.checkBank = true
                    this.isLoadingCheckBank = false
                    this.formSell.Total = this.listBankAdmin[0].bankBalance
                })
                .catch(() => {
                    this.formSell.NameBank = `Không tìm thấy STK ${bankChoise.code} này, vui lòng thử lại.`
                    this.checkBank = false
                    this.isLoadingCheckBank = false
                })
        },
        async searchOrder() {
            await listTrade({
                tradingCode: this.code
            }).then(result => {
                this.$router.push({
                    path: '/transaction',
                    query: {
                        id: result._id
                    }
                })
            }).catch(() => {
                this.$message.error('Không tồn tại mã đơn hàng này, vui lòng kiểm tra lại')
            })
        }
    },
}
</script>

<style lang="scss">
.inputNumber {
    flex-grow: 1;

    .el-input__wrapper {
        border-radius: 4px 0 0 4px;
    }
}

.textUnit {
    border-radius: 0 4px 4px 0;
    color: #909399;
    height: 32px;
    line-height: 32px;
    border: 1px solid #e5e7eb;
    padding: 0 20px;
    background-color: #f5f7fa
}

.button__default {
    background-color: #1a2b26;
    color: #fff
}

.button__buy {
    background-color: #00c48c;
    color: #fff
}

.button__sell {
    background-color: #ff647c;
    color: #fff
}

.item__danh--gia {
    padding: 10px 15px;
    background: #ebebeb;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
}

.button__search {
    background-color: #00c48c;
    color: #FFF;
    height: 40px;
    width: 100%;
    font-size: 16px;
    font-weight: 500
}

.button__search:hover {
    opacity: .7;
}

.input__search {
    width: 100%;
    box-shadow: unset;
    // margin-bottom: 10px;
    text-align: center;
    border-radius: 0;
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    box-sizing: border-box;
    border: 1px solid #00c48c;
    padding: 0 .75em;
    height: 3em;
    font-size: .97em;
    border-radius: 0;
    max-width: 100%;
    width: 100%;
    vertical-align: middle;
    background-color: #fff;
    color: #333;
}

.input__search:focus-visible {
    box-shadow: 0 0 5px #ccc;
    outline: none
}

.header__form {
    padding: 15px;
    display: flex;
    gap: 10px;
    align-items: center;
    margin: -15px -10px;
    border-bottom: 2px solid #ebebeb;

}

.item__giaodich {
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    box-shadow: 2px 2px 10px #00000014;
}

.item__coin {
    padding: 10px;
    border: 1px solid #dadada;
    border-radius: 5px;
    background: #efefef;
    cursor: pointer;

    .money__buy {
        background-color: #00c48c;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        line-height: 30px;
        padding: 0 7px;
        min-width: 100px;
        text-align: center;
        border-radius: 5px;
    }

    .money__sell {
        background-color: #ff647c;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
        line-height: 30px;
        padding: 0 7px;
        min-width: 100px;
        text-align: center;
        border-radius: 5px;
    }

}

.text__support {
    // border-bottom: 1px solid #ddd;
    position: relative;
    padding-bottom: 10px;

    &:after {
        content: '';
        position: absolute;
        width: calc(100% + 30px);
        height: 1px;
        background-color: #ddd;
        bottom: 0;
        left: -15px;
    }
}

.support {
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #ddd;

}

.content__fb {
    height: 240px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.item__fb {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px
}

.item__cmt {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.warning {
    padding: 15px;
    background-color: #f2dede;
    border-radius: 4px;
    font-size: 15px;
}

.info__trade {
    color: #31708f;
    background-color: #d9edf7;
    padding: 15px;
    border: 1px solid #bce8f1;
    border-radius: 4px;
}

.transaction__instructions {
    padding: 15px;
    background-color: #f2f2f2;
    color: #3f3f3f;
    font-size: 15px;
    margin-top: 30px;
}

@media only screen and (max-width: 600px) {
    .demo-ruleForm {
        .el-form-item__label {
            line-height: 1.1em;
        }
    }
}
</style>
