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

$('.select_city').each(function() {
  let $this = $(this),
    selectOption = $this.find('option'),
    selectOptionLength = selectOption.length,
    selectedOption = selectOption.filter(':selected'),
    dur = 500;

  $this.hide();
  $this.wrap('<div class="select"></div>');
  $('<div>', {
    class: 'select__gap',
    text: 'Город*'
  }).insertAfter($this);

  let selectGap = $this.next('.select__gap'),
    caret = selectGap.find('.caret');
  $('<ul>', {
    class: 'select__list'
  }).insertAfter(selectGap);

  let selectList = selectGap.next('.select__list');
  // Add li - option items
  for (let i = 0; i < selectOptionLength; i++) {
    $('<li>', {
      class: 'select__item',
      html: $('<span>', {
        text: selectOption.eq(i).text()
      })
    })
      .attr('data-value', selectOption.eq(i).val())
      .appendTo(selectList);
  }
  let selectItem = selectList.find('li');

  selectList.slideUp(0);
  selectGap.on('click', function() {
    if (!$(this).hasClass('on')) {
      $(this).addClass('on');
      selectList.slideDown(dur);

      selectItem.on('click', function() {
        let chooseItemIndex = $(this).index();
        $($('#city').children()).removeAttr('selected');
        $($('#city').children()[chooseItemIndex]).attr('selected', 'selected');
        selectGap.text($(this).find('span').text());

        selectList.slideUp(dur);
        selectGap.removeClass('on');
      });

    } else {
      $(this).removeClass('on');
      selectList.slideUp(dur);
    }
  });
});



