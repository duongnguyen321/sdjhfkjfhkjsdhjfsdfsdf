import{_ as v,a as h,c as l,d as e,e as i,t as r,w as d,h as o,o as a,F as f,r as g,f as b}from"./index-QQhhOUTB.js";import{I as A}from"./InstructAndTags-CWB1QtUi.js";const N={components:{InstructAndTags:A},data(){return{activeNames:null,dataWeb:""}},created(){this.getSettingWeb()},methods:{getSettingWeb(){this.dataWeb=JSON.parse(h.get("web"))}}},V={class:"over"},W={class:"container"},k={class:"container"},x={class:"over__container pb-8"},B={class:"content"},I=e("p",null,"FAQ",-1),S={class:"form__trade"},w={class:"text-2xl mb-4"};function F(_,n,T,q,s,y){const p=o("InstructAndTags"),m=o("el-collapse-item"),u=o("el-collapse");return a(),l("div",V,[e("div",W,[e("div",k,[e("div",x,[i(p),e("div",B,[I,e("div",S,[e("p",w,r(_.$t("qanda.title")),1),i(u,{modelValue:s.activeNames,"onUpdate:modelValue":n[0]||(n[0]=t=>s.activeNames=t)},{default:d(()=>[(a(!0),l(f,null,g(s.dataWeb.qandaList,(t,c)=>(a(),b(m,{key:c,title:t.title,name:c+1},{default:d(()=>[e("div",null,r(t.content),1)]),_:2},1032,["title","name"]))),128))]),_:1},8,["modelValue"])])])])])])])}const Q=v(N,[["render",F]]);export{Q as default};
