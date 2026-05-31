document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const items = document.querySelectorAll('.benefit-item, .badge');
    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });
});



const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
    reveals.forEach(item => {
        const top = item.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){
            item.classList.add('active');
        }
    });
});



const glow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

const targets = document.querySelectorAll(
    '.cta-button, .gallery-item, .benefit-item'
);

targets.forEach(item => {
    item.addEventListener('mouseenter', () => {
        glow.classList.add('active');
    });

    item.addEventListener('mouseleave', () => {
        glow.classList.remove('active');
    });
});



const counters = document.querySelectorAll('.counter');

const startCounter = () => {
    counters.forEach(counter => {
        const target = +counter.dataset.target;
        let count = 0;

        const updateCounter = () => {
            const increment = target / 80;

            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCounter);
            } else {
                if (target === 10) {
                    counter.innerText = "10K+";
                } else if (target === 95) {
                    counter.innerText = "95%";
                } else if (target === 1) {
                    counter.innerText = "1M+";
                }
            }
        };

        updateCounter();
    });
};

const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        startCounter();
        observer.disconnect();
    }
});

observer.observe(document.querySelector('.stats-section'));



const card = document.querySelector('.main-img-card');
const image = card.querySelector('img');

card.addEventListener('mousemove', (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 12;
    const rotateX = (y / rect.height - 0.5) * -12;

    image.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener('mouseleave', () => {
    image.style.transform = 'rotateX(0) rotateY(0)';
});

window.addEventListener('scroll', () => {

    const img = document.querySelector('.main-img-card img');

    img.style.transform =
        `translateY(${window.scrollY * 0.15}px)`;
});



document.querySelectorAll('.gallery-item').forEach(item => {

    item.addEventListener('mousemove', (e) => {

        const rect = item.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x / rect.width - 0.5) * 10;
        const rotateX = (y / rect.height - 0.5) * -10;

        item.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform =
            'perspective(1000px) rotateX(0) rotateY(0)';
    });

});