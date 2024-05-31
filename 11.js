document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".gh");
    const card1 = document.querySelector(".card7");
    const card2 = document.querySelector(".card8");
  
    container.addEventListener("click", function() {
      container.classList.toggle("swapped");
      
      // 将卡片交换顺序
      const temp = card1.innerHTML;
      card1.innerHTML = card2.innerHTML;
      card2.innerHTML = temp;
    });
  });
