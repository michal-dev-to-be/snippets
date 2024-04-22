const samples = {
  kick: new Audio('./samples/kick.wav'),
  snare: new Audio('./samples/snare.wav'),
  'hi-hat': new Audio('./samples/hi-hat.wav'),
  tom: new Audio('./samples/tom.wav'),
  clap: new Audio('./samples/clap.wav'),
  ride: new Audio('./samples/ride.wav'),
};

const playSample = (sampleType, padButton) => {
  const sample = samples[sampleType.toLowerCase()];
  sample.load();
  sample.play();

  padButton.classList.add('active');

  setTimeout(() => {
    document.activeElement.blur();
    padButton.classList.remove('active');
  }, 50);

  document.querySelector('#display').textContent = sampleType;
};

document.addEventListener('keydown', (e) => {
  handlePadTrigger(e.code);
});

document.querySelectorAll('[data-pad-key]').forEach((padButton) => {
  padButton.addEventListener('click', (e) => {
    console.log('click', e);

    const key = e.target.getAttribute('data-pad-key');

    if (key && e.pointerType === 'mouse') {
      handlePadTrigger(key);
    }
  });
});

function handlePadTrigger(key) {
  const padButton = document.querySelector(`[data-pad-key=${key}]`);

  switch (key) {
    case 'Space':
      playSample('Kick', padButton);
      break;
    case 'KeyJ':
      playSample('Snare', padButton);
      break;
    case 'KeyI':
      playSample('Hi-Hat', padButton);
      break;
    case 'KeyQ':
      playSample('Tom', padButton);
      break;
    case 'KeyW':
      playSample('Clap', padButton);
      break;
    case 'KeyE':
      playSample('Ride', padButton);
      break;
  }
}
