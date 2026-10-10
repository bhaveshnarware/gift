# A Special Birthday Surprise 🎂

A cinematic, emotional, and interactive birthday surprise web application built with **React**, **Vite**, **Framer Motion**, **Lucide Icons**, and the **Web Audio API**.

Designed especially for mobile and desktop screens with a romantic dark plum, warm pink, and peach aesthetic.

---

## ✨ Features & Storyline (8 Interactive Pages)

1. **Page 1: A Beautiful Introduction**
   - Delicate animated line-drawing heart with glowing pulse.
   - Interactive pull-string/ribbon with draggable & clickable heart handle.
   - Smooth transition into the celebration.

2. **Page 2: The Birthday Reveal**
   - Floating heart balloon bouquet with swaying physics.
   - Gentle floating confetti motes.
   - Personalized birthday announcement: *"Happy Birthday, [BESTIE_NAME]! 🎂 And just like that, you're turning [AGE] ✨"*.

3. **Page 3: The Birthday Cake**
   - Animated multi-tiered birthday cake with golden sprinkles and glowing candle flame.
   - Tap-to-blow-out candle interaction.
   - Extinguishes the flame with a realistic smoke puff, whoosh & chime audio, and confetti blast.
   - Reveals an emotional birthday wish card.

4. **Page 4: Pop the Balloons**
   - 5 colorful floating balloons holding personalized reasons why they are loved.
   - Pop animations, audio pops, localized confetti bursts, and individual reason cards.
   - Live counter tracking remaining balloons.
   - Grand celebration message once all 5 are popped.

5. **Page 5: Our Memory Lane**
   - Scrapbook-style polaroid photo gallery using real uploaded photos (`photo1` to `photo5`).
   - Touch gesture swiping on mobile and left/right arrows on desktop.
   - Date tags, titles, and emotional captions.
   - Click/tap to zoom into full-screen view.

6. **Page 6: A Personal Letter**
   - Vintage parchment card with wax heart seal and delicate drop shadow.
   - Typewriter text animation revealing heartfelt words.
   - **Live In-App Editing**: Click the "Edit" button at any time to customize the letter directly on screen and save changes instantly!
   - Beating heart animation at the bottom.

7. **Page 7: The Grand Birthday Celebration**
   - Full-screen celebration with gold and rose radiant typography.
   - Continuous shower of confetti and floating stars.
   - Uplifting message and transition button to the final surprise.

8. **Page 8: The Surprise Gift**
   - 3D-styled animated gift box with golden ribbon and bow.
   - Interactive "Unwrap It 🎁" button that animates the lid opening with celebratory fanfare audio.
   - Reveals a special framed portrait and the final personalized birthday message.
   - "Replay the Experience 🔄" button to restart the journey from Page 1.

9. **🎵 Music & Sound System**
   - Built-in soothing ambient music box melody generated via the Web Audio API (zero external MP3 dependencies required).
   - Support for custom local audio files (`public/music.mp3` or URL configured in `birthdayConfig.js`).
   - Floating music toggle button with glowing soundwave pulse.
   - Realistic sound effects: balloon popping, candle blow-out, ribbon pull, and gift unwrap fanfare.

10. **⚙️ Live Personalization**
   - Click the gear/settings icon at the top-left to update **Best Friend's Name**, **Your Name**, **Age**, and **Birthday Date** at any time.

---

## 🛠️ Project Structure

```
bdaygift/
├── public/
│   ├── favicon.png
│   ├── grain.png
├── src/
│   ├── assets/
│   │   ├── photos/          # Real uploaded photos (photo1.jpg - photo5.jpg)
│   │   ├── textures/        # Film grain texture
│   │   └── audio/           # Optional local audio files
│   ├── components/
│   │   ├── AudioPlayer.jsx     # Floating music toggle button
│   │   ├── ProgressBar.jsx     # Top dot navigation & settings trigger
│   │   ├── SettingsModal.jsx   # Live personalization drawer
│   │   ├── PageIntro.jsx       # Page 1: Heart line drawing & pull ribbon
│   │   ├── PageReveal.jsx      # Page 2: Heart balloon bouquet
│   │   ├── PageCake.jsx        # Page 3: Cake & interactive candle blowout
│   │   ├── PageBalloons.jsx    # Page 4: 5 poppable balloons with reasons
│   │   ├── PageMemories.jsx    # Page 5: Polaroid scrapbook gallery
│   │   ├── PageLetter.jsx      # Page 6: Handwritten typewriter letter
│   │   ├── PageCelebration.jsx # Page 7: Grand celebration & typography
│   │   └── PageGift.jsx        # Page 8: Animated gift unbox & finale
│   ├── config/
│   │   └── birthdayConfig.js   # Central configuration for names, dates & messages
│   ├── utils/
│   │   ├── confetti.js         # Canvas confetti particle triggers
│   │   └── soundEffects.js     # Web Audio API music synth & SFX
│   ├── App.jsx                 # Main state & Framer Motion page orchestrator
│   ├── index.css               # Design system & cinematic styling
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or newer).

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173/`.

### 3. Build for Production
```bash
npm run build
```

---

## 🌐 Deploy to Vercel or Netlify

### Deploy on Vercel:
1. Push this repository to GitHub or GitLab.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import this repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **Deploy**!

### Deploy on Netlify:
1. Run `npm run build`.
2. Drag and drop the generated `dist/` folder into Netlify Drop, or connect via GitHub.
