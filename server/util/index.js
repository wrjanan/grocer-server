// This will redirect any HTTP to HTTPS
const redirectToHttps = (app) => {

  // This method will be used below to force HTTPS on any requests
  function checkHttpsAndRedirectIfNeeded(request, response, next) {

    const xforwardprotoCheck = request.get("X-Forwarded-Proto") != null && request.get("X").indexOf("https") != -1;
    const protocolCheck = request.protocol === "https";
    // Check the protocol — if http, redirect to https.
    if (xforwardprotoCheck || protocolCheck) {
      return next();

    } else {
      response.redirect("https://" + request.hostname + request.url);
    }
  }

  // Force HTTPS
  app.all("*", checkHttpsAndRedirectIfNeeded);
}

module.exports = { redirectToHttps };