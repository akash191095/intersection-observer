const cardContainer = document.querySelector(".card-container");
const cards = document.querySelectorAll(".card");

const addNewCards = () => {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = "This is a card";
    cardContainer.append(card);
    observer.observe(card);
  }
};

// main observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  },
  { threshold: 1 }
);

// last card observer
const lastCardObserver = new IntersectionObserver(
  (entries) => {
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) return;
    addNewCards();
    lastCardObserver.unobserve(lastCard.target);
    lastCardObserver.observe(document.querySelector(".card:last-child"));
  },
  { rootMargin: "100px" }
);

cards.forEach((card) => {
  observer.observe(card);
});

lastCardObserver.observe(document.querySelector(".card:last-child"));
