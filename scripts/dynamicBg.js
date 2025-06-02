window.onload = function () {
      const canvas = document.getElementById('bgCanvas');
      const ctx = canvas.getContext('2d');
      const speed = 0.7
      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const dots = [];
      const DOT_COUNT = 100;

      for (let i = 0; i < DOT_COUNT; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 0.7,
          color: Math.random() > 0.5 ? 'lime' : 'white',
          dx: (Math.random() - 0.5) * speed,
          dy: (Math.random() - 0.5) * speed,
        });
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let dot of dots) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
          ctx.fillStyle = dot.color;
          ctx.fill();

          dot.x += dot.dx;
          dot.y += dot.dy;

          if (dot.x < 0 || dot.x > canvas.width) dot.dx *= -1;
          if (dot.y < 0 || dot.y > canvas.height) dot.dy *= -1;
        }
        requestAnimationFrame(animate);
      }

      animate();
    };