"use strict";

import { locationData } from "./data/locationData";
import { redColor } from "./data/colors";
import { contrastColor } from "./data/colors";
import { textColor } from "./data/colors";
import { darkGreyColor } from "./data/colors";
import { numbers } from "./data/chars";
import { smallLetters } from "./data/chars";
import { capitalLetters } from "./data/chars";

// #region About Slider
// About Slider

const about = document.getElementById("about");
const aboutSliderNumber = about.querySelector(".about__slider-number");

const aboutSlides = about.querySelector(".slider__slides");
const aboutSliderPoints = about.querySelectorAll(".slider__point");

const aboutSliderUnderlines = about.querySelectorAll(".prev-next__underline");
const aboutPrevSlideBtn = about.querySelector(".prev-next__btn--prev");
const aboutNextSlideBtn = about.querySelector(".prev-next__btn--next");

let aboutTimerId = 0;

aboutSlides.addEventListener("scroll", () => {
  const aboutSlideWidth = aboutSlides.getBoundingClientRect().width;

  window.clearTimeout(aboutTimerId);
  aboutTimerId = window.setTimeout(() => {
    scrollSlider(aboutSlides, aboutSlideWidth, updateAboutSlider);
  }, 100);
});

aboutNextSlideBtn.addEventListener("click", () => {
  const aboutSlideWidth = aboutSlides.getBoundingClientRect().width;

  aboutSlides.scrollLeft += aboutSlideWidth;
});

aboutPrevSlideBtn.addEventListener("click", () => {
  const aboutSlideWidth = aboutSlides.getBoundingClientRect().width;

  aboutSlides.scrollLeft -= aboutSlideWidth;
});

function updateAboutSlider(slideIndex) {
  aboutPrevSlideBtn.disabled = slideIndex === 0;
  aboutNextSlideBtn.disabled = slideIndex === 4;
  aboutSliderNumber.textContent = `${slideIndex + 1}/5`;

  const activeUnderline = about.querySelector(".prev-next__underline--active");

  activeUnderline.classList.remove("prev-next__underline--active");
  aboutSliderUnderlines[slideIndex].classList.add(
    "prev-next__underline--active"
  );

  const activePoint = about.querySelector(".slider__point--active");

  activePoint.classList.remove("slider__point--active");
  aboutSliderPoints[slideIndex].classList.add("slider__point--active");
}

// #endregion

// #region Header Slider
// Header Slider

const header = document.querySelector(".header");

const headerSlides = header.querySelector(".slider__slides--header");
const headerSliderUnderlines = header.querySelectorAll(".prev-next__underline");
const headerPrevSlideBtn = header.querySelector(".prev-next__btn--prev");
const headerNextSlideBtn = header.querySelector(".prev-next__btn--next");

let headerTimerId = 0;

headerSlides.addEventListener("scroll", () => {
  const headerSlideWidth = headerSlides.getBoundingClientRect().width;

  window.clearTimeout(headerTimerId);
  headerTimerId = window.setTimeout(() => {
    scrollSlider(headerSlides, headerSlideWidth, updateHeaderSlider);
  }, 100);
});

headerNextSlideBtn.addEventListener("click", () => {
  const headerSlideWidth = headerSlides.getBoundingClientRect().width;

  headerSlides.scrollLeft += headerSlideWidth;
});

headerPrevSlideBtn.addEventListener("click", () => {
  const headerSlideWidth = headerSlides.getBoundingClientRect().width;

  headerSlides.scrollLeft -= headerSlideWidth;
});

function updateHeaderSlider(slideIndex) {
  headerPrevSlideBtn.disabled = slideIndex === 0;
  headerNextSlideBtn.disabled = slideIndex === 4;

  const activeUnderline = header.querySelector(".prev-next__underline--active");

  activeUnderline.classList.remove("prev-next__underline--active");
  headerSliderUnderlines[slideIndex].classList.add(
    "prev-next__underline--active"
  );
}

function scrollSlider(slides, slideWidth, updateSlider) {
  const scrollLeft = Math.round(slides.scrollLeft);

  switch (scrollLeft) {
    case 0:
      updateSlider(0);
      break;

    case slideWidth:
      updateSlider(1);
      break;

    case slideWidth * 2:
      updateSlider(2);
      break;

    case slideWidth * 3:
      updateSlider(3);
      break;

    case slideWidth * 4:
      updateSlider(4);
      break;

    default:
      break;
  }
}

// #endregion

// #region Scroll Buy Now Link
// Scroll Buy Now Link

