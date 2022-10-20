import { getCanvasContext } from "./getCanvasContext.js";

const drawTournament = function(canvas, title, finalist, match, result) {
	const getResult = function(id1, id2) { // ret: 0 none, -1: id1 won, 1: id2 won
		let r1 = null
		let r2 = null
		for (let i = 1; i < result.length; i++) {
			let r = result[i]
			if (r[2] == id1 && r[3] == id2) {
				r1 = r
			} else if (r[2] == id2 && r[3] == id1) {
				r2 = r
			}
		}
		let res = 0
		if (r1 && r2) {
			const p1 = parseInt(r1[4]) + parseInt(r2[5])
			const p2 = parseInt(r1[5]) + parseInt(r2[4])
		//			console.log(id1, "pnt:", p1, id2, "pnt:", p2);
		//			console.log(r1, r2);
			res = p1 > p2 ? -1 : 1
		}
		//console.log("getresult", id1, id2, res)
		return res
	}

	const g = getCanvasContext(canvas);
	g.draw = function() {
		g.setColor(0, 0, 0);
		g.fillRect(0, 0, g.cw, g.ch);
		
		var fillTextVertical = function(s, x, y, fw) {
			for (var i = 0; i < s.length; i++) {
				var c = s.charAt(i);
				if (c == "ー") {
					c = "｜";
				}
				var sw = g.measureText(c).width;
				g.fillText(c, x - sw / 2, y + fw * (i + 1));
			}
		}
		
		const items = finalist

		g.setColor(255, 255, 255)

		const fwt = g.ch / 20
		g.font = fwt + "px sans-serif";
		g.fillText(title, (g.cw - g.measureText(title).width) / 2, g.ch / 40 + fwt)

		const nameoff = g.cw / 40
		const nameoff2 = nameoff / 2
		const namew = (g.cw - nameoff * 2) / 4
		const nameoffy = g.ch / 40 + fwt * 1.5
		const nameh = g.ch - (g.ch / 40 + fwt * 2.5)
		const nameh2 = nameh / ((items.length - 1) / 2)
		const calcY = function(i) {
			const y = nameoffy + nameh2 * i - nameh2 / 2
			//console.log(i, y)
			return y
		}
		const pnt = []
		const series = match.series
		let fw = nameh2
		for (let i = 1; i < items.length; i++) {
			const item = items[series[i - 1]]
			const it = item[2]
			let len = it.length
			const n = it.indexOf('（') // 半角 ( にも対応
			if (n >= 0) {
				len = Math.max(n, it.length - n)
			}
			const w = Math.min(nameh2 * .4, namew / len)
			if (w < fw)
				fw = w
		}
		g.font = fw + "px sans-serif";

		//console.log(items)
		for (let i = 1; i < items.length; i++) {
			const id = series[i - 1];
			const item = items[id];
			const it = item[2];
			let x;
			let y;
			const left = i - 1 < (items.length - 1) / 2;
			if (left) {
				x = nameoff;
				y = calcY(i);
				pnt[id] = { id: id, eid: item[1], x: nameoff + namew + nameoff2, y: y - nameh2 / 6 * 0 };
			} else {
				x = g.cw - nameoff - namew;
				y = calcY(items.length - i);
				pnt[id] = { id: id, eid: item[1], x: g.cw - nameoff - namew - nameoff2, y: y - nameh2 / 6 * 0 };
			}
			const n = it.indexOf('（');
			if (n >= 0 && namew / it.length < fw) {
				let s = it.substring(0, n);
				let sx = left ? x + namew - g.measureText(s).width : x;
				g.fillText(s, sx, y - fw * 0.1);
				s = it.substring(n);
				sx = left ? x + namew - g.measureText(s).width : x;
				g.fillText(s, sx, y + fw * 1.1);
			} else {
				const sw = g.measureText(it).width;
				const sx = left ? x + namew - sw : x;
				g.fillText(it, sx, y + fw / 2);
			}
		}

		const setColor = function(res, left) {
			if (res < 0 && left || res > 0 && !left) {
				g.setColor(255, 0, 0);
			} else {
				g.setColor(255, 255, 255);
			}
		}
		const setColor2 = function(res) {
			if (res) {
				g.setColor(255, 0, 0);
			} else {
				g.setColor(255, 255, 255);
			}
		}
		const matchf = match.match;

		const linew = g.cw / 100 * (4 / matchf.length);
		const line = function(x1, y1, x2, y2) {
			g.beginPath();
			g.lineWidth = linew;
			g.lineCap = "round";
			g.moveTo(x1, y1);
			g.lineTo(x2, y2);
			g.stroke();
		}

//		console.log(pnt)
		const lw = (g.cw - (nameoff + namew + nameoff2) * 2) / (matchf.length * 2);
		const lineoff = nameoff + namew + nameoff2;
		for (let i = 0; i < matchf.length; i++) {
			const mm = matchf[i];
			for (let j = 0; j < mm.length; j++) {
				const m = mm[j];
				const pa = pnt[m[0]];
				const pb = pnt[m[1]];
				const res = getResult(pa.eid, pb.eid);
				if (pa.x < g.cw / 2 && pb.x > g.cw / 2) {
					const pcx = (pa.x + pb.x) / 2;
					setColor(res, true);
					line(pa.x, pa.y, pcx, pa.y);
					setColor(res, false);
					line(pb.x, pa.y, pcx, pa.y);
					setColor2(res);
					line(pcx, pa.y, pcx, pa.y - lw);
				} else if (pa.x < g.cw / 2) {
					const pcx = lineoff + lw * (i + 1);
					const pcy = (pa.y + pb.y) / 2;
					
					if (true) { // i == 0) {
						setColor(res, true);
						line(pa.x, pa.y, pcx, pa.y);
						setColor(res, false);
						line(pb.x, pb.y, pcx, pb.y);
					} else {
						setColor2(true)
						//setColor2(res)
						line(pa.x, pa.y, pcx, pa.y);
						line(pb.x, pb.y, pcx, pb.y);
					}
					setColor(res, true)
					line(pcx, pa.y, pcx, pcy)
					setColor(res, false)
					line(pcx, pb.y, pcx, pcy)
					
					pnt[m[2]] = { x: pcx, y: pcy }
				} else {
					const pcx = g.cw - lineoff - lw * (i + 1)
					const pcy = (pa.y + pb.y) / 2

					if (true) { // i == 0) {
						setColor(res, true)
						line(pa.x, pa.y, pcx, pa.y)
						setColor(res, false)
						line(pb.x, pb.y, pcx, pb.y)
					} else {
						setColor2(true)
						//setColor2(res)
						line(pa.x, pa.y, pcx, pa.y)
						line(pb.x, pb.y, pcx, pb.y)
					}
					setColor(res, true)
					line(pcx, pa.y, pcx, pcy)
					setColor(res, false)
					line(pcx, pb.y, pcx, pcy)

					pnt[m[2]] = { x: pcx, y: pcy }
				}
				if (res) {
					const p = pnt[m[2]]
					if (p) {
						p.id = res < 0 ? pa.id : pb.id
						p.eid = res < 0 ? pa.eid : pb.eid
					}
				}
			}
		}
	}
	/*
	setUI(c);
	c.onuidown = function(x, y) {
		for (var i = 0; i < stacks.length; i++) {
			var st = stacks[i];
			for (var j = 0; j < st.length; j++) {
				var stj = st[j];
				if (isNear(stj.x * g.cw, stj.y, x, y)) {
					console.log(i, j, stj.winner);
					if (stj.winner) {
						stj.winner = stj.winner == stj.right ? stj.left : stj.right;
						console.log("toggle");
					} else {
						stj.winner = stj.right;
						console.log("right " + stj.right);
					}
				}
			}
		}
		g.draw();
	};
	var isNear = function(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		var w = g.cw / item.length / 4;
//		console.log(dx, dy, w, x1, y1, x2, y2);
//		alert(w);
		return dx * dx + dy * dy < w * w;
	};
	c.onmousedown = function(e) {
		console.log(e);
//		mx = e.pageX;
//		my = e.pageY;
//		alert(e.pageX);
	};
	*/
	window.onresize = function() {
		canvas.style.height = window.innerHeight + "px"
		g.init()
	}
	canvas.style.height = window.innerHeight + "px"
	g.init()
};

export { drawTournament };
