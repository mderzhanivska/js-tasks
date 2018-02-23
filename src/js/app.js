import 'slick-carousel';

// slider in popup script start

window.onload = () => {
  openModal();
  initSlider(document.getElementById('slider-1'));
  $('.tabs__buttons .tablink').click(openTab);
};

function openTab(evt) {
  const tab = document.getElementsByClassName('tabs__tab');
  for (let i = 0; i < tab.length; i++) {
    tab[i].style.display = 'none';
  }

  const tablinks = document.getElementsByClassName('tablink');
  for (let i = 0; i < tab.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  const parent = document.getElementById(evt.target.dataset.tab);
  parent.style.display = 'block';
  evt.currentTarget.className += ' active';

  initSlider(parent.querySelector('.slider'));
}


function initSlider(slide, number) {
  if (slide.dataset.init) return;

  $(slide).slick({
    infinite: true,
    speed: 800,
    adaptiveHeight: true,
    fade: !!slide.dataset.fade,
    cssEase: slide.dataset.css || '',
    slidesToShow: slide.dataset.slides || 1,
    responsive: [
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }],
    dots: true,
    dotsClass:'slider-paging-number',
    customPaging: function(slick) { return (slick.currentSlide + 1) + '/' + slick.slideCount; }
  }).on('afterChange', function(event, slick, currentSlide) {
    $(this).find('*[role="tablist"]').find('li').eq(0).text(slick.options.customPaging.call(this, slick, currentSlide));
  });
  slide.dataset.init = true;
}


function openModal() {
  const modal = document.getElementById('modal');
  const btns = document.getElementsByClassName('btnModal');
  const span = document.getElementsByClassName('close')[0];
  const slider = modal.querySelector('.slider');

  for (let btn of btns) {
    btn.onclick = function(e) {
      modal.style.display = 'block';
      initSlider(slider);
      $(slider).slick('slickGoTo', e.target.dataset.number-1 || 0);
    };
  }

  span.onclick = function() {
    modal.style.display = 'none';
  };

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}

// slider in popup script end

//custom select script start