const buyNowLink = document.querySelector(".page__buy-now");
const getInTouchSection = document.getElementById("contact");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const getInTouchTop = getInTouchSection.offsetTop;
  const windowHeight = window.innerHeight;

  if (scrollY > getInTouchTop - windowHeight) {
    buyNowLink.classList.add("page__buy-now--hidden");
  } else {
    buyNowLink.classList.remove("page__buy-now--hidden");
  }
});

// #endregion

// #region Tech Specs Buttons
// Tech Specs Buttons

const techSpecsImgWrapper = document.querySelector(".tech-specs__img-wrapper");
const techSpecsButtons =
  techSpecsImgWrapper.querySelectorAll(".tech-specs__btn");

techSpecsImgWrapper.addEventListener("click", (e) => {
  const pressedBtn = e.target.closest(".tech-specs__btn");

  if (!pressedBtn) {
    return;
  }

  pressedBtn.classList.toggle("tech-specs__btn--active");

  for (const techSpecsButton of techSpecsButtons) {
    if (techSpecsButton !== pressedBtn) {
      techSpecsButton.classList.remove("tech-specs__btn--active");
    }
  }
});

for (const techSpecsButton of techSpecsButtons) {
  techSpecsButton.addEventListener("blur", () => {
    if (techSpecsButton.classList.contains("tech-specs__btn--active")) {
      techSpecsButton.classList.remove("tech-specs__btn--active");
    }
  });
}

// #endregion

// #region Get In Touch / Form Validation
// Get In Touch / Form Validation

const form = document.querySelector(".form");

const nameLabel = form.querySelector(".form__label--name");
const nameInput = form.querySelector("#name-input");

const emailLabel = form.querySelector(".form__label--email");
const emailInput = form.querySelector("#email-input");

const phoneLabel = form.querySelector(".form__label--phone");
const phoneInput = form.querySelector("#phone-input");

let nameError = false;
let emailError = false;
let phoneError = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");

  if (!name.trim()) {
    nameError = true;
    nameLabel.textContent = "Please, fill your name*";
    setColor(nameLabel, redColor, nameInput, redColor);
  } else {
    const allowedChars = smallLetters + capitalLetters + numbers + "_- ";

    for (const char of name.trim()) {
      if (!allowedChars.includes(char)) {
        nameError = true;
        nameLabel.textContent = "Incorrect name format*";
        setColor(nameLabel, redColor, nameInput, redColor);

        break;
      }
    }
  }

  if (!email.trim()) {
    emailError = true;
    emailLabel.textContent = "Please, fill your email*";
    setColor(emailLabel, redColor, emailInput, redColor);
  } else {
    const allowedChars = smallLetters + capitalLetters + numbers + "@.";

    for (const char of email.trim()) {
      if (!allowedChars.includes(char)) {
        emailError = true;

        break;
      }
    }

    if (!email.includes("@")) {
      emailError = true;
    }

    if (emailError) {
      emailLabel.textContent = "Incorrect email format*";
      setColor(emailLabel, redColor, emailInput, redColor);
    }
  }

  const trimmedPhone = phone.trim();

  if (!trimmedPhone) {
    phoneError = true;
    phoneLabel.textContent = "Please, fill your phone*";
    setColor(phoneLabel, redColor, phoneInput, redColor);
  } else {
    const allowedChars = numbers + "+";

    for (let i = 0; i < trimmedPhone.length; i++) {
      const char = trimmedPhone[i];

      if (!allowedChars.includes(char) || (char === "+" && i !== 0)) {
        phoneError = true;
        phoneLabel.textContent = "Incorrect phone format*";
        setColor(phoneLabel, redColor, phoneInput, redColor);

        break;
      }
    }
  }

  if (nameError) {
    nameInput.focus();

    return;
  }

  if (emailError) {
    emailInput.focus();

    return;
  }

  if (phoneError) {
    phoneInput.focus();

    return;
  }

  form.reset();
});

nameInput.addEventListener("input", () => {
  nameError = false;
  nameLabel.textContent = "Name*";
  setColor(nameLabel, contrastColor, nameInput, contrastColor);
});

nameInput.addEventListener("blur", () => {
  if (!nameError) {
    setColor(nameLabel, textColor, nameInput, darkGreyColor);
  }
});

nameInput.addEventListener("focus", () => {
  if (!nameError) {
    setColor(nameLabel, contrastColor, nameInput, contrastColor);
  }
});

emailInput.addEventListener("input", () => {
  emailError = false;
  emailLabel.textContent = "Email*";
  setColor(emailLabel, contrastColor, emailInput, contrastColor);
});

