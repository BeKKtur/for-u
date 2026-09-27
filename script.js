/* ==================================================
   ✏️ НАСТРОЙКИ СТРАНИЦЫ
   Меняй тексты здесь — остальной код трогать не нужно.
================================================== */

const config = {
  name: "Имя девушки",

  texts: {
    brand: "для тебя",
    eyebrow: "маленькая страница для особенного человека",
    title: "Ты — моё",
    titleAccent: "«что-то» в этом мире.",
    subtitle:
      "Я хотел сделать для тебя место, где всё будет только о тебе. Без повода. Просто потому что ты особенная.",
    letterButton: "Прочитать письмо",

    letterTitle: "Несколько слов для тебя",
    letterDate: "с любовью",
    letterP1:
      "Знаешь, иногда совсем не нужны большие слова, чтобы сказать человеку, насколько он важен.",
    letterP2:
      "Мне просто хочется, чтобы ты чаще улыбалась, меньше переживала и всегда помнила: ты заслуживаешь самых тёплых моментов.",
    letterP3:
      "Спасибо тебе за твою улыбку, за твой характер, за твои маленькие привычки и за то, что рядом с тобой обычный день становится немного красивее.",
    signature: "Твой человек ❤️",

    reasonsTitle: "Потому что ты — это ты.",
    reasonsSubtitle:
      "Не идеальная. Не из фильма. Просто настоящая — и именно поэтому особенная.",

    card1Title: "Твоя улыбка",
    card1Text:
      "Есть улыбки, которые просто красивые. А есть те, после которых самому хочется улыбаться.",
    card2Title: "Твоя особенность",
    card2Text:
      "В тебе есть то, что невозможно нормально объяснить словами. Это просто чувствуется.",
    card3Title: "Твои мелочи",
    card3Text:
      "Именно маленькие детали иногда становятся самыми любимыми воспоминаниями.",

    surpriseTitle: "У меня для тебя кое-что есть...",
    surpriseSubtitle: "Но сначала нужно нажать на кнопку.",
    surpriseButton: "Открыть сюрприз 🎁",
    surpriseMessageTitle: "Если ты это читаешь — улыбайся.",
    surpriseMessageText:
      "Потому что где-то прямо сейчас есть человек, который очень рад, что ты есть. ❤️",

    finalTitle: "Просто оставайся собой.",
    finalText: "И никогда не забывай, насколько ты прекрасна.",
    footerName: "тебя"
  },

  /* Основные цвета страницы.
     Можно заменить на свои HEX-цвета. */
  colors: {
    primary: "#e85d7d",
    primaryDark: "#c84464",
    background: "#fff7f9",
    text: "#2b1720",
    muted: "#80656d",
    accent: "#ffd4df"
  }
};

/* Применяем имя и тексты */
document.title = `Для ${config.name} ❤️`;

document.querySelectorAll("[data-text]").forEach((element) => {
  const key = element.dataset.text;

  if (config.texts[key] !== undefined) {
    element.textContent = config.texts[key];
  }
});

document.querySelectorAll("[data-text='footerName']").forEach((element) => {
  element.textContent = config.name;
});

/* Применяем цвета */
const root = document.documentElement;

Object.entries(config.colors).forEach(([key, value]) => {
  root.style.setProperty(`--${key}`, value);
});

/* Переключение темы */
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("girl-page-theme");

if (savedTheme === "dark") {
  document.documentElement.dataset.theme = "dark";
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme === "dark";

  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    themeToggle.textContent = "☾";
    localStorage.setItem("girl-page-theme", "light");
  } else {
    document.documentElement.dataset.theme = "dark";
    themeToggle.textContent = "☀";
    localStorage.setItem("girl-page-theme", "dark");
  }
});

/* Появление элементов при прокрутке */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

/* Летающие сердечки */
const heartsContainer = document.getElementById("hearts");

function createHeart(x, y) {
  const heart = document.createElement("span");
  heart.className = "flying-heart";
  heart.textContent = Math.random() > 0.25 ? "♥" : "♡";

  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.setProperty("--x", `${(Math.random() - 0.5) * 180}px`);
  heart.style.setProperty("--y", `${-80 - Math.random() * 180}px`);
  heart.style.setProperty("--r", `${(Math.random() - 0.5) * 90}deg`);
  heart.style.fontSize = `${14 + Math.random() * 18}px`;

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 1600);
}

function heartBurst(x, y, amount = 10) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => createHeart(x, y), i * 35);
  }
}

document.getElementById("heartButton").addEventListener("click", (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  heartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
});

/* Сюрприз */
const surpriseButton = document.getElementById("surpriseButton");
const surpriseMessage = document.getElementById("surpriseMessage");

surpriseButton.addEventListener("click", () => {
  surpriseMessage.hidden = false;
  surpriseButton.textContent = "Сюрприз открыт ❤️";

  const rect = surpriseButton.getBoundingClientRect();
  heartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 28);

  surpriseButton.disabled = true;
  surpriseButton.style.opacity = ".75";
});

/* Сердечки по клику на страницу */
document.addEventListener("click", (event) => {
  if (
    event.target.closest("button") ||
    event.target.closest("a") ||
    event.target.closest("input")
  ) {
    return;
  }

  if (Math.random() < 0.35) {
    createHeart(event.clientX, event.clientY);
  }
});
