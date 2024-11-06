import{i as l,S as p}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const f="46858966-ba511c0c272bf1bf47f1d2839",m="https://pixabay.com/api/";function h(n){const o=new URLSearchParams({key:f,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${m}?${o}`).then(t=>{if(!t.ok)throw new Error("Network response was not ok");return t.json()})}function g(n){return n.map(({webformatURL:o,largeImageURL:t,tags:s,likes:e=0,views:r=0,comments:i="",downloads:u=0})=>`
      <div class="galleries">
                <div class="loader" style="display: block;"></div> 
                <a href="${t}">
                    <img src="${o}" alt="${s}" />
                </a>
                <div class="content">
                    <div><p>Likes</p><span>${e}</span></div>
                    <div><p>Views</p><span>${r}</span></div>
                    <div><p>Comments</p><span>${i}</span></div>
                    <div><p>Downloads</p><span>${u}</span></div>
                </div>
            </div>
    `).join("")}function y(n){n.querySelectorAll(".galleries img").forEach(t=>{const s=t.parentElement.previousElementSibling;t.onload=()=>{s.style.display="none"},t.onerror=()=>{s.style.display="none"}})}const d=document.querySelector(".form"),c=document.querySelector(".gallery");let a=null;d.addEventListener("submit",v);function v(n){n.preventDefault();const{textRow:o}=n.target.elements;if(o.value.trim()===""){l.warning({title:"Caution",message:"The search field cannot be empty.",color:"red"});return}h(o.value).then(t=>{t.hits.length===0?l.warning({title:"Caution",message:"Sorry, there are no images matching your search query. Please try again!",color:"yellow"}):(c.innerHTML=g(t.hits),y(c),a?a.refresh():a=new p(".gallery .galleries a",{captionsData:"alt",captionDelay:250}))}).catch(t=>{console.error("Fetch error:",t)}),d.reset()}
//# sourceMappingURL=index.js.map
