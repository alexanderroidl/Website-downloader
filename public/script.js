let numberOfFiles = 0;
const downloadWebsite = document.getElementsByClassName("btn-success")[0];

const socket = io.connect(document.URL);
if (!localStorage["token"]) {
  localStorage["token"] = generateToken(20);
}

// wait for events for this token
socket.on(localStorage["token"], (event) => {
  document.getElementById("progress").hidden = false;

  if (event.progress == "Converting") {
    log.innerHTML = `<h5>100%! Compressing your website...</h5>`;
  } else if (event.progress == "Completed") {
    document.getElementById("progress").hidden = true;

    downloadWebsite.style = "display:";
    downloadWebsite.onclick = function () {
      window.location = "/sites/" + event.file + ".zip";
    };

    log.innerHTML = `<code>Compressing completed successfully.</code>`;
  } else {
    if (event.progress.includes("200 OK")) {
      numberOfFiles++;
    }
    document.getElementById("nFilesP").hidden = false;
    document.getElementById("nFiles").innerHTML = numberOfFiles;

    document.getElementById(
      "log"
    ).innerHTML = `<code> ${event.progress}</code>`;
  }
});

// Download a website on click
document.getElementById("download").onclick = () => {
  const token = localStorage["token"];
  const website = document.getElementById("website").value;
  socket.emit("request", { token, website });
};

function generateToken() {
  const length = 20;
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}
