const axios = require("axios");

async function getWords(req, res, next) {
  try {
    const response = await axios.get(
      "https://www.palabrasaleatorias.com/?fs=3&fs2=0&Submit=Nueva+palabra"
    );
    let regex = new RegExp(`http://www.qsignifica.net/\\w+`, "gi");

    const result = response.data
      .match(regex)
      .map((s) => s.replace("http://www.qsignifica.net/", ""));

    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getWords,
};
