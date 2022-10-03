console.log("Welcome to my news");

let accordionNews = document.getElementById("accordionNews");

let apiKey = "b06056e82b624cfa9a2f7d9cf1983b34";
let source = "bbc-news";

let xhr = new XMLHttpRequest();

xhr.open(
  "GET",
  `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`,
  true
);

xhr.onload = function () {
  // console.log(xhr.responseText);
  if (this.status === 200) {
    let json = JSON.parse(xhr.responseText);
    let articles = json.articles; 
    // console.log(articles);
    let newsHtml = "";
    articles.forEach((element, index) => {
      newsHtml += `
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-heading${index}">
                                <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapse${index}"
                                aria-expanded="false"
                                aria-controls="flush-collapse${index}"
                                >
                                <b>Breaking News ${index+1}: </b> ${element["title"]}
                                </button>
                            </h2>
                            <div
                                id="flush-collapse${index}"
                                class="accordion-collapse collapse"
                                aria-labelledby="flush-heading${index}"
                                data-bs-parent="#accordionFlushExample"
                                >
                                <div class="accordion-body">
                                     ${element["content"]}, <a href="${element["url"]}" target='_blank'>Read more here</a>
                                </div>
                            </div>
                        </div>
            `;
    });
    accordionNews.innerHTML = newsHtml;
  }
};

xhr.send();