emailInput.addEventListener("blur", () => {
  if (!emailError) {
    setColor(emailLabel, textColor, emailInput, darkGreyColor);
  }
});

emailInput.addEventListener("focus", () => {
  if (!emailError) {
    setColor(emailLabel, contrastColor, emailInput, contrastColor);
  }
});

phoneInput.addEventListener("input", () => {
  phoneError = false;
  phoneLabel.textContent = "Phone*";
  setColor(phoneLabel, contrastColor, phoneInput, contrastColor);
});

phoneInput.addEventListener("blur", () => {
  if (!phoneError) {
    setColor(phoneLabel, textColor, phoneInput, darkGreyColor);
  }
});

phoneInput.addEventListener("focus", () => {
  if (!phoneError) {
    setColor(phoneLabel, contrastColor, phoneInput, contrastColor);
  }
});

function setColor(label, labelColor, input, inputBorderColor) {
  label.style.color = labelColor;
  input.style.borderColor = inputBorderColor;
}

// #endregion

// #region Select Quantity
// Select Quantity

const orderPlaceAside = document.getElementById("order-place");
const orderPayAside = document.getElementById("order-pay");

const placePrice = orderPlaceAside.querySelector(".qty-price__price-value");
const placeQtyDropdown = orderPlaceAside.querySelector(".select-qty");
const placeQtyCurrValue = orderPlaceAside.querySelector(
  ".select-qty__current-value"
);
const placeQtyListWrapper = orderPlaceAside.querySelector(
  ".select-qty__list-wrapper"
);

const payPrice = orderPayAside.querySelector(".qty-price__price-value");
const payQtyDropdown = orderPayAside.querySelector(".select-qty");
const payQtyCurrValue = orderPayAside.querySelector(
  ".select-qty__current-value"
);
const payQtyListWrapper = orderPayAside.querySelector(
  ".select-qty__list-wrapper"
);

placeQtyDropdown.addEventListener("click", () => {
  placeQtyListWrapper.classList.toggle("select-qty__list-wrapper--visible");
});

payQtyDropdown.addEventListener("click", () => {
  payQtyListWrapper.classList.toggle("select-qty__list-wrapper--visible");
});

placeQtyListWrapper.addEventListener("click", (e) => {
  handleClickQuantityList(e);
});

payQtyListWrapper.addEventListener("click", (e) => {
  handleClickQuantityList(e);
});

function handleClickQuantityList(event) {
  const li = event.target.closest(".select-qty__item");

  if (!li) {
    return;
  }

  const liText = li.innerText;
  const selectedQty = +liText;

  placePrice.textContent = `${selectedQty * 1200}$`;
  payPrice.textContent = `${selectedQty * 1200}$`;

  placeQtyCurrValue.textContent = liText;
  payQtyCurrValue.textContent = liText;

  placeQtyCurrValue.classList.toggle(
    "select-qty__current-value--changed",
    li.innerText !== "1"
  );
  payQtyCurrValue.classList.toggle(
    "select-qty__current-value--changed",
    li.innerText !== "1"
  );

  placeQtyDropdown
    .querySelector(".select-qty__item--selected")
    .classList.remove("select-qty__item--selected");
  payQtyDropdown
    .querySelector(".select-qty__item--selected")
    .classList.remove("select-qty__item--selected");

  const placeNextSelectedLi = [
    ...placeQtyDropdown.querySelectorAll(".select-qty__item"),
  ].find((liItem) => liItem.innerText === liText);

  const payNextSelectedLi = [
    ...payQtyDropdown.querySelectorAll(".select-qty__item"),
  ].find((liItem) => liItem.innerText === liText);

  placeNextSelectedLi.classList.add("select-qty__item--selected");
  payNextSelectedLi.classList.add("select-qty__item--selected");
}

// #endregion

// #region Select Country
// Select Country

const countryDropdown = document.querySelector(".select--country");
const countryCurrValue = countryDropdown.querySelector(
  ".select__current-value"
);
const countriesListWrapper = countryDropdown.querySelector(
  ".select__list-wrapper"
);

const cityDropdown = document.querySelector(".select--city");
const cityCurrValue = cityDropdown.querySelector(".select__current-value");
const citiesListWrapper = cityDropdown.querySelector(".select__list-wrapper");

countryDropdown.addEventListener("click", () => {
  countriesListWrapper.classList.toggle("select__list-wrapper--visible");
});

countriesListWrapper.addEventListener("click", (e) => {
  handleClickCountriesList(e);
});

