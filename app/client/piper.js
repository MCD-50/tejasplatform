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

						try {
							const market = items[header.indexOf("Exch.")] || "";
							const target = items[header.indexOf("Descr.")] || "";
							const time = items[header.indexOf("Time")] || "";
							const bid_qty = items[header.indexOf("Bid Qty")] || "";
							const bid = items[header.indexOf("Bid")] || "";
							const ask = items[header.indexOf("Ask")] || "";
							const ask_qty = items[header.indexOf("Ask Qty")] || "";
							const ltp = items[header.indexOf("LTP")] || "";
							const net_chg = items[header.indexOf("NetChg")] || "";
							const percent_chg = items[header.indexOf("%Chg")] || "";
							const volume = items[header.indexOf("Volume")] || "";
							const open = items[header.indexOf("Open")] || "";
							const high = items[header.indexOf("High")] || "";
							const low = items[header.indexOf("Low")] || "";
							const close = items[header.indexOf("Close")] || "";
							const year_high = items[header.indexOf("52WkHigh")] || "";
							const year_low = items[header.indexOf("52WkLow")] || "";
							const oi = items[header.indexOf("OI")] || "";
							const net_chg_oi = items[header.indexOf("NetChgOI")] || "";
							const percent_chg_oi = items[header.indexOf("%ChgOI")] || "";
							const tbq = items[header.indexOf("TBQ")] || "";
							const taq = items[header.indexOf("TAQ")] || "";
							const atp = items[header.indexOf("ATP")] || "";
							const value_mln = items[header.indexOf("Value(Mln)")] || "";
							const market_lot = items[header.indexOf("Market Lot")] || "";
							const pqu = items[header.indexOf("PQU")] || "";

							if (!market || !target) continue;
							const entry = {
								market: market,
								target: target,
								time: time,
								bid_qty: bid_qty,
								bid: bid,
								ask: ask,
								ask_qty: ask_qty,
								ltp: ltp,
								net_chg: net_chg,
								percent_chg: percent_chg,
								volume: volume,
								open: open,
								high: high,
								low: low,
								close: close,
								year_high: year_high,
								year_low: year_low,
								oi: oi,
								net_chg_oi: net_chg_oi,
								percent_chg_oi: percent_chg_oi,
								tbq: tbq,
								taq: taq,
								atp: atp,
								value_mln: value_mln,
								market_lot: market_lot,
								pqu: pqu
							};

							callback({ ...entry });
						} catch (exe) {
							console.log(exe);
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


