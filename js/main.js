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
                "https://wa.me/923001234567?text=" +
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
    $("#contactForm").on("submit", function (e) {
        e.preventDefault();
        var btn = $(this).find('button[type="submit"]');
        var original = btn.html();
        btn.html(
            '<span class="spinner-border spinner-border-sm me-2"></span> Sending...',
        );
        btn.prop("disabled", true);

        setTimeout(function () {
            btn.html('<i class="bi bi-check-circle me-2"></i> Message Sent!');
            btn.css({
                background: "var(--secondary)",
                borderColor: "var(--secondary)",
            });
            showToast(
                '<i class="bi bi-envelope-check"></i> Message sent successfully!',
            );
            $("#contactForm")[0].reset();
            setTimeout(function () {
                btn.html(original);
                btn.css({ background: "", borderColor: "" });
                btn.prop("disabled", false);
            }, 2000);
        }, 1500);
    });

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
            "https://wa.me/923001234567?text=" +
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

