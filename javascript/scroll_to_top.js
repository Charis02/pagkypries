btn = document.getElementById("top-button");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btn.style.display = "flex";
    value = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    btn.style.opacity = Math.min(1,(value)/10000);
  } else {
    btn.style.display = "none";
    btn.style.opacity = 0;
  }
}


function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}