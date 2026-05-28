export type Question = {
  id: string;
  optionA: string;
  optionB: string;
  chaosWeight: number; // 0 to 10
};

export const QUESTIONS: Question[] = [
  {
    id: '1',
    optionA: 'Fight 10 duck-sized horses',
    optionB: 'Fight 1 horse-sized duck',
    chaosWeight: 7,
  },
  {
    id: '2',
    optionA: 'Only whisper forever',
    optionB: 'Only shout forever',
    chaosWeight: 5,
  },
  {
    id: '3',
    optionA: 'Have unlimited pizza but only cheese',
    optionB: 'Unlimited ice cream but only vanilla',
    chaosWeight: 3,
  },
  {
    id: '4',
    optionA: 'Be able to teleport randomly',
    optionB: 'Read minds accidentally',
    chaosWeight: 9,
  },
  {
    id: '5',
    optionA: 'Always have wet socks',
    optionB: 'Always have a pebble in your shoe',
    chaosWeight: 6,
  },
  {
    id: '6',
    optionA: 'Have a permanent clown nose',
    optionB: 'Have permanent giant rabbit ears',
    chaosWeight: 8,
  },
  {
    id: '7',
    optionA: 'Speak in rhymes only',
    optionB: 'Communicate only through emojis',
    chaosWeight: 4,
  },
  {
    id: '8',
    optionA: 'Never use a phone again',
    optionB: 'Never use a computer again',
    chaosWeight: 2,
  },
  {
    id: '9',
    optionA: 'Live in a world where everyone is a cat',
    optionB: 'Live in a world where everyone is a dog',
    chaosWeight: 7,
  },
  {
    id: '10',
    optionA: 'Have to dance every time you hear music',
    optionB: 'Have to sing everything you say',
    chaosWeight: 5,
  },
  {
    id: '11',
    optionA: 'Be 10 feet tall',
    optionB: 'Be 2 feet tall',
    chaosWeight: 8,
  },
  {
    id: '12',
    optionA: 'Always smell like fried onions',
    optionB: 'Always smell like wet dog',
    chaosWeight: 6,
  },
];

export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
