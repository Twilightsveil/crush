document.addEventListener('DOMContentLoaded', () => {
    // Check for stored choice on page load and redirect if applicable
    const storedChoice = localStorage.getItem('userChoice');
    if (storedChoice) {
        if (storedChoice === 'success') {
            window.location.href = 'success.html';
        } else if (storedChoice === 'failure') {
            window.location.href = 'failure.html';
        }
        // Optional: Uncomment to allow replay by clearing choice on revisit
       localStorage.removeItem('userChoice');
    }

    // Initialize starry night animation
    const starsCanvas = document.getElementById('starsCanvas');
    if (starsCanvas) {
        starsCanvas.width = window.innerWidth;
        starsCanvas.height = window.innerHeight;
        const ctx = starsCanvas.getContext('2d');
        const stars = [];
        for (let i = 0; i < 100; i++) {
            stars.push({
                x: Math.random() * starsCanvas.width,
                y: Math.random() * starsCanvas.height,
                radius: Math.random() * 2 + 1,
                speed: Math.random() * 0.5 + 0.1
            });
        }
        function animateStars() {
            ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
            ctx.fillStyle = '#fefcbf';
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
                star.x += star.speed;
                if (star.x > starsCanvas.width) star.x = 0;
            });
            requestAnimationFrame(animateStars);
        }
        animateStars();
    }

    // Fade-in effect for the page
    const page = document.querySelector('.page');
    if (page) {
        page.style.opacity = '0';
        setTimeout(() => {
            page.style.opacity = '1';
        }, 100);
    }

    // Login button logic for login.html
    const firstNameInput = document.getElementById('firstName');
    const continueBtn = document.getElementById('continueBtn');
    if (firstNameInput && continueBtn) {
        firstNameInput.addEventListener('input', () => {
            if (firstNameInput.value === 'Sheena') {
                continueBtn.disabled = false;
                continueBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
                continueBtn.classList.add('bg-yellow-400', 'cursor-pointer');
                continueBtn.onclick = () => window.location.href = 'page1.html';
            } else {
                continueBtn.disabled = true;
                continueBtn.classList.remove('bg-yellow-400', 'cursor-pointer');
                continueBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
                continueBtn.onclick = null;
            }
        });
    }

    // Photo cube transition for page1.html
    const photoContainer = document.querySelector('.cube-container');
    if (photoContainer) {
        const photos = photoContainer.querySelectorAll('img.cringy-photo');
        let currentIndex = Math.floor(Math.random() * photos.length);

        const showPhoto = () => {
            photos.forEach((photo, index) => {
                photo.classList.toggle('visible', index === currentIndex);
                photo.classList.toggle('hidden', index !== currentIndex);
            });
            currentIndex = (currentIndex + 1) % photos.length;

            const screenWidth = window.innerWidth;
            photos.forEach(photo => {
                if (photo.classList.contains('visible')) {
                    if (screenWidth < 640) {
                        photo.style.width = '150px';
                        photo.style.height = '100px';
                        photoContainer.style.width = '150px';
                        photoContainer.style.height = '100px';
                    } else {
                        photo.style.width = '200px';
                        photo.style.height = '150px';
                        photoContainer.style.width = '200px';
                        photoContainer.style.height = '150px';
                    }
                }
            });
        };
        showPhoto();
        setInterval(showPhoto, 3000);
    }

    // Carousel logic for page1.html and page2.html (non-looping)
    const setupCarousel = (carouselId, prevBtnId, nextBtnId) => {
        const carousel = document.getElementById(carouselId);
        if (carousel) {
            const slides = carousel.querySelectorAll('.carousel-slide');
            let currentSlide = 0;

            const showSlide = (index) => {
                slides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === index);
                });
                // Disable buttons based on position
                document.getElementById(prevBtnId).disabled = index === 0;
                document.getElementById(nextBtnId).disabled = index === slides.length - 1;
            };

            const prevBtn = document.getElementById(prevBtnId);
            const nextBtn = document.getElementById(nextBtnId);

            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', () => {
                    if (currentSlide > 0) {
                        currentSlide--;
                        showSlide(currentSlide);
                    }
                });

                nextBtn.addEventListener('click', () => {
                    if (currentSlide < slides.length - 1) {
                        currentSlide++;
                        showSlide(currentSlide);
                    }
                });
            }

            showSlide(currentSlide); // Initialize with first slide
        }
    };

    setupCarousel('traitsCarousel', 'prevSlide', 'nextSlide');
    setupCarousel('benefitsCarousel', 'prevBenefitSlide', 'nextBenefitSlide');

    // No button logic for page3.html
    const noButton = document.getElementById('noButton');
    const buttonContainer = document.getElementById('buttonContainer');
    const messageContainer = document.getElementById('messageContainer');
    const yesButton = document.getElementById('yesButton');
    if (noButton && buttonContainer && messageContainer) {
        let clickCount = 0;
        let clickTimeout = null;
        let isMoving = false;

        const moveButton = () => {
            if (isMoving) {
                const containerRect = buttonContainer.getBoundingClientRect();
                const buttonRect = noButton.getBoundingClientRect();
                const maxX = containerRect.width - buttonRect.width;
                const maxY = containerRect.height - buttonRect.height;
                const newX = Math.random() * maxX;
                const newY = Math.random() * maxY;
                noButton.style.transform = `translate(${newX}px, ${newY}px)`;
            }
        };

        noButton.addEventListener('click', (e) => {
            clickCount++;
            clearTimeout(clickTimeout);
            messageContainer.classList.remove('visible');
            messageContainer.classList.add('hidden');
            messageContainer.textContent = '';

            if (clickCount === 1) {
                noButton.textContent = 'Are you sure?';
                noButton.classList.add('clickable');
                noButton.classList.remove('moving');
                noButton.style.transform = '';
                messageContainer.textContent = 'C’mon, Sheena, give it a think! 😘';
                messageContainer.classList.remove('hidden');
                messageContainer.classList.add('visible');
                console.log('Sheena said No on first try...');
            } else if (clickCount === 2) {
                noButton.textContent = 'Are you really sure???';
                noButton.classList.add('clickable');
                noButton.classList.remove('moving');
                noButton.style.transform = '';
                messageContainer.textContent = 'Like, really really sure, bae? 🥺';
                messageContainer.classList.remove('hidden');
                messageContainer.classList.add('visible');
                console.log('Sheena said No on second try...');
            } else if (clickCount === 3) {
                isMoving = true;
                noButton.classList.add('moving');
                noButton.classList.remove('clickable');
                noButton.style.transform = '';
                moveButton();
                clickTimeout = setTimeout(() => {
                    isMoving = false;
                    noButton.classList.remove('moving');
                    noButton.classList.add('clickable');
                    noButton.textContent = 'awhh sure na talaga';
                    noButton.style.transform = noButton.style.transform; // Keep last position
                    messageContainer.textContent = 'ems may choice ka naman kadi if ayaw mo or not HAHAHAHAHA hoped this somewhat made your day better lololol :PP';
                    messageContainer.classList.remove('hidden');
                    messageContainer.classList.add('visible');
                    // Store the choice
                    localStorage.setItem('userChoice', 'failure');
                }, 3000);
                e.preventDefault(); // Prevent click while moving
            }
        });

        noButton.addEventListener('mousemove', () => {
            if (clickCount === 3 && isMoving) {
                moveButton();
            }
        });

        noButton.addEventListener('click', (e) => {
            if (clickCount >= 3 && !isMoving) {
                // Store the choice before redirect
                localStorage.setItem('userChoice', 'failure');
                window.location.href = 'failure.html';
            }
        });
    }

    if (yesButton) {
        yesButton.addEventListener('click', () => {
            // Store the choice before redirect
            localStorage.setItem('userChoice', 'success');
            window.location.href = 'success.html';
        });
    }

});
