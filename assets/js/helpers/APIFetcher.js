export class APIFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchData() {
    try {
      const response = await fetch(this.apiUrl);

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching API:", error);
      throw error;
    }
  }
}
