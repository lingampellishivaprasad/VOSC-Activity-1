# 🎮 Tic-Tac-Toe Game

A responsive and interactive **Tic-Tac-Toe web game** built using **HTML, CSS, and JavaScript**.

The game provides a colorful gaming interface where players can play Tic-Tac-Toe, restart games, and keep track of their scores.

## 🚀 Features

* 🎮 Player vs Player mode
* 🤖 Player vs AI mode
* 🟢 Easy AI difficulty
* 🟡 Medium AI difficulty
* 🔴 Impossible AI difficulty
* ❌ X and ⭕ O symbol selection
* 🏆 Score tracking
* 🔄 Restart game option
* 🆕 New game option
* 🌙 Dark/Light theme support
* 🔊 Sound effects
* 📊 Game statistics
* 📜 Game history
* ✨ Animated and responsive user interface
* 📱 Works on desktop and mobile screens
* 💾 Local storage for saving game-related data

## 🛠️ Technologies Used

* **HTML5** — Structure of the game
* **CSS3** — Styling, responsive design, colors, and animations
* **JavaScript** — Game logic, AI, score tracking, and user interaction
* **LocalStorage** — Storing scores, statistics, and game history

## 📂 Project Structure

```text
tic-tac-toe/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

Contains the structure of the game interface, including:

* Game setup
* Game board
* Player controls
* Scoreboard
* Statistics
* Game history
* Result modal

### `style.css`

Contains:

* Game colors
* Layout
* Responsive design
* Buttons
* Animations
* Board styling
* Themes
* Visual effects

### `script.js`

Contains the main game functionality:

* Player turns
* Winner detection
* Draw detection
* Restart and new game
* AI gameplay
* Difficulty levels
* Score management
* Game history
* Theme and sound controls

## ▶️ How to Run

### Method 1 — Open Directly

1. Download or clone this repository.
2. Open the project folder.
3. Double-click **`index.html`**.
4. The game will open in your web browser.

No server or additional software is required.

### Method 2 — Using VS Code

1. Open the project folder in **Visual Studio Code**.
2. Make sure these files are in the same folder:

```text
index.html
style.css
script.js
```

3. Open `index.html`.
4. Run it using a browser or the **Live Server** extension.
5. Start playing.

## 🎯 How to Play

### Player vs Player

1. Select **Player vs Player**.
2. Select your symbol — X or O.
3. Click **Start Game**.
4. Players take turns clicking empty cells.
5. The first player to get three matching symbols in a row wins.

A winning combination can be:

```text
X | X | X
---------
O | O | -
---------
- | - | -
```

or vertically:

```text
X | O | -
---------
X | O | -
---------
X | - | -
```

or diagonally:

```text
X | O | -
---------
O | X | -
---------
- | - | X
```

If all nine cells are filled and nobody gets three in a row, the game ends in a **draw**.

### Player vs AI

1. Select **Player vs AI**.
2. Select the desired difficulty:

   * Easy
   * Medium
   * Impossible
3. Select X or O.
4. Click **Start Game**.
5. Play against the computer.

## 🤖 AI Difficulty

### Easy

The AI selects an available cell using a simple strategy.

### Medium

The AI considers possible winning and blocking moves before selecting a move.

### Impossible

The AI uses the **Minimax algorithm** to evaluate possible moves and make optimal decisions for a standard 3×3 Tic-Tac-Toe board.

## 🏆 Score Tracking

The game keeps track of:

* X wins
* O wins
* Draws
* Games played
* Total wins
* Total losses
* Total draws
* Win rate
* Previous game results

Game-related information can be stored locally in the browser using **LocalStorage**.

## 🎨 User Interface

The game includes a colorful gaming-style interface with:

* Gradient colors
* Neon-style effects
* Button animations
* Winning-cell animations
* Responsive layout
* Dark/light theme
* Result popup

## 💻 Browser Compatibility

The game can be played in modern browsers such as:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

## 📌 Project Purpose

This project was created as part of **VOSC Activity-1** to demonstrate practical knowledge of front-end web development using HTML, CSS, and JavaScript.

It also demonstrates how JavaScript can be used to implement game logic, user interaction, AI decision-making, browser storage, and dynamic UI updates.

## 👨‍💻 Author

**Lingampelli Shivaprasad**

B.Tech — Computer Science and Engineering
Vasavi College of Engineering

## 📄 License

This project is created for educational and learning purposes.