function handleClickCountriesList(event) {
  const li = event.target.closest(".select__item");

  if (!li) {
    return;
  }

  resetCityError();

  const liText = li.innerText;

  countryCurrValue.textContent = liText;

  const selectedLi = countryDropdown.querySelector(".select__item--selected");

  selectedLi.classList.remove("select__item--selected");
  li.classList.add("select__item--selected");

  const countries = Object.keys(locationData);
  const index = countries.indexOf(liText);
  const country = countries[index];
  const citiesOfSelectedCountry = locationData[country];
  const citiesList = cityDropdown.querySelector(".select__list");

  cityCurrValue.textContent = "";
  citiesList.innerHTML = `${citiesOfSelectedCountry
    .map((city) => {
      return `<li class="select__item">${city}</li>`;
    })
    .join("")}`;
}

// #endregion

// #region Select City
// Select City

cityDropdown.addEventListener("click", () => {
  citiesListWrapper.classList.toggle("select__list-wrapper--visible");
});

citiesListWrapper.addEventListener("click", (e) => {
  handleClickCitiesList(e, cityDropdown, cityCurrValue);
});

function handleClickCitiesList(event) {
  const li = event.target.closest(".select__item");

  if (!li) {
    return;
  }

  resetCityError();

  cityCurrValue.textContent = li.innerText;

  const selectedLi = cityDropdown.querySelector(".select__item--selected");

  li.classList.add("select__item--selected");

  if (!selectedLi) {
    return;
  }

  selectedLi.classList.remove("select__item--selected");
}

document.addEventListener("click", (e) => {
  handleClickOutsideDropdownList(
    e,
    ".select-qty",
    placeQtyListWrapper,
    "select-qty__list-wrapper--visible"
  );
  handleClickOutsideDropdownList(
    e,
    ".select-qty",
    payQtyListWrapper,
    "select-qty__list-wrapper--visible"
  );

  handleClickOutsideDropdownList(
    e,
    ".select--country",
    countriesListWrapper,
    "select__list-wrapper--visible"
  );

  handleClickOutsideDropdownList(
    e,
    ".select--city",
    citiesListWrapper,
    "select__list-wrapper--visible"
  );
});

function handleClickOutsideDropdownList(
  event,
  selector,
  dropdownList,
  className
) {
  if (
    !event.target.closest(selector) &&
    dropdownList.classList.contains(className)
  ) {
    dropdownList.classList.remove(className);
  }
}

// #endregion

// #region Place Order / Form Validation
// Place Order / Form Validation

const placeOrderPurchaseBtn = orderPlaceAside.querySelector(
  ".form-place__purchase-btn"
);

const firstNameLabel = orderPlaceAside.querySelector(
  ".form-place__label--first-name"
);
const firstNameInput = orderPlaceAside.querySelector("#input-first-name");

const lastNameLabel = orderPlaceAside.querySelector(
  ".form-place__label--last-name"
);
const lastNameInput = orderPlaceAside.querySelector("#input-last-name");

const orderEmailLabel = orderPlaceAside.querySelector(
  ".form-place__label--email"
);
const orderEmailInput = orderPlaceAside.querySelector("#input-order-email");

const orderPhoneLabel = orderPlaceAside.querySelector(
  ".form-place__label--phone"
);
const orderPhoneInput = orderPlaceAside.querySelector("#input-order-phone");

const cityLabel = orderPlaceAside.querySelector(
  ".form-place__select-name--city"
);

const addressLabel = orderPlaceAside.querySelector(
  ".form-place__label--address"
);
const addressInput = orderPlaceAside.querySelector("#input-shipping-address");

let firstNameError = false;
let lastNameError = false;
let orderEmailError = false;
let orderPhoneError = false;
let cityError = false;
let addressError = false;

function resetCityError() {
  cityError = false;
  cityLabel.textContent = "City*";
  cityLabel.style.color = textColor;
}

