const C = require('./tool.js');
const near = (a, b, eps, msg) => { if (Math.abs(a - b) > (eps == null ? 1e-9 : eps)) throw Error((msg || 'near') + ': ' + a + ' vs ' + b); };
const eq = (a, b, msg) => { if (JSON.stringify(a) !== JSON.stringify(b)) throw Error((msg || 'eq') + ': ' + JSON.stringify(a) + ' vs ' + JSON.stringify(b)); };

const cy = C.cycloid(60, 12);
near(cy.r, 30);
near(cy.roll, 2 * Math.PI * 30);
near(cy.height, 60);
near(cy.pts[0].x, 0); near(cy.pts[0].y, 0);
near(cy.pts[6].x, Math.PI * 30); near(cy.pts[6].y, 60); // 180 deg
near(cy.pts[3].x, 30 * (Math.PI / 2 - 1)); near(cy.pts[3].y, 30); // 90 deg
near(cy.pts[12].x, 2 * Math.PI * 30); near(cy.pts[12].y, 0);
eq(cy.pts.length, 13);

const inv = C.involute(80, 12, 1);
near(inv.R, 40);
near(inv.pts[0].x, 40); near(inv.pts[0].y, 0); near(inv.pts[0].arc, 0);
const th = Math.PI / 2;
near(inv.pts[3].arc, 40 * th);
near(inv.pts[3].x, 40 * (Math.cos(th) + th * Math.sin(th)));
near(inv.pts[3].y, 40 * (Math.sin(th) - th * Math.cos(th)));
near(inv.pts[3].x, 20 * Math.PI);
near(inv.pts[3].y, 40);

const throws = (fn) => { try { fn(); } catch (e) { return; } throw Error('expected an error'); };
throws(() => C.cycloid(-10, 12));
throws(() => C.cycloid(60, 2));

console.log('All checks passed');
