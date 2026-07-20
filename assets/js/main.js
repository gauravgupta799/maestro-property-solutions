const html = document.querySelector("html");
const body = document.querySelector(".body");

//====== Registerd ScrollTrigger Plugin ==========
gsap.registerPlugin(ScrollTrigger);

function hideLoader(){
  tl.to(".loader-upper",{
      y:"-100%",
      duration:0.8,
      ease: "sine.inOut",
  })
}

//========= LENIS START =========
const lenis = new Lenis({
  duration: 1,
  smooth:true,
  infinite: false,
  syncTouch:false, // mimic touch device scroll while allowing scroll sync (can be unstable on iOS<16)
  smoothTouch: false,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time){
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
//========= LENIS END =========

//======= LENIS SCROLL CONTROL =========
let isOpened = false;
function stopLenisScroll(){
  lenis.stop();
  isOpened = true;
}

function startLenisScroll(){
  lenis.start();
  isOpened = false;
}

//========= SCROLL & NAVBAR TOGGLE START =========
const headerBottom = document.querySelector(".header");

let prevScrollPos = 0;
const scrollThreshold = 10;  // Prevents accidental small scroll triggers
const mobileMenu = document.querySelector(".aside-mobile");
const mobileMenuBody = mobileMenu.querySelector(".mobile-menu__body")
const overlay = document.querySelector(".overlay");

let lastScroll = 0;
function checkScroll(){
  let scroll = lenis.scroll || document.documentElement.scrollTop;
  scroll > lastScroll ? header.classList.add("hidden") : header.classList.remove("hidden");
  lastScroll = scroll;
  scroll > 100 ? header.classList.add("sticky") : header.classList.remove("sticky");
}
//========= SCROLL & NAVBAR TOGGLE END =========

//======= ACTIVE NAVIGATION LINK START =========
const windowPathname = window.location.pathname;
const navLinks = document.querySelectorAll(".navbar__link");

navLinks.forEach(link =>{
  const navLinkPathname = new URL(link.href, window.location.origin).pathname;
  const isValidLink = navLinkPathname === "/" || navLinkPathname.endsWith(".html");

  if(!isValidLink){
    link.classList.remove("active");
    return;
  }

  const isActiveLink = windowPathname === navLinkPathname || (windowPathname === "/index.html" && navLinkPathname === "/")
  link.classList.toggle("active", isActiveLink);
});
//======= ACTIVE NAVIGATION LINK END =========

//======= BANNER CONTENT ANIMATION START =========
function bannerContentsAnimation(){
  const tl = gsap.timeline();
  // Header Animation Start
  tl.from([".header-top__list li",".header__logo", ".header-btn"], {
    opacity: 0,
    y: 50,
    delay: 0.2,
    duration: 1,
    stagger:0.1,
    ease: Expo.easeInOut,
  });
  tl.from([".navbar__link", "#hamburger-btn"], {
      opacity:0,
      y:40,
      duration:0.8,
      stagger:0.1,
      delay:-1,
      ease:"power4.out",
    }
  );
  // Header Animation End


  tl.from(".hero-title", {
    opacity: 0,
    duration: 1,
    // y: 50,
    delay: -1.15,
    stagger:0.1,
    // ease: "power4.in",
  });
  const heroSubTitles = document.querySelectorAll(".hero-subTitle");
  heroSubTitles && tl.from(heroSubTitles, {
    opacity: 0,
    duration: 1,
    y: 50,
    delay: -1.25,
    stagger:0.1,
    ease: "power4.out",
  });
  
  const heroBtns = document.querySelectorAll(".hero-btn");
  heroBtns && heroBtns.forEach((heroBtn)=>{
    tl.from(heroBtn, {
      opacity: 0,
      duration: 1,
      y: 50,
      delay: -1,
      stagger:0.1,
      ease: "power4.out",
    });
  })

  tl.fromTo(".banner-counter-wrapper",
    {
      opacity:0,
      scale:0,
      transformOrigin:"left",
    },{
      opacity:1,
      scale:1,
      duration:1,
      delay:-1.65,
      stagger:0.15,
      ease:"power4.inOut",
    }
  )

  const bannerImage = document.querySelectorAll(".bannerImg");
  bannerImage && tl.from(bannerImage, {
    opacity: 0,
    // y: 30,
    duration: 1,
    delay: -2.10,
    stagger:0.1,
    ease:"power4.in",
  });
  

  tl.from(".form__group",{
    opacity:0,
    y:30,
    duration:0.8,
    delay:-2,
    stagger:0.1,
    ease:"power4.in"
  })

  tl.from(".team-img", {
    opacity:0,
    y:50,
    duration:1,
    stagger:0.1,
    delay:-2,
    ease:"power4.in"
  })

  // tl.from(".connect__title",{
  //   opacity:0,
  //   duration:1,
  //   delay:-1.85,
  //   ease:"power4.in"
  // })

  // tl.from(".connect__link",{
  //   opacity:0,
  //   y:30,
  //   delay:-1.5,
  //   duration:1,
  //   stagger:0.2,
  //   ease:"power4.inOut"
  // })
  tl.from(".socials__list li",{
    opacity:0,
    y:30,
    delay:-1.65,
    duration:1,
    stagger:0.2,
    ease:"power4.inOut"
  });
}
//======= BANNER CONTENT ANIMATION END =========

//====== TOGGLE MOBILE SUBMENU START ==========
const mobileMenuLinks = document.querySelectorAll(".mobile-menu__item");
const mobileMenuLinksArr = Array.from(mobileMenuLinks);
const hamburgerBtn = document.getElementById("menuToggle");

const tl = gsap.timeline();
hamburgerBtn.addEventListener('click', function(){
  this.classList.toggle("active");
  mobileMenu.classList.toggle("show");
  overlay.classList.toggle("show");
  mobileMenuLinksArr.forEach((mobileLink)=>{
    gsap.fromTo(mobileLink,
      {
        opacity:0,
        y:50,
      },{
        opacity:1,
        y:0,
        duration:1,
        stagger:1,
        ease:"power4.inOut"
      }
    );
  });

  tl.fromTo(".socials__item", 
    {
      opacity:0,
      y:40,
    },{
      opacity:1,
      y:0,
      stagger:0.2,
      delay:-0.1,
      duration:1,
      ease:"power4.inOut",
    }
  )
  !isOpened ? stopLenisScroll() : startLenisScroll();
});
//====== TOGGLE MOBILE SUBMENU END ==========

// ===== Lazy loading background images start =====
let lazyBackgrounds = [].slice.call(document.querySelectorAll("[data-bg]"));

if("IntersectionObserver" in window){
  const lazyBackgroundObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        let lazyBackground = entry.target;
        let imgUrl = lazyBackground.getAttribute("data-bg");
        if(entry.target.classList.contains("overlay-gradient")){
            let linearGredient = "linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45))";
            lazyBackground.style.backgroundImage = `${linearGredient}, url("${imgUrl}")`;
        }else{
            lazyBackground.style.backgroundImage = `url("${imgUrl}")`;
        }
        lazyBackground.classList.remove("lazy");
        lazyBackgroundObserver.unobserve(lazyBackground);
      }
    });
  });

  lazyBackgrounds.forEach((lazyBackground) =>{
    lazyBackgroundObserver.observe(lazyBackground);
  });
}
// ===== Lazy loading background images End =====

