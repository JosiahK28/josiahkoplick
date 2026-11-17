(function () {
  var clock = document.getElementById("clock");
  if (!clock) return;

  var format = new Intl.DateTimeFormat("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  });

  function tick() {
    var now = new Date();
    var text = format.format(now);
    clock.textContent = text;
    clock.dateTime = now.toISOString();
    clock.setAttribute("aria-label", "Local time " + text);
  }

  tick();
  setInterval(tick, 30000);
})();
