const baseUrl = "https://cold-well.onrender.com/cold-well/v1";
const imageUrl = "https://cold-well.onrender.com/uploads";

$(document).ready(async function () {
  async function fetchHomeTypeData() {
    const response = await fetch(`${baseUrl}${"/type/get-all"}`);
    //    / let jsonData = await response.json();
    if (!response.ok) {
      console.error("Error fetching data:", response.status);
      return null;
    }

    const container = document.getElementById("home-types");
    container.innerHTML = "";
    let jsonData = [
      {
        _id: {
          $oid: "662a0531dbb1f9f56a91b760",
        },
        name: {
          en: "Villa",
          ar: "فيلا",
        },
        image: ["img/icon-apartment.png"],
        description: {
          en: "this is villa ",
          ar: "هئه فيلااا",
        },
        properties: [
          {
            $oid: "662a7b6eacbd019812931119",
          },
        ],
        __v: 0,
      },
      {
        _id: {
          $oid: "662a0531dbb1f9f56a91b760",
        },
        name: {
          en: "Villa",
          ar: "فيلا",
        },
        image: ["img/icon-apartment.png"],
        description: {
          en: "this is villa ",
          ar: "هئه فيلااا",
        },
        properties: [
          {
            $oid: "662a7b6eacbd019812931119",
          },
        ],
        __v: 0,
      },
      {
        _id: {
          $oid: "662a0531dbb1f9f56a91b760",
        },
        name: {
          en: "Villa",
          ar: "فيلا",
        },
        image: ["img/icon-apartment.png"],
        description: {
          en: "this is villa ",
          ar: "هئه فيلااا",
        },
        properties: [
          {
            $oid: "662a7b6eacbd019812931119",
          },
        ],
        __v: 0,
      },
      {
        _id: {
          $oid: "662a0531dbb1f9f56a91b760",
        },
        name: {
          en: "Villa",
          ar: "فيلا",
        },
        image: ["img/icon-apartment.png"],
        description: {
          en: "this is villa ",
          ar: "هئه فيلااا",
        },
        properties: [
          {
            $oid: "662a7b6eacbd019812931119",
          },
        ],
        __v: 0,
      },
      {
        _id: {
          $oid: "662a0531dbb1f9f56a91b760",
        },
        name: {
          en: "Villa",
          ar: "فيلا",
        },
        image: ["img/icon-apartment.png"],
        description: {
          en: "this is villa ",
          ar: "هئه فيلااا",
        },
        properties: [
          {
            $oid: "662a7b6eacbd019812931119",
          },
        ],
        __v: 0,
      },
    ];
    const savedLocale = localStorage.getItem("locale");
    jsonData.map((item) => {
      const element = `
                    <div class="swiper-slide col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                             
                            <a class="cat-item d-block bg-light text-center rounded p-3" href="">
                                <div class="rounded p-4">
                                    <div class="icon mb-3">
                                        <img class="img-fluid" src="${item.image[0]}" alt="Icon">
                                    </div>
                                    <h6 localization-key=>${item.name[savedLocale]}</h6>
                                    <span>${item.properties.length} <span localization-key='Properties'>  Properties </span> </span>
                                </div>
                            </a>
                  
                        </div>
                      
                    `;
      container.innerHTML += element;
    });
  }
  fetchHomeTypeData();
});
