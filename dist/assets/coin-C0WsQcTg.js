import{c as r}from"./index-QHbb78RQ.js";const o=async()=>{try{return(await r.get("/coins")).data}catch(s){throw new Error(s.response.data.message||s.message)}},n=async s=>{try{return(await r.post("/coins",s)).data}catch(e){throw new Error(e.response.data.message||e.message)}},c=async(s,e)=>{try{return(await r.post(`/coins/${s}`,e)).data}catch(a){throw new Error(a.response.data.message||a.message)}},p=async s=>{try{return(await r.delete(`/coins/${s}`)).data}catch(e){throw new Error(e.response.data.message||e.message)}};export{c as a,n as b,p as c,o as l};