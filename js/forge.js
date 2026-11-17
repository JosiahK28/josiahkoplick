/* Forge effects: rising embers, a warm glow that follows the pointer,
   and heat that tracks the pointer inside each door.
   Everything here is decoration; the page works without it. */
(function () {
  var root = document.documentElement;
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Pointer glow and door heat */
  var px = -1, py = -1, queued = false;
  window.addEventListener("pointermove", function (e) {
    px = e.clientX;
    py = e.clientY;
    if (!queued) {
      queued = true;
      requestAnimationFrame(function () {
        root.style.setProperty("--x", px + "px");
        root.style.setProperty("--y", py + "px");
        queued = false;
      });
    }
  }, { passive: true });

  var doors = document.querySelectorAll(".door");
  for (var i = 0; i < doors.length; i++) {
    doors[i].addEventListener("pointermove", function (e) {
      var r = this.getBoundingClientRect();
      this.style.setProperty("--mx", (e.clientX - r.left) + "px");
      this.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
  }

  /* Embers */
  var canvas = document.getElementById("embers");
  if (!canvas || reduce || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var dpr = 1, w = 0, h = 0, embers = [], target = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    target = Math.round(Math.min(150, Math.max(40, (w * h) / 9000)));
  }

  function spawn(anywhere) {
    var max = 260 + Math.random() * 420;
    return {
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10 + Math.random() * 40,
      vy: 0.25 + Math.random() * 0.85,
      vx: (Math.random() - 0.5) * 0.15,
      r: 0.5 + Math.pow(Math.random(), 3) * 2.2,
      sway: 0.3 + Math.random() * 0.9,
      freq: 0.004 + Math.random() * 0.01,
      phase: Math.random() * Math.PI * 2,
      hue: 18 + Math.random() * 28,
      life: anywhere ? Math.random() * max : 0,
      max: max
    };
  }

  resize();
  for (var n = 0; n < target; n++) embers.push(spawn(true));
  window.addEventListener("resize", resize);

  var last = performance.now(), running = true;

  function frame(now) {
    if (!running) return;
    var dt = Math.min((now - last) / 16.667, 3);
    last = now;

    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";

    while (embers.length < target) embers.push(spawn(false));
    if (embers.length > target) embers.length = target;

    for (var i = 0; i < embers.length; i++) {
      var e = embers[i];
      e.life += dt;
      e.phase += e.freq * dt;
      e.y -= e.vy * dt;
      e.x += (e.vx + Math.sin(e.phase) * e.sway * 0.35) * dt;

      if (px >= 0) {
        var dx = e.x - px, dy = e.y - py, d2 = dx * dx + dy * dy;
        if (d2 < 14400 && d2 > 1) {
          var f = (1 - d2 / 14400) * 1.4 * dt;
          var d = Math.sqrt(d2);
          e.x += (dx / d) * f;
          e.y += (dy / d) * f;
        }
      }

      var t = e.life / e.max;
      if (t >= 1 || e.y < -20) { embers[i] = spawn(false); continue; }

      var a = (t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85);
      a *= 0.55 + 0.45 * Math.sin(e.life * 0.2 + e.phase * 3);
      if (a <= 0) continue;

      var light = 55 + (1 - t) * 25;
      var rad = e.r * 4;
      var g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, rad);
      g.addColorStop(0, "hsla(" + (e.hue + 15) + ",100%," + light + "%," + a + ")");
      g.addColorStop(0.3, "hsla(" + e.hue + ",95%,50%," + (a * 0.45) + ")");
      g.addColorStop(1, "hsla(" + e.hue + ",90%,40%,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(e.x, e.y, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(frame);
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      running = false;
    } else if (!running) {
      running = true;
      last = performance.now();
      requestAnimationFrame(frame);
    }
  });

  requestAnimationFrame(frame);
})();
