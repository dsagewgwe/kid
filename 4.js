  function flipCard(event) {
    const flipCardContainer = event.currentTarget.querySelector(".a-card-container")
    flipCardContainer.classList.toggle("a-card")
  }
  const card1 = document.querySelector(".card1")
  card1.addEventListener("click",event=>flipCard(event))
