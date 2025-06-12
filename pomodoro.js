const { exec, spawn } = require("child_process");
const http = require("http");

// Find a free port starting from 5000
function findFreePort(start, cb) {
  const server = http.createServer();
  server.listen(start, () => {
    server.once('close', () => cb(start));
    server.close();
  });
  server.on('error', () => findFreePort(start + 1, cb));
}

function openPopup(port, mode = "focus") {
  const url = `http://localhost:${port}/popup.html?mode=${mode}`;
  exec(`open "${url}"`, (err) => {
    if (err) console.error(`Failed to open popup: ${err.message}`);
  });
}

findFreePort(5000, (port) => {
  // Start the static server as a child process on the free port
  const serverProcess = spawn("node", ["static-server.js", port], {
    cwd: __dirname,
    stdio: "inherit",
    env: { ...process.env, PORT: port }
  });

  // Wait for the server to be ready
  function waitForServerReady(callback, retries = 20) {
    http.get(`http://localhost:${port}`, res => {
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

  waitForServerReady(() => {
    openPopup(port);
  });
});
