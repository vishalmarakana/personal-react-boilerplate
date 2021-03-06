// https://stackoverflow.com/a/32686261
const isValidMail = mail => {
  if (mail.length === 0) {
    return false;
  }

  try {
    const input = Object.assign(document.createElement('input'), {
      type: 'email',
      value: mail,
    });

    return input.checkValidity();
  } catch (e) {
    // in case of input.checkValidity not being available in some older browsers
    // log the error, so Sentry catches it regardless
    console.error(e);
    // return true because we can't verify the mail at the frontend
    // so the backend has to step in
    return true;
  }
};

export const allowedSpecialCharacters = [
  '!',
  '"',
  '§',
  '$',
  '%',
  '&',
  '/',
  '(',
  ')',
  '=',
  '?',
  ',',
  '.',
  ';',
  ':',
  '_',
  '-',
];
export const characterPattern = '[A-Za-z]';
export const passwordMinLength = 8;
const passwordPattern = `^(?=.*${characterPattern})(?=.*[0-9])(?=.{${passwordMinLength},}).*$`;

const isValidPassword = password => new RegExp(passwordPattern).test(password);

const usernamePattern = '^[a-zA-Z0-9]+(?:[._ -]?[a-zA-Z0-9])*$';

const isValidUsername = userName => new RegExp(usernamePattern).test(userName);

const namePattern =
  "^[a-zA-Z àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'-]+$";

export const validate = {
  mail: isValidMail,
  password: isValidPassword,
  username: isValidUsername,
};

export const pattern = {
  password: passwordPattern,
  userName: usernamePattern,
  realName: namePattern,
};