placeOrderPurchaseBtn.addEventListener("click", (e) => {
  const firstNameValue = firstNameInput.value.trim();
  const lastNameValue = lastNameInput.value.trim();
  const orderEmailValue = orderEmailInput.value.trim();
  const orderPhoneValue = orderPhoneInput.value.trim();
  const cityTextValue = cityCurrValue.innerText;
  const addressValue = addressInput.value.trim();

  if (!firstNameValue) {
    firstNameError = true;
    firstNameLabel.textContent = "Please, fill your first name*";
  } else {
    const allowedChars = smallLetters + capitalLetters + "-";

    for (const ch of firstNameValue) {
      if (!allowedChars.includes(ch)) {
        firstNameError = true;
        firstNameLabel.textContent = "Incorrect first name format*";

        break;
      }
    }
  }

  if (firstNameError) {
    setColor(firstNameLabel, redColor, firstNameInput, redColor);
  }

  if (!lastNameValue) {
    lastNameError = true;
    lastNameLabel.textContent = "Please, fill your last name*";
  } else {
    const allowedChars = smallLetters + capitalLetters + "-";

    for (const ch of lastNameValue) {
      if (!allowedChars.includes(ch)) {
        lastNameError = true;
        lastNameLabel.textContent = "Incorrect last name format*";

        break;
      }
    }
  }

  if (lastNameError) {
    setColor(lastNameLabel, redColor, lastNameInput, redColor);
  }

  if (!orderEmailValue) {
    orderEmailError = true;
    orderEmailLabel.textContent = "Please, fill your email*";
    setColor(orderEmailLabel, redColor, orderEmailInput, redColor);
  } else {
    const allowedChars = smallLetters + capitalLetters + numbers + "@.";

    for (const char of orderEmailValue) {
      if (!allowedChars.includes(char)) {
        orderEmailError = true;

        break;
      }
    }

    if (!orderEmailValue.includes("@")) {
      orderEmailError = true;
    }

    if (orderEmailError) {
      orderEmailLabel.textContent = "Incorrect email format*";
      setColor(orderEmailLabel, redColor, orderEmailInput, redColor);
    }
  }

  if (!orderPhoneValue) {
    orderPhoneError = true;
    orderPhoneLabel.textContent = "Please, fill your phone*";
  } else {
    const allowedChars = numbers + "+";

    for (let i = 0; i < orderPhoneValue.length; i++) {
      const char = orderPhoneValue[i];

      if (!allowedChars.includes(char) || (char === "+" && i !== 0)) {
        orderPhoneError = true;
        orderPhoneLabel.textContent = "Incorrect phone format*";

        break;
      }
    }
  }

  if (orderPhoneError) {
    setColor(orderPhoneLabel, redColor, orderPhoneInput, redColor);
  }

  if (!cityTextValue) {
    cityError = true;
    cityLabel.textContent = "Please, select your city*";
    cityLabel.style.color = redColor;
  }

  if (!addressValue) {
    addressError = true;
    addressLabel.textContent = "Please, fill your address*";
    setColor(addressLabel, redColor, addressInput, redColor);
  }

  if (firstNameError) {
    firstNameInput.focus();
    e.preventDefault();

    return;
  }

  if (lastNameError) {
    lastNameInput.focus();
    e.preventDefault();

    return;
  }

  if (orderEmailError) {
    orderEmailInput.focus();
    e.preventDefault();

    return;
  }

  if (orderPhoneError) {
    orderPhoneInput.focus();
    e.preventDefault();

    return;
  }

  if (cityError) {
    e.preventDefault();

    return;
  }

  if (addressError) {
    addressInput.focus();
    e.preventDefault();
  }
});

firstNameInput.addEventListener("input", () => {
  firstNameError = false;
  firstNameLabel.textContent = "First Name*";
  setColor(firstNameLabel, contrastColor, firstNameInput, contrastColor);
});

firstNameInput.addEventListener("blur", () => {
  if (!firstNameError) {
    setColor(firstNameLabel, textColor, firstNameInput, darkGreyColor);
  }
});

firstNameInput.addEventListener("focus", () => {
  if (!firstNameError) {
    setColor(firstNameLabel, contrastColor, firstNameInput, contrastColor);
  }
});

lastNameInput.addEventListener("input", () => {
  lastNameError = false;
  lastNameLabel.textContent = "Last Name*";
  setColor(lastNameLabel, contrastColor, lastNameInput, contrastColor);
});

lastNameInput.addEventListener("blur", () => {
  if (!lastNameError) {
    setColor(lastNameLabel, textColor, lastNameInput, darkGreyColor);
  }
});

lastNameInput.addEventListener("focus", () => {
  if (!lastNameError) {
    setColor(lastNameLabel, contrastColor, lastNameInput, contrastColor);
  }
});

orderEmailInput.addEventListener("input", () => {
  orderEmailError = false;
  orderEmailLabel.textContent = "Email*";
  setColor(orderEmailLabel, contrastColor, orderEmailInput, contrastColor);
});

orderEmailInput.addEventListener("blur", () => {
  if (!orderEmailError) {
    setColor(orderEmailLabel, textColor, orderEmailInput, darkGreyColor);
  }
});

orderEmailInput.addEventListener("focus", () => {
  if (!orderEmailError) {
    setColor(orderEmailLabel, contrastColor, orderEmailInput, contrastColor);
  }
});

