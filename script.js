document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch reviews from Google Places API
    async function fetchGoogleReviews() {
        try {
            const reviewsUrl = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJGciKVSLJ5zsRa_IH1rPtA8o&key=AIzaSyBFvoB1jo_HOnv6barlamRHbEYnEM07F2A';
            const response = await fetch(reviewsUrl);
            console.log('response:::', response);
            const data = await response.json();
            return data.result.reviews.map(review => ({
                rating: review.rating,
                review: review.text,
                name: review.author_name,
                profile: review.profile_photo_url || ''
            }));
        } catch (err) {
            console.log(err);
            return [
                {
                    "name": "Sangeeta Mhadeshwar",
                    "profile": "https://lh3.googleusercontent.com/a/ACg8ocJ711VWKdd5PVIedjFMRSi1bVCv-zSS-JRvCzDhGmuYk4S8kg=s128-c0x00000000-cc-rp-mo",
                    "rating": 5,
                    "relative_time_description": "2 months ago",
                    "review": "It's very good experience to associate with Sarita madam. It's really helpful vastu change she has made at very minimum cost."
                },
                {
                    "name": "amruta jaitpal",
                    "profile": "https://lh3.googleusercontent.com/a-/ALV-UjUbbtyOBW2WnoM2PNSstZCTQTNG8HhuprTn5UTx27V7Q1DTtBGd=s128-c0x00000000-cc-rp-mo",
                    "rating": 5,
                    "relative_time_description": "2 months ago",
                    "review": "I have consulted Sarita Vastu and got very good and positive results."
                },
                {
                    "name": "Anushri Pangam",
                    "profile": "https://lh3.googleusercontent.com/a/ACg8ocKLc-PC8qFoXWFfJ273dPVEPru6jA5yX3B9xc08V2gUVFhnhw=s128-c0x00000000-cc-rp-mo",
                    "rating": 5,
                    "review": "For better results of vastu effects,  prefer SaritaVastu\nMost recommended !"
                },
                {
                    "name": "Kiran Karandikar",
                    "profile": "https://lh3.googleusercontent.com/a-/ALV-UjVFy-12iHwciTO4UdjCKPbZIP0YmZuHdN5il4wQo4rF2TSxFp4HKA=s128-c0x00000000-cc-rp-mo-ba2",
                    "rating": 5,
                    "review": ""
                }
            ]
        }
    }

    // Function to display random tip
    // function displayRandomTip() {
    //     let randomIndex = Math.floor(Math.random() * tips.length);
    //     let randomTip = tips[randomIndex];
    //     document.getElementById('tipHeading').innerText = randomTip.heading;
    //     document.getElementById('tipDescription').innerText = randomTip.description;
    // }

    // Array of static tips
    const tips = [
        { heading: "Home Vastu Tip", description: "Ensure the main entrance faces east for prosperity." },
        { heading: "Building Vastu Tip", description: "Keep the center of the building free from heavy objects." },
        { heading: "Location Consultation", description: "Choose locations with positive energy flows for better health." },
        { heading: "Home Decor", description: "Use light colors in the living room to promote relaxation." },
        { heading: "Office Vastu Tip", description: "Place the desk facing north to enhance concentration." },
    ];

    // window.onload = displayRandomTip;

    // Function to update reviews section
    async function updateReviewsSection() {
        const reviews = await fetchGoogleReviews();

        const reviewListElement = document.getElementById('review-list');
        const indicatorsElement = document.getElementById('carousel-indicators');
        reviewListElement.innerHTML = '';
        indicatorsElement.innerHTML = '';

        reviews.forEach((review, index) => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('carousel-item');
            if (index === 0) reviewElement.classList.add('active');

            const profileImage = review.profile ? `<img src="${review.profile}" alt="${review.name}" style="width: 50px; height: 50px; border-radius: 50%;">` : `<i class="bi bi-person-circle" style="font-size: 50px;"></i>`;

            // Create star ratings with Bootstrap icons
            let stars = '';
            for (let i = 0; i < 5; i++) {
                stars += i < review.rating ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star"></i>';
            }

            reviewElement.innerHTML = `
                <div class="review-card">
                    <div style="display:flex; flex-direction: row; align-items:center">
                        ${profileImage}
                        <div style="margin-left: 10px;">
                            <h4>${review.name}</h4>
                            <p style='width:fit-content'>${stars}</p>
                        </div>
                    </div>
                    <p style="text-align:justify">${review.review}</p>
                </div>
            `;
            reviewListElement.appendChild(reviewElement);

            const indicatorElement = document.createElement('li');
            indicatorElement.setAttribute('data-target', '#carouselReviews');
            indicatorElement.setAttribute('data-slide-to', index);
            if (index === 0) indicatorElement.classList.add('active');
            indicatorsElement.appendChild(indicatorElement);
        });

        // Automatically rotate reviews every 3 seconds
        $('.carousel').carousel({
            interval: 3000
        });
    }

    updateReviewsSection();
});

let cards = [
    'serviceCard1',
    'serviceCard2',
    'serviceCard3',
    'serviceCard4'
];

function toggleCard(cardId) {
    for (let i = 0; i < cards.length; i++) {
        const card = document.getElementById(cards[i]);
        if (cards[i] == cardId) {
            card.classList.toggle('expanded');
            card.classList.toggle('collapsed');
        } else {
            card.classList.remove('expanded');
            card.classList.add('collapsed');
        }
    }
}

function scrollToFooter() {
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
    highlightContactInfo();
}

function highlightContactInfo() {
    var contactInfo = document.getElementById('contact-info');
    contactInfo.classList.add('highlight');
    setTimeout(function () {
        contactInfo.classList.remove('highlight');
    }, 3000);
}

// Check if text overflows and show expand icon if needed
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        const text = card.querySelector('.card-text');
        const icon = card.querySelector('.expand-icon');
        if (text.scrollHeight > text.clientHeight) {
            icon.style.display = 'block';
        }
    });
});
