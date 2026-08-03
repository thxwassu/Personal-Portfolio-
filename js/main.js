document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Loading Screen ---
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 800);
    }, 2000);

    // --- 2. Mobile Navigation ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        const icon = mobileToggle.querySelector('i');
        if(navLinks.classList.contains('nav-active')){
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            mobileToggle.querySelector('i').className = 'fas fa-bars';
        });
    });

    // --- 3. Dynamic Projects Rendering (Easy to Update) ---
    const projects = [
        {
            title: "CollabChat",
            desc: "A modern real-time collaboration platform featuring messaging, notifications, and authentication for teams.",
            tech: ["Next.js", "React", "TypeScript", "Tailwind", "Supabase", "PostgreSQL"],
            image: "assets/images/collabchat-placeholder.jpg",
            live: "https://collabchat-two.vercel.app/",
            github: "" // Left empty, button will hide automatically
        },
        {
            title: "AI Resume Builder",
            desc: "An AI-powered builder that helps create ATS-friendly resumes with intelligent content suggestions and PDF export.",
            tech: ["Next.js", "React", "AI API", "Supabase", "Tailwind"],
            image: "assets/images/airesume-placeholder.jpg",
            live: "", // Coming soon
            github: "" // Coming soon
        },
        {
            title: "FitPro Gym Website",
            desc: "A modern fitness website including membership plans, trainer profiles, schedules, and engaging animations.",
            tech: ["HTML5", "CSS3", "JavaScript", "React", "Framer Motion"],
            image: "assets/images/fitpro-placeholder.jpg",
            live: "",
            github: ""
        }
    ];

    const projectContainer = document.getElementById('projects-container');
    
    projects.forEach(project => {
        const liveBtn = project.live ? `<a href="${project.live}" target="_blank" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>` : '';
        const githubBtn = project.github ? `<a href="${project.github}" target="_blank" title="Source Code"><i class="fab fa-github"></i></a>` : '';
        
        const techTags = project.tech.map(t => `<span>${t}</span>`).join('');

        const card = document.createElement('div');
        card.className = 'project-card reveal-up';
        card.innerHTML = `
            <div class="project-img-container">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    ${liveBtn}
                    ${githubBtn}
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
                <div class="project-tech">${techTags}</div>
            </div>
        `;
        projectContainer.appendChild(card);
    });

    // --- 4. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- 5. Stats Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    const statObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !counted) {
            counted = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; 
                const increment = target / (duration / 16); 
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if(current < target) {
                        counter.innerText = Math.ceil(current) + "+";
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target + (target === 2027 ? "" : "+");
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.5 });
    
    if(document.getElementById('stats')) {
        statObserver.observe(document.getElementById('stats'));
    }
});

