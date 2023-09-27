export class FormHandler {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
    this.checkboxData = {};
    this.handleCheckboxes();
    this.onChangeConsoleLog();
    this.updateSubmitButtonState();
  }

  handleCheckboxes() {
    const checkboxes = this.form.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        const { name, value, checked } = event.target;

        if (checked) {
          if (!this.checkboxData[name]) {
            this.checkboxData[name] = [];
          }
          this.checkboxData[name].push(value);
        } else {
          const valueIndex = this.checkboxData[name].indexOf(value);
          if (valueIndex > -1) {
            this.checkboxData[name].splice(valueIndex, 1);
          }
        }
        this.updateSubmitButtonState();
      });
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(this.form);
    const formDataObject = Object.fromEntries(formData);

    const combinedData = { ...formDataObject, ...this.checkboxData };

    console.log(combinedData);

    this.form.reset();

    this.checkboxData = {};
  }

  logFormData() {
    const formData = new FormData(this.form);
    const formDataObject = Object.fromEntries(formData);

    const combinedData = { ...formDataObject, ...this.checkboxData };

    console.log(combinedData);
  }

  onChangeConsoleLog() {
    const inputs = this.form.querySelectorAll("input");

    inputs.forEach((input) => {
      input.addEventListener("change", (event) => {
        console.log(
          `Something Changed in ${event.target.name}, ${event.target.value}`
        );
        this.updateSubmitButtonState();
        this.logFormData();
      });
    });
  }

  updateSubmitButtonState() {
    const submitButton = this.form.querySelector("button[type=submit]");
    const checkboxGroups = this.form.querySelectorAll(
      ".filter-card__input-group"
    );
    const locationInput = this.form.querySelector(".input.-location");

    const allGroupsChecked = Array.from(checkboxGroups).every((group) => {
      const checkboxes = group.querySelectorAll("input[type=checkbox]");
      return Array.from(checkboxes).some((checkbox) => checkbox.checked);
    });

    if (!allGroupsChecked || locationInput.value.trim() === "") {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  }
}
