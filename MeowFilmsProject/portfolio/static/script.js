 // Custom cursor
    const cursor = document.getElementById('cursor');
    const ring   = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx+'px'; cursor.style.top = my+'px'; });
    function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx+'px';
      ring.style.top  = ry+'px';
      requestAnimationFrame(animRing);
    }
    animRing();
    document.querySelectorAll('a,button,.gallery-card,.scroll-track').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.style.width = '18px'; cursor.style.height = '18px'; ring.style.width = '52px'; ring.style.height = '52px'; });
      el.addEventListener('mouseleave', () => { cursor.style.width = '10px'; cursor.style.height = '10px'; ring.style.width = '36px'; ring.style.height = '36px'; });
    });

    // Navbar scroll
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
    });

    // Reveal
    const revealEls = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => obs.observe(el));

    // Horizontal drag scroll
    const track = document.getElementById('scrollTrack');
    let isDown = false, startX, scrollLeft;
    track.addEventListener('mousedown', e => { isDown = true; track.style.userSelect = 'none'; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; });
    track.addEventListener('mouseleave', () => isDown = false);
    track.addEventListener('mouseup',    () => isDown = false);
    track.addEventListener('mousemove',  e => { if (!isDown) return; e.preventDefault(); const x = e.pageX - track.offsetLeft; track.scrollLeft = scrollLeft - (x - startX) * 1.4; });

    // Mobile nav
    let navOpen = false;
    function toggleMobileNav() {
      navOpen = !navOpen;
      document.getElementById('mobileNav').classList.toggle('open', navOpen);
      const h1 = document.getElementById('h1'), h2 = document.getElementById('h2'), h3 = document.getElementById('h3');
      if (navOpen) {
        h1.style.transform = 'translateY(6px) rotate(45deg)';
        h2.style.opacity = '0';
        h3.style.transform = 'translateY(-6px) rotate(-45deg)';
      } else {
        h1.style.transform = ''; h2.style.opacity = ''; h3.style.transform = '';
      }
    }
    function closeMobileNav() { if (navOpen) toggleMobileNav(); }

    // Form submit
    async function handleSubmit(e) {
      e.preventDefault();
      const form = document.getElementById('Wedding-form');
      const success = document.getElementById('formSuccess');
      const btn = form.querySelector('button[type=submit]');
      btn.innerHTML = '<span>Sending…</span>';
      btn.disabled = true;
      try {
        const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (res.ok) { form.style.display = 'none'; success.style.display = 'block'; }
        else { btn.innerHTML = '<span>Send Inquiry</span>'; btn.disabled = false; }
      } catch { btn.innerHTML = '<span>Send Inquiry</span>'; btn.disabled = false; }
    }
