/* ===================================
   MobiMart - Main JavaScript
   jQuery + Bootstrap 5  
   =================================== */

$(document).ready(function () {
    // ---- Preloader ---- //
    $(window).on("load", function () {
        setTimeout(function () {
            $("#preloader").addClass("hidden");
        }, 600);
    });
    // Fallback if load already fired
    setTimeout(function () {
        $("#preloader").addClass("hidden");
    }, 2000);

    // ---- Navbar scroll effect ---- //
    $(window).on("scroll", function () {
        var scroll = $(this).scrollTop();
        if (scroll > 60) {
            $(".navbar-custom").addClass("scrolled");
        } else {
            $(".navbar-custom").removeClass("scrolled");
        }

        // Back to top button
        if (scroll > 400) {
            $("#backToTop").addClass("visible");
        } else {
            $("#backToTop").removeClass("visible");
        }

        // Active nav link based on scroll
        updateActiveNav();
    });

    // ---- Active Nav on Scroll ---- //
    function updateActiveNav() {
        var scrollPos = $(document).scrollTop() + 100;
        $("section[id]").each(function () {
            var sectionTop = $(this).offset().top;
            var sectionHeight = $(this).outerHeight();
            var sectionId = $(this).attr("id");
            if (
                scrollPos >= sectionTop &&
                scrollPos < sectionTop + sectionHeight
            ) {
                $(".navbar-custom .nav-link").removeClass("active");
                $(
                    '.navbar-custom .nav-link[href="#' + sectionId + '"]',
                ).addClass("active");
            }
        });
    }

    // ---- Smooth scroll nav links ---- //
    $(".navbar-custom .nav-link").on("click", function (e) {
        var target = $(this).attr("href");
        if (target.startsWith("#") && $(target).length) {
            e.preventDefault();
            $("html, body").animate(
                { scrollTop: $(target).offset().top - 70 },
                600,
                "swing",
            );
            // Close mobile menu
            $(".navbar-collapse").collapse("hide");
        }
    });

    // ---- Back to Top ---- //
    $("#backToTop").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 500, "swing");
    });

    // ---- Product Filtering ---- //
    $(".filter-tab").on("click", function () {
        var filter = $(this).data("filter");
        $(".filter-tab").removeClass("active");
        $(this).addClass("active");

        if (filter === "all") {
            $(".product-item").fadeIn(400);
        } else {
            $(".product-item").each(function () {
                if ($(this).data("category") === filter) {
                    $(this).fadeIn(400);
                } else {
                    $(this).fadeOut(300);
                }
            });
        }
    });

    // ---- Wishlist Toggle ---- //
    $(document).on("click", ".product-wishlist", function (e) {
        e.preventDefault();
        $(this).toggleClass("active");
        var icon = $(this).find("i");
        if ($(this).hasClass("active")) {
            icon.removeClass("bi-heart").addClass("bi-heart-fill");
            showToast(
                '<i class="bi bi-heart-fill" style="color: #FD79A8;"></i> Added to wishlist!',
            );
        } else {
            icon.removeClass("bi-heart-fill").addClass("bi-heart");
            showToast('<i class="bi bi-heart"></i> Removed from wishlist');
        }
    });

    // ---- Dynamic WhatsApp Buttons ---- //
    function setupWhatsAppLinks() {
        $(".product-card").each(function () {
            var name = $(this).find(".product-info h5").text();
            var price = $(this).find(".current-price").text();
            var waUrl =
                "https://wa.me/923006635231?text=" +
                encodeURIComponent(
                    "Hi! I'm interested in the " + name + " (" + price + ")",
                );
            $(this).find(".whatsapp-btn").attr("href", waUrl);
            $(this).find(".whatsapp-action").attr("href", waUrl);
        });
    }
    setupWhatsAppLinks();

    // ---- Toast Notification ---- //
    function showToast(message) {
        var toast = $("#toastNotification");
        toast.html(message);
        toast.addClass("show");
        setTimeout(function () {
            toast.removeClass("show");
        }, 2500);
    }

    // ---- Countdown Timer ---- //
    function startCountdown() {
        var endDate = new Date();
        endDate.setDate(endDate.getDate() + 3);
        endDate.setHours(23, 59, 59, 0);

        function updateTimer() {
            var now = new Date().getTime();
            var distance = endDate.getTime() - now;

            if (distance < 0) {
                endDate.setDate(endDate.getDate() + 3);
                return;
            }

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            );
            var minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60),
            );
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            $("#countdown-days").text(days.toString().padStart(2, "0"));
            $("#countdown-hours").text(hours.toString().padStart(2, "0"));
            $("#countdown-minutes").text(minutes.toString().padStart(2, "0"));
            $("#countdown-seconds").text(seconds.toString().padStart(2, "0"));
        }

        updateTimer();
        setInterval(updateTimer, 1000);
    }
    startCountdown();

    // ---- Counter Animation ---- //
    var countersAnimated = false;
    function animateCounters() {
        if (countersAnimated) return;
        var triggerPoint = $(window).scrollTop() + $(window).height() * 0.85;
        var statsSection = $(".hero-stats");
        if (statsSection.length && statsSection.offset().top < triggerPoint) {
            countersAnimated = true;
            $(".counter-value").each(function () {
                var target = parseInt($(this).data("target"));
                var suffix = $(this).data("suffix") || "";
                var el = $(this);
                $({ count: 0 }).animate(
                    { count: target },
                    {
                        duration: 2000,
                        easing: "swing",
                        step: function () {
                            el.text(Math.floor(this.count) + suffix);
                        },
                        complete: function () {
                            el.text(target + suffix);
                        },
                    },
                );
            });
        }
    }
    $(window).on("scroll", animateCounters);
    animateCounters();

    // ---- Scroll Reveal Animation ---- //
    function revealOnScroll() {
        $(".reveal").each(function () {
            var elementTop = $(this).offset().top;
            var viewportBottom =
                $(window).scrollTop() + $(window).height() * 0.88;
            if (elementTop < viewportBottom) {
                $(this).addClass("revealed");
            }
        });
    }
    $(window).on("scroll", revealOnScroll);
    revealOnScroll();

    // ---- Contact Form ---- //
    // ---- Contact Form (CodeFreeForm Integration) ---- //
    var form = document.getElementById("codefreeformForm");
    if (form) {
        var alertBox = form.querySelector(".form-alert");
        var submitBtn = form.querySelector('button[type="submit"]');
        var originalText = submitBtn.innerHTML;

        var showAlert = function(msg, type) {
            type = type || "success";
            if (!alertBox) return;

            alertBox.style.display = "block";
            alertBox.textContent = msg;
            alertBox.style.background =
                type === "success" ? "rgba(46, 204, 113, 0.15)" : "rgba(231, 76, 60, 0.15)";
            alertBox.style.color =
                type === "success" ? "#2ecc71" : "#e74c3c";
            alertBox.style.border = type === "success" ? "1px solid rgba(46, 204, 113, 0.3)" : "1px solid rgba(231, 76, 60, 0.3)";

            setTimeout(function() {
                alertBox.style.display = "none";
            }, 5000);
        };

        var setLoading = function(loading) {
            submitBtn.disabled = loading;
            if(loading) {
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Sending...';
            } else {
                submitBtn.innerHTML = originalText;
            }
        };

        form.addEventListener("submit", async function(e) {
            e.preventDefault();
            if (alertBox) alertBox.style.display = "none";
            setLoading(true);

            var formData = new FormData(form);
            var jsonObject = {};
            formData.forEach(function(value, key) {
                jsonObject[key] = value;
            });
            var json = JSON.stringify(jsonObject);

            try {
                const res = await fetch(form.action, {
                    method: form.method,
                    body: json,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });

                const data = await res.json().catch(function() { return {}; });

                if (
                    res.ok &&
                    (data.success === true ||
                        data.success === undefined)
                ) {
                    showAlert(
                        data.message || "Message sent successfully!",
                        "success"
                    );
                    if (typeof showToast === 'function') {
                        showToast('<i class="bi bi-envelope-check"></i> ' + (data.message || "Message sent successfully!"));
                    }
                    form.reset();
                } else {
                    showAlert(
                        data.message || "Something went wrong.",
                        "error"
                    );
                }
            } catch (err) {
                showAlert("Network error. Try again.", "error");
            }

            setLoading(false);
        });
    }

    // ---- Newsletter Form ---- //
    $("#newsletterForm").on("submit", function (e) {
        e.preventDefault();
        var email = $(this).find("input").val();
        if (email) {
            showToast(
                '<i class="bi bi-check-circle-fill"></i> Subscribed successfully!',
            );
            $(this).find("input").val("");
        }
    });

    // ---- Quick View Modal ---- //
    $(document).on("click", ".quick-view-btn", function () {
        var card = $(this).closest(".product-card");
        var name = card.find(".product-info h5").text();
        var price = card.find(".current-price").text();
        var img = card.find(".product-image img").attr("src");
        var category = card.find(".product-category").text();

        $("#quickViewModal .modal-title").text(name);
        $("#quickViewModal .qv-image").attr("src", img);
        $("#quickViewModal .qv-name").text(name);
        $("#quickViewModal .qv-category").text(category);
        $("#quickViewModal .qv-price").text(price);

        var waUrl =
            "https://wa.me/923006635231?text=" +
            encodeURIComponent(
                "Hi! I'm interested in the " + name + " (" + price + ")",
            );
        $("#quickViewModal .qv-whatsapp-btn").attr("href", waUrl);

        var modal = new bootstrap.Modal(
            document.getElementById("quickViewModal"),
        );
        modal.show();
    });

    // ---- Intersection Observer for Animations ---- //
    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        $(entry.target).addClass("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
        );

        document.querySelectorAll(".reveal").forEach(function (el) {
            observer.observe(el);
        });
    }

    // ---- Load Dynamic Data ---- //
    function loadDynamicData() {
        var data = {
            "products": [
                {
                    "category": "new",
                    "badge": "New",
                    "badgeClass": "badge-new",
                    "image": "images/phone-new-1.png",
                    "name": "Google Pixel 10 Pro",
                    "label": "Smartphone",
                    "ratingHTML": "<i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i>",
                    "reviews": 42,
                    "currentPrice": "Rs. 399,999",
                    "oldPrice": "",
                    "conditionHTML": "",
                    "delay": "1"
                },
                {
                    "category": "new",
                    "badge": "New",
                    "badgeClass": "badge-new",
                    "image": "images/phone-new-2.png",
                    "name": "Google Pixel 10",
                    "label": "Smartphone",
                    "ratingHTML": "<i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-half\"></i>",
                    "reviews": 28,
                    "currentPrice": "Rs. 329,999",
                    "oldPrice": "",
                    "conditionHTML": "",
                    "delay": "2"
                },
                {
                    "category": "new",
                    "badge": "Hot",
                    "badgeClass": "badge-sale",
                    "image": "images/phone-new-3.png",
                    "name": "Google Pixel 9 Pro",
                    "label": "Smartphone",
                    "ratingHTML": "<i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star\"></i>",
                    "reviews": 85,
                    "currentPrice": "Rs. 289,999",
                    "oldPrice": "Rs. 329,999",
                    "conditionHTML": "",
                    "delay": "3"
                },
                {
                    "category": "new",
                    "badge": "Sale",
                    "badgeClass": "badge-sale",
                    "image": "images/phone-used-1.png",
                    "name": "Google Pixel 9",
                    "label": "Smartphone",
                    "ratingHTML": "<i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-half\"></i>",
                    "reviews": 120,
                    "currentPrice": "Rs. 249,999",
                    "oldPrice": "Rs. 279,999",
                    "conditionHTML": "",
                    "delay": "1"
                },
                {
                    "category": "used",
                    "badge": "Pre-Owned",
                    "badgeClass": "badge-used",
                    "image": "images/phone-used-2.png",
                    "name": "Google Pixel 8 Pro",
                    "label": "Pre-Owned",
                    "ratingHTML": "<i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star\"></i>",
                    "reviews": 150,
                    "currentPrice": "Rs. 189,999",
                    "oldPrice": "Rs. 229,999",
                    "conditionHTML": "<div class=\"product-condition excellent\"><i class=\"bi bi-patch-check-fill\"></i> Excellent Condition</div>",
                    "delay": "2"
                },
                {
                    "category": "used",
                    "badge": "Pre-Owned",
                    "badgeClass": "badge-used",
                    "image": "images/phone-used-3.png",
                    "name": "Google Pixel 8",
                    "label": "Pre-Owned",
                    "ratingHTML": "<i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-half\"></i>",
                    "reviews": 210,
                    "currentPrice": "Rs. 149,999",
                    "oldPrice": "Rs. 189,999",
                    "conditionHTML": "<div class=\"product-condition excellent\"><i class=\"bi bi-patch-check-fill\"></i> Excellent Condition</div>",
                    "delay": "3"
                },
                {
                    "category": "used",
                    "badge": "Sale",
                    "badgeClass": "badge-sale",
                    "image": "images/accessory-1.png",
                    "name": "Google Pixel 7 Pro",
                    "label": "Pre-Owned",
                    "ratingHTML": "<i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star\"></i>",
                    "reviews": 320,
                    "currentPrice": "Rs. 119,999",
                    "oldPrice": "Rs. 149,999",
                    "conditionHTML": "<div class=\"product-condition good\"><i class=\"bi bi-patch-check-fill\"></i> Good Condition</div>",
                    "delay": "1"
                },
                {
                    "category": "used",
                    "badge": "Pre-Owned",
                    "badgeClass": "badge-used",
                    "image": "images/accessory-2.png",
                    "name": "Google Pixel 7",
                    "label": "Pre-Owned",
                    "ratingHTML": "<i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-half\"></i><i class=\"bi bi-star\"></i>",
                    "reviews": 430,
                    "currentPrice": "Rs. 95,999",
                    "oldPrice": "Rs. 119,999",
                    "conditionHTML": "<div class=\"product-condition good\"><i class=\"bi bi-patch-check-fill\"></i> Good Condition</div>",
                    "delay": "2"
                },
                {
                    "category": "used",
                    "badge": "Pre-Owned",
                    "badgeClass": "badge-used",
                    "image": "images/accessory-3.png",
                    "name": "Google Pixel 6 Pro",
                    "label": "Pre-Owned",
                    "ratingHTML": "<i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star\"></i><i class=\"bi bi-star\"></i>",
                    "reviews": 510,
                    "currentPrice": "Rs. 85,999",
                    "oldPrice": "Rs. 109,999",
                    "conditionHTML": "<div class=\"product-condition good\"><i class=\"bi bi-patch-check-fill\"></i> Good Condition</div>",
                    "delay": "3"
                },
                {
                    "category": "used",
                    "badge": "Clearance",
                    "badgeClass": "badge-sale",
                    "image": "images/phone-new-1.png",
                    "name": "Google Pixel 6",
                    "label": "Pre-Owned",
                    "ratingHTML": "<i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-half\"></i><i class=\"bi bi-star\"></i>",
                    "reviews": 650,
                    "currentPrice": "Rs. 69,999",
                    "oldPrice": "Rs. 89,999",
                    "conditionHTML": "<div class=\"product-condition fair\"><i class=\"bi bi-patch-check-fill\"></i> Fair Condition</div>",
                    "delay": "1"
                }
            ],
            "deals": [
                {
                    "delayClass": "reveal-left",
                    "icon": "bi-fire",
                    "tag": "Flash Sale",
                    "titleHTML": "Up to 40% Off on<br />Pre-Owned Pixels",
                    "desc": "Certified quality, warranty included. Limited stock \u2014 grab yours now!",
                    "isCountdown": true,
                    "btnLink": "#products",
                    "btnClass": "btn-primary-gradient",
                    "btnIcon": "bi-bag-check",
                    "btnText": "Shop Now",
                    "featuresHTML": ""
                },
                {
                    "delayClass": "reveal-right",
                    "icon": "bi-gift",
                    "tag": "Bundle Offer",
                    "titleHTML": "Buy Any Pixel &<br />Get 50% Off Accessories",
                    "desc": "Mix & match cases, chargers, earbuds and screen protectors with any pixel purchase.",
                    "isCountdown": false,
                    "btnLink": "#products",
                    "btnClass": "btn-accent",
                    "btnIcon": "bi-stars",
                    "btnText": "Explore Bundle",
                    "featuresHTML": "<div class=\"d-flex gap-3 flex-wrap mb-4\"><div class=\"d-flex align-items-center gap-2\" style=\"color: var(--secondary-light)\"><i class=\"bi bi-check-circle-fill\"></i><span>Phone Cases</span></div><div class=\"d-flex align-items-center gap-2\" style=\"color: var(--secondary-light)\"><i class=\"bi bi-check-circle-fill\"></i><span>Chargers</span></div><div class=\"d-flex align-items-center gap-2\" style=\"color: var(--secondary-light)\"><i class=\"bi bi-check-circle-fill\"></i><span>Earbuds</span></div><div class=\"d-flex align-items-center gap-2\" style=\"color: var(--secondary-light)\"><i class=\"bi bi-check-circle-fill\"></i><span>Screen Guards</span></div></div>"
                }
            ],
            "testimonials": [
                {
                    "delayClass": "reveal-delay-1",
                    "starsHTML": "<i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i>",
                    "quote": "\"Bought a pre-owned Pixel 8 Pro and it looks absolutely brand new! The 50-point inspection they do is legit. Best mobile shop experience I've ever had.\"",
                    "avatar": "AK",
                    "name": "Ahmed Khan",
                    "role": "Verified Buyer"
                },
                {
                    "delayClass": "reveal-delay-2",
                    "starsHTML": "<i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i>",
                    "quote": "\"Amazing prices on pixel accessories! Got pixel buds and a fast charger for half the price I'd pay elsewhere. Plus the delivery was super quick. Highly recommend!\"",
                    "avatar": "SF",
                    "name": "Sara Fatima",
                    "role": "Verified Buyer"
                },
                {
                    "delayClass": "reveal-delay-3",
                    "starsHTML": "<i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-fill\"></i><i class=\"bi bi-star-half\"></i>",
                    "quote": "\"I traded in my old phone and got great credit towards the new Pixel 9 Pro. Hassle-free process and brilliant customer service. Will definitely come back!\"",
                    "avatar": "UR",
                    "name": "Usman Raza",
                    "role": "Verified Buyer"
                }
            ],
            "storeInfo": [
                {
                    "iconClass": "bi-geo-alt-fill",
                    "bgStyle": "background: rgba(108, 92, 231, 0.15); color: var(--primary-light);",
                    "title": "Address",
                    "descHTML": "Shop Right 4, HBL Basement, Rafiq Centre, Katchery Bazar, Faisalabad."
                },
                {
                    "iconClass": "bi-telephone-fill",
                    "bgStyle": "background: rgba(0, 206, 201, 0.15); color: var(--secondary);",
                    "title": "Phone",
                    "descHTML": "+92 300 6635231"
                },
                {
                    "iconClass": "bi-envelope-fill",
                    "bgStyle": "background: rgba(253, 121, 168, 0.15); color: var(--accent);",
                    "title": "Email",
                    "descHTML": "arslanpixelstore@gmail.com"
                },
                {
                    "iconClass": "bi-clock-fill",
                    "bgStyle": "background: rgba(253, 203, 110, 0.15); color: var(--accent-light);",
                    "title": "Working Hours",
                    "descHTML": "Open all week<br />(Friday closed)"
                }
            ]
        };

        // Render Products
        var productsHtml = "";
        $.each(data.products, function(i, p) {
            productsHtml += `
                <div class="col-lg-4 col-md-6 product-item reveal reveal-delay-${p.delay}" data-category="${p.category}">
                    <div class="product-card">
                        <span class="product-badge ${p.badgeClass}">${p.badge}</span>
                        <div class="product-wishlist"><i class="bi bi-heart"></i></div>
                        <div class="product-image">
                            <img src="${p.image}" alt="${p.name}">
                            <div class="product-actions">
                                <button class="action-btn quick-view-btn" title="Quick View"><i class="bi bi-eye"></i></button>
                                <a href="#" target="_blank" class="action-btn whatsapp-action" title="Order on WhatsApp"><i class="bi bi-whatsapp"></i></a>
                            </div>
                        </div>
                        <div class="product-info">
                            <div class="product-category">${p.label}</div>
                            <h5>${p.name}</h5>
                            <div class="product-rating">
                                ${p.ratingHTML}
                                <span>(${p.reviews} reviews)</span>
                            </div>
                            ${p.conditionHTML}
                            <div class="price-wrapper">
                                <span class="current-price">${p.currentPrice}</span>
                                <span class="old-price">${p.oldPrice}</span>
                            </div>
                            <a href="#" target="_blank" class="whatsapp-btn"><i class="bi bi-whatsapp"></i> Order on WhatsApp</a>
                        </div>
                    </div>
                </div>
            `;
        });
        $("#products-container").html(productsHtml);

        // Render Deals
        var dealsHtml = "";
        $.each(data.deals, function(i, d) {
            var countdownHtml = d.isCountdown ? `
                <div class="deal-countdown">
                    <div class="countdown-item"><span class="count-num" id="countdown-days">00</span><span class="count-label">Days</span></div>
                    <div class="countdown-item"><span class="count-num" id="countdown-hours">00</span><span class="count-label">Hours</span></div>
                    <div class="countdown-item"><span class="count-num" id="countdown-minutes">00</span><span class="count-label">Mins</span></div>
                    <div class="countdown-item"><span class="count-num" id="countdown-seconds">00</span><span class="count-label">Secs</span></div>
                </div>
            ` : "";

            dealsHtml += `
                <div class="col-lg-6 reveal ${d.delayClass}">
                    <div class="deal-card">
                        <div class="deal-tag"><i class="bi ${d.icon} me-1"></i> ${d.tag}</div>
                        <h3>${d.titleHTML}</h3>
                        <p>${d.desc}</p>
                        ${countdownHtml}
                        ${d.featuresHTML}
                        <a href="${d.btnLink}" class="btn ${d.btnClass}">
                            <i class="bi ${d.btnIcon} me-2"></i> ${d.btnText}
                        </a>
                    </div>
                </div>
            `;
        });
        $("#deals-container").html(dealsHtml);

        // Render Testimonials
        var testimonialsHtml = "";
        $.each(data.testimonials, function(i, t) {
            testimonialsHtml += `
                <div class="col-lg-4 col-md-6 reveal ${t.delayClass}">
                    <div class="testimonial-card">
                        <div class="stars">
                            ${t.starsHTML}
                        </div>
                        <p class="quote">
                            ${t.quote}
                        </p>
                        <div class="client-info">
                            <div class="avatar">${t.avatar}</div>
                            <div>
                                <h6>${t.name}</h6>
                                <span>${t.role}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        $("#testimonials-container").html(testimonialsHtml);

        // Render Store Info
        var storeInfoHtml = "";
        $.each(data.storeInfo, function(i, s) {
            storeInfoHtml += `
                <div class="contact-info-item">
                    <div class="info-icon" style="${s.bgStyle}">
                        <i class="bi ${s.iconClass}"></i>
                    </div>
                    <div>
                        <h6>${s.title}</h6>
                        <p>${s.descHTML}</p>
                    </div>
                </div>
            `;
        });
        $("#store-info-container").html(storeInfoHtml);

        // Re-bind setup
        setupWhatsAppLinks();
        
        // Re-observe new elements
        if (typeof observer !== "undefined") {
            document.querySelectorAll("#products-container .reveal, #deals-container .reveal").forEach(function (el) {
                observer.observe(el);
            });
        }
    }

    loadDynamicData();

    // ---- Theme Toggle ---- //
    var themeToggle = $("#themeToggle");
    var themeIcon = $("#themeIcon");
    var currentTheme = localStorage.getItem("theme") || "light";

    if (currentTheme === "light") {
        $("html").attr("data-theme", "light");
        themeIcon.removeClass("bi-sun-fill").addClass("bi-moon-stars-fill");
    } else {
        $("html").attr("data-theme", "dark");
    }

    themeToggle.on("click", function () {
        var isLight = $("html").attr("data-theme") === "light";
        if (isLight) {
            $("html").attr("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeIcon.removeClass("bi-moon-stars-fill").addClass("bi-sun-fill");
        } else {
            $("html").attr("data-theme", "light");
            localStorage.setItem("theme", "light");
            themeIcon.removeClass("bi-sun-fill").addClass("bi-moon-stars-fill");
        }
    });
});

/* Reveal Animation CSS Classes (added via JS) */
document.head.insertAdjacentHTML(
    "beforeend",
    `
  <style>
    .reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .reveal.revealed {
      opacity: 1;
      transform: translateY(0);
    }
    .reveal.reveal-left {
      transform: translateX(-40px);
    }
    .reveal.reveal-left.revealed {
      transform: translateX(0);
    }
    .reveal.reveal-right {
      transform: translateX(40px);
    }
    .reveal.reveal-right.revealed {
      transform: translateX(0);
    }
    .reveal-delay-1 { transition-delay: 0.1s; }
    .reveal-delay-2 { transition-delay: 0.2s; }
    .reveal-delay-3 { transition-delay: 0.3s; }
    .reveal-delay-4 { transition-delay: 0.4s; }
  </style>
`,
);

