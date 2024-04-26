$(document).ready(async function () {
  let properties = [];
  async function displayPropertiesAsync() {
    try {
      const response = await fetch("data/dummy.json");
      properties = await response.json();
      console.log(properties);
    } catch (error) {
      console.error("Failed to load properties data:", error);
    }
  }
  await displayPropertiesAsync();
  const itemsPerPage = 9;
  let activeType = "chalet";

  function displayProperties(propertiesToDisplay) {
    const container = $("#data-container");
    container.empty();

    propertiesToDisplay.forEach(function (property, index) {
      const delay = (index + 1) * 0.2;
      // <div class="col-lg-4 col-md-6">
      const cardTemplate = `
     
      <div class=" col-xl-4 col-lg-6 col-md-6">
      
        <div class="compound-card property-item rounded overflow-hidden wow fadeInUp" data-wow-delay="${delay}s">
          <div class="position-relative overflow-hidden">
            <a href="details.html?id=1"><img class="img-fluid" src="${property.image}" alt="${
        property.title
      }"></a>
            <div class="row gap-2 text-white position-absolute end-0 top-0 m-2 py-1 px-1">
            <a class="compound-card_link" href="">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 22 18" fill="none">
                    <path
                        d="M11.1638 4.00635C11.908 4.67805 12.6619 5.34115 13.4061 6.01286C15.2716 7.68351 17.137 9.34556 18.9831 11.0248C19.1474 11.1798 19.2731 11.4382 19.2731 11.6535C19.2924 13.4016 19.2924 15.1498 19.2827 16.9066C19.2827 17.7161 18.9638 18.0002 18.0649 18.0002C13.4448 18.0002 8.82472 18.0002 4.20464 18.0002C3.29609 18.0002 2.98679 17.7247 2.98679 16.9152C2.98679 15.1498 2.97713 13.3844 2.99646 11.619C2.99646 11.4554 3.06411 11.2401 3.18977 11.1282C5.78977 8.77719 8.40911 6.44344 11.0188 4.10969C11.0574 4.06663 11.0961 4.04941 11.1638 4.00635ZM17.9489 16.8291C17.9682 16.7602 17.9876 16.7257 17.9876 16.6827C17.9876 15.1067 17.9972 13.5308 17.9876 11.9549C17.9876 11.8085 17.8619 11.6363 17.7363 11.5243C15.6485 9.63835 13.5415 7.76102 11.4441 5.88368C11.3667 5.81479 11.2604 5.76312 11.1444 5.677C11.1444 9.43167 11.1444 13.1174 11.1444 16.8377C13.4255 16.8291 15.6679 16.8291 17.9489 16.8291Z"
                        fill="#fff"></path>
                    <path
                        d="M11.0815 2.02401C9.47702 3.43632 7.94988 4.77112 6.42273 6.11453C5.15656 7.23405 3.90005 8.37078 2.64354 9.49891C2.31492 9.7917 1.91863 9.89504 1.50302 9.7142C1.1164 9.55057 0.913427 9.24917 1.00042 8.87026C1.04874 8.67219 1.17439 8.46551 1.33871 8.31911C4.306 5.64951 7.28296 2.9799 10.2696 0.31891C10.7625 -0.120283 11.2651 -0.10306 11.7774 0.353356C14.7254 2.98851 17.6637 5.62367 20.602 8.25883C21.1142 8.71525 21.1529 9.20611 20.7276 9.57641C20.312 9.9381 19.7901 9.89504 19.2875 9.43862C16.6584 7.08765 14.0391 4.73667 11.4198 2.3857C11.2845 2.27375 11.1878 2.14457 11.0815 2.02401Z"
                        fill="#fff"></path>
                </svg>
            </a>
            <a class="compound-card_link" href="">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.75 5.75001L14.75 1.25001M14.75 1.25001H10.25M14.75 1.25001L8 8M6.5 1.25H4.85C3.58988 1.25 2.95982 1.25 2.47852 1.49524C2.05516 1.71095 1.71095 2.05516 1.49524 2.47852C1.25 2.95982 1.25 3.58988 1.25 4.85V11.15C1.25 12.4101 1.25 13.0402 1.49524 13.5215C1.71095 13.9448 2.05516 14.289 2.47852 14.5048C2.95982 14.75 3.58988 14.75 4.85 14.75H11.15C12.4101 14.75 13.0402 14.75 13.5215 14.5048C13.9448 14.289 14.289 13.9448 14.5048 13.5215C14.75 13.0402 14.75 12.4101 14.75 11.15V9.5"
                        stroke="white" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                </svg>
            </a>
            <a class="compound-card_link" href="">
                <svg width="26" height="27" viewBox="0 0 24 24" fill="transparent" stroke="#fff"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                        stroke="#fff" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                </svg>
            </a>
        </div>
        <div class="position-absolute start-0 bottom-0 mb-3 mx-2 pt-1 px-2">
            <a href="">
              <img src="img/medium.webp" alt="medium.webp"
                class="rounded-circle compound-card_dev ">
            </a>
          </div>
          </div>
          <div class="p-2 pb-0">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h5 class="primary__color mb-1 text-capitalize">
               <a class="primary__color" href="details.html?id=1">
                ${property.title}
              
               </h5> </a>  
                <p class="mb-1 tertiary__color "><i class="fa fa-map-marker-alt primary__color me-2"></i>${
                  property.location
                }</p>
              </div>
            </div>
            <div class="compound-card_info my-2 d-flex gap-2 tertiary__color">
              ${property.unitCount
                .map(
                  (unit) =>
                    `<span class="unit-count">${unit.count} ${unit.label}</span>`
                )
                .join("")}
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex flex-column">
                <div style="font-size: 12px;" class="tertiary__color">
                  <span>${property.price.monthly.toLocaleString()} Monthly</span><span> / ${
        property.price.term
      } Years</span>
                </div>
                <div class="d-flex align-items-center mb-3 primary__color" style="font-size: 28px; font-weight: bold;">
                  <span class="text-capitalize">${property.price.total.toLocaleString()} ${
        property.price.currency
      }</span>
                </div>
              </div>
              <div class="d-flex gap-2 ">
              <span class="icon">
                <svg width="20" height="24" viewBox="0 0 20 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.9916 23.1503C11.6689 22.833 10.6491 22.0956 9.6153 21.4101C6.01017 19.0332 3.69298 15.6832 1.9997 11.8505C1.30065 10.2708 0.664128 8.67073 0.483049 6.93276C0.310435 5.23418 0.634775 3.66876 1.67369 2.27625C2.26536 1.48795 3.0591 0.93945 3.94077 0.48877C4.35689 0.284657 4.83308 0.282295 5.28143 0.383865C5.6009 0.469466 5.91109 0.589712 6.23056 0.675314C6.80779 0.792851 7.02597 1.18549 7.10052 1.68817C7.31955 3.21353 7.55633 4.74364 7.73986 6.25949C7.76826 6.50845 7.65304 6.86745 7.47775 7.0247C6.95187 7.49645 6.39513 7.94137 5.7898 8.3547C5.18446 8.76802 5.11183 8.89709 5.30435 9.59846C6.25246 12.8044 8.06148 15.4242 10.8163 17.4248C11.2622 17.7485 11.5424 17.7678 12.0041 17.4646C12.6766 17.0135 13.336 16.5404 13.9777 16.0626C14.5429 15.657 14.8014 15.6149 15.3661 16.0633C16.3365 16.8431 17.28 17.6529 18.2411 18.4674C18.5366 18.7137 18.8544 18.9473 19.0827 19.2313C19.2099 19.3953 19.3047 19.6807 19.276 19.8586C18.9162 21.4145 18.1066 22.59 16.4416 23.0536C15.2806 23.4108 14.1136 23.5066 12.9916 23.1503Z"
                    fill="#1E4164"></path>
                </svg>
              </span>

              <span class="icon">
                <svg width="23" height="23" viewBox="0 0 29 29" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 28.9956C0.146704 28.4728 0.268957 27.9986 0.403435 27.5244C0.929124 25.6277 1.44259 23.7188 1.9805 21.822C2.0294 21.6396 2.00495 21.4816 1.91937 21.3235C0.892448 19.4876 0.305633 17.53 0.171154 15.4387C-0.122253 11.171 1.22253 7.48694 4.18106 4.41079C6.51609 1.97906 9.38904 0.556491 12.7388 0.118779C18.6558 -0.647218 24.4751 2.34382 27.2869 7.58421C28.3016 9.4688 28.8517 11.4871 28.974 13.6271C29.3774 20.8372 24.2428 27.2813 17.0665 28.5458C13.8635 29.1051 10.8194 28.6309 7.92201 27.1597C7.7264 27.0624 7.55524 27.0381 7.33519 27.0989C5.03683 27.7068 2.73847 28.3026 0.452337 28.8984C0.330084 28.9227 0.195605 28.947 0 28.9956ZM3.45976 25.5791C3.59424 25.5547 3.67982 25.5426 3.75317 25.5183C5.06128 25.1778 6.36939 24.8374 7.6775 24.4969C7.90978 24.4361 8.09316 24.4605 8.30099 24.5942C9.97586 25.6155 11.7852 26.187 13.7413 26.3207C16.1496 26.4788 18.4113 25.9681 20.5019 24.7644C24.7563 22.3327 27.1035 17.603 26.4311 12.7881C26.0399 9.99163 24.8052 7.59637 22.7146 5.6753C19.9395 3.13413 16.6387 2.10064 12.9099 2.58699C10.0492 2.95175 7.6286 4.22841 5.697 6.35618C3.06855 9.26211 2.10275 12.6787 2.73847 16.533C3.00743 18.1379 3.63092 19.597 4.51114 20.9588C4.62117 21.1168 4.64562 21.2749 4.58449 21.4573C4.45002 21.9071 4.32776 22.357 4.20551 22.8069C3.97323 23.7066 3.72872 24.6064 3.45976 25.5791Z"
                    fill="white"></path>
                  <path
                    d="M18.3747 21.2864C17.47 21.3107 16.6876 21.0068 15.9052 20.7393C13.1789 19.8152 11.1129 18.0279 9.36464 15.815C8.64335 14.9031 7.95873 13.9669 7.54307 12.8605C7.13964 11.7783 7.07851 10.6962 7.5064 9.60193C7.7509 8.98184 8.16656 8.48333 8.65558 8.03346C8.88786 7.82676 9.19349 7.74165 9.49912 7.72949C9.71918 7.72949 9.93923 7.75381 10.1593 7.75381C10.5505 7.72949 10.7583 7.94835 10.8928 8.26447C11.2962 9.22501 11.7119 10.1855 12.0909 11.1461C12.152 11.3041 12.1398 11.5595 12.0542 11.6932C11.7975 12.0945 11.5163 12.4835 11.1984 12.8605C10.8806 13.2374 10.8561 13.3346 11.1006 13.7602C12.262 15.6934 13.8758 17.0917 15.9908 17.9185C16.3331 18.0522 16.5165 18.0157 16.761 17.7361C17.1155 17.3227 17.4578 16.8971 17.7879 16.4716C18.0813 16.1068 18.2402 16.0339 18.6803 16.2284C19.4383 16.5689 20.1841 16.9336 20.942 17.2984C21.1743 17.4078 21.4188 17.5051 21.6144 17.651C21.7244 17.7361 21.8345 17.9063 21.8467 18.0279C21.8834 19.11 21.5655 20.0219 20.5753 20.6177C19.8906 21.0554 19.1571 21.3229 18.3747 21.2864Z"
                    fill="white"></path>
                </svg>
              </span>
            </div>
            </div>
          </div>
        </div>
      </div>`;
      container.append(cardTemplate);
      translatePage();
    });
  }


  function updateActiveTypeAndDisplay(element) {
    activeType = element.getAttribute("data-type");

    const filteredProperties = properties.filter(
      (property) => property.type === activeType
    );

    let activeTypeText =
      activeType.charAt(0).toUpperCase() + activeType.slice(1);

    $(".active-type").text(activeTypeText);
    let activeTypeLength = filteredProperties.length;
    $("#active-type__result-number").text(activeTypeLength);
    setupPagination(filteredProperties);
  }

  function setupPagination(filteredProperties) {
    $("#pagination-container").pagination({
      dataSource: filteredProperties,
      pageSize: itemsPerPage,
      autoHidePrevious: true,
      autoHideNext: true,
      callback: function (data, pagination) {
        displayProperties(data);
      },
    });
  }
  const initialFilteredProperties = properties.filter(
    (property) => property.type === activeType
  );
  $(".active-type").text(
    activeType.charAt(0).toUpperCase() + activeType.slice(1)
  );
  $("#active-type__result-number").text(initialFilteredProperties.length);
  setupPagination(initialFilteredProperties);
  $(".category__type").removeClass("active");
  $('.category__type[data-type="chalet"]').addClass("active");

  const categoryTypes = document.querySelectorAll(".category__type");
  categoryTypes.forEach(function (element) {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      $(".category__type").removeClass("active");
      this.classList.add("active");
      updateActiveTypeAndDisplay(this);
    });
  });
});
