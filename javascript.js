/* ============================================================
   Umair Tariq — Portfolio Scripts
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================================
    // 1. PARTICLE SYSTEM (3D floating dots)
    // ============================================================
    const canvas = document.getElementById('particles-bg');
    const ctx = canvas.getContext('2d');
    let w, h;
    const particles = [];
    const count = 60;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.z = Math.random() * 150 - 75;
            this.size = Math.random() * 1.8 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.25;
            this.speedY = (Math.random() - 0.5) * 0.25;
            this.speedZ = (Math.random() - 0.5) * 0.15;
            this.opacity = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.z += this.speedZ;
            if (this.x < 0 || this.x > w) this.speedX *= -1;
            if (this.y < 0 || this.y > h) this.speedY *= -1;
            if (this.z < -75 || this.z > 75) this.speedZ *= -1;
        }
        draw() {
            const p = 150 / (150 + this.z);
            const px = this.x * p + (w / 2) * (1 - p);
            const py = this.y * p + (h / 2) * (1 - p);
            const s = this.size * p;
            ctx.beginPath();
            ctx.arc(px, py, s, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(53, 217, 155, ${this.opacity * p})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();


    // ============================================================
    // 2. 3D TILT EFFECT (mouse-follow)
    // ============================================================
    const tiltEls = document.querySelectorAll('[data-tilt]');

    tiltEls.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rx = ((y - cy) / cy) * -5;
            const ry = ((x - cx) / cx) * 5;
            this.style.transform =
                `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
        });

        el.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });

});