orderPhoneInput.addEventListener("input", () => {
  orderPhoneError = false;
  orderPhoneLabel.textContent = "Phone Number*";
  setColor(orderPhoneLabel, contrastColor, orderPhoneInput, contrastColor);
});

orderPhoneInput.addEventListener("blur", () => {
  if (!orderPhoneError) {
    setColor(orderPhoneLabel, textColor, orderPhoneInput, darkGreyColor);
  }
});

orderPhoneInput.addEventListener("focus", () => {
  if (!orderPhoneError) {
    setColor(orderPhoneLabel, contrastColor, orderPhoneInput, contrastColor);
  }
});

addressInput.addEventListener("input", () => {
  addressError = false;
  addressLabel.textContent = "Shipping Address*";
  setColor(addressLabel, contrastColor, addressInput, contrastColor);
});

addressInput.addEventListener("blur", () => {
  if (!addressError) {
    setColor(addressLabel, textColor, addressInput, darkGreyColor);
  }
});

addressInput.addEventListener("focus", () => {
  if (!addressError) {
    setColor(addressLabel, contrastColor, addressInput, contrastColor);
  }
});

// #endregion

// #region Pay Order / Form Validation
// Pay Order / Form Validation

const payOrderPurchaseBtn = orderPayAside.querySelector(
  ".form-pay__purchase-btn"
);

const cardNumLabel = orderPayAside.querySelector(".form-pay__label--card-num");
const cardNumInputs = orderPayAside.querySelectorAll(
  ".form-pay__input--card-num"
);

const cardHolderLabel = orderPayAside.querySelector(".form-pay__label--holder");
const cardHolderInput = orderPayAside.querySelector(".form-pay__input--holder");

const dateLabel = orderPayAside.querySelector(".form-pay__label--date");
const dateInput = orderPayAside.querySelector(".form-pay__input--date");

const cvvLabel = orderPayAside.querySelector(".form-pay__label--cvv");
const cvvInput = orderPayAside.querySelector(".form-pay__input--cvv");

let cardNumError = false;
let cardHolderError = false;
let dateError = false;
let cvvError = false;

payOrderPurchaseBtn.addEventListener("click", (e) => {
  for (const cardNumInput of cardNumInputs) {
    if (cardNumInput.value.length < 4) {
      cardNumError = true;
      cardNumLabel.textContent = "Please, enter the card number*";
      cardNumLabel.style.color = redColor;

      break;
    }
  }

  const cardHolderName = cardHolderInput.value.trim();

  if (!cardHolderName) {
    cardHolderError = true;
    cardHolderLabel.textContent = "Please, enter the card holder's name*";
  } else {
    const allowedChars = smallLetters + capitalLetters + numbers + "_- ";

    for (const char of cardHolderName) {
      if (!allowedChars.includes(char)) {
        cardHolderError = true;
        cardHolderLabel.textContent = "Incorrect name format*";

        break;
      }
    }
  }

  if (cardHolderError) {
    setColor(cardHolderLabel, redColor, cardHolderInput, redColor);
  }

  const expirationDate = dateInput.value.trim();
  const slashIndex = expirationDate.indexOf("/");
  const month = +expirationDate.slice(0, slashIndex);
  const year = +expirationDate.slice(slashIndex + 1);

  if (!expirationDate || expirationDate === "/") {
    dateError = true;
    dateLabel.textContent = "Enter the date*";
  } else if (isNaN(year) || isNaN(month) || !expirationDate.includes("/")) {
    dateError = true;
    dateLabel.textContent = "Incorrect date*";
  } else if (month < 1 || month > 12) {
    dateError = true;
    dateLabel.textContent = "Incorrect month*";
  } else if (year < 24 || year > 99) {
    dateError = true;
    dateLabel.textContent = "Incorrect year*";
  }

  if (dateError) {
    setColor(dateLabel, redColor, dateInput, redColor);
  }

  if (cvvInput.value.length < 3) {
    cvvError = true;
    cvvLabel.textContent = "Enter CVV*";
    setColor(cvvLabel, redColor, cvvInput, redColor);
  }

  if (cardNumError) {
    e.preventDefault();
    cardNumInputs[0].focus();

    return;
  }

  if (cardHolderError) {
    e.preventDefault();
    cardHolderInput.focus();

    return;
  }

  if (dateError) {
    e.preventDefault();
    dateInput.focus();

    return;
  }

  if (cvvError) {
    e.preventDefault();
    cvvInput.focus();

    return;
  }

  resetOrderData();
});

const cardNumInput1 = cardNumInputs[0];
const cardNumInput2 = cardNumInputs[1];
const cardNumInput3 = cardNumInputs[2];
const cardNumInput4 = cardNumInputs[3];

