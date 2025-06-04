const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('data-nav');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-link') === id);
      });
    }
    console.log(entry.target.id, entry.isIntersecting, entry.intersectionRatio);
  });
}, {
  threshold: 0.3 // Trigger when 60% of section is visible
});

sections.forEach(section => observer.observe(section));

