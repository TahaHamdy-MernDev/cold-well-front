document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    var swiper = new Swiper('.details__explore', {
        slidesPerView: 1,
        spaceBetween: 10,
        grabCursor: true,
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            640: {
                slidesPerView: 4,
                spaceBetween: 40
            }
        }
    });
});