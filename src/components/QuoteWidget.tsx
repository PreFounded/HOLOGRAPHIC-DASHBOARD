import { useState, useEffect, useRef } from "react";
import { HoloWrapper } from "./HoloWrapper";

interface Quote { text: string; src: string; }

function pickRandom(quotes: Quote[], lastIdx: number): number {
  let i: number;
  do {
    i = Math.floor(Math.random() * quotes.length);
  } while (i === lastIdx && quotes.length > 1);
  return i;
}

const QUOTES: Quote[] = [
  {text:"I think, therefore I am.", src:"René Descartes"},
  {text:"The unexamined life is not worth living.", src:"Socrates"},
  {text:"Happiness depends upon ourselves.", src:"Aristotle"},
  {text:"We are what we repeatedly do. Excellence, then, is not an act, but a habit.", src:"Aristotle"},
  {text:"He who has a why to live for can bear almost any how.", src:"Friedrich Nietzsche"},
  {text:"What does not kill me makes me stronger.", src:"Friedrich Nietzsche"},
  {text:"Imagination is more important than knowledge.", src:"Albert Einstein"},
  {text:"The important thing is not to stop questioning.", src:"Albert Einstein"},
  {text:"Two things are infinite: the universe and human stupidity; and I am not sure about the universe.", src:"Albert Einstein"},
  {text:"The cosmos is within us. We are made of star-stuff.", src:"Carl Sagan"},
  {text:"Somewhere, something incredible is waiting to be known.", src:"Carl Sagan"},
  {text:"Not all those who wander are lost.", src:"J.R.R. Tolkien"},
  {text:"All we have to decide is what to do with the time that is given us.", src:"J.R.R. Tolkien"},
  {text:"Be yourself; everyone else is already taken.", src:"Oscar Wilde"},
  {text:"We are all in the gutter, but some of us are looking at the stars.", src:"Oscar Wilde"},
  {text:"It is never too late to be what you might have been.", src:"George Eliot"},
  {text:"The two most important days in your life are the day you are born and the day you find out why.", src:"Mark Twain"},
  {text:"Do not go gentle into that good night. Rage, rage against the dying of the light.", src:"Dylan Thomas"},
  {text:"Two roads diverged in a wood, and I took the one less traveled by, and that has made all the difference.", src:"Robert Frost"},
  {text:"The fault, dear Brutus, is not in our stars, but in ourselves.", src:"Shakespeare"},
  {text:"To be or not to be, that is the question.", src:"Shakespeare"},
  {text:"All that glitters is not gold.", src:"Shakespeare"},
  {text:"What is past is prologue.", src:"Shakespeare"},
  {text:"Man is condemned to be free.", src:"Jean-Paul Sartre"},
  {text:"One must imagine Sisyphus happy.", src:"Albert Camus"},
  {text:"In the middle of winter, I at last discovered that there was in me an invincible summer.", src:"Albert Camus"},
  {text:"Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.", src:"Marcus Aurelius"},
  {text:"The happiness of your life depends upon the quality of your thoughts.", src:"Marcus Aurelius"},
  {text:"You have power over your mind — not outside events. Realize this, and you will find strength.", src:"Marcus Aurelius"},
  {text:"Waste no more time arguing about what a good man should be. Be one.", src:"Marcus Aurelius"},
  {text:"The impediment to action advances action. What stands in the way becomes the way.", src:"Marcus Aurelius"},
  {text:"We suffer more often in imagination than in reality.", src:"Seneca"},
  {text:"Luck is what happens when preparation meets opportunity.", src:"Seneca"},
  {text:"It is not that we have a short time to live, but that we waste a lot of it.", src:"Seneca"},
  {text:"Know thyself.", src:"Inscribed at Delphi"},
  {text:"Nothing in excess.", src:"Delphic Maxim"},
  {text:"No man ever steps in the same river twice.", src:"Heraclitus"},
  {text:"The only constant in life is change.", src:"Heraclitus"},
  {text:"The Tao that can be told is not the eternal Tao.", src:"Lao Tzu"},
  {text:"A journey of a thousand miles begins with a single step.", src:"Lao Tzu"},
  {text:"Nature does not hurry, yet everything is accomplished.", src:"Lao Tzu"},
  {text:"When I let go of what I am, I become what I might be.", src:"Lao Tzu"},
  {text:"The road of excess leads to the palace of wisdom.", src:"William Blake"},
  {text:"Even the darkest night will end and the sun will rise.", src:"Victor Hugo"},
  {text:"Chop wood, carry water.", src:"Zen Proverb"},
  {text:"Before enlightenment, chop wood, carry water. After enlightenment, chop wood, carry water.", src:"Zen Proverb"},
  {text:"Peace comes from within. Do not seek it without.", src:"Buddha"},
  {text:"Holding on to anger is like drinking poison and expecting the other person to die.", src:"Buddha"},
  {text:"We are shaped by our thoughts; we become what we think.", src:"Buddha"},
  {text:"The wound is the place where the Light enters you.", src:"Rumi"},
  {text:"Do not grieve. Anything you lose comes round in another form.", src:"Rumi"},
  {text:"You are not a drop in the ocean. You are the entire ocean in a drop.", src:"Rumi"},
  {text:"Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", src:"Rumi"},
  {text:"If you do not know where you are going, any road will get you there.", src:"Lewis Carroll"},
  {text:"The only thing necessary for the triumph of evil is for good men to do nothing.", src:"Edmund Burke"},
  {text:"Those who cannot remember the past are condemned to repeat it.", src:"George Santayana"},
  {text:"Power tends to corrupt, and absolute power corrupts absolutely.", src:"Lord Acton"},
  {text:"The arc of the moral universe is long, but it bends toward justice.", src:"Martin Luther King Jr."},
  {text:"Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.", src:"Martin Luther King Jr."},
  {text:"Ask not what your country can do for you — ask what you can do for your country.", src:"John F. Kennedy"},
  {text:"The only thing we have to fear is fear itself.", src:"Franklin D. Roosevelt"},
  {text:"That is one small step for a man, one giant leap for mankind.", src:"Neil Armstrong"},
  {text:"Space, the final frontier.", src:"Star Trek"},
  {text:"Live long and prosper.", src:"Spock"},
  {text:"May the Force be with you.", src:"Star Wars"},
  {text:"Do or do not. There is no try.", src:"Yoda"},
  {text:"Fear is the path to the dark side. Fear leads to anger, anger leads to hate, hate leads to suffering.", src:"Yoda"},
  {text:"The needs of the many outweigh the needs of the few.", src:"Spock"},
  {text:"There is no spoon.", src:"The Matrix"},
  {text:"Free your mind.", src:"Morpheus"},
  {text:"Carpe diem. Seize the day.", src:"Dead Poets Society"},
  {text:"A person who never made a mistake never tried anything new.", src:"Albert Einstein"},
  {text:"Wisdom is not a product of schooling but of the lifelong attempt to acquire it.", src:"Albert Einstein"},
  {text:"The greatest glory in living lies not in never falling, but in rising every time we fall.", src:"Nelson Mandela"},
  {text:"It always seems impossible until it is done.", src:"Nelson Mandela"},
  {text:"Education is the most powerful weapon which you can use to change the world.", src:"Nelson Mandela"},
  {text:"Fall seven times, stand up eight.", src:"Japanese Proverb"},
  {text:"Better a diamond with a flaw than a pebble without one.", src:"Chinese Proverb"},
  {text:"When anger rises, think of the consequences.", src:"Confucius"},
  {text:"Silence is a true friend who never betrays.", src:"Confucius"},
  {text:"The more you know, the more you realize you do not know.", src:"Aristotle"},
  {text:"Pleasure in the job puts perfection in the work.", src:"Aristotle"},
  {text:"It is during our darkest moments that we must focus to see the light.", src:"Aristotle"},
  {text:"The whole is greater than the sum of its parts.", src:"Aristotle"},
  {text:"Even the smallest person can change the course of the future.", src:"J.R.R. Tolkien"},
  {text:"Courage is found in unlikely places.", src:"J.R.R. Tolkien"},
  {text:"Life is not a problem to be solved, but a reality to be experienced.", src:"Soren Kierkegaard"},
  {text:"Life can only be understood backwards; but it must be lived forwards.", src:"Soren Kierkegaard"},
  {text:"Judge a man by his questions rather than by his answers.", src:"Voltaire"},
  {text:"Those who can make you believe absurdities can make you commit atrocities.", src:"Voltaire"},
  {text:"The limits of my language mean the limits of my world.", src:"Ludwig Wittgenstein"},
  {text:"It is the mark of an educated mind to be able to entertain a thought without accepting it.", src:"Aristotle"},
  {text:"Doubt is not a pleasant condition, but certainty is absurd.", src:"Voltaire"},
  {text:"The book of nature is written in the language of mathematics.", src:"Galileo Galilei"},
  {text:"And yet it moves.", src:"Galileo Galilei"},
  {text:"I have not failed. I have just found 10,000 ways that will not work.", src:"Thomas Edison"},
  {text:"Genius is one percent inspiration and ninety-nine percent perspiration.", src:"Thomas Edison"},
  {text:"Nothing in life is to be feared, it is only to be understood.", src:"Marie Curie"},
  {text:"If I have seen further it is by standing on the shoulders of Giants.", src:"Isaac Newton"},
  {text:"What we know is a drop, what we do not know is an ocean.", src:"Isaac Newton"},
  {text:"The first principle is that you must not fool yourself — and you are the easiest person to fool.", src:"Richard Feynman"},
  {text:"What I cannot create, I do not understand.", src:"Richard Feynman"},
  {text:"There are more things in heaven and earth, Horatio, than are dreamt of in your philosophy.", src:"Shakespeare"},
  {text:"To thine own self be true.", src:"Shakespeare"},
  {text:"Brevity is the soul of wit.", src:"Shakespeare"},
  {text:"There is nothing either good or bad, but thinking makes it so.", src:"Shakespeare"},
  {text:"Out, out, brief candle! Life is but a walking shadow.", src:"Shakespeare"},
  {text:"A rose by any other name would smell as sweet.", src:"Shakespeare"},
  {text:"If music be the food of love, play on.", src:"Shakespeare"},
  {text:"Some are born great, some achieve greatness, and some have greatness thrust upon them.", src:"Shakespeare"},
  {text:"The world is a book, and those who do not travel read only one page.", src:"Augustine of Hippo"},
  {text:"Things fall apart; the centre cannot hold.", src:"W.B. Yeats"},
  {text:"Beauty is truth, truth beauty — that is all ye know on earth, and all ye need to know.", src:"John Keats"},
  {text:"A thing of beauty is a joy forever.", src:"John Keats"},
  {text:"Lord, what fools these mortals be!", src:"Shakespeare"},
  {text:"All happy families are alike; each unhappy family is unhappy in its own way.", src:"Leo Tolstoy"},
  {text:"The strongest of all warriors are these two — Time and Patience.", src:"Leo Tolstoy"},
  {text:"So it goes.", src:"Kurt Vonnegut"},
  {text:"Everything was beautiful and nothing hurt.", src:"Kurt Vonnegut"},
  {text:"We are what we pretend to be, so we must be careful about what we pretend to be.", src:"Kurt Vonnegut"},
  {text:"We do not see things as they are. We see them as we are.", src:"Anaïs Nin"},
  {text:"The pen is mightier than the sword.", src:"Edward Bulwer-Lytton"},
  {text:"An eye for an eye will only make the whole world blind.", src:"Mahatma Gandhi"},
  {text:"Be the change that you wish to see in the world.", src:"Mahatma Gandhi"},
  {text:"First they ignore you, then they laugh at you, then they fight you, then you win.", src:"Mahatma Gandhi"},
  {text:"Happiness is when what you think, what you say, and what you do are in harmony.", src:"Mahatma Gandhi"},
  {text:"Live as if you were to die tomorrow. Learn as if you were to live forever.", src:"Mahatma Gandhi"},
  {text:"Strength does not come from physical capacity. It comes from an indomitable will.", src:"Mahatma Gandhi"},
  {text:"In the middle of difficulty lies opportunity.", src:"Albert Einstein"},
  {text:"Life is like riding a bicycle. To keep your balance, you must keep moving.", src:"Albert Einstein"},
  {text:"The most beautiful thing we can experience is the mysterious.", src:"Albert Einstein"},
  {text:"Gravitation is not responsible for people falling in love.", src:"Albert Einstein"},
  {text:"The most important decision you make is to be in a good mood.", src:"Voltaire"},
  {text:"What lies behind you and what lies in front of you pales in comparison to what lies inside of you.", src:"Ralph Waldo Emerson"},
  {text:"Do not go where the path may lead, go instead where there is no path and leave a trail.", src:"Ralph Waldo Emerson"},
  {text:"To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", src:"Ralph Waldo Emerson"},
  {text:"Between stimulus and response there is a space. In that space is our power to choose our response.", src:"Viktor Frankl"},
  {text:"Everything can be taken from a man but one thing: the last of the human freedoms — to choose ones attitude.", src:"Viktor Frankl"},
  {text:"Do something today that your future self will thank you for.", src:"Unknown"},
  {text:"Discipline is choosing between what you want now and what you want most.", src:"Unknown"},
  {text:"Every expert was once a beginner.", src:"Unknown"},
  {text:"Make each day your masterpiece.", src:"John Wooden"},
  {text:"Success is not final, failure is not fatal — it is the courage to continue that counts.", src:"Winston Churchill"},
  {text:"You do not rise to the level of your goals. You fall to the level of your systems.", src:"James Clear"},
  {text:"The secret of getting ahead is getting started.", src:"Mark Twain"},
  {text:"It does not matter how slowly you go as long as you do not stop.", src:"Confucius"},
  {text:"Be patient. The best things in life take time.", src:"Unknown"},
  {text:"Indeed, with hardship comes ease.", src:"Quran 94:6"},
  {text:"Speak good or remain silent.", src:"Prophet Muhammad"},
  {text:"Seek knowledge from the cradle to the grave.", src:"Prophet Muhammad"},
  {text:"The best of people are those who are most beneficial to others.", src:"Prophet Muhammad"},
  {text:"None of you truly believes until he loves for his brother what he loves for himself.", src:"Prophet Muhammad"},
  {text:"The ink of the scholar is more holy than the blood of the martyr.", src:"Prophet Muhammad"},
  {text:"There is no wealth like knowledge, no poverty like ignorance.", src:"Ali ibn Abi Talib"},
  {text:"Let go of what troubles you. What is meant for you will reach you.", src:"Ali ibn Abi Talib"},
  {text:"Patience is of two kinds: patience over what pains you, and patience against what you covet.", src:"Ali ibn Abi Talib"},
  {text:"Your remedy is within you, but you do not sense it.", src:"Ali ibn Abi Talib"},
  {text:"The greatest wealth is the richness of the soul.", src:"Rumi"},
  {text:"Out beyond ideas of wrongdoing and rightdoing, there is a field. I will meet you there.", src:"Rumi"},
  {text:"Doubt is the key to knowledge.", src:"Al-Ghazali"},
  {text:"He who knows himself knows his Lord.", src:"Ibn Arabi"},
  {text:"Do not despair of the mercy of Allah.", src:"Quran 39:53"},
  {text:"There is no god but God.", src:"Quran 47:19"},
  {text:"O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another.", src:"Quran 49:13"},
  {text:"So which of the favors of your Lord would you deny?", src:"Quran 55"},
  {text:"For indeed, with hardship comes ease. Indeed, with hardship comes ease.", src:"Quran 94:5"},
  {text:"The world is but a moment.", src:"Hasan al-Basri"},
];

export function QuoteWidget() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const lastRef = useRef(index);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = pickRandom(QUOTES, prev);
        lastRef.current = next;
        return next;
      });
    }, 40000);
    return () => clearInterval(interval);
  }, []);

  return (
    <HoloWrapper theme="orange" className="justify-center items-center text-center">
      <h2 className="absolute top-4 left-5 text-xs font-black font-mono text-orange-400 uppercase tracking-widest">Wisdom / Neural Node</h2>
      <div key={index} className="flex flex-col items-center gap-2 max-w-2xl px-4">
        <p className="text-xl lg:text-2xl font-bold italic text-orange-100 leading-relaxed tracking-wide">
          &ldquo;{QUOTES[index].text}&rdquo;
        </p>
        <p className="text-sm lg:text-base font-mono text-orange-200/60 tracking-wide">
          ~ {QUOTES[index].src}
        </p>
      </div>
    </HoloWrapper>
  );
}
