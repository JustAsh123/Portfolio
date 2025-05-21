    const canvas = document.getElementById("heroCanvas");
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const DOTS_AMOUNT = 450;
    const MOUSE_RADIUS = 350;
    const MIN_DISTANCE = 10;
    const MAX_DISTANCE = 120;
    const dots = [];

    const mouse = { x: null, y: null };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener("mouseout", () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Dot {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.radius = 1.5;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        this.draw();
      }

      distanceSqTo(x, y) {
        const dx = this.x - x;
        const dy = this.y - y;
        return dx * dx + dy * dy;
      }
    }

    function connectMouseToNearbyDots(nearby) {
      if (mouse.x === null || mouse.y === null) return;

      nearby.forEach(dot => {
        const distSq = dot.distanceSqTo(mouse.x, mouse.y);
        if (distSq >= MIN_DISTANCE * MIN_DISTANCE && distSq <= MAX_DISTANCE * MAX_DISTANCE) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = "rgba(100, 255, 100, 0.3)";
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      });
    }

    function connectNearbyDots(nearby) {
      for (let i = 0; i < nearby.length; i++) {
        for (let j = i + 1; j < nearby.length; j++) {
          const dx = nearby[i].x - nearby[j].x;
          const dy = nearby[i].y - nearby[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq >= MIN_DISTANCE * MIN_DISTANCE && distSq <= MAX_DISTANCE * MAX_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(nearby[i].x, nearby[i].y);
            ctx.lineTo(nearby[j].x, nearby[j].y);
            ctx.strokeStyle = "rgba(100, 255, 100, 0.33)";
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      dots.forEach(dot => dot.update());

      if (mouse.x && mouse.y) {
        const nearbyDots = dots.filter(dot =>
          dot.distanceSqTo(mouse.x, mouse.y) <= MOUSE_RADIUS * MOUSE_RADIUS
        );

        connectMouseToNearbyDots(nearbyDots);
        connectNearbyDots(nearbyDots);
      }

      requestAnimationFrame(animate);
    }

    function init() {
      for (let i = 0; i < DOTS_AMOUNT; i++) {
        dots.push(new Dot());
      }
      animate();
    }

    init();