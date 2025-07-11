(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const e=`modulepreload`,t=function(e){return`/front_6th_chapter1-1/`+e},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}o=l(i.map(i=>{if(i=t(i,a),i in n)return;n[i]=!0;let o=i.endsWith(`.css`),s=o?`[rel="stylesheet"]`:``,l=!!a;if(l)for(let e=r.length-1;e>=0;e--){let t=r[e];if(t.href===i&&(!o||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${i}"]${s}`))return;let u=document.createElement(`link`);if(u.rel=o?`stylesheet`:e,o||(u.as=`script`),u.crossOrigin=``,u.href=i,c&&u.setAttribute(`nonce`,c),document.head.appendChild(u),o)return new Promise((e,t)=>{u.addEventListener(`load`,e),u.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${i}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[]){if(t.status!==`rejected`)continue;s(t.reason)}return r().catch(s)})};var i=class{constructor(){this.events=new Map}on(e,t){if(typeof t!=`function`)throw Error(`Callback must be a function`);return this.events.has(e)||this.events.set(e,[]),this.events.get(e).push({callback:t,once:!1}),this}once(e,t){if(typeof t!=`function`)throw Error(`Callback must be a function`);return this.events.has(e)||this.events.set(e,[]),this.events.get(e).push({callback:t,once:!0}),this}off(e,t){if(!this.events.has(e))return this;let n=this.events.get(e),r=n.findIndex(e=>e.callback===t);return r!==-1&&n.splice(r,1),n.length===0&&this.events.delete(e),this}removeAllListeners(e){return e?this.events.delete(e):this.events.clear(),this}emit(e,...t){if(!this.events.has(e))return!1;let n=this.events.get(e).slice(),r=[];return n.forEach(e=>{try{e.callback.apply(this,t),e.once&&r.push(e.callback)}catch(e){console.error(`Error in event listener:`,e)}}),r.forEach(t=>{this.off(e,t)}),!0}};const a=Object.freeze({BEFORE_MOUNT:`before-mount`,MOUNT:`mount`,BEFORE_UPDATE:`before-update`,UPDATE:`update`,BEFORE_UNMOUNT:`before-unmount`,UNMOUNT:`unmount`,FORCE_UPDATE:`force-update`});var o=class e extends i{static EVENTS=a;#children=[];#childContainers=new Map;#events=new Map;#isDestroyed=!1;constructor(t={}){if(super(),this.props={...t},this.state={},this.element=null,this.isMounted=!1,this.constructor===e)throw Error(`추상 클래스는 인스턴스를 생성할 수 없습니다!`)}addChild(t){if(!(t instanceof e))throw Error(`자식은 Component 인스턴스여야 합니다`);this.#children.push(t),this.isMounted&&this.#mountChild(t)}removeChild(e){let t=this.#children.indexOf(e);t!==-1&&(this.#children[t].unmount(),this.#children.splice(t,1),this.#childContainers.delete(e))}setState(t){if(this.#isDestroyed)return;if(!t||typeof t!=`object`)throw Error(`state는 객체여야 합니다!`);let n={...this.state};this.state={...this.state,...t},this.isMounted&&(this.emit(e.EVENTS.BEFORE_UPDATE,this.props,n),this.#performUpdate(),this.emit(e.EVENTS.UPDATE,this.props,n))}mount(t){if(this.isMounted){console.warn(`이미 마운트된 컴포넌트입니다.`);return}if(t.children.length>0&&(console.warn(`컨테이너에 기존 내용이 있어서 정리합니다.`),t.innerHTML=``),!t||!t.appendChild)throw Error(`유효한 DOM 컨테이너가 필요합니다.`);try{this.emit(e.EVENTS.BEFORE_MOUNT),this.element=this.#createElement(),t.appendChild(this.element),this.isMounted=!0,this.#mountChildren(),this.emit(e.EVENTS.MOUNT)}catch(e){throw this.isMounted=!1,this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element),e}}unmount(){if(this.isMounted)try{this.emit(e.EVENTS.BEFORE_UNMOUNT),this.#unmountChildren(),this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element),this.isMounted=!1,this.#isDestroyed=!0,this.emit(e.EVENTS.UNMOUNT),this.#events.clear(),this.removeAllListeners()}catch(e){console.error(`컴포넌트 언마운트 중 오류 발생:`,e)}}forceUpdate(){this.isMounted&&!this.#isDestroyed&&(this.#performUpdate(),this.emit(e.EVENTS.FORCE_UPDATE))}#createElement(){let e=document.createElement(`template`);e.innerHTML=this.render().trim();let t=e.content.firstElementChild;if(!t)throw Error(`render() must return valid HTML`);return this.bindEvents(t),t}#mountChild(e,t=null){let n;n=t===null?`[data-child="${e.constructor.name}"]`:`[data-child="${e.constructor.name}"][data-child-id="${t}"]`;let r=this.element.querySelector(n);r&&!e.isMounted&&(e.mount(r),this.#childContainers.set(e,r))}#mountChildren(){let e=new Map;this.#children.forEach(t=>{let n=t.constructor.name,r=e.get(n)||0;e.set(n,r+1);let i=this.#children.filter(e=>e.constructor.name===n),a=i.length>1?r:null;this.#mountChild(t,a)})}#unmountChildren(){this.#children.forEach(e=>e.unmount()),this.#childContainers.clear(),this.#children.length=0}#performUpdate(){if(!(!this.element||!this.element.parentNode||this.#isDestroyed))try{let e=new Map;this.#children.forEach(t=>{if(t.isMounted&&t.element){let n=t.element.parentNode;n&&(n.removeChild(t.element),e.set(t,t.element))}});let t=this.#createElement();this.element.parentNode.replaceChild(t,this.element),this.element=t,this.#children.forEach(t=>{if(e.has(t)){let n=`[data-child="${t.constructor.name}"]`,r=this.element.querySelector(n);r&&(r.appendChild(e.get(t)),this.#childContainers.set(t,r))}})}catch(e){console.error(`DOM 업데이트 중 오류 발생:`,e)}}bindEvents(){}render(){throw Error(`render must be implemented by subclass`)}},s=class{#routes=new Map;#currentRoute=null;#container=null;#currentRouteParams={};#currentQueryParams={};#popstateListener=this.#handleRouteChange.bind(this);#baseUrl=``;constructor(e){if(this.#container=document.querySelector(e),!this.#container)throw Error(`${e}에 해당되는 엘리먼트를 찾을 수 없습니다.`);let t=`/front_6th_chapter1-1/`;this.#baseUrl=t===`/`?``:t.replace(/\/$/,``),window.addEventListener(`popstate`,this.#popstateListener)}get routeParams(){return{...this.#currentRouteParams}}get queryParams(){return{...this.#currentQueryParams}}register(e,t){if(typeof e!=`string`)throw Error(`경로를 문자열로 입력해주세요`);this.#routes.set(e,t)}start(){console.table([...this.#routes].map(([e,t])=>({path:e,page:t.name}))),this.#handleRouteChange()}clear(){this.#routes.clear(),this.#currentRoute=null,this.#container=null,window.removeEventListener(`popstate`,this.#popstateListener)}navigate(e){if(typeof e!=`string`)throw Error(`경로를 문자열로 입력해주세요`);let t=this.#buildFullPath(e);this.#currentRoute!==e&&(window.history.pushState({},``,t),this.#handleRouteChange())}#buildFullPath(e){if(!this.#baseUrl)return e;let t=e.startsWith(`/`)?e:`/`+e;return this.#baseUrl+t}#extractRoutePath(e){if(!this.#baseUrl)return e;if(e.startsWith(this.#baseUrl)){let t=e.slice(this.#baseUrl.length)||`/`;return t}return e}#parseRoutePattern(e){if(e===`*`)return{regex:/.*/,paramNames:[]};let t=[],n=e.replace(/:([^/]+)/g,(e,n)=>(t.push(n),`([^/]+)`)),r=RegExp(`^${n}$`);return{regex:r,paramNames:t}}#matchRoute(e){if(this.#routes.has(e))return{componentConstructor:this.#routes.get(e),params:{},matchedPattern:e};for(let[t,n]of this.#routes){if(t===`*`)continue;let{regex:r,paramNames:i}=this.#parseRoutePattern(t),a=e.match(r);if(a){let e={};return i.forEach((t,n)=>{e[t]=a[n+1]}),{componentConstructor:n,params:e,matchedPattern:t}}}return this.#routes.has(`*`)?{componentConstructor:this.#routes.get(`*`),params:{},matchedPattern:`*`}:null}#parseQueryParams(e){let t={};if(!e)return t;let n=new URLSearchParams(e);for(let[e,r]of n)t[e]=r;return t}async#handleRouteChange(){let e=this.#extractRoutePath(window.location.pathname),t=this.#parseQueryParams(window.location.search),n=this.#matchRoute(e);if(n)this.#currentRoute=e;else throw Error(`매칭되는 라우트가 없음, ${e}`);this.#currentRouteParams=n.params,this.#currentQueryParams=t;let r=this.#createComponent(n.componentConstructor);r.mount(this.#container),r.render()}#createComponent(e){try{let t=new e({router:this});if(!(t instanceof o))throw Error(`컴포넌트는 추상클래스 Component를 상속해야 합니다!!`);return t}catch(e){e instanceof Error&&console.error(`컴포넌트 인스턴스 생성 실패:`,e.message)}}},c=class extends o{constructor(e){super(e),this.state={}}render(){return` //
      <main class="max-w-md mx-auto px-4 py-4">
        <div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
          <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#4285f4;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:1" />
              </linearGradient>
              <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#000000" flood-opacity="0.1" />
              </filter>
            </defs>

            <!-- 404 Numbers -->
            <text
              x="160"
              y="85"
              font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              font-size="48"
              font-weight="600"
              fill="url(#blueGradient)"
              text-anchor="middle"
            >
              404
            </text>

            <!-- Icon decoration -->
            <circle cx="80" cy="60" r="3" fill="#e8f0fe" opacity="0.8" />
            <circle cx="240" cy="60" r="3" fill="#e8f0fe" opacity="0.8" />
            <circle cx="90" cy="45" r="2" fill="#4285f4" opacity="0.5" />
            <circle cx="230" cy="45" r="2" fill="#4285f4" opacity="0.5" />

            <!-- Message -->
            <text
              x="160"
              y="110"
              font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              font-size="14"
              font-weight="400"
              fill="#5f6368"
              text-anchor="middle"
            >
              페이지를 찾을 수 없습니다
            </text>

            <!-- Subtle bottom accent -->
            <rect x="130" y="130" width="60" height="2" rx="1" fill="url(#blueGradient)" opacity="0.3" />
          </svg>

          <a
            href="/"
            data-link
            class="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            홈으로
          </a>
        </div>
      </main>`}};async function l(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a}),c=await fetch(`/api/products?${s}`);return await c.json()}async function u(e){let t=await fetch(`/api/products/${e}`);return await t.json()}async function d(){let e=await fetch(`/api/categories`);return await e.json()}function f(e){let{className:t}=e;return`<svg class="${t}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
    ></path>
  </svg>`}function p(e){let{className:t}=e;return`<svg class="${t}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
  </svg>`}function m(){return`
    <div class="fixed inset-0 z-50 overflow-y-auto cart-modal">
      <!-- 배경 오버레이 -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity cart-modal-overlay"></div>

      <!-- 모달 컨테이너 -->
      <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
        <div
          class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden"
        >
          <!-- 헤더 -->
          <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900 flex items-center">
              ${f({className:`w-5 h-5 mr-2`})} 장바구니
            </h2>
            <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
              ${p({className:`w-6 h-6 pointer-events-none`})}
            </button>
          </div>

          <!-- 컨텐츠 -->
          <div class="flex flex-col max-h-[calc(90vh-120px)]">
            <!-- 빈 장바구니 -->
            <div class="flex-1 flex items-center justify-center p-8">
              <div class="text-center">
                <div class="text-gray-400 mb-4">${f({className:`mx-auto h-12 w-12`})}</div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다</h3>
                <p class="text-gray-600">원하는 상품을 담아보세요!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function h(){return`<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    ></path>
  </svg>`}function g(){return`<footer class="bg-white shadow-sm sticky top-0 z-40">
    <div class="max-w-md mx-auto py-8 text-center text-gray-500">
      <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
    </div>
  </footer>`}function _(e){let{leftContent:t}=e;return`<header class="bg-white shadow-sm sticky top-0 z-40">
    <div class="max-w-md mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        ${t}
        <div class="flex items-center space-x-2">
          <!-- 장바구니 아이콘 -->
          <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
            ${f({className:`w-6 h-6 pointer-events-none`})}
          </button>
        </div>
      </div>
    </div>
  </header>`}function v(e){let{title:t,image:n,lprice:r,productId:i,brand:a}=e,o=Number(r).toLocaleString(`ko-KR`)+`원`;return`
    <div
      class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
      data-product-id="${i}"
    >
      <!-- 상품 이미지 -->
      <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
        <img
          data-route="${`/product/${i}`}"
          src="${n}"
          alt="${t}"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>

      <!-- 상품 정보 -->
      <div class="p-3">
        <div class="cursor-pointer product-info mb-3">
          <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">${t}</h3>
          <p class="text-xs text-gray-500 mb-2">${a}</p>
          <p class="text-lg font-bold text-gray-900">${o}</p>
        </div>
        <!-- 장바구니 버튼 -->
        <button
          class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md hover:bg-blue-700 transition-colors add-to-cart-btn"
          data-product-id="${i}"
        >
          장바구니 담기
        </button>
      </div>
    </div>
  `}function y(){return`
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div class="aspect-square bg-gray-200"></div>
      <div class="p-3">
        <div class="h-4 bg-gray-200 rounded mb-2"></div>
        <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div class="h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  `}function b(){return`<div class="text-center py-4">
    <div class="inline-flex items-center">
      <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span class="text-sm text-gray-600">상품을 불러오는 중...</span>
    </div>
  </div>`}function x(e,t){let n=0;return function(...r){let i=Date.now();i-n>=t&&(n=i,e.apply(this,r))}}var S=class{constructor({container:e=window,threshold:t=100,onLoad:n}){this.container=e,this.threshold=t,this.onLoad=n,this.handleScroll=x(this.#onScroll.bind(this),100)}init(){this.container.addEventListener(`scroll`,this.handleScroll)}destroy(){this.container.removeEventListener(`scroll`,this.handleScroll)}#onScroll(){let e=this.#getScrollTop(),t=this.#getViewHeight(),n=this.#getScrollHeight();e+t+this.threshold>=n&&this.onLoad()}#getScrollTop(){return this.container===window?window.scrollY||document.documentElement.scrollTop:this.container instanceof Element?this.container.scrollTop:0}#getViewHeight(){return this.container===window?window.innerHeight:this.container.clientHeight}#getScrollHeight(){return this.container===window?document.documentElement.scrollHeight:this.container.scrollHeight}};function C(e){let t=new URL(window.location);Object.entries(e).forEach(([e,n])=>{n&&n!==``?t.searchParams.set(e,n):t.searchParams.delete(e)}),window.history.replaceState(null,``,t.toString())}var w=class extends o{constructor(e){super(e);let t=new URLSearchParams(window.location.search);this.state={loading:!0,products:[],pagination:{limit:parseInt(t.get(`limit`))||20},filters:{search:t.get(`search`)||``,sort:t.get(`sort`)||``},categories:{},isOpenCartModal:!1};let n=new S({threshold:200,onLoad:()=>{let e=this.state.pagination.page,t=e+1;this.#loadMoreProducts({page:t})}});this.on(o.EVENTS.MOUNT,()=>{n.init(),this.#loadInitialData()}),this.on(o.EVENTS.UPDATE,()=>{this.state.pagination.hasNext||n.destroy()})}async#loadInitialData(){try{let[e,t]=await Promise.all([l({page:1,limit:this.state.pagination.limit??20,search:this.state.filters.search??``,category1:this.state.filters.category1??``,category2:this.state.filters.category2??``,sort:this.state.filters.sort??`price_asc`}),d()]);this.setState({...e,categories:t,loading:!1})}catch(e){e instanceof Error&&(console.error(`상품 및 카테고리 리스트 로딩 실패:`,e.message),this.setState({loading:!1,categories:{}}))}}async#loadMoreProducts(e){let{page:t}=e;try{let e=await l({page:t});this.setState({products:[...this.state.products,...e.products],pagination:{...this.state.pagination,page:t}}),C({current:t})}catch(e){e instanceof Error&&console.error(`상품 추가로 더 불러오기 실패:`,e.message)}}async#reloadProducts(e){try{let t=await l({...this.state.filters,...this.state.pagination,...e});this.setState({...t}),C(e)}catch(e){e instanceof Error&&console.error(`상품 리로드 실패:`,e.message)}}async#handleLimitChange(e){e=parseInt(e),await this.#reloadProducts({limit:e})}async#handleSortChange(e){await this.#reloadProducts({sort:e})}async#handleSearchChange(e){await this.#reloadProducts({search:e})}bindEvents(e){e.addEventListener(`click`,e=>{let t=e.target.dataset.route;if(t&&this.props.router.navigate(t),e.target.classList.contains(`cart-modal-overlay`)){this.setState({isOpenCartModal:!1});return}switch(e.target.id){case`cart-icon-btn`:this.setState({isOpenCartModal:!0});break;case`cart-modal-close-btn`:this.setState({isOpenCartModal:!1});break}}),e.addEventListener(`change`,e=>{switch(e.target.id){case`limit-select`:this.#handleLimitChange(e.target.value);break;case`sort-select`:this.#handleSortChange(e.target.value);break}}),e.addEventListener(`keypress`,e=>{switch(e.target.id){case`search-input`:if(e.key===`Enter`){let t=e.target.value.trim();this.#handleSearchChange(t)}break}}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&this.state.isOpenCartModal&&this.setState({isOpenCartModal:!1})})}render(){return` //
      <div class="min-h-screen bg-gray-50">
        ${_({leftContent:`<h1 class="text-xl font-bold text-gray-900">
            <a href="/" data-link="">쇼핑몰</a>
          </h1>`})}

        <main class="max-w-md mx-auto px-4 py-4">
          <!-- 검색 및 필터 -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
            <!-- 검색창 -->
            <div class="mb-4">
              <div class="relative">
                <input
                  type="text"
                  id="search-input"
                  placeholder="상품명을 검색해보세요..."
                  value="${this.state.filters.search}"
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">${h()}</div>
              </div>
            </div>

            <!-- 필터 옵션 -->
            <div class="space-y-3">
              <!-- 카테고리 필터 -->
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600">카테고리:</label>
                  <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
                </div>

                <!-- 1depth 카테고리 -->
                <div class="flex flex-wrap gap-2">
                  <div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>
                </div>
                <!-- 2depth 카테고리 -->
              </div>

              <!-- 기존 필터들 -->
              <div class="flex gap-2 items-center justify-between">
                <!-- 페이지당 상품 수 -->
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600">개수:</label>
                  <select
                    id="limit-select"
                    class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="10" ${this.state.pagination.limit===10?`selected`:``}>10개</option>
                    <option value="20" ${this.state.pagination.limit===20?`selected`:``}>20개</option>
                    <option value="50" ${this.state.pagination.limit===50?`selected`:``}>50개</option>
                    <option value="100" ${this.state.pagination.limit===100?`selected`:``}>100개</option>
                  </select>
                </div>

                <!-- 정렬 -->
                <div class="flex items-center gap-2">
                  <label class="text-sm text-gray-600">정렬:</label>
                  <select
                    id="sort-select"
                    class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="price_asc" ${this.state.filters.sort===`price_asc`?`selected`:``}>
                      가격 낮은순
                    </option>
                    <option value="price_desc" ${this.state.filters.sort===`price_desc`?`selected`:``}>
                      가격 높은순
                    </option>
                    <option value="name_asc" ${this.state.filters.sort===`name_asc`?`selected`:``}>이름순</option>
                    <option value="name_desc" ${this.state.filters.sort===`name_desc`?`selected`:``}>
                      이름 역순
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- 상품 목록 -->
          <div class="mb-6">
            <div>
              <!-- 상품 개수 정보 -->
              ${this.state.loading?``:`<div class="mb-4 text-sm text-gray-600">
                    총 <span class="font-medium text-gray-900">${this.state.pagination.total}개</span>의 상품
                  </div> `}

              <!-- 상품 그리드 -->
              <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
                ${this.state.loading?[,,,,].fill(0).map(y).join(``):this.state.products.map(v).join(``)}
              </div>
              ${this.state.pagination.hasNext?b():``}
            </div>
          </div>
        </main>

        <!-- 장바구니 모달 -->
        ${this.state.isOpenCartModal?m():``}

        <!-- 하단 푸터 -->
        ${g()}
      </div>`}};function T(){return`<svg class="w-6 h-6 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
  </svg>`}function E(){return`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
  </svg>`}function D(){return`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
  </svg>`}function O(){return`<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
  </svg>`}function k(e){let{category1:t,category2:n,category3:r,category4:i}=e,a=[t,n,r,i],o=a.filter(e=>e&&e.trim()!==``).map((e,t)=>`
        ${O()}
        <button class="breadcrumb-link" data-category${t+1}="${e}">${e}</button>
      `).join(``);return`
    <nav class="mb-4">
      <div class="flex items-center space-x-2 text-sm text-gray-600">
        <a href="/" data-link="" class="hover:text-blue-600 transition-colors">홈</a>
        ${o}
      </div>
    </nav>
  `}function A(){return`<svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
    <path
      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
    ></path>
  </svg>`}function j(){return`<svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
    <path
      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
    ></path>
  </svg>`}function M(e){let t=Array.from({length:e},j).join(``),n=Array.from({length:5-e},A).join(``);return`<div class="flex items-center">${t}${n}</div>`}function N(e){let{title:t,image:n,lprice:r,description:i,rating:a,reviewCount:o,stock:s}=e;return`
    <!-- 상품 이미지 -->
    <div class="p-4">
      <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img src="${n}" alt="${t}" class="w-full h-full object-cover product-detail-image" />
      </div>
      <!-- 상품 정보 -->
      <div>
        <p class="text-sm text-gray-600 mb-1"></p>
        <h1 class="text-xl font-bold text-gray-900 mb-3">${t}</h1>

        <!-- 평점 및 리뷰 -->
        <div class="flex items-center mb-3">
          <div class="flex items-center">${M(a)}</div>
          <span class="ml-2 text-sm text-gray-600">${a.toFixed(1)} (${o}개 리뷰)</span>
        </div>

        <!-- 가격 -->
        <div class="mb-4">
          <span class="text-2xl font-bold text-blue-600">${r}원</span>
        </div>

        <!-- 재고 -->
        <div class="text-sm text-gray-600 mb-4">재고 ${s}개</div>

        <!-- 설명 -->
        <div class="text-sm text-gray-700 leading-relaxed mb-6">${i}</div>
      </div>
    </div>
  `}function P(){return`<div class="py-20 bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">상품 정보를 불러오는 중...</p>
    </div>
  </div>`}var F=class extends o{constructor(e){super(e),this.state={loading:!0,product:{},isOpenCartModal:!1},this.on(o.EVENTS.MOUNT,()=>{let{productId:e}=this.props.router.routeParams;this.#loadProduct(e)})}async#loadProduct(e){try{let t=await u(e);this.setState({product:t,loading:!1})}catch(e){e instanceof Error&&(console.error(`상품 로딩 실패:`,e.message),this.setState({loading:!1}))}}bindEvents(e){e.addEventListener(`click`,e=>{let t=e.target.dataset.route;if(t&&this.props.router.navigate(t),e.target.classList.contains(`cart-modal-overlay`)){this.setState({isOpenCartModal:!1});return}switch(e.target.id){case`cart-icon-btn`:this.setState({isOpenCartModal:!0});break;case`cart-modal-close-btn`:this.setState({isOpenCartModal:!1});break}}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&this.state.isOpenCartModal&&this.setState({isOpenCartModal:!1})})}render(){return`
      <div class="min-h-screen bg-gray-50">
        ${_({leftContent:`<div class="flex items-center space-x-3">
            <button data-route="/" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
              ${T()}
            </button>
            <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
          </div>`})}

        <main class="max-w-md mx-auto px-4 py-4">
          ${this.state.loading?P():` <!-- 브레드크럼 -->
                ${k(this.state.product)}

                <!-- 상품 상세 정보 -->
                <div class="bg-white rounded-lg shadow-sm mb-6">
                  ${N(this.state.product)}

                  <!-- 수량 선택 및 액션 -->
                  <div class="border-t border-gray-200 p-4">
                    <div class="flex items-center justify-between mb-4">
                      <span class="text-sm font-medium text-gray-900">수량</span>
                      <div class="flex items-center">
                        <button
                          id="quantity-decrease"
                          class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
                        >
                          ${E()}
                        </button>
                        <input
                          type="number"
                          id="quantity-input"
                          value="1"
                          min="1"
                          max="107"
                          class="w-16 h-8 text-center text-sm border-t border-b border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          id="quantity-increase"
                          class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                        >
                          ${D()}
                        </button>
                      </div>
                    </div>

                    <!-- 액션 버튼 -->
                    <button
                      id="add-to-cart-btn"
                      data-product-id="85067212996"
                      class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                    >
                      장바구니 담기
                    </button>
                  </div>
                </div>

                <!-- 상품 목록으로 이동 -->
                <div class="mb-6">
                  <button
                    data-route="/"
                    class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition-colors go-to-product-list"
                  >
                    상품 목록으로 돌아가기
                  </button>
                </div>

                <!-- 관련 상품 -->
                <div class="bg-white rounded-lg shadow-sm">
                  <div class="p-4 border-b border-gray-200">
                    <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
                    <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
                  </div>
                  <div class="p-4">
                    <div class="grid grid-cols-2 gap-3 responsive-grid">
                      <div
                        class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer"
                        data-product-id="86940857379"
                      >
                        <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                          <img
                            src="https://shopping-phinf.pstatic.net/main_8694085/86940857379.1.jpg"
                            alt="샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이"
                            class="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                          샷시 풍지판 창문 바람막이 베란다 문 틈막이 창틀 벌레 차단 샤시 방충망 틈새막이
                        </h3>
                        <p class="text-sm font-bold text-blue-600">230원</p>
                      </div>
                      <div
                        class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer"
                        data-product-id="82094468339"
                      >
                        <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                          <img
                            src="https://shopping-phinf.pstatic.net/main_8209446/82094468339.4.jpg"
                            alt="실리카겔 50g 습기제거제 제품 /산업 신발 의류 방습제"
                            class="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                          실리카겔 50g 습기제거제 제품 /산업 신발 의류 방습제
                        </h3>
                        <p class="text-sm font-bold text-blue-600">280원</p>
                      </div>
                    </div>
                  </div>
                </div>`}
        </main>

        ${g()}
      </div>
    `}};const I=()=>r(async()=>{let{worker:e,workerOptions:t}=await import(`./browser-DvH8zzVn.js`);return{worker:e,workerOptions:t}},[]).then(({worker:e,workerOptions:t})=>e.start(t));var L=class{constructor(){this.router=new s(`#root`),this.init()}init(){this.router.register(`/`,w),this.router.register(`/product/:productId`,F),this.router.register(`*`,c),this.router.start()}};function R(){document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,()=>new L):new L}I().then(R);