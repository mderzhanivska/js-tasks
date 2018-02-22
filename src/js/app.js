import 'slick-carousel';

function openSlider() {
  $('#slider').slick({
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    adaptiveHeight: true
  });
}
function openSliderModal() {
  $('#sliderModal').slick({
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    adaptiveHeight: true
  });
}

openSlider ();
openSliderModal ();



