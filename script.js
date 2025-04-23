function goToJoin() {
  window.location.href = "buy.html";
}



(function () {
  const isAnimationOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  // Cnahge to false to make the animations play when the section's in viewport
  const scrub = true;



  if (isAnimationOk) {
    setupAnimations();
  }

  function setupAnimations() {
    gsap.from(".keyhole", {
      "clip-path": "polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)",
      scrollTrigger: {
        trigger: ".section--primary",
        start: "top top", // when the top of the trigger hits the top of the viewport
        end: "bottom bottom", // bottom of the trigger hits the bottom of the vp
        scrub: scrub,
        markers: false } });


particlesJS("particles-js", {
  particles: {
    number: { value: 50 },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.4 },
    size: { value: 3 },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#ffffff",
      opacity: 0.3,
      width: 1
    },
    move: { enable: true, speed: 0.6 }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false },
      onclick: { enable: false }
    }
  },
  retina_detect: true
});


gsap.to(".intro-text", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".section--primary",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});




    gsap.to(".arrow", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".section--primary",
        start: "top top", // when the top of the trigger hits the top of the viewport
        end: "+=200", // scroll 150px down
        scrub: scrub } });


  }
})();
