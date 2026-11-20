(function (root) {
  function num(v, name) {
    const x = Number(v);
    if (!Number.isFinite(x) || x <= 0) throw new Error(name + ' must be a positive number');
    return x;
  }
  function cycloid(d, parts) {
    if (!Number.isFinite(d) || d <= 0) throw new Error('Diameter must be a positive number');
    parts = parts || 12;
    if (!Number.isInteger(parts) || parts < 4) throw new Error('Use at least 4 equal divisions (12 is the usual exam choice)');
    const r = d / 2;
    const pts = [];
    for (let i = 0; i <= parts; i++) {
      const deg = 360 * i / parts;
      const th = deg * Math.PI / 180;
      pts.push({ i: i, deg: deg, x: r * (th - Math.sin(th)), y: r * (1 - Math.cos(th)) });
    }
    const roll = 2 * Math.PI * r;
    return { kind: 'cycloid', d, r, parts, pts, roll, height: 2 * r };
  }
  function involute(d, parts, turns) {
    if (!Number.isFinite(d) || d <= 0) throw new Error('Diameter must be a positive number');
    parts = parts || 12;
    turns = turns == null ? 1 : turns;
    if (!Number.isInteger(parts) || parts < 4) throw new Error('Use at least 4 equal divisions (12 is the usual exam choice)');
    if (!(turns > 0)) throw new Error('Turns must be positive');
    const R = d / 2;
    const total = parts * turns;
    const pts = [];
    const arc = [];
    for (let i = 0; i <= total; i++) {
      const deg = 360 * i / parts;
      const th = deg * Math.PI / 180;
      // Unrolling from (R, 0): x = R (cos th + th sin th), y = R (sin th - th cos th)
      pts.push({ i: i, deg: deg, x: R * (Math.cos(th) + th * Math.sin(th)), y: R * (Math.sin(th) - th * Math.cos(th)), arc: R * th });
      arc.push(R * th);
    }
    return { kind: 'involute', d, R, parts, turns, pts, circum: 2 * Math.PI * R };
  }
  function format(r) {
    const f = n => (Math.round(n * 100) / 100).toFixed(2);
    let out;
    if (r.kind === 'cycloid') {
      out = 'Cycloid of a rolling circle, diameter ' + r.d + ' mm (r = ' + r.r + ' mm)\n';
      out += 'Length of the directing line for one revolution = 2 pi r = ' + f(r.roll) + ' mm\n';
      out += 'Maximum height = 2r = ' + f(r.height) + ' mm\n';
      out += 'Divide the rolling circle and the directing line into ' + r.parts + ' equal parts (' + f(r.roll / r.parts) + ' mm each).\n\n';
      out += 'Point   theta     x mm      y mm\n';
      r.pts.forEach(p => { out += String(p.i).padStart(5) + '  ' + String(Math.round(p.deg)).padStart(5) + ' deg  ' + f(p.x).padStart(8) + '  ' + f(p.y).padStart(8) + '\n'; });
      out += '\nOn the sheet: roll the circle along a straight line of length 2 pi r. After k divisions, the centre has moved k * (2 pi r / n), and the point is found by rotating the radius through the same angle. Join the points with a fair curve.';
    } else {
      out = 'Involute of a base circle, diameter ' + r.d + ' mm (R = ' + r.R + ' mm)\n';
      out += 'Circumference = 2 pi R = ' + f(r.circum) + ' mm\n';
      out += 'Divide the base circle into ' + r.parts + ' equal parts. Each corresponding tangent is marked equal to the unrolled arc, R * theta.\n\n';
      out += 'Point   theta     arc mm    x mm      y mm\n';
      r.pts.forEach(p => { out += String(p.i).padStart(5) + '  ' + String(Math.round(p.deg)).padStart(5) + ' deg  ' + f(p.arc).padStart(8) + '  ' + f(p.x).padStart(8) + '  ' + f(p.y).padStart(8) + '\n'; });
      out += '\nOn the sheet: draw a tangent at each division point, and mark off the arc length of the unrolled part (division 1: one arc, division 2: two arcs, ...). Join the marks with a fair curve. That curve is the involute.';
    }
    return out;
  }
  function svg(r) {
    const xs = r.pts.map(p => p.x), ys = r.pts.map(p => p.y);
    const minX = Math.min(0, ...xs) - 8, maxX = Math.max(...xs) + 8;
    const minY = Math.min(0, ...ys) - 8, maxY = Math.max(...ys) + 8;
    const w = maxX - minX, h = maxY - minY;
    const pts = r.pts.map(p => (p.x - minX).toFixed(2) + ',' + (maxY - p.y).toFixed(2)).join(' ');
    return '<svg viewBox="0 0 ' + w.toFixed(2) + ' ' + h.toFixed(2) + '" xmlns="http://www.w3.org/2000/svg" aria-label="plot of the curve"><polyline fill="none" stroke="#111" stroke-width="1.2" points="' + pts + '"/></svg>';
  }
  const api = { num, cycloid, involute, format, svg };
  if (typeof module !== 'undefined') module.exports = api; else root.CURVE = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
