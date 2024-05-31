function flipCard2(event) {
    const flip2CardContainer = event.currentTarget.querySelector(".b-card-container")
    flip2CardContainer.classList.toggle("b-card")
  }
  const card2 = document.querySelector(".card2")
  card2.addEventListener("click",event=>flipCard2(event))