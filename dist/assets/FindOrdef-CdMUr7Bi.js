import{l as h}from"./trade-DsKlzW2O.js";import{_ as m,a as _,c as f,d as u,t as l,e,w as o,h as p,o as g,i as n}from"./index-QQhhOUTB.js";import"./index-CdjHlNDK.js";const T={data(){return{CodeOrder:"",Query:{page:1,limit:10,idUser:""},dataListTrade:[],listTradeStatus:[{label:"Thành công",value:1},{label:"Hủy đơn",value:2},{label:"Đang xử lý",value:3}],listOrderStatus:[{label:"Mua",value:1},{label:"Bán",value:2}]}},created(){this.getListTrade()},methods:{getListTrade(){var t=JSON.parse(_.get("user"));this.Query={...this.Query,idUser:t.userId},h(this.Query).then(i=>{this.dataListTrade=i.data})},openDetailTrade(t){console.log("item",t)},formatCurrency(t){return`${t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")} VND`}}},y={class:"over"},v={class:"container py-8"};function S(t,i,C,w,s,c){const a=p("el-table-column"),b=p("el-table");return g(),f("div",y,[u("div",v,[u("p",null,l(t.$t("find.title")),1),e(b,{data:s.dataListTrade,style:{width:"100%"},class:"mt-4",border:!0},{default:o(()=>[e(a,{prop:"nameCoin",label:"Tên Coin"}),e(a,{prop:"quantity",label:"Số lượng coin"}),e(a,{prop:"walletAddress",label:"Địa chỉ ví"}),e(a,{prop:"accountNumber",label:"Số tài khoản"}),e(a,{prop:"bankName",label:"Tên ngân hàng"}),e(a,{prop:"bankAccount",label:"Tên tài khoản"}),e(a,{prop:"moneyTrade",label:"Tiền giao dịch"},{default:o(r=>[n(l(c.formatCurrency(r.row.moneyTrade)),1)]),_:1}),e(a,{prop:"transactionFees",label:"Phí giao dịch"},{default:o(r=>[n(l(c.formatCurrency(r.row.transactionFees)),1)]),_:1}),e(a,{prop:"oderStatus",label:"Đơn mua/bán"},{default:o(r=>[n(l(s.listOrderStatus.find(d=>d.value===r.row.oderStatus).label),1)]),_:1}),e(a,{prop:"tradingCode",label:"Mã giao dịch"}),e(a,{prop:"tradeStatus",label:"Trạng thái đơn hàng"},{default:o(r=>[n(l(s.listTradeStatus.find(d=>d.value===r.row.tradeStatus).label),1)]),_:1})]),_:1},8,["data"])])])}const B=m(T,[["render",S]]);export{B as default};