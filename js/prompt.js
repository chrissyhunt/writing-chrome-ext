import Sentencer from 'sentencer';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

const sillyPrompts = [
  "Once upon a time, {{ an_actor }} walked out of the house to find {{ a_noun }}.",
  "Long ago, {{ an_actor }}...",
  "It was raining, and the {{ actor }} was sad.",
  "If she could just reach the {{ noun }}, it would be the best day EVER.",
  "{{ a_noun }}, {{ a_noun }}, {{ a_noun }}.",
];

const seriousPrompts = [
  "Write about a time when you couldn't be with someone you loved.",
  "Describe your first kiss.",
  "All the little things you remember about the best summer of your life.",
  "Your first memory.",
  "What word do you hate the most?",
  "What word do you love the most?",
  "Describe your favorite item of clothing.",
  "Imagine the life your favorite possession had before it came to you.",
  "Imagine one moment when your mother felt exactly like you do right now.",
];

const allPrompts = sillyPrompts.concat(seriousPrompts);

const timePeriods = [
  "Victorian era",
  "Jurassic era",
  "Paleolithic era",
  "Sixties",
  "Seventies",
  "Eightees",
  "Roaring Twenties",
  "Great Depression",
  "Dark Ages",
  "Renaissance",
  "Roman Empire",
  "Classical era",
  "ancient world",
  "prehistoric world",
  "Age of Pharaohs",
];

const actors = [
  'man',
  'woman',
  'boy',
  'girl',
  'robot',
  'android',
  'magical unicorn',
  'princess',
  'dragon',
  'puppy',
  'kitten',
  'frog that was secretly a prince',
];

function getEra() {
  const randomIndex = getRandomIndex(timePeriods.length);
  return timePeriods[randomIndex];
};

function getActor() {
  const randomIndex = getRandomInt(actors.length);
  return actors[randomIndex];
};

function getOne(getFn) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  let item = getFn();
  if (vowels.includes(item[0])) {
    item = 'an ' + item;
  } else {
    item = 'a ' + item;
  }
  return item;
};

Sentencer.configure({
  actions: {
    actor: getActor,
    an_actor: function() {
      return getOne(getActor);
    },
    era: getEra,
  }
});

export function getPromptSentence(pref) {
  switch (pref) {
    case 'silly': {
      const randomIndex = getRandomInt(sillyPrompts.length);
      const sentence = Sentencer.make(sillyPrompts[randomIndex]);
      return sentence;
    }
    case 'serious': {
      const randomIndex = getRandomInt(seriousPrompts.length);
      const sentence = Sentencer.make(seriousPrompts[randomIndex]);
      return sentence;
    }
    case 'all':
    default: {
      const randomIndex = getRandomInt(allPrompts.length);
      const sentence = Sentencer.make(allPrompts[randomIndex]);
      return sentence;
    }
  }
};