export class HTMLAdder {
  constructor(elementId) {
    this.elementId = elementId;
  }

  clearHTML() {
    const element = document.getElementById(this.elementId);
    element.innerHTML = "";
  }

  addHtml(htmlContent) {
    const element = document.getElementById(this.elementId);

    if (element) {
      element.innerHTML += htmlContent;
    } else {
      console.error(`Element with ID '${this.elementId}' not found.`);
    }
  }
}
