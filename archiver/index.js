const archiver = require("archiver");
const fs = require("fs");
const path = require("path");

module.exports = (file, io, data) => {
  const outputFilePath = path.join(__dirname, "../public/sites", `${file}.zip`);
  const output = fs.createWriteStream(outputFilePath);
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on("close", function () {
    console.log(`Total bytes: ${archive.pointer()}`);
    console.log(
      "Archiver has been finished and the output file descriptor has been closed."
    );
    io.emit(data.token, { progress: "Completed", file });
  });

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on("end", function () {
    console.log("Data has been drained.");
  });

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on("warning", function (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  });

  archive.on("error", function (err) {
    throw err;
  });

  archive.pipe(output);

  // append files from a sub-directory and naming it `new-subdir` within the archive
  archive.directory("./" + file, false);

  // finalize the archive (ie we are done appending files but streams have to finish yet)
  // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  archive.finalize();
};