//======== ACCORDION TOGGLE START ========
let content;
function toggleAccordion(element){ 
  element.classList.toggle("is-open");
  content = element.nextElementSibling;
  if(content){
    const isOpening = content.style.maxHeight;
    content.style.maxHeight = isOpening ? null : `${content.scrollHeight}px`;
    gsap.fromTo(content.children, 
      { opacity: 0, y:50 },
      { opacity: 1, y:0, duration:0.75, stagger:0.2, ease:"power4.out"}
    );
  }
}

const accordionBtns = document.querySelectorAll(".accordion-title");
accordionBtns.forEach((accordion) => {
  accordion.addEventListener("click",function (e){
    e.stopPropagation();
    toggleAccordion(accordion);
    accordionBtns.forEach(otherAccordion => {
      if(otherAccordion !== accordion) {
        otherAccordion.classList.remove("is-open");
        otherAccordion.nextElementSibling.style.maxHeight = null;
      }
    });
  });
});

const mobileSubmenus = document.querySelectorAll(".mobileSubmenu");
mobileSubmenus.forEach((submenu)=>{
  submenu.addEventListener("click", function(){
    toggleAccordion(this);
  })
})
//======== ACCORDION TOGGLE END ========

//======= COUNTER START  ===========
function visible($el) {
  let $w = jQuery(window),
    viewTop = $w.scrollTop(),
    viewBottom = viewTop + $w.height(),
    elTop = $el.offset().top,
    elBottom = elTop + $el.height();
    compareTop = $el === true ? elBottom : elTop,
    compareBottom = $el === true ? elTop : elBottom;

  return (
    compareBottom <= viewBottom && compareTop >= viewTop && $el.is(":visible")
  );
}

function updateCounter(){
  ScrollTrigger.create({
    trigger: "#stats-section",
    start: "top 80%",
    once: true,
    onEnter: () => {
      if ($("#stats-section").hasClass("animated")) return; // already run
    
      $("#stats-section").addClass("animated"); // mark it as run
    
      document.querySelectorAll(".stats-number").forEach((el) => {
        const target = parseFloat(el.dataset.target);
        const formatType = el.dataset.format;
    
        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power1.out",
            snap: { innerText: 1 },
            onUpdate: function () {
              const value = Math.trunc(el.innerText);
              if (formatType === "abbreviated") {
                el.innerText = value;
              } else {
                el.innerText = value.toLocaleString("en-US");
              }
            }
          }
        );
      });
    }
    
  });
}
//======= COUNTER END ==========


