import '../scss/main.scss';

// Classes
class Password {
  #password;
  #characters;
  #type = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '~`!@#$%^&*({[)}]_-+=|\\:;"\'<,>.?/',
  };

  constructor() {
    this.setCharacters();
    this.generatePassword();
    this.setPasswordStrength();
  }

  generatePassword() {
    const output = document.querySelector('[data-js="output"]');
    const { valueAsNumber } = inputSlider;
    this.#password = '';

    for (let i = valueAsNumber; i > 0; i--) {
      const randomType = this.#characters[this.randomNumber(0, this.#characters.length - 1)];
      this.#password += randomType.charAt(this.randomNumber(0, randomType.length - 1));
    }

    output.dataset.output = '';
    output.textContent = this.#password;
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getPassword() {
    return this.#password;
  }

  setCharacters() {
    this.#characters = [];
    const checkedInputs = this.getCheckedCheckboxes();

    for (const { dataset } of checkedInputs) {
      this.#characters.push(this.#type[dataset.type]);
    }
  }

  getCheckedCheckboxes() {
    return document.querySelectorAll('[data-js="input-checkbox"]:checked');
  }

  setPasswordStrength() {
    const textStrength = document.querySelector('[data-js="text-strength"]');
    const sliderValue = inputSlider.valueAsNumber;
    const checkedInputs = this.getCheckedCheckboxes().length;
    let strength = 'Very Weak';

    if (sliderValue >= 10 && checkedInputs >= 4) {
      strength = 'Strong';
    } else if (sliderValue >= 8 && checkedInputs >= 3) {
      strength = 'Good';
    } else if (sliderValue >= 5 && checkedInputs >= 2) {
      strength = 'Weak';
    }

    form.dataset.strength = strength;
    textStrength.textContent = strength;
    textStrength.classList.remove('hidden');
  }
}

// Functions
function handleFormSubmit(event) {
  event.preventDefault();
  password.generatePassword();
}

function handleFormInput({ target }) {
  if (target.matches('[data-js="input-slider"]')) {
    handleSliderChange();
  }

  if (target.matches('[data-js="input-checkbox"]')) {
    handleCheckboxChange(target);
    password.setCharacters();
  }

  password.generatePassword();
  password.setPasswordStrength();
}

function handleSliderChange() {
  const sliderValueElement = document.querySelector('[data-js="slider-value"]');
  const { valueAsNumber, min, max } = inputSlider;
  const filledPercentage = ((valueAsNumber - min) / (max - min)) * 100;

  sliderValueElement.textContent = valueAsNumber;
  inputSlider.style.setProperty('--filled-percentage', `${filledPercentage}%`);
}

function handleCheckboxChange(checkbox) {
  if (password.getCheckedCheckboxes().length) return;

  checkbox.checked = true;
}

function handleCopyButtonClick() {
  const cardOutput = document.querySelector('[data-js="card-output"]');

  navigator.clipboard.writeText(password.getPassword());
  cardOutput.classList.add('copied');
  cardOutput.addEventListener(
    'animationend',
    () => {
      cardOutput.classList.remove('copied');
    },
    { once: true }
  );
}

// Global Variables
const form = document.querySelector('[data-js="form"]');
const inputSlider = document.querySelector('[data-js="input-slider"]');
const buttonCopy = document.querySelector('[data-js="button-copy"]');
const password = new Password();

// Event Listeners
form.addEventListener('submit', handleFormSubmit);
form.addEventListener('input', handleFormInput);
buttonCopy.addEventListener('click', handleCopyButtonClick);
