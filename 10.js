function flipCard6(event) {
    const flip6CardContainer = event.currentTarget.querySelector(".f-card-container")
    flip6CardContainer.classList.toggle("f-card")
  }
  const card6 = document.querySelector(".card6")
  card6.addEventListener("click",event=>flipCard6(event))