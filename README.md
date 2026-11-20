# GTU EGD cycloid and involute plotter: 12-division construction table, coordinates and a sketch

GTU Hero's EGD guide puts Engineering Curves (Conics, Cycloidal, Involutes, Spirals) in Unit 2 of the new scheme (BE01000061 / BE01R00061), 10% and practical, and lists an engineering curve (ellipse, parabola, or involute) as a 7-mark type that is present in both schemes. Diameter daalo: this page prints a 12-division table of coordinates for a cycloid or for the involute of a circle, plus a small sketch you can check your sheet against. Practice diameters are my own, not from a GTU paper. 12 equal parts, arc lengths mark karo, phir fair curve se join karna.

Live page: https://princeadvant.github.io/gtu-egd-cycloid-involute-plotter/

## Facts used

- A cycloid is the path of a point on a circle that rolls, without slip, on a straight line. For one revolution the directing line has length 2 pi r, and the maximum height is 2r.
- Standard construction: divide the rolling circle and the directing line into the same number of equal parts (usually 12). After k parts, the centre has moved k / n of 2 pi r, and the tracing point has rotated through k / n of 360 degrees.
- An involute of a circle is the path of a point on a tight string as the string is unrolled from the base circle. Each tangent is marked equal to the unrolled arc length R * theta.
- Default practice: a 60 mm rolling circle cycloid, 12 divisions. At 90 degrees, (x, y) = (30(pi/2 - 1), 30) mm. At 180 degrees, (30 pi, 60) mm. For an 80 mm base-circle involute, the 90 degree point is (20 pi, 40) mm.
- The guide lists cycloidal curves and involutes in Unit 2 of the new scheme, and names involute as one of the 7-mark engineering-curve options (with ellipse and parabola). Dimensions and the asked method change every session. Past pattern is not a promise.

## Test

`node test.js` checks the calculations against hand-worked values and prints `All checks passed`.

## Tips

- Write which curve you are drawing, the diameter, and the number of divisions, before the table. A sketch without the construction steps is easy to under-mark.
- For a cycloid, the directing line must be exactly 2 pi r, not the diameter. Using d instead of 2 pi r shortens the whole curve.
- For an involute, the length on the tangent equals the unrolled arc, not the chord. Division 3 gets three arc steps, not three chords.
- New-scheme students still have Unit 2 curves. Old-scheme isometric projection is a different topic (and is not in the new scheme). Do not mix the two.
- If the exam is tomorrow and you have to skip something, the guide's last-night plan puts scales and curves below lines, planes and orthographic. Practise at least one involute or cycloid anyway if Unit 2 is in your syllabus.

Unit weightages for both schemes and the topics new-scheme students can skip: [GTU Hero EGD guide](https://gtuhero.com/blogs/gtu-egd-paper-engineering-graphics-pyq) (GTU Hero is my project).
