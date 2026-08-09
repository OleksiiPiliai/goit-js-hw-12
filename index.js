import{a as q,S as E,i as l}from"./assets/vendor-zfJKASTQ.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();const P="55965414-3154a5ab5237f7ce8780065e8",B="https://pixabay.com/api/",M=15;async function m(e,s){return(await q.get(B,{params:{key:P,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:M}})).data}const f=document.querySelector(".gallery"),h=document.querySelector(".loader"),p=document.querySelector(".load-more-btn"),O=new E(".gallery a",{captionsData:"alt",captionDelay:250});function y(e){f.insertAdjacentHTML("beforeend",e.map($).join("")),O.refresh()}function R(){f.innerHTML=""}function L(){h.classList.remove("is-hidden")}function b(){h.classList.add("is-hidden")}function u(){p.classList.remove("is-hidden")}function g(){p.classList.add("is-hidden")}function $({webformatURL:e,largeImageURL:s,tags:o,likes:r,views:t,comments:a,downloads:n}){return`
    <li class="gallery-item">
      <a class="gallery-link" href="${s}">
        <img
          class="gallery-image"
          src="${e}"
          alt="${o}"
          loading="lazy"
        />
      </a>
      <ul class="image-stats">
        <li class="image-stat">
          <span class="image-stat-label">Likes</span>
          <span class="image-stat-value">${r}</span>
        </li>
        <li class="image-stat">
          <span class="image-stat-label">Views</span>
          <span class="image-stat-value">${t}</span>
        </li>
        <li class="image-stat">
          <span class="image-stat-label">Comments</span>
          <span class="image-stat-value">${a}</span>
        </li>
        <li class="image-stat">
          <span class="image-stat-label">Downloads</span>
          <span class="image-stat-value">${n}</span>
        </li>
      </ul>
    </li>
  `}const C=document.querySelector(".form"),H=document.querySelector(".load-more-btn");let d="",i=1,c=0;C.addEventListener("submit",x);H.addEventListener("click",A);async function x(e){e.preventDefault();const s=e.currentTarget,o=s.elements["search-text"].value.trim();if(!o){l.warning({message:"Please enter a search query.",position:"topRight"});return}d=o,i=1,c=0,R(),g(),L();try{const r=await m(d,i);if(r.hits.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}if(y(r.hits),c+=r.hits.length,w(r.totalHits)){v();return}u()}catch{S()}finally{b(),s.reset()}}async function A(){i+=1,g(),L();try{const e=await m(d,i);if(y(e.hits),c+=e.hits.length,G(),w(e.totalHits)){v();return}u()}catch{i-=1,S(),u()}finally{b()}}function w(e){return c>=e}function v(){g(),l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}function S(){l.error({message:"Something went wrong. Please try again later.",position:"topRight"})}function G(){const e=document.querySelector(".gallery-item");if(!e)return;const s=e.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