let prevValueCardNum1 = "";
let prevValueCardNum2 = "";
let prevValueCardNum3 = "";
let prevValueCardNum4 = "";

cardNumInput1.addEventListener("input", () => {
  handleInputCardNum(cardNumInput1, prevValueCardNum1);

  prevValueCardNum1 = cardNumInput1.value;
});

cardNumInput2.addEventListener("input", () => {
  handleInputCardNum(cardNumInput2, prevValueCardNum2);

  prevValueCardNum2 = cardNumInput2.value;
});

cardNumInput3.addEventListener("input", () => {
  handleInputCardNum(cardNumInput3, prevValueCardNum3);

  prevValueCardNum3 = cardNumInput3.value;
});

cardNumInput4.addEventListener("input", () => {
  handleInputCardNum(cardNumInput4, prevValueCardNum4);

  prevValueCardNum4 = cardNumInput4.value;
});

function handleInputCardNum(cardNumInput, prevValueCardNum) {
  for (const ch of cardNumInput.value) {
    if (!numbers.includes(ch)) {
      cardNumInput.value = prevValueCardNum;

      break;
    }
  }

  if (cardNumInput.value !== prevValueCardNum) {
    cardNumError = false;
    cardNumLabel.textContent = "Card Number*";
    setColor(cardNumLabel, contrastColor, cardNumInput, contrastColor);
  }
}

for (const cardNumInput of cardNumInputs) {
  cardNumInput.addEventListener("blur", () => {
    if (!cardNumError) {
      setColor(cardNumLabel, textColor, cardNumInput, darkGreyColor);
    } else {
      cardNumInput.style.borderColor = darkGreyColor;
    }
  });
}

for (const cardNumInput of cardNumInputs) {
  cardNumInput.addEventListener("focus", () => {
    if (!cardNumError) {
      setColor(cardNumLabel, contrastColor, cardNumInput, contrastColor);
    } else {
      cardNumInput.style.borderColor = redColor;
    }
  });
}

cardHolderInput.addEventListener("input", () => {
  cardHolderError = false;
  cardHolderLabel.textContent = "Card Holder Name*";
  setColor(cardHolderLabel, contrastColor, cardHolderInput, contrastColor);
});

cardHolderInput.addEventListener("blur", () => {
  if (!cardHolderError) {
    setColor(cardHolderLabel, textColor, cardHolderInput, darkGreyColor);
  }
});

cardHolderInput.addEventListener("focus", () => {
  if (!cardHolderError) {
    setColor(cardHolderLabel, contrastColor, cardHolderInput, contrastColor);
  }
});

let prevDateValue = "";

dateInput.addEventListener("input", () => {
  const dateValue = dateInput.value;

  if (
    dateValue.length === 2 &&
    prevDateValue.length === 1 &&
    !dateValue.includes("/")
  ) {
    dateInput.value += "/";
  }

  const dateWithoutSlash = dateValue.includes("/")
    ? dateValue.replace("/", "")
    : dateValue;

  for (const ch of dateWithoutSlash) {
    if (!numbers.includes(ch)) {
      dateInput.value = prevDateValue;

      break;
    }
  }

  if (dateInput.value !== prevDateValue) {
    dateError = false;
    dateLabel.textContent = "Expiration Date*";
    setColor(dateLabel, contrastColor, dateInput, contrastColor);
  }

  prevDateValue = dateInput.value;
});

dateInput.addEventListener("blur", () => {
  if (!dateError) {
    setColor(dateLabel, textColor, dateInput, darkGreyColor);
  }
});

dateInput.addEventListener("focus", () => {
  if (!dateError) {
    setColor(dateLabel, contrastColor, dateInput, contrastColor);
  }
});

let prevCvvValue = "";

cvvInput.addEventListener("input", () => {
  for (const ch of cvvInput.value) {
    if (!numbers.includes(ch)) {
      cvvInput.value = prevCvvValue;

      break;
    }
  }

  if (cvvInput.value !== prevCvvValue) {
    cvvError = false;
    cvvLabel.textContent = "CVV*";
    setColor(cvvLabel, contrastColor, cvvInput, contrastColor);
  }

  prevCvvValue = cvvInput.value;
});

cvvInput.addEventListener("blur", () => {
  if (!cvvError) {
    setColor(cvvLabel, textColor, cvvInput, darkGreyColor);
  }
});

cvvInput.addEventListener("focus", () => {
  if (!cvvError) {
    setColor(cvvLabel, contrastColor, cvvInput, contrastColor);
  }
});

