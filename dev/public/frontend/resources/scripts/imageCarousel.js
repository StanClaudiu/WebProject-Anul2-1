let slideIndex = 1;

const showSlides = (n) => {

  let slides = document.getElementsByClassName("image-slider-slide");

  let dots = document.getElementsByClassName("image-slider-dot");

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  
  for (let i = 0; i < slides.length; i++) 
  {
      slides[i].classList.remove("image-slider-active-slide");
  }
  for (let i = 0; i < dots.length; i++) 
  {
      dots[i].classList.remove("image-slider-active-dot");
  }
  
  slides[slideIndex-1].classList.add("image-slider-active-slide");
  dots[slideIndex-1].classList.add("image-slider-active-dot");
}

const plusSlides = (n) => {
    console.log("Da")
  showSlides(slideIndex += n);
}

const currentSlide = (n) => {
  showSlides(slideIndex = n);
}

showSlides(slideIndex);