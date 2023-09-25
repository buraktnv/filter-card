import { APIFetcher } from "./APIFetcher.js";
import { HTMLAdder } from "./HTMLAdder.js";

export class Init {
  static URL = "https://api.spaceflightnewsapi.net/v4/articles/?limit=100";
  
  constructor (filter) {
    this.spaceNews = [];
    this.filter = filter;
  }

  async init() {
    await this.fetchSpaceNewsAPI();
    this.initSelectOptions(this.spaceNews);
    this.initNews(this.spaceNews);
    this.initEventListeners(this.filter);
  }

  async fetchSpaceNewsAPI() {
    try {
      const fetcher = new APIFetcher(Init.URL);
      const fetchedData = await fetcher.fetchData();
      const spaceNews = fetchedData.results;
      this.spaceNews = spaceNews;
    } catch (error) {
      console.error(error);
    }
  }

  initSelectOptions(spaceNews) {
    const news_sites = [...new Set(spaceNews.map((x) => x.news_site))];
    const newsSiteSelect = new HTMLAdder("filter-news-site");

    news_sites.forEach((newsSiteName) => {
      const optionContent = `<option value="${newsSiteName}">${newsSiteName}</option>`;
      newsSiteSelect.addHtml(optionContent);
    });
  }

  initNews(spaceNews) {
    const spaceNewsList = new HTMLAdder("news-list");
    spaceNews.forEach((el) => {
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

  initEventListeners(filter) {
    let searchFilterValue = "";
    let selectFilterValue = "";

    document
      .getElementById("new-search")
      .addEventListener("keyup", function (e) {
        searchFilterValue = e.target.value;
        filter(searchFilterValue, selectFilterValue);
      });

    document
      .getElementById("filter-news-site")
      .addEventListener("change", function (e) {
        selectFilterValue = e.target.value;
        filter(searchFilterValue, selectFilterValue);
      });
  }
}
