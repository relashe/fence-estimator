import {
  downloadFormName,
  downloadFormNameError,
  downloadFormEmail,
  downloadFormEmailError,
} from "../modules/mapElements.module";

const validateEmailFormat = (email) => {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validateDownloadName = () => {
  let isNameValid = true;
  // validate name
  if (downloadFormName.value === "") {
    isNameValid = false;
    downloadFormNameError.innerHTML = "Please add your name";
  } else {
    isNameValid = true;
    downloadFormNameError.innerHTML = "";
  }

  downloadFormNameError.setAttribute("aria-hidden", !isNameValid);

  return isNameValid;
};

export const validateDownloadEmail = () => {
  let isEmailValid = true;

  // validate email
  if (downloadFormEmail.value === "") {
    isEmailValid = false;
    downloadFormEmailError.innerHTML = "Please insert your email";
  } else if (!validateEmailFormat(downloadFormEmail.value)) {
    isEmailValid = false;
    downloadFormEmailError.innerHTML =
      "Please insert an email address in the right format.";
  } else {
    isEmailValid = true;
    downloadFormEmailError.innerHTML = "";
  }

  return isEmailValid;
};

export const validateDownloadForm = () => {
  const isNameValid = validateDownloadName();
  const isEmailValid = validateDownloadEmail();

  return Promise.resolve(isNameValid && isEmailValid);
};
