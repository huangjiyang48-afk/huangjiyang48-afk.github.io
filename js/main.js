/* ============================================
   黄吉洋个人网站 - JavaScript 交互
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ========== 1. 导航栏 ==========
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });

    // ========== 2. 打字机 ==========
    const typewriterElement = document.getElementById('typewriter');
    const texts = [
        '游戏系统策划师 🎮',
        'Unity 开发者 🛠️',
        '数值设计师 📊',
        '严肃游戏探索者 🧠',
        'AR/VR 创作者 🥽'
    ];
    let textIndex = 0, charIndex = 0, isDeleting = false;

    function typeWriter() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        let speed = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === currentText.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 500;
        }
        setTimeout(typeWriter, speed);
    }
    typeWriter();

    // ========== 3. 数字递增 ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    function animateNumbers() {
        statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    num.textContent = target;
                    clearInterval(counter);
                } else {
                    num.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    setTimeout(animateNumbers, 500);

    // ========== 4. 技能条 ==========
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-width');
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    skillFills.forEach(fill => skillObserver.observe(fill));

    // ========== 5. 滚动渐入 ==========
    const fadeElements = document.querySelectorAll(
        '.project-card, .skill-category, .highlight-card, .contact-card, .timeline-item'
    );
    fadeElements.forEach(el => el.classList.add('fade-in'));
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => fadeObserver.observe(el));

    // ========== 6. 项目筛选 ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ========== 7. 回到顶部 ==========
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== 8. 粒子背景 ==========
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(37, 99, 235, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 8 + 4}s ease-in-out infinite;
            pointer-events: none;
        `;
        particlesContainer.appendChild(particle);
    }
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
            25% { transform: translate(${Math.random()*60-30}px, ${Math.random()*60-30}px) scale(1.2); opacity: 0.6; }
            50% { transform: translate(${Math.random()*60-30}px, ${Math.random()*60-30}px) scale(0.8); opacity: 0.4; }
            75% { transform: translate(${Math.random()*60-30}px, ${Math.random()*60-30}px) scale(1.1); opacity: 0.5; }
        }
    `;
    document.head.appendChild(particleStyle);

    // ========== 9. ⭐ 图片轮播组件 ==========
    document.querySelectorAll('[data-carousel]').forEach(carousel => {
        const slides = carousel.querySelectorAll('.slide');
        const prevBtn = carousel.querySelector('[data-carousel-prev]');
        const nextBtn = carousel.querySelector('[data-carousel-next]');
        const dotsContainer = carousel.querySelector('[data-carousel-dots]');
        const counter = carousel.querySelector('[data-carousel-counter]');
        let currentIndex = 0;
        let autoPlayTimer = null;
        const totalSlides = slides.length;

        if (totalSlides === 0) return;

        // 生成圆点
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        function goToSlide(index) {
            slides[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
            currentIndex = (index + totalSlides) % totalSlides;
            slides[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
            if (counter) counter.textContent = `${currentIndex + 1} / ${totalSlides}`;
            resetAutoPlay();
        }

        function nextSlide() { goToSlide(currentIndex + 1); }
        function prevSlide() { goToSlide(currentIndex - 1); }

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        function startAutoPlay() { autoPlayTimer = setInterval(nextSlide, 4000); }
        function resetAutoPlay() { clearInterval(autoPlayTimer); startAutoPlay(); }
        startAutoPlay();

        carousel.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
        carousel.addEventListener('mouseleave', () => startAutoPlay());

        carousel.setAttribute('tabindex', '0');
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });

        let touchStartX = 0;
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        carousel.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextSlide();
                else prevSlide();
            }
        }, { passive: true });

        // ⭐ 图片点击 → 打开弹窗
        slides.forEach((slide, i) => {
            const img = slide.querySelector('img');
            if (img) {
                img.addEventListener('click', () => {
                    openLightbox(carousel, i);
                });
            }
        });
    });

    // ========== 10. ⭐ 图片弹窗 Lightbox ==========

    // 创建弹窗 DOM
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    lightboxOverlay.innerHTML = `
        <button class="lightbox-close"><i class="fas fa-times"></i></button>
        <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
        <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
        <div class="lightbox-content">
            <img src="" alt="预览大图">
        </div>
        <div class="lightbox-counter"></div>
        <div class="lightbox-hint">按 ESC 关闭 · 方向键切换图片</div>
    `;
    document.body.appendChild(lightboxOverlay);

    const lightboxImg = lightboxOverlay.querySelector('.lightbox-content img');
    const lightboxClose = lightboxOverlay.querySelector('.lightbox-close');
    const lightboxPrev = lightboxOverlay.querySelector('.lightbox-prev');
    const lightboxNext = lightboxOverlay.querySelector('.lightbox-next');
    const lightboxCounter = lightboxOverlay.querySelector('.lightbox-counter');

    let lightboxImages = [];
    let lightboxIndex = 0;

    function openLightbox(carousel, index) {
        // 收集当前轮播的所有图片路径
        lightboxImages = [];
        carousel.querySelectorAll('.slide img').forEach(img => {
            if (img.src && !img.src.includes('undefined')) {
                lightboxImages.push(img.src);
            }
        });

        if (lightboxImages.length === 0) return;

        lightboxIndex = index;
        updateLightbox();
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // 禁止背景滚动
    }

    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = ''; // 恢复滚动
    }

    function updateLightbox() {
        lightboxImg.src = lightboxImages[lightboxIndex];
        lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
    }

    function lightboxGoNext() {
        lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
        updateLightbox();
    }

    function lightboxGoPrev() {
        lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightbox();
    }

    // 关闭弹窗
    lightboxClose.addEventListener('click', closeLightbox);

    // 点击背景关闭（但不包括图片本身）
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) closeLightbox();
    });

    // 弹窗内左右切换
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxGoPrev();
    });

    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxGoNext();
    });

    // 键盘操作
    document.addEventListener('keydown', (e) => {
        if (!lightboxOverlay.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') lightboxGoNext();
        if (e.key === 'ArrowLeft') lightboxGoPrev();
    });

    // 弹窗触摸滑动
    let lbTouchStartX = 0;
    lightboxOverlay.addEventListener('touchstart', (e) => {
        lbTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxOverlay.addEventListener('touchend', (e) => {
        const diff = lbTouchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) lightboxGoNext();
            else lightboxGoPrev();
        }
    }, { passive: true });

    console.log('🎮 黄吉洋的个人网站已加载完成！');
});