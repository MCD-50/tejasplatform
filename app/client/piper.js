const fs = require("fs");

const xlsx = require("node-xlsx");

class Piper {
	stream(fileurl, callback) {
		try {

			const write_stream = fs.createWriteStream(fileurl);
			// write_stream.write("", "base64");

			// the finish event is emitted when all data has been flushed from the stream
			// write_stream.on("finish", () => console.log("save success"));
			// write_stream.on("error", () => console.log("save error"));

			// close the stream
			write_stream.end();

			var obj = xlsx.parse(fileurl); // parses a file
			obj.forEach(x => {
				if (x.data && x.data.length > 0) {
					// eslint-disable-next-line no-unused-vars
					const header = x.data[0].slice();
					for (var i = 1; i < x.data.length; i++) {
						const items = x.data[i].slice();

						if ((items[header.indexOf("Exch.")] != null || items[header.indexOf("Exch.")] != undefined)
							&& (items[header.indexOf("Descr.")] != null || items[header.indexOf("Descr.")] != undefined)
							&& (items[header.indexOf("Bid Qty")] != null || items[header.indexOf("Bid Qty")] != undefined)
							&& (items[header.indexOf("Ask Qty")] != null || items[header.indexOf("Ask Qty")] != undefined)
							&& (items[header.indexOf("Bid")] != null || items[header.indexOf("Bid")] != undefined)
							&& (items[header.indexOf("Ask")] != null || items[header.indexOf("Ask")] != undefined)
							&& (items[header.indexOf("LTP")] != null || items[header.indexOf("LTP")] != undefined)
							&& (items[header.indexOf("Volume")] != null || items[header.indexOf("Volume")] != undefined)
							&& (items[header.indexOf("%Chg")] != null || items[header.indexOf("%Chg")] != undefined)
							&& (items[header.indexOf("High")] != null || items[header.indexOf("High")] != undefined)
							&& (items[header.indexOf("Low")] != null || items[header.indexOf("Low")] != undefined)
							&& (items[header.indexOf("Open")] != null || items[header.indexOf("Open")] != undefined)
							&& (items[header.indexOf("Close")] != null || items[header.indexOf("Close")] != undefined)) {
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

							callback({ ...entry });
						}
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


