/**
 * This function is executed when the document is ready.
 * It fetches property details from an API and displays them on the webpage.
 */
$(document).ready(async function () {
  const apiUrl = "data/dummy.json";

  /**
   * This asynchronous function fetches property details from an API.
   * @param {string} propertyId - The ID of the property.
   * @returns {object} The property details or an error if the property is not found.
   */
  async function fetchPropertyDetails(propertyId) {
    const response = await fetch(apiUrl);
    const properties = await response.json();
    if(!propertyId){
      propertyId =1
    }
    return (
      properties.find((property) => property.id == propertyId) ||
      Promise.reject(new Error("Property not found"))
    );
  }

  /**
   * This function gets a query parameter from the URL.
   * @param {string} param - The name of the query parameter.
   * @returns {string} The value of the query parameter.
   */
  function getQueryParam(param) {
    return new URLSearchParams(window.location.search).get(param);
  }

  /**
   * This asynchronous function displays property details on the webpage.
   * It fetches the property details based on the propertyId obtained from the query parameter.
   * It then displays the gallery images and property details.
   * It waits for the images to load before removing the spinner and setting up the gallery interaction.
   * If there's an error, it logs the error and handles it.
   */
  async function displayPropertyDetails() {
    try {
      const propertyId = getQueryParam("id");
      const propertyDetails = await fetchPropertyDetails(propertyId);
      displayGalleryImages(propertyDetails.detailsImages);
      displayPropertyTable(propertyDetails.propertyDetails);
      displayPropertyDetailsMainData(propertyDetails);
      displayChaletDetailsAbout(propertyDetails.propertyDetails);
      await waitForImagesToLoad();
      $("#spinner").removeClass("show");
      setupGalleryInteraction();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * This function displays gallery images on the webpage.
   * @param {Array} detailsImages - An array of objects where each object represents an image detail.
   */
  function displayGalleryImages(detailsImages) {
    const galleryContainer = document.querySelector(
      ".details__gallery-container"
    );
    galleryContainer.innerHTML = detailsImages
      .map(
        (detail, index) => `
      <div class="gallery__container-img ${index === 0 && "active"}">
        <a data-fslightbox="gallery" href="${detail.image}">
          <img src="${detail.image}" alt="">
        </a>
      </div>
    `
      )
      .join("");
  }

  /**
   * This function displays property details in a table on the webpage.
   * @param {object} details - The property details.
   */
  function displayPropertyTable(details) {
    const tableContainer = document.querySelector(".layout-side .d-flex");
    tableContainer.innerHTML = `
      <table class="table table-striped table-hover">
        <thead>
          <tr class=" wow fadeInUp" data-wow-delay=".1s">
            <th class="table-th primary__color" style="font-size: 22px; font-weight: 600; text-align: left;" scope="col">${details.type}</th>
            <th class="table-th primary__color" style="font-size: 22px; font-weight: 600; text-align: left;" scope="col">${details.size}m² </th>
          </tr>
        </thead>
        <tbody>
        <tr class="wow fadeInUp" data-wow-delay=".3s">
          <td localization-key="referenceNo"></td>
          <td>${details.referenceNo}</td>
        </tr>
        <tr class="wow fadeInUp" data-wow-delay=".5s">
          <td localization-key="bedrooms"></td>
          <td>${details.bedrooms}</td>
        </tr>
        <tr class="wow fadeInUp" data-wow-delay=".7s">
          <td localization-key="bathrooms"></td>
          <td>${details.bathrooms}</td>
        </tr>
        <tr class="wow fadeInUp" data-wow-delay=".9s">
          <td localization-key="deliveryYear"></td>
          <td>${details.deliveryYear}</td>
        </tr>
        <tr class="wow fadeInUp" data-wow-delay="1.1s">
          <td localization-key="compound"></td>
          <td>${details.compound}</td>
        </tr>
        <tr class="wow fadeInUp" data-wow-delay="1.3s">
          <td localization-key="saleType"></td>
          <td>${details.saleType}</td>
        </tr>
        <tr class="wow fadeInUp" data-wow-delay="1.5s">
          <td localization-key="finishing"></td>
          <td>${details.finishing}</td>
        </tr>
      </tbody>

      </table>
    `;
    translatePage();
  }

  /**
   * Displays the main details of a property on the webpage.
   *
   * This function constructs HTML content dynamically based on the property object passed to it.
   * It then inserts this content into a container element on the page, specifically designed
   * to showcase property details such as title, location, price range, developer logo, and contact information.
   *
   * @param {Object} property An object containing all the details of the property to be displayed.
   *                         This includes nested objects for property details, price information,
   *                         and contact details.
   */
  function displayPropertyDetailsMainData(property) {
    const container = document.getElementById("property-details");
    const content = `
      <div class="d-flex gap-4 align-items-center flex-column flex-md-row wow fadeInLeft" data-wow-delay=".2s">
        <div class="details__dev">
          <img src="${property.propertyDetails.developerLogo}" alt="${property.propertyDetails.developer}">
        </div>
        <div style="width:100%;" class="d-flex flex-column text-center text-md-start justify-content-center align-items-center  align-items-md-start justify-content-md-start">
          <div class="d-flex gap-1 flex-column">
            <h3 class="primary__color mb-1 text-capitalize">${property.title}</h3>
            <p class="secondary__color mb-1">${property.location}</p>
          </div>
          <div class="d-flex gap-1 justify-content-between align-items-center w-100">
            <div class="d-flex gap-4 align-items-end">
              <span class="d-flex flex-column gap-1 tertiary__color" style="font-size: 12px;">
                <p class="tertiary__color mb-0" localization-key='pricesStartFrom'>Prices Start From</p>
                <span>
                  <strong style="font-size: 28px;">${property.price.minPrice} </strong><span>${property.price.currency}</span>
                </span>
              </span>
              <div class="d-flex flex-column justify-content-between align-items-center flex-md-row ">
                <span class="d-flex justify-content-center align-items-center">
                  <strong style="font-size: 18px;" localization-key='maxPrice'>Max Price:</strong>
                </span>
                <p class="mb-0">
                  <strong style="font-size: 28px;" class="tertiary__color"> ${property.price.maxPrice} </strong>
                  <small>${property.price.currency}</small>
                </p>
              </div>
            </div>
            <div class="details__icons d-flex gap-2 ">
              <a href="tel:${property.contact.number}" class="btn button-primary text-primary-white  py-2 px-3 phone-icon d-flex gap-2 justify-content-center align-items-center">
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M12.9916 23.1503C11.6689 22.833 10.6491 22.0956 9.6153 21.4101C6.01017 19.0332 3.69298 15.6832 1.9997 11.8505C1.30065 10.2708 0.664128 8.67073 0.483049 6.93276C0.310435 5.23418 0.634775 3.66876 1.67369 2.27625C2.26536 1.48795 3.0591 0.93945 3.94077 0.48877C4.35689 0.284657 4.83308 0.282295 5.28143 0.383865C5.6009 0.469466 5.91109 0.589712 6.23056 0.675314C6.80779 0.792851 7.02597 1.18549 7.10052 1.68817C7.31955 3.21353 7.55633 4.74364 7.73986 6.25949C7.76826 6.50845 7.65304 6.86745 7.47775 7.0247C6.95187 7.49645 6.39513 7.94137 5.7898 8.3547C5.18446 8.76802 5.11183 8.89709 5.30435 9.59846C6.25246 12.8044 8.06148 15.4242 10.8163 17.4248C11.2622 17.7485 11.5424 17.7678 12.0041 17.4646C12.6766 17.0135 13.336 16.5404 13.9777 16.0626C14.5429 15.657 14.8014 15.6149 15.3661 16.0633C16.3365 16.8431 17.28 17.6529 18.2411 18.4674C18.5366 18.7137 18.8544 18.9473 19.0827 19.2313C19.2099 19.3953 19.3047 19.6807 19.276 19.8586C18.9162 21.4145 18.1066 22.59 16.4416 23.0536C15.2806 23.4108 14.1136 23.5066 12.9916 23.1503Z"
                  fill="#f4f4f4"></path>
          </svg>
          <span localization-key='callUs'  class="text-primary-white">Call Us</span>
              </a>
              <a href="${property.contact.whatsappLink}" class="btn whatsapp  py-2 px-3 d-flex gap-2 justify-content-center align-items-center whatsapp-icon">
              <svg width="23" height="23" viewBox="0 0 29 29" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M0 28.9956C0.146704 28.4728 0.268957 27.9986 0.403435 27.5244C0.929124 25.6277 1.44259 23.7188 1.9805 21.822C2.0294 21.6396 2.00495 21.4816 1.91937 21.3235C0.892448 19.4876 0.305633 17.53 0.171154 15.4387C-0.122253 11.171 1.22253 7.48694 4.18106 4.41079C6.51609 1.97906 9.38904 0.556491 12.7388 0.118779C18.6558 -0.647218 24.4751 2.34382 27.2869 7.58421C28.3016 9.4688 28.8517 11.4871 28.974 13.6271C29.3774 20.8372 24.2428 27.2813 17.0665 28.5458C13.8635 29.1051 10.8194 28.6309 7.92201 27.1597C7.7264 27.0624 7.55524 27.0381 7.33519 27.0989C5.03683 27.7068 2.73847 28.3026 0.452337 28.8984C0.330084 28.9227 0.195605 28.947 0 28.9956ZM3.45976 25.5791C3.59424 25.5547 3.67982 25.5426 3.75317 25.5183C5.06128 25.1778 6.36939 24.8374 7.6775 24.4969C7.90978 24.4361 8.09316 24.4605 8.30099 24.5942C9.97586 25.6155 11.7852 26.187 13.7413 26.3207C16.1496 26.4788 18.4113 25.9681 20.5019 24.7644C24.7563 22.3327 27.1035 17.603 26.4311 12.7881C26.0399 9.99163 24.8052 7.59637 22.7146 5.6753C19.9395 3.13413 16.6387 2.10064 12.9099 2.58699C10.0492 2.95175 7.6286 4.22841 5.697 6.35618C3.06855 9.26211 2.10275 12.6787 2.73847 16.533C3.00743 18.1379 3.63092 19.597 4.51114 20.9588C4.62117 21.1168 4.64562 21.2749 4.58449 21.4573C4.45002 21.9071 4.32776 22.357 4.20551 22.8069C3.97323 23.7066 3.72872 24.6064 3.45976 25.5791Z"
                  fill="white"></path>
              <path
                  d="M18.3747 21.2864C17.47 21.3107 16.6876 21.0068 15.9052 20.7393C13.1789 19.8152 11.1129 18.0279 9.36464 15.815C8.64335 14.9031 7.95873 13.9669 7.54307 12.8605C7.13964 11.7783 7.07851 10.6962 7.5064 9.60193C7.7509 8.98184 8.16656 8.48333 8.65558 8.03346C8.88786 7.82676 9.19349 7.74165 9.49912 7.72949C9.71918 7.72949 9.93923 7.75381 10.1593 7.75381C10.5505 7.72949 10.7583 7.94835 10.8928 8.26447C11.2962 9.22501 11.7119 10.1855 12.0909 11.1461C12.152 11.3041 12.1398 11.5595 12.0542 11.6932C11.7975 12.0945 11.5163 12.4835 11.1984 12.8605C10.8806 13.2374 10.8561 13.3346 11.1006 13.7602C12.262 15.6934 13.8758 17.0917 15.9908 17.9185C16.3331 18.0522 16.5165 18.0157 16.761 17.7361C17.1155 17.3227 17.4578 16.8971 17.7879 16.4716C18.0813 16.1068 18.2402 16.0339 18.6803 16.2284C19.4383 16.5689 20.1841 16.9336 20.942 17.2984C21.1743 17.4078 21.4188 17.5051 21.6144 17.651C21.7244 17.7361 21.8345 17.9063 21.8467 18.0279C21.8834 19.11 21.5655 20.0219 20.5753 20.6177C19.8906 21.0554 19.1571 21.3229 18.3747 21.2864Z"
                  fill="white"></path>
          </svg>
          <span localization-key='whatsapp'>Whatsapp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
    container.innerHTML = content;
    translatePage()
  }

  /**
   *
   * Displays detailed information about a chalet on the webpage.
   *
   * This function constructs HTML content dynamically based on the chalet property object passed to it.
   * It generates a detailed view including the chalet's title, description, and unique selling points.
   * The content is then inserted into a container element on the page, specifically designed
   * to showcase chalet details such as bedrooms, bathrooms, size, delivery date, and developer information.
   *
   * @param {Object} property An object containing all the details of the chalet to be displayed.
   *                          This includes information like type, bedrooms, compound, developer,
   *                          size, bathrooms, delivery date, and unique selling points.
   */
  function displayChaletDetailsAbout(property) {
    const container = document.getElementById("chalet-details");
    console.log(property);
    let index = 0;
    let content = `<div class="chalet-card my-4">
        <h2 class="chalet-title primary__color wow fadeInDown" data-wow-delay=".3s" style="font-size:22px">${capitalizeFirstLetter(
          `About ${property.type}`
        )}</h2>
        <div class="chalet-description mb-2">
       <p class="tertiary__color wow fadeInDown" data-wow-delay=".5s" style="text-indent:10px;"> A ${
         property.bedrooms
       } bedroom ${property.type} in ${property.compound} by ${
      property.developer
    }. The ${property.type} size is ${property.size}m² with ${
      property.bathrooms
    } bathrooms. <br /> This property will be ready for delivery finished by ${
      property.deliveryDate
    }.
       </p>
        </div>
        <div class="unique-selling-points">`;

    for (let usp in property.uniqueSellingPoints) {
      let delay = (index * 0.1 + 0.6).toFixed(1);
      let secDelay = (index * 0.1 + 0.7).toFixed(1);
      content += `<div class="usp-title wow fadeInLeft" data-wow-delay="${delay}s"><strong>
        ${capitalizeFirstLetterAndAddSpace(usp)} </strong></div>
        <div style="text-indent:10px;" class="tertiary__color wow fadeInLeft" data-wow-delay="${secDelay}s">${
        property.uniqueSellingPoints[usp]
      }</div>`;
      index++;
    }

    content += `</div></div>`;

    container.innerHTML = content;
  }
  /**
   * This asynchronous function waits for all images on the webpage to load.
   */
  async function waitForImagesToLoad() {
    const images = document.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            })
      )
    );
  }

  /**
   * This function sets up the gallery interaction.
   * It adds an 'active' class to an image when the mouse hovers over it.
   * It removes the 'active' class from all images when the mouse leaves the gallery.
   */
  function setupGalleryInteraction() {
    const galleryImages = document.querySelectorAll(".gallery__container-img");
    let activeTimeout;
    galleryImages.forEach((img) => {
      img.addEventListener("mouseover", function () {
        clearTimeout(activeTimeout);
        activeTimeout = setTimeout(() => {
          removeActiveClasses(galleryImages);
          img.classList.add("active");
        }, 150);
      });
    });

    document
      .querySelector(".details__gallery")
      .addEventListener("mouseleave", function () {
        removeActiveClasses(galleryImages);
        clearTimeout(activeTimeout);
        galleryImages[0].classList.add("active");
      });
  }

  /**
   * This function removes the 'active' class from all elements in a given list.
   * @param {NodeList} elements - The list of elements.
   */
  function removeActiveClasses(elements) {
    elements.forEach((img) => img.classList.remove("active"));
  }

  /**
   * This function capitalizes the first letter of a string.
   * @param {string} string - The string to capitalize.
   * @returns {string} The string with the first letter capitalized.
   */
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function capitalizeFirstLetterAndAddSpace(string) {
    return string
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(/^./, (str) => str.toUpperCase());
  }

  displayPropertyDetails();
});
