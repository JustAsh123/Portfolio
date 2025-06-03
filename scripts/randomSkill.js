document.querySelector('.hero-link').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });

  const skillBoxes = document.querySelectorAll('.skill-box');
  const aboutContent = document.querySelector('.about-content');

  // Hide skill boxes and about-content immediately before animation
  skillBoxes.forEach(box => {
    box.style.animation = 'none';
    box.style.opacity = 0;
    box.style.transform = 'scale(0.3)';
  });

  aboutContent.style.animation = 'none';
  aboutContent.style.opacity = 0;

  // Animate about-content after 300ms
  setTimeout(() => {
    aboutContent.style.animation = 'none';
    void aboutContent.offsetWidth;  // trigger reflow
    aboutContent.style.animation = 'zoomInFromLeft 0.7s ease forwards';
    aboutContent.style.animationDelay = '0s';  // no extra delay, starts immediately after 300ms wait
  }, 100);

  // Animate skill boxes after 500ms
  setTimeout(() => {
    skillBoxes.forEach((box) => {
      box.style.animation = 'none';
      void box.offsetWidth;  // trigger reflow
      const randomDelay = (Math.random() * 1.2).toFixed(2);
      box.style.animation = `appearFromThinAir 0.8s ease forwards`;
      box.style.animationDelay = `${randomDelay}s`;  // just random stagger after 500ms
    });
  }, 500);
});



window.addEventListener('load', () => {
  setTimeout(() => {
    const skillBoxes = document.querySelectorAll('.skill-box');

    skillBoxes.forEach((box, i) => {
      const randomDelay = (Math.random() * 1.5).toFixed(2); // 0 to 1.5 seconds delay
      box.style.animation = `appearFromThinAir 0.6s ease forwards`;
      box.style.animationDelay = `${randomDelay}s`;
    });
  }, 500);  // 700ms delay on page load too
});
