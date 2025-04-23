gsap.registerPlugin(ScrollTrigger);
const sections = document.querySelectorAll('section');

sections.forEach(section => {
    gsap.fromTo(section, 
        {
            backgroundPositionY: `-${window.innerHeight / 2}px`,
        }, 
        {
            backgroundPositionY: `${window.innerHeight/2}px`,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                scrub: true,
            }
        }
    );
});

