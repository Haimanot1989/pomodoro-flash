const { exec, spawn } = require("child_process");
const http = require("http");

// Start the static server as a child process
const serverProcess = spawn("node", ["static-server.js"], {
  cwd: __dirname,
  stdio: "inherit"
});

// Wait for the server to be ready
function waitForServerReady(callback, retries = 20) {
  http.get("http://localhost:5000", res => {
    if (res.statusCode === 200) {
      callback();
    } else {
      retry();
    }
  }).on("error", retry);

  function retry() {
    if (retries > 0) {
      setTimeout(() => waitForServerReady(callback, retries - 1), 300);
    } else {
      console.error("Server did not start in time.");
      process.exit(1);
    }
  }
}

function openPopup(mode = "focus") {
  const url = `http://localhost:5000/popup.html?mode=${mode}`;
  exec(`open "${url}"`, (err) => {
    if (err) console.error(`Failed to open popup: ${err.message}`);
  });
}

waitForServerReady(() => {
  openPopup();
});