function resetOrderData() {
  resetQuantity(placePrice, placeQtyCurrValue, placeQtyDropdown);
  resetQuantity(payPrice, payQtyCurrValue, payQtyDropdown);

  firstNameInput.value = "";
  lastNameInput.value = "";
  orderEmailInput.value = "";
  orderPhoneInput.value = "";

  countryCurrValue.textContent = "USA";

  countryDropdown
    .querySelector(".select__item--selected")
    .classList.remove("select__item--selected");
  countryDropdown
    .querySelectorAll(".select__item")[0]
    .classList.add("select__item--selected");

  cityCurrValue.textContent = "";
  citiesListWrapper.innerHTML = `
    <ul class="select__list">
      <li class="select__item">New York</li>
      <li class="select__item">San Francisco</li>
      <li class="select__item">Las Vegas</li>
      <li class="select__item">Los Angeles</li>
      <li class="select__item">Miami</li>
      <li class="select__item">Seattle</li>
      <li class="select__item">San Diego</li>
      <li class="select__item">Minneapolis</li>
    </ul>
  `;

  addressInput.value = "";

  const addressInput2 = document.getElementById("input-shipping-address-2");

  addressInput2.value = "";

  for (const cardNumInput of cardNumInputs) {
    cardNumInput.value = "";
  }

  cardHolderInput.value = "";
  dateInput.value = "";
  cvvInput.value = "";

  prevValueCardNum1 = "";
  prevValueCardNum2 = "";
  prevValueCardNum3 = "";
  prevValueCardNum4 = "";
  prevDateValue = "";
  prevCvvValue = "";
}

function resetQuantity(price, currValue, qtyDropdown) {
  price.textContent = "1200$";
  currValue.textContent = "1";

  currValue.classList.remove("select-qty__current-value--changed");

  qtyDropdown
    .querySelector(".select-qty__item--selected")
    .classList.remove("select-qty__item--selected");

  qtyDropdown
    .querySelectorAll(".select-qty__item")[0]
    .classList.add("select-qty__item--selected");
}

// #endregion

// #region FAQ Select Question
// FAQ Select Question

const faqSection = document.getElementById("faq");
const faqMoreBtn = faqSection.querySelector(".more-btn");
const questions = faqSection.querySelectorAll(".faq__question");

faqSection.addEventListener("click", (e) => {
  const question = e.target.closest(".faq__question");

  if (!question) {
    return;
  }

  question.classList.toggle("faq__question--selected");

  let isMoreBtnDisabled = true;

  for (const question of questions) {
    if (!question.classList.contains("faq__question--selected")) {
      isMoreBtnDisabled = false;

      break;
    }
  }

  faqMoreBtn.disabled = isMoreBtnDisabled;
});

faqMoreBtn.addEventListener("click", () => {
  for (const question of questions) {
    if (!question.classList.contains("faq__question--selected")) {
      question.classList.add("faq__question--selected");

      break;
    }
  }

  const selectedQuestions = faqSection.querySelectorAll(
    ".faq__question--selected"
  );

  if (questions.length === selectedQuestions.length) {
    faqMoreBtn.disabled = true;
  }
});

// #endregion

// #region Close YouTube Video In The Correct Section
// Close YouTube Video In The Correct Section

const videoAside = document.getElementById("video");
const headerPlayVideoBtn = document.querySelector(".header__play-video");
const aboutPlayVideoBtn = document.querySelector(".about__play-video");
const videoCloseIcon = videoAside.querySelector(".top-bar__icon--close");

headerPlayVideoBtn.addEventListener("click", () => {
  videoCloseIcon.setAttribute("href", "#page-top");
});

aboutPlayVideoBtn.addEventListener("click", () => {
  videoCloseIcon.setAttribute("href", "#about");
});

// #endregion

// #region Close YouTube Video After Clicking On The Close Icon
// Close YouTube Video After Clicking On The Close Icon

videoCloseIcon.addEventListener("click", () => {
  const player = document.querySelector(".video__youtube-player");

  player.remove();
});

const playerWrapper = document.querySelector(".video__youtube-wrapper");

function handleClickPlayVideoBtn() {
  const player = document.querySelector(".video__youtube-player");

  if (player) {
    return;
  }

  playerWrapper.insertAdjacentHTML(
    "afterbegin",
    `
    <iframe
      class="video__youtube-player"
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/SvTbB19bvIw"
      title="YouTube video player"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  `
  );
}

headerPlayVideoBtn.addEventListener("click", handleClickPlayVideoBtn);
aboutPlayVideoBtn.addEventListener("click", handleClickPlayVideoBtn);

// #endregion
