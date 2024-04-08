const navBar = document.querySelector('.nav-bar');
const initialNavButtonIndex = 0;
const navButton = document.querySelector('.nav-btn');
const navBarTrack = document.querySelector('.nav-bar-track');
const contentItem = document.querySelector('.content-inner');
const navButtonHeight = navButton.offsetHeight;
const navButtonWidth = navButton.offsetWidth;

const activeNavButtonOffsetTop = `${navButtonHeight * initialNavButtonIndex}px`;

navBarTrack.style.height = `${navButtonHeight}px`;
navBarTrack.style.left = `${navButtonWidth}px`;
navBarTrack.style.top = activeNavButtonOffsetTop;

navButton.classList.add('active');
contentItem.classList.add('active');

navBar.addEventListener('click', (event) => {
  if (event.target.matches('.nav-btn')) {
    handleActionClick(event);
  }
});

const moveUnderline = (navButtonIndex) => {
  document.querySelector('.nav-bar-track').style.top = `${
    navButtonIndex * navButtonHeight
  }px`;
};

const changeActiveElement = (element, index, clickedButtonIndex) => {
  const isClickedNavButton = index === clickedButtonIndex;

  if (isClickedNavButton) {
    element.classList.add('active');
  } else {
    element.classList.remove('active');
  }
};

const handleActionClick = (event) => {
  const clickedNavButtonIndex = parseInt(
    event.target.getAttribute('data-index')
  );

  document.querySelectorAll('.nav-btn').forEach((element, index) => {
    changeActiveElement(element, index, clickedNavButtonIndex);
  });

  document.querySelectorAll('.content-inner').forEach((element, index) => {
    changeActiveElement(element, index, clickedNavButtonIndex);
  });

  moveUnderline(clickedNavButtonIndex);
};
