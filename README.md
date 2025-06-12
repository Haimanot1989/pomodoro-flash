# Pomodoro Flash

A simple, professional Pomodoro timer app with a focus/break cycle, sound alarm, and session tracking. Built with Node.js and vanilla JavaScript/HTML.

## Features
- Focus and break timer with customizable durations
- Start, pause, resume, and stop controls
- Alarm sound at the end of each phase (plays for 5 seconds)
- Pomodoro counter (session and total)
- Visuals for focus, break, and start screens
- One-command startup (server and app)
- Clean, responsive UI

## Setup & Usage

1. **Clone the repository**
   ```sh
   git clone https://github.com/Haimanot1989/pomodoro-flash.git
   cd pomodoro-flash
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Add your images and alarm**
   - Place `focus.jpg`, `image.jpg`, `start.jpg`, and `alarm.mp3` in the `server/` directory.
4. **Start the app**
   ```sh
   node pomodoro.js
   ```
   This will launch the server and open the Pomodoro app in your browser.

## Project Structure
```
pomodoro-flash/
├── pomodoro.js           # Main entry, starts server and app
├── static-server.js      # Static file server
├── server/
│   ├── popup.html        # Main UI
│   ├── focus.jpg         # Focus image
│   ├── image.jpg         # Break image
│   ├── start.jpg         # Start screen image
│   └── alarm.mp3         # Alarm sound
└── README.md
```

## Scripts
- `node pomodoro.js` — Start everything

## Screenshots
_Add screenshots here after running the app._

## License
MIT

---
_This project is ready for your IT/portfolio presentation!_

