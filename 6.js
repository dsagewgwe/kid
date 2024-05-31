function flipCard3(event) {
    const flipCardContainer = event.currentTarget.querySelector(".c-card-container")
    flipCardContainer.classList.toggle("c-card")
  }
  const card3 = document.querySelector(".card3")
  card3.addEventListener("click",event=>flipCard3(event))
