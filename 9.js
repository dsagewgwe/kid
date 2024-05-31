function flipCard5(event) {
    const flipCardContainer = event.currentTarget.querySelector(".e-card-container")
    flipCardContainer.classList.toggle("e-card")
  }
  const card5 = document.querySelector(".card5")
  card5.addEventListener("click",event=>flipCard5(event))