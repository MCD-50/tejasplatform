const xlsx = require("node-xlsx");

class Piper {
	stream(fileurl, callback) {
		try {
			var obj = xlsx.parse(fileurl); // parses a file
			obj.forEach(x => {
				if (x.data && x.data.length > 0) {
					// eslint-disable-next-line no-unused-vars
					const header = x.data[0].slice();
					for (var i = 1; i < x.data.length; i++) {
						const items = x.data[i].slice();
						const entry = {
							market: items[header.indexOf("Exch.")],
							target: items[header.indexOf("Descr.")],
							bid_qty: items[header.indexOf("Bid Qty")],
							ask_qty: items[header.indexOf("Ask Qty")],
							bid: items[header.indexOf("Bid")],
							ask: items[header.indexOf("Ask")],
							ltp: items[header.indexOf("LTP")],
							volume: items[header.indexOf("Volume")],
							change: items[header.indexOf("%Chg")],
							high: items[header.indexOf("High")],
							low: items[header.indexOf("Low")],
							open: items[header.indexOf("Open")],
							close: items[header.indexOf("Close")],
						};

						callback({...entry});
					}
				}
			});
		} catch (exe) {
			console.log(exe);
		}
	}
}


const piper = new Piper();
export default piper;