// const items = document.querySelectorAll(".process-item");

// items.forEach((item) => {
//     item.addEventListener("mouseenter", () => {
//         item.classList.add("active");
//     });

//     item.addEventListener("mouseleave", () => {
//         item.classList.remove("active");
//     });
// });

// gsap.utils.toArray(".process-item").forEach((item, i) => {
//   gsap.from(item, {
//       opacity: 0,
//       x: 60,
//       duration: 0.8,
//       ease: "power3.out",
//       delay: i * 0.15,
//       scrollTrigger: {
//           trigger: item,
//           start: "top 85%",
//           toggleActions: "play none none reverse"
//       }
//   });
// });

//======= FLOATING INPUT LABLE START ======
document.querySelectorAll(".form__control").forEach((input) => {
  input.addEventListener("focus", ()=> input.nextElementSibling.classList.add("focused"));
  input.addEventListener("blur", ()=> input.nextElementSibling.classList.toggle("focused", input.value !== ""));
}); 
//======= FLOATING INPUT LABLE END ======

const swiperServices = new Swiper(".swiper-services",{
  spaceBetween: 10,
  slidesPerView: 1,
  grabCursor: true,
  navigation:{
    nextEl:"#next-service",
    prevEl:"#prev-service",
  },
  breakpoints:{
    576:{
      slidesPerView: 1.5,
      spaceBetween: 16,
    },
    768:{
      slidesPerView:1.75,
      spaceBetween: 20,         
    },
    992:{
      slidesPerView:1.75,
      spaceBetween: 20,         
    },
  }
});


const fillLine = document.getElementById('fill-line');
const steps = document.querySelectorAll('.process-step__content');

// // Animate steps one by one on scroll
steps.forEach((step, index) => {
  gsap.from(step, {
    opacity: 0,
    y: 30,
    duration: 1,
    scrollTrigger: {
      trigger: "#process",
      start: "top 80%",
      end: "bottom center",
      scrub: true,
      toggleActions: "play none none reverse",
      onEnter: () => updateFillLine(index)
    }
  });
});

// // Function to update the fill line width
function updateFillLine(index) {
  const totalSteps = steps.length;
  const percentage = ((index + 1) / totalSteps) * 100;
  gsap.to(fillLine, {
    width: `${percentage}%`,
    duration: 1,
    ease: "power2.out",
    start: "top 80%",
    end: "bottom center",
    scrub: true
  });
}


