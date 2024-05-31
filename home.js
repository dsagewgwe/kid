/*const slider = document.querySelector('.slider');
function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}
document.addEventListener('click',activate,false);*/

const slider = document.querySelector('.slider');

function activate(e) {
  requestAnimationFrame(() => {
    const items = document.querySelectorAll('.item');
    if (e.target.matches('.next')) {
      slider.append(items[0]);
    }
    if (e.target.matches('.prev')) {
      slider.prepend(items[items.length - 1]);
    }
  });
}


document.addEventListener('click', activate, false);
