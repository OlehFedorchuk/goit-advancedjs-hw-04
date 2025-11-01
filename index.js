import{a as m,S as L}from"./assets/vendor-hZJxJ21y.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();document.querySelector(".gallery");m.defaults.baseURL="https://pixabay.com/api/";const f=async o=>{try{return(await m.get("",{params:o})).data}catch(t){throw console.error("Error fetching images:",t),t}},g=document.querySelector(".loader"),E=document.querySelector(".gallery");let d;function y(o){const t=o.hits.map(({webformatURL:c,largeImageURL:n,tags:e,likes:r,views:s,comments:h,downloads:b})=>`
    <li class="card">
      <a href="${n}">
        <img src="${c}" alt="${e}" loading="lazy"/>
      </a>
      <ul class="description">
        <li><p>Likes</p><span>${r}</span></li>
        <li><p>View</p><span>${s}</span></li>
        <li><p>Comments</p><span>${h}</span></li>
        <li><p>Download</p><span>${b}</span></li>
      </ul>
    </li>
  `).join("");E.insertAdjacentHTML("beforeend",t),d?d.refresh():d=new L(".gallery a",{captionsData:"alt"})}function u(){g.style.display="none"}function S(){g.style.display="block"}const v=document.querySelector(".form"),q=document.querySelector(".inputFild"),i=document.querySelector(".btnSearchImg"),p=document.querySelector(".btnLoadMore");i.disabled=!0;let w=1;u();const a={key:"52935594-c28acfca0b14dad36f3e3eac1",q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:3,page:w};let l="";q.addEventListener("input",o=>{if(l=o.target.value.trim(),l===""){i.disabled=!0;return}i.disabled=!1,a.q=l});v.addEventListener("click",o=>{if(o.preventDefault(),l===""){i.disabled=!0,console.log("Enetr some text!");return}S(),f(a).then(t=>{console.log("Images:",t),y(t),u(),p.classList.remove("active")}).catch(t=>{console.error("Failed to load images:",t)})});p.addEventListener("click",()=>{a.page+=1,console.log("page",a.page),f(a).then(o=>{console.log("Images:",o),y(o),u(),p.classList.remove("active")}).catch(o=>{console.error("Failed to load images:",o)})});
//# sourceMappingURL=index.js.map
