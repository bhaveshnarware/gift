import photo1 from '../assets/photos/photo1.jpg';
import photo2 from '../assets/photos/photo2.png';
import photo3 from '../assets/photos/photo3.png';
import photo4 from '../assets/photos/photo4.jpg';
import photo5 from '../assets/photos/photo5.jpg';

export const initialBirthdayConfig = {
  // Personal Details
  bestieName: "Bestie",
  yourName: "Bhavesh",
  age: "21",
  birthdayDate: "October 11",

  // Audio Configuration
  // If you place a custom audio file in public/music.mp3 or provide an external URL, set it here.
  // When left null, the built-in ambient melodic music box plays automatically.
  musicPath: "/song.mp3",
  // Timestamp in seconds to start playing the song (1 min 58 sec = 118 seconds)
  musicStartTime: 118,

  // Page 1: Introduction
  introMessage: "A little something, just for you 💗",
  pullInstruction: "Pull the ribbon to reveal your surprise",

  // Page 2: The Birthday Reveal
  revealTagline: "It's officially your day!",
  revealSubtitle: "And just like that, you're turning",

  // Page 3: The Birthday Cake
  cakeHeading: "First things first 🎂",
  cakeSubtext: "Make a wish, birthday star ✨",
  cakeWishRevealed: "May all your secret wishes and sweetest dreams come true today! 🌟💖",

  // Page 4: Pop the Balloons (5 Reasons you're loved)
  balloonsHeading: "Pop the balloons 🎈",
  balloonsSubtitle: "Each one holds a reason you're loved.",
  balloonMessages: [
    {
      id: 1,
      color: "#ff6584",
      highlight: "#ffa3b5",
      accent: "#e02856",
      title: "Reason #1",
      message: "Your laugh is my absolute favorite sound in the whole world ❤️"
    },
    {
      id: 2,
      color: "#a06cd5",
      highlight: "#cfa6f7",
      accent: "#763fa8",
      title: "Reason #2",
      message: "You have this magical gift of making ordinary days feel extraordinary"
    },
    {
      id: 3,
      color: "#e07a5f",
      highlight: "#f5b09d",
      accent: "#c45436",
      title: "Reason #3",
      message: "No matter how many times we fight, you'll always have a special place in my heart. ❤️"
    },
    {
      id: 4,
      color: "#3d9970",
      highlight: "#82d4ae",
      accent: "#267350",
      title: "Reason #4",
      message: "Every single moment with you becomes a golden memory."
    },
    {
      id: 5,
      color: "#e88873",
      highlight: "#f7bfb2",
      accent: "#cc5e47",
      title: "Reason #5",
      message: "I could write a thousand more reasons, and it still wouldn't be enough to explain how special you are to me."
    }
  ],
  balloonsCompletedMessage: "And these are just five of a million reasons! 💗",

  // Page 5: Our Memory Lane
  memoryLaneTitle: "A walk down memory lane ✨",
  memoryLaneSubtitle: "Some moments become memories. Some people become family.",
  memories: [
    {
      id: 1,
      image: photo1,
      title: "Unforgettable times 💗",
      date: "first pic",
      caption: "“Our first picture will always be one of my favorite memories, because it captured the beginning of a friendship that means the world to me. ❤️📸”"
    },
    {
      id: 2,
      image: photo2,
      title: "Our funniest moment 😂",
      date: "favorite pic",
      caption: "I can never look at this without smiling. Nobody gets my jokes or laughs until crying quite like you do!"
    },
    {
      id: 3,
      image: photo3,
      title: "Memories I'll always keep ✨",
      date: "Special milestones",
      caption: "The world can get busy and chaotic, but being with you always feels like coming home."
    },
    {
      id: 4,
      image: photo4,
      title: "My favorite person 🫶",
      date: "Together always",
      caption: "Thank you for being the truest, warmest, and most incredible human being in my world."
    },
    {
      id: 5,
      image: photo5,
      title: "Pocket size bestie 📸",
      date: "Rock moments",
      caption: "She needs a ladder to reach my level, but somehow still bosses me around. 😭😂"
    }
  ],

  // Page 6: Personal Letter
  letter: {
    greeting: "Dear [BESTIE_NAME],",
    body: `Every year I try to find the perfect words, but every year I fall a little short, because how do you describe someone who makes ordinary days feel extraordinary?

Thank you for being my safe place, my happiness, and the person who makes even the simplest moments unforgettable.

I hope this new chapter brings you endless happiness, success, love, laughter, and every beautiful thing your heart deserves.

No matter where life takes us, I hope we always make time for more memories, more laughter, and more crazy adventures.

We can fight a hundred times, but I'll still choose you every time.

You deserve the world and so much more ❤️.

Happy Birthday to my favorite person! ❤️`,
    signOff: "With lots of love,",
    author: "[YOUR_NAME]"
  },

  // Page 7: Final Birthday Celebration
  celebrationTitle: "HAPPY BIRTHDAY",
  celebrationMessage: `Today is all about YOU.
Keep shining, keep smiling, and never stop being amazing.

The world is a better place with you in it. 💗`,

  // Page 8: The Surprise Gift
  giftSubtitle: "This little surprise is made with love ❤️",
  giftRevealedMessage: `Thank you for being YOU.

Here's to more memories, more laughter, and countless beautiful moments together.

You will always have a special place in my heart.

Made with love, just for you. 💗`,
  giftImage: photo3
};
