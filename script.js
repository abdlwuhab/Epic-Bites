 // Sticky header color on scroll
    const header = document.getElementById('header');
    const onScroll = () => {
      if (window.scrollY > 10) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    document.addEventListener('scroll', onScroll);
    onScroll();

    // Mobile menu
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobileNav');
    burger.addEventListener('click', () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      burger.classList.toggle('active');
      mobileNav.hidden = expanded;
    });
    mobileNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') { burger.click(); }
    });

    // Reveal on view (fade-in + slide-up)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('show');
      });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // Menu filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const dishes = document.querySelectorAll('.dish');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active')?.classList.remove('active');
        btn.classList.add('active');
        const f = btn.dataset.filter;
        dishes.forEach(card => {
          const show = f === 'all' || card.dataset.category === f;
          card.style.display = show ? '' : 'none';
        });
      });
    });

    // Countdown timer (set to end of current month)
    function endOfMonthDate() {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0) - 1; // last ms of month
    }
    const target = new Date(endOfMonthDate());
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const tick = () => {
      const now = new Date();
      let diff = Math.max(0, target - now);
      const d = Math.floor(diff / (1000*60*60*24)); diff -= d*24*60*60*1000;
      const h = Math.floor(diff / (1000*60*60)); diff -= h*60*60*1000;
      const m = Math.floor(diff / (1000*60)); diff -= m*60*1000;
      const s = Math.floor(diff / 1000);
      daysEl.textContent = d; hoursEl.textContent = h; minutesEl.textContent = m; secondsEl.textContent = s;
    };
    tick();
    setInterval(tick, 1000);

    // Testimonials slider (auto every 5s)
    const slides = document.getElementById('slides');
    const cards = slides.children;
    const dotsWrap = document.getElementById('dots');
    let idx = 0; const last = cards.length - 1;
    const renderDots = () => {
      dotsWrap.innerHTML = '';
      for (let i = 0; i <= last; i++) {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === idx ? ' active' : '');
        dot.setAttribute('aria-label', 'الانتقال إلى الشريحة ' + (i+1));
        dot.addEventListener('click', () => { idx = i; update(); });
        dotsWrap.appendChild(dot);
      }
    };
    const update = () => {
      slides.style.transform = `translateX(-${idx*100}%)`;
      renderDots();
    };
    renderDots();
    setInterval(() => { idx = idx === last ? 0 : idx + 1; update(); }, 5000);

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Simple form handler (demo)
    const form = document.getElementById('reservation');
    const msg = document.getElementById('formMsg');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        msg.textContent = 'من فضلك أكمل البيانات بشكل صحيح.';
        msg.style.color = 'crimson';
        form.reportValidity();
        return;
      }
      const data = Object.fromEntries(new FormData(form).entries());
      msg.textContent = `تم استلام طلبك يا ${data.name}، سنتواصل معك على ${data.phone}.`;
      msg.style.color = 'green';
      form.reset();
    });