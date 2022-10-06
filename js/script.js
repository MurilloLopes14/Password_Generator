//Element Selection
const generatePasswordBtn = document.querySelector("#generate_password");
const generatedPassword = document.querySelector("#generated_password");
const openCloseGeneratorBtn = document.querySelector("#open_password_modal");
const generatePasswordContainer = document.querySelector("#generate_options");
const lengthInput = document.querySelector("#length");
const letterCheck = document.querySelector("#letters");
const numberCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const copyPasswordBtn = document.querySelector("#copy_password");

//Functions

//Letters, Numbers, Symbols
const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumbers = () => {
  return Math.floor(Math.random() * 10).toString();
};

const getSymbols = () => {
  const symbols = "(){}[]=<>|/,.:;!@#$%¨&*+-_'~^ ";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = (
  getLetterLowerCase,
  getLetterUpperCase,
  getNumbers,
  getSymbols
) => {
  let password = "";

  const passwordLength = +lengthInput.value;

  const generators = [];

  if (letterCheck.checked) {
    generators.push(getLetterLowerCase, getLetterUpperCase);
  }

  if (numberCheck.checked) {
    generators.push(getNumbers);
  }

  if (symbolsCheck.checked) {
    generators.push(getSymbols);
  }

  if (generators.length === 0) {
    return;
  }
  for (i = 0; i < passwordLength; i = i + generators.length) {
    generators.forEach(() => {
      const randomValue =
        generators[Math.floor(Math.random() * generators.length)]();
      password += randomValue;
    });
  }
  password = password.slice(0, passwordLength);

  generatedPassword.style.display = "block";
  generatedPassword.querySelector("h4").innerText = password;
};

//Events
generatePasswordBtn.addEventListener("click", () => {
  generatePassword(
    getLetterLowerCase,
    getLetterUpperCase,
    getNumbers,
    getSymbols
  );
});

openCloseGeneratorBtn.addEventListener("click", () => {
  generatePasswordContainer.classList.toggle("hide");
});

copyPasswordBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const password = generatedPassword.querySelector("h4").innerText;

  navigator.clipboard.writeText(password).then(() => {
    copyPasswordBtn.innerText = "Senha copiada!";

    setTimeout(() => {
      copyPasswordBtn.innerText = "Copiar!";
    }, 1000);
  });
});
