import { HTMLAdder } from "./helpers/HTMLAdder.js";
import { Init } from "./helpers/Inits.js";

let newsData = [];
init();

async function init() {
  try {
    const initializer = new Init(filterNews);
    await initializer.init();
    newsData.push(...initializer.spaceNews);
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
}

function filterNews(searchFilterValue, selectFilterValue) {
  let filteredData = newsData;

  if (searchFilterValue) {
    filteredData = filteredData.filter((el) =>
      el.title.toLowerCase().includes(searchFilterValue.toLowerCase())
    );
  }

  if (selectFilterValue) {
    filteredData = filteredData.filter(
      (el) => el.news_site == selectFilterValue
    );
  }

  const spaceNewsList = new HTMLAdder("news-list");
  spaceNewsList.clearHTML();
  filteredData.forEach((el) => {
    const spaceNewsHTMLContent = `<li class="news__item">
          <img src="${el.image_url}" alt="${el.news_site}" class="news__image">
          <div class="news__details">
              <p class="news__title">${el.title}</p>
              <b class="news__site"> 
                ${el.news_site} 
              </b>
              <p class="news__summary">${el.summary}</p>
              <p class="news__publish-date">
              ${moment(el.published_at).fromNow()} 
              </p>
              <a href="${el.url}" class="news__url">Read more</a>
          </div>
       </li>`;
    spaceNewsList.addHtml(spaceNewsHTMLContent);
  });
}
