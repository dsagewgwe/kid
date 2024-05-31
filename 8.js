function flipCard4(event) {
    const flipCardContainer = event.currentTarget.querySelector(".d-card-container")
    flipCardContainer.classList.toggle("d-card")
  }
  const card4 = document.querySelector(".card4")
  card4.addEventListener("click",event=>flipCard4(event))