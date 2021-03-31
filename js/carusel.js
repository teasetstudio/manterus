let mainSliderElement = document.querySelector('.trans-slider'),
    sliderWrapper = mainSliderElement.querySelector('.slider-wrapper'),
    sliderItems = mainSliderElement.querySelectorAll('.slider-item'),
    items=[];

    wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width),
    itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width),
    
    step = -itemWidth / wrapperWidth * 100, // step in %
    wrapperTransform = 0,
    positionLeftItem = 0,
    interval = 0,//setInterval name

    allControls = mainSliderElement.querySelectorAll('.slider__control'),
    leftController = mainSliderElement.querySelector('.slider__control_left'),
    rightController = mainSliderElement.querySelector('.slider__control_right'),
    sliderConfig = {
        direction: 'right',
        interval: 5000,
        pause: true
    };


//array elements objects
sliderItems.forEach(function (item, index) {
    items.push({ item: item, position: index, transform: 0 });
});
//get max and min item and index in array
let position = {
  getItemMin: function () {
    let indexItem = 0;
    items.forEach(function (item, index) {
      if (item.position < items[indexItem].position) {
        indexItem = index;
      }
    });
    return indexItem;
  },
  getItemMax: function () {
    let indexItem = 0;
    items.forEach(function (item, index) {
      if (item.position > items[indexItem].position) {
        indexItem = index;
      }
    });
    return indexItem;
  },
  getMin: function () {
    return items[position.getItemMin()].position;
  },
  getMax: function () {
    return items[position.getItemMax()].position;
  }
}
//mover
function transformSlider (direction){
    let nextItem;
    if (direction ==='right'){
        positionLeftItem++;
        if((positionLeftItem + wrapperWidth / itemWidth - 1) + 1>position.getMax()){
            nextItem = position.getItemMin();
            items[nextItem].position = position.getMax() + 1;
            items[nextItem].transform += items.length * 100;
            items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
        }
        wrapperTransform += step;
    }
    if (direction ==='left'){
        positionLeftItem--;
        if (positionLeftItem < position.getMin()) {
            nextItem = position.getItemMax();
            items[nextItem].position = position.getMin() - 1;
            items[nextItem].transform -= items.length * 100;
            items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
          }
        wrapperTransform-=step;
    }
    sliderWrapper.style.transform = 'translateX(' + wrapperTransform + '%)';
}
//cycle
function cycle(direction) {
  interval = setInterval(function () {
    transformSlider(direction);
  }, sliderConfig.interval);
}

//choose left or right direction
function controlClick (e) {
  if (e.target.classList.contains('slider__control')) {
    e.preventDefault();
    let direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
    sliderConfig.direction = direction;
    transformSlider(direction);
  }
};

// left, right click listener
function setUpListeners() {
  allControls.forEach(function (item) {
    item.addEventListener('click', controlClick);
  });
  if (sliderConfig.pause) {
    mainSliderElement.addEventListener('mouseenter', function () {
      clearInterval(interval);
    });
    mainSliderElement.addEventListener('mouseleave', function () {
      clearInterval(interval);
      cycle(sliderConfig.direction);
    });
  }
}
setUpListeners();
cycle(sliderConfig.direction);

