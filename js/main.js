"use strict";function eventWindowLoad(){var t,i,e,o;checkCyrillic.onload(),(t=document.querySelector(".headerMain"))&&(t.querySelector(".headerMain-burger"),i=window.innerHeight,window.scrollY<=0&&(document.body.classList.add("headerMain-shown"),t.classList.add("parked"),t.classList.add("show"),document.body.classList.remove("headerMain-hidden"),t.classList.remove("hide")),ScrollTrigger.create({trigger:document.body,start:"top center",onUpdate:function(e){1==e.direction?(0<window.scrollY&&(document.body.classList.remove("headerMain-shown"),t.classList.remove("parked"),t.classList.remove("show"),document.body.classList.add("headerMain-hidden"),t.classList.add("hide")),window.scrollY>i/2&&t.classList.add("resized")):-1==e.direction&&(document.body.classList.add("headerMain-shown"),document.body.classList.remove("headerMain-hidden"),t.classList.remove("hide"),t.classList.add("show"),window.scrollY<=0)&&(t.classList.add("parked"),t.classList.remove("resized"))}}),(e=document.querySelectorAll(".msgWrapper video")).length)&&(void 0!==(o=e[0].pause())&&o.then(function(e){}).catch(function(e){}),e.forEach(function(e){ScrollTrigger.create({trigger:e,start:"top 80%",end:"bottom 20%",onEnter:function(){e.play()},onEnterBack:function(){e.play()},onLeave:function(){e.pause()},onLeaveBack:function(){e.pause()}})}))}function eventDocClick(e){var t=e.target;for(e.target;t&&t!=this;){if(t==document.documentElement){document.body.classList.contains("menuMobileActive")&&(document.body.classList.remove("menuMobileActive"),document.querySelector(".headerMain-burger").classList.remove("active"));break}if(t.classList.contains("headerMain-burger")){t.classList.toggle("active"),t.classList.contains("active")?document.body.classList.add("menuMobileActive"):document.body.classList.remove("menuMobileActive");break}if(t.classList.contains("footerMain-nav-title")){var i=t.parentNode.querySelector(".footerMain-nav");t.classList.toggle("active"),t.classList.contains("active")?i.style.height=i.scrollHeight+"px":i.style.height="0px";break}if(t.classList.contains("goto")){gsap.to(window,{duration:2,scrollTo:{y:t.getAttribute("data-dir"),offsetY:document.querySelector(".headerMain").clientHeight/2-20},ease:"power2"}),e.preventDefault(),window.innerWidth<=991&&document.body.classList.contains("headerMainMenuActive")&&document.querySelector(".headerMain__menu__bar").click();break}if(t.classList.contains("attached-file-delete")){attachFile.clean(t);break}if(t.classList.contains("btn-play")){bigVideo.init(t);break}if(t.classList.contains("videoContainer-close")){bigVideo.close(t);break}t=t.parentNode}}document.addEventListener("click",eventDocClick,!1),window.addEventListener("load",eventWindowLoad,!1),gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);var checkCyrillic={onload:function(){var e;document.querySelector(".checkCyrillic")&&(e=document.querySelectorAll(".checkCyrillic")).length&&e.forEach(function(e){e.addEventListener("input",checkCyrillic.typing)})},typing:function(e){e=e.target;window.checkCyrillic.isTrue(e.value)?(e.parentNode.classList.add("tooltip-show"),e.classList.add("vld-field-invalid")):(e.parentNode.classList.remove("tooltip-show"),e.classList.remove("vld-field-invalid"))},isTrue:function(e){return/[а-я]/i.test(e)}},attachFile={validTypes:"doc, docx, pdf",toggledClass:"attached",containerClass:"form-item-attach",get:function(e){var t;e.value&&e.files.length&&(t=e.files[0].name,this.output(t,e))},output:function(e,t){e="<div class='attached-file'> \t\t\t\t\t\t\t\t<div class='attached-file-name'>${NAME}</div> \t\t\t\t\t\t\t\t<div class='attached-file-delete'>Удалить</div>\t\t\t\t\t\t\t\t</div>".replace(/\$\{NAME\}/g,e);(t=t.closest("."+this.containerClass))&&(t.insertAdjacentHTML("beforeend",e),t.classList.add(this.toggledClass))},clean:function(e){var t=e.closest("."+this.containerClass),e=e.parentNode;t&&(e.parentNode.removeChild(e),t.classList.remove(this.toggledClass),t.querySelector("input[type='file']").value="")}},loop=horizontalLoop(".facesWrapper-item",{speed:1,repeat:-1,paddingRight:0});function horizontalLoop(e,t){e=gsap.utils.toArray(e),t=t||{};var i,o,a,n,r,s,c=gsap.timeline({repeat:t.repeat,paused:t.paused,defaults:{ease:"none"},onReverseComplete:function(){return c.totalTime(c.rawTime()+100*c.duration())}}),l=e.length,d=e[0].offsetLeft,u=[],p=[],g=[],v=0,h=100*(t.speed||1),m=!1===t.snap?function(e){return e}:gsap.utils.snap(t.snap||1);for(gsap.set(e,{xPercent:function(e,t){var i=p[e]=parseFloat(gsap.getProperty(t,"width","px"));return g[e]=m(parseFloat(gsap.getProperty(t,"x","px"))/i*100+gsap.getProperty(t,"xPercent")),g[e]}}),gsap.set(e,{x:0}),i=e[l-1].offsetLeft+g[l-1]/100*p[l-1]-d+e[l-1].offsetWidth*gsap.getProperty(e[l-1],"scaleX")+(parseFloat(t.paddingRight)||0),s=0;s<l;s++)n=(a=(r=e[s]).offsetLeft+(o=g[s]/100*p[s])-d)+p[s]*gsap.getProperty(r,"scaleX"),c.to(r,{xPercent:m((o-n)/p[s]*100),duration:n/h},0).fromTo(r,{xPercent:m((o-n+i)/p[s]*100)},{xPercent:g[s],duration:(o-n+i-o)/h,immediateRender:!1},n/h).add("label"+s,a/h),u[s]=a/h;function y(e,t){t=t||{},Math.abs(e-v)>l/2&&(e+=v<e?-l:l);var i=gsap.utils.wrap(0,l,e),o=u[i];return o>c.time()!=v<e&&(t.modifiers={time:gsap.utils.wrap(0,c.duration())},o+=c.duration()*(v<e?1:-1)),v=i,t.overwrite=!0,c.tweenTo(o,t)}return c.next=function(e){return y(v+1,e)},c.previous=function(e){return y(v-1,e)},c.current=function(){return v},c.toIndex=y,c.times=u,c.progress(1,!0).progress(0,!0),t.reversed&&(c.vars.onReverseComplete(),c.reverse()),ScrollTrigger.create({trigger:".facesContainer",start:"top 90%",end:"bottom 10%",markers:!1,onEnter:function(){c.play()},onLeave:function(){c.pause()},onEnterBack:function(){c.resume()},onLeaveBack:function(){c.pause()}}),c}var bigVideo={scrollPosition:void 0,init:function(e){var e=e.closest(".videoContainer-wrapper"),t=e.querySelector(".videoContainer"),i=e.querySelector(".titlePage"),o=e.querySelector("img"),e=e.querySelector(".btns"),a=document.documentElement,n=document.querySelector(".headerMain .container-fluid-inner"),r=(this.scrollPosition=window.scrollY,a.style.top=-this.scrollPosition+"px",window.innerWidth-a.clientWidth),a=(a.classList.add("videoOnOverlayStarted"),r&&(a.style.marginRight=r+"px",n.style.marginRight=r+"px"),gsap.timeline());426<window.innerWidth&&(a.to(e,{opacity:0,y:50,duration:.5}),a.to(i,{opacity:0,y:-50,duration:.5},"<"),a.to(o,{opacity:0,scale:.9,duration:.5},"<")),a.to(t,{zIndex:20,opacity:1,duration:.5,onComplete:function(){t.querySelector("video")&&t.querySelector("video").play()}})},close:function(e){var e=e.closest(".videoContainer-wrapper"),t=e.querySelector(".videoContainer"),i=e.querySelector(".titlePage"),o=e.querySelector("img"),e=e.querySelector(".btns"),a=document.documentElement,n=document.querySelector(".headerMain .container-fluid-inner");t.querySelector("video")&&t.querySelector("video").pause(),gsap.set(e,{opacity:1,y:0}),gsap.set(i,{opacity:1,y:0}),gsap.set(o,{opacity:1,scale:1}),gsap.set(t,{zIndex:-1,opacity:0}),a.classList.remove("videoOnOverlayStarted"),window.scrollTo(0,this.scrollPosition),a.style.top="",a.style.marginRight="",n.style.marginRight=""}};