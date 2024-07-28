import{l as f}from"./index-CdjHlNDK.js";import{_ as w,q as b,a as $,c as v,d as r,t as i,e as o,w as n,i as c,h as u,o as U}from"./index-QQhhOUTB.js";const V={data(){return{dataUser:{username:"",password:""}}},computed:{nameRules(){return[{required:!0,message:this.$t("login.requireName"),trigger:"blur"},{validator:(s,e,a)=>{/\s/.test(e)?a(new Error(this.$t("login.noSpaces"))):a()},trigger:"blur"}]},passwordRules(){return[{required:!0,message:this.$t("login.requirePass1"),trigger:"blur"},{min:8,message:`${this.$t("login.requirePass2")} 8 ${this.$t("login.requirePass3")}`,trigger:"blur"}]}},methods:{async submitForm(s){s&&await s.validate(async(e,a)=>{if(e){const d=b.service({lock:!0,text:"Đang đăng nhập",background:"rgba(0, 0, 0, 0.7)"});await f(this.dataUser).then(t=>{$.set("user",JSON.stringify(t)),this.$message.success("Đăng nhập thành công"),d.close(),this.$router.push("/trade"),window.location.reload()}).catch(t=>{this.$message.error("Đăng nhập thất bại, kiểm tra lại tài khoản mật khẩu"),d.close()})}else console.log("error submit!",a)})}}},k={class:"over"},y={class:"container"},q={class:"mt-8"},x={class:"text-center text-3xl mb-5"},N={class:"formLogin"},C={class:"text-right w-full"},R={class:"text-sm text-center"};function B(s,e,a,d,t,m){const g=u("el-input"),p=u("el-form-item"),h=u("el-button"),_=u("el-form");return U(),v("div",k,[r("div",y,[r("div",q,[r("p",x,i(s.$t("login.title")),1),r("div",N,[o(_,{ref:"refDataUser",model:t.dataUser,"label-width":"auto",class:"demo-ruleForm"},{default:n(()=>[o(p,{label:s.$t("login.user"),prop:"username",rules:m.nameRules},{default:n(()=>[o(g,{modelValue:t.dataUser.username,"onUpdate:modelValue":e[0]||(e[0]=l=>t.dataUser.username=l)},null,8,["modelValue"])]),_:1},8,["label","rules"]),o(p,{label:s.$t("login.password"),prop:"password",rules:m.passwordRules},{default:n(()=>[o(g,{modelValue:t.dataUser.password,"onUpdate:modelValue":e[1]||(e[1]=l=>t.dataUser.password=l),type:"password","show-password":""},null,8,["modelValue"])]),_:1},8,["label","rules"]),o(p,null,{default:n(()=>[r("div",C,[o(h,{type:"primary",onClick:e[2]||(e[2]=l=>m.submitForm(s.$refs.refDataUser))},{default:n(()=>[c(i(s.$t("login.title")),1)]),_:1})])]),_:1})]),_:1},8,["model"]),r("p",R,[c(i(s.$t("login.note1"))+" ",1),r("span",{class:"text-cyan-700 cursor-pointer",onClick:e[3]||(e[3]=l=>this.$router.push("/signup"))},i(s.$t("login.note2")),1)])])])])])}const L=w(V,[["render",B]]);export{L as default};
