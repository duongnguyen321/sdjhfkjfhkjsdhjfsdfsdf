import{c as t}from"./index-QHbb78RQ.js";const c=async r=>{var e,s;try{const a=new URLSearchParams(r).toString();return(await t.get(`/trades?${a}`)).data}catch(a){throw new Error(((s=(e=a.response)==null?void 0:e.data)==null?void 0:s.message)||a.message)}},p=async r=>{try{return(await t.post("/trades",r)).data}catch(e){throw new Error(e.response.data.message||e.message)}},d=async(r,e)=>{try{return(await t.post(`/trades/${r}`,e)).data}catch(s){throw new Error(s.response.data.message||s.message)}},w=async r=>{try{return(await t.delete(`/trades/${r}`)).data}catch(e){throw new Error(e.response.data.message||e.message)}};export{p as a,d as b,w as c,c as l};
