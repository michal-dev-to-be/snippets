// Krok 1 - Zapisz reprezentację próbek dźwiękowych w formie obiektu
// pod odpowiednimi nazwami
const samples = {
  kick: new Audio('./samples/kick.wav'),
  snare: new Audio('./samples/snare.wav'),
  'hi-hat': new Audio('./samples/hi-hat.wav'),
  tom: new Audio('./samples/tom.wav'),
  clap: new Audio('./samples/clap.wav'),
  ride: new Audio('./samples/ride.wav'),
};

// Krok 2 - Stwórz obiekt konfiguracyjny, ktory bedzie przechowywac informacje
// jaki klawicz klawiatury odpowiada jakiemu padowi samplera
const padKeyConfig = {
  Space: 'Kick',
  KeyJ: 'Snare',
  KeyI: 'Hi-Hat',
  KeyQ: 'Tom',
  KeyW: 'Clap',
  KeyE: 'Ride',
};

// Krok 3 - Pobierz elementy DOM wszystkich padów samplera
const allPads = document.querySelectorAll('[data-pad-key]');

/**
 * Krok 4  - Utwórz definicję funkcji `playSample`
 * Funkcja ta wczytuje konkretną próbkę dźwiękową
 * @param {String} padName - nazwa pada, który został naciśnięty (Kick, Snare, Hi-Hat, Tom, Clap, Ride)
 * @param {HTMLButtonElement} padButton - element DOM przedstawiający konkretny pad samplera
 */
function playSample(padName, padButton) {
  // Zamień nazwę pada na małe litery
  const padNameLowerCased = padName.toLowerCase();
  // Pobierz element Audio dla konkretnego pada
  const padSample = samples[padNameLowerCased];

  // Wczytaj plik dźwiękowy
  padSample.load();
  // Odtwórz plik dźwiękowy
  padSample.play();
  // Dodaj klasę CSS `.active` do konkretnego pada samplera
  // Ta klasa odpowiedzialna jest za wyświetlanie efektu wciśniętego pada samplera
  padButton.classList.add('active');

  // Ustaw timer, który usunie efekt wciśniętego pada samplera po czasie 50ms (milisekund)
  setTimeout(() => {
    padButton.classList.remove('active');
  }, 50);

  // Wyświetl nazwę ostatnio naciśniętego pada na ekranie samplera
  document.querySelector('#display').textContent = padName;
}

/**
 * Krok 5 - Utwórz definicję funkcji `handlePadTrigger`
 * Funkcja ta decyduje, która próbka dźwięku powinna zostać odtworzona
 * @param {KeyboardEvent.code} keyCode - indentyfikator klawisza klawiatury
 */
function handlePadTrigger(keyCode) {
  // Pobierz element DOM pada na podstawie kodu klawisza klawiatury
  const padButton = document.querySelector(`[data-pad-key=${keyCode}]`);

  // Pobierz nazwę pada samplera z obiektu konfiguracyjnego `padKeyConfig`, który
  // stworzyliśmy w lini nr. 14
  const padName = padKeyConfig[keyCode];

  // Upewnij się, ze zarówno wartości `padName` oraz `padButton` nie są puste
  // Jeśli tak to zainicjalizuj funkcję `playSample`
  if (padName && padButton) {
    playSample(padName, padButton);
  }
}

// Krok 6 - Dodaj zdzarzenie klawiatury `keydown`
// (wyzwalane po wciśnięciu przycisku klawiatury w dół).
// Po tym zdarzeniu zainicjalizuj funkcję `handlePadTrigger`, która jest odpowiedzialna za
// decydowanie i odtwarzanie próbki dźwiękowej dla odpowiedniego pada samplera
document.addEventListener('keydown', (e) => {
  handlePadTrigger(e.code);
});

// Krok 7 - Do kazdego elementu DOM repretującego pad samplera
// dodaj nasłuchiwanie na zdarzenie `click`. Pozwoli nam ono wywołać funkcję `handlePagTrigger`
// równiez w przypadku kiedy uzytkownik uruchomi pad samplera po przez kliknięcie myszką
allPads.forEach((padButton) => {
  padButton.addEventListener('click', (e) => {
    // Pobierz element DOM pada i wczytaj z niego wartość atrybutu `data-pad-key`
    // Pamietaj, ze atrybut ten przechowuje kod który jest unikalny dla kazdego pada
    // (mozesz go podejrzec w pliku HTML)
    const keyCode = e.target.closest('button').getAttribute('data-pad-key');

    // Jeśli kod pada zostal pobrany pomyslnie oraz zdarzenie zostalo wywolane myszka
    // to zainicjalizuj funkcje `handlePadTrigger` (analogicznie jak w lini 80)
    if (keyCode && e.pointerType === 'mouse') {
      handlePadTrigger(keyCode);
    }
  });
});