// ======= Modal Script Start =======
const modal = document.getElementById("memberModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const teamMembers = document.querySelectorAll(".readBioBtn");

teamMembers.forEach(member =>{
  member.addEventListener("click", (e)=>{
    // const modalImage = modal.querySelector(".modal-img");
    const modalName = modal.querySelector("#modalName");
    const modalTitle = modal.querySelector("#modalTitle");
    const modalDesc = modal.querySelector("#modalDescription");

    const thumbImageUrl = member.dataset.image;
    const name = member.dataset.name;
    const title = member.dataset.title;
    const desc = member.dataset.description;

    // modalImage.src = thumbImageUrl;
    // modalImage.alt = name;
    modalName.textContent = name;
    modalTitle.textContent = title;

    modalDesc.innerHTML = "";
    desc.split("\n").forEach((paragraph) =>{
      const trimmed = paragraph.trim();
      if(trimmed){
        const p = document.createElement("p");
        p.textContent = trimmed;
        modalDesc.appendChild(p);
      }
    });

    modal.classList.add("show");

    gsap.fromTo(".modal-content", 
      { y:50, opacity:0},
      { y:0, opacity:1, duration:0.5, ease:"power3.out"},
    );
    stopLenisScroll();
  });
});

// Close The Modal
const closeModal =()=>{
  gsap.to(".modal-content", {
    y:50, opacity:0, duration:0.5, ease:"power3.in",
    onComplete:()=>{
      modal.classList.remove("show");
      startLenisScroll();
    }
  });
}

closeModalBtn?.addEventListener("click", closeModal);

// Close Modal on background click
modal?.addEventListener("click", (e)=>{
  if(e.target === modal) closeModal();
});
// ======= Modal Script End =======


//========== Video Play /Pause Button Start ============
const playBtns = document.querySelectorAll(".play-btn");
if(playBtns){
  const videoContainer = document.querySelector(".video__popup-container");
  const closeBtn = document.querySelector(".video__popup-close");
  let iframe = document.querySelector(".video__popup-iframe-container > iframe");

  function togglePopup() {
    videoContainer.classList.toggle("show");
    gsap.fromTo(".video__popup-wrapper", 0.5,
      { opacity:0, y:50},
      { opacity:1, y:0, ease:Power4.easeOut }
    );
   stopLenisScroll();
  }

  playBtns.forEach((playBtn, index) => {
    playBtn.addEventListener("click",() => {
      const videoId = playBtn.dataset.id;
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      togglePopup();
    })
  });

  closeBtn && closeBtn.addEventListener("click", ()=>{
    iframe.src = "";
    togglePopup();
    startLenisScroll();
  });
}
//========== Video Play /Pause Button End ============

// ====== Scroll Back To Top Start ======
const backToTopBtn = document.getElementById("backToTop");
function toggleBackToTop(){
  if (window.scrollY > 1600) {
    backToTopBtn.classList.add("show");
    gsap.to(backToTopBtn, { autoAlpha: 1, duration: 0.5 });
  } else {
    backToTopBtn.classList.remove("show");
    gsap.to(backToTopBtn, { autoAlpha: 0, duration: 0.5 });
  }
}

backToTopBtn && backToTopBtn.addEventListener("click", () => {
  lenis.scrollTo(0); // This is the key part: Lenis handles smooth scroll
});
// ==== Scroll back To Top End ====

//====== SET SECTION WIDTH START =====
const elements = document.querySelectorAll("[data-maxWidth], [data-align]");
elements.forEach((el)=>{
  const {maxwidth, align} = el.dataset;
  const alignValue = align?.trim().toLowerCase();
  if(alignValue === "center"){
    el.style.marginInline = "auto";
    el.style.textAlign = alignValue;
  }
  if(alignValue === "right") el.style.textAlign = alignValue;
  if(maxwidth) el.style.maxWidth = maxwidth;
});
//====== SET SECTION WIDTH END =====

//====== ANIMATION SCRIPT START =========
const textContainers = gsap.utils.toArray(".fade-up");
textContainers.forEach((textContainer, i) => {
  gsap.fromTo(textContainer,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, stagger:0.2, ease:"power2.out",
      scrollTrigger:{
        trigger: textContainer,
        toggleActions: "play none none none",
        once: true
      }
    }
  );
});

const fadeIn = gsap.utils.toArray(".fade-in");
fadeIn.forEach((mainContent, i) => {
  const anim = gsap.fromTo(mainContent,
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: "power2.in",
       scrollTrigger:{
        trigger: mainContent,
        toggleActions: "play none none none",
        once: true
      }
    }
  );
});
//====== ANIMATION SCRIPT END =========

const dividers = gsap.utils.toArray(".divider");
dividers.forEach((divider, i)=>{
  const anim = gsap.fromTo(divider,
    { opacity:0, width:"0%", transformOrigin:"left"},
    { opacity:1, width:"100%", duration:1.5, ease:"power4.inOut"}
  )
  ScrollTrigger.create({
    trigger: divider,
    animation: anim,
    toggleActions: "play",
    once: true,
    duration: 1.5,
    // delay:-0.1,
    stagger:0.1,
    ease: "power4.inOut",
  });
})

//====== Filter Portfolio Start ============
const tabBtns = document.querySelectorAll(".btn--tab");
if(tabBtns.length){
  tabBtns.forEach((filterBtn) => {
    filterBtn.addEventListener("click", (e)=> filterCards(e.target.dataset.value.toLowerCase()));
  });
}
  
//==== FILTER PORTFOLIO START ========
function filterCards(category){
  const cards = document.querySelectorAll('.filter-projects');
  cards.forEach((card) => {
    let cardCategories = card.dataset.category.toLowerCase().split(' ');
    const isVisible = category === "all" || cardCategories.includes(category)
    card.classList.toggle("show", isVisible);
    gsap.fromTo(card,
      {
        opacity:0
      },
      {
        opacity:1,
        duration:0.5,
        stagger:0.1,
        ease:"power2.in",
      }
    );
  });
  updateButtonState(category);
}
  
//----- Update Button State -----
function updateButtonState(category){
  tabBtns.forEach((tabBtn) => {
    const isActive = tabBtn?.dataset?.value === category;
    tabBtn.classList.toggle("active", isActive);
  });
}
//====== FILTER PORTFOLIO END =============

window.addEventListener("load",()=>{
  hideLoader();
  bannerContentsAnimation();
  tabBtns.length && filterCards('all');
});

// Lenis scroll event
const onLenisScroll =()=>{
  checkScroll();
  updateCounter();
  ScrollTrigger.update();
}

lenis.on('scroll', onLenisScroll);

// Sync Lenis with GSAP
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000);
});

// Disable GSAP lag smoothing for better performance
gsap.ticker.lagSmoothing(0);
