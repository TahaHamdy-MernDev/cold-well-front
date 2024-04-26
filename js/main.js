(function ($) {
  "use strict";

  // Spinner
  if (!window.location.href.includes("details.html")) {
    var spinner = function () {
      setTimeout(function () {
        if ($("#spinner").length > 0) {
          $("#spinner").removeClass("show");
        }
      }, 1);
    };
    spinner();
  }

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $(".nav-bar").addClass("sticky-top");
    } else {
      $(".nav-bar").removeClass("sticky-top");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Header carousel
  $(".header-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: true,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 24,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      992: {
        items: 2,
      },
    },
  });

  const dropdown = document.querySelectorAll(
    ".custom-dropdown .dropdown-toggle"
  );
  const searchButton = document.getElementById("searchButton");
  if (dropdown && searchButton) {
    dropdown.forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        var dropdownMenu = this.nextElementSibling;
        dropdownMenu.style.display =
          dropdownMenu.style.display === "block" ? "none" : "block";
      });
    });
    window.onclick = function (event) {
      if (!event.target.matches(".dropdown-toggle")) {
        var dropdowns = document.getElementsByClassName("dropdown-menu");
        for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.style.display === "block") {
            openDropdown.style.display = "none";
          }
        }
      }
    };

    searchButton.addEventListener("click", function () {
      var searchKeyword = document.getElementById("searchKeyword").value;
      var optionsSelected = [];
      document
        .querySelectorAll('.dropdown-menu input[type="checkbox"]:checked')
        .forEach(function (checkbox) {
          optionsSelected.push(checkbox.name);
        });
      console.log(
        `Search Keyword: ${searchKeyword}, Options Selected: ${optionsSelected.join(
          ", "
        )}`
      );
    });
  }

})(jQuery);
