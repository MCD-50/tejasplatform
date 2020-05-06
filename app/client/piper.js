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
							const market = items[header.indexOf("Exch.")] || null;
							const target = items[header.indexOf("Descr.")] || null;
							const time = items[header.indexOf("Time")] || null;
							const bid_qty = items[header.indexOf("Bid Qty")] || null;
							const bid = items[header.indexOf("Bid")] || null;
							const ask = items[header.indexOf("Ask")] || null;
							const ask_qty = items[header.indexOf("Ask Qty")] || null;
							const ltp = items[header.indexOf("LTP")] || null;
							const net_chg = items[header.indexOf("NetChg")] || null;
							const percent_chg = items[header.indexOf("%Chg")] || null;
							const volume = items[header.indexOf("Volume")] || null;
							const open = items[header.indexOf("Open")] || null;
							const high = items[header.indexOf("High")] || null;
							const low = items[header.indexOf("Low")] || null;
							const close = items[header.indexOf("Close")] || null;
							const year_high = items[header.indexOf("52WkHigh")] || null;
							const year_low = items[header.indexOf("52WkLow")] || null;
							const oi = items[header.indexOf("OI")] || null;
							const net_chg_oi = items[header.indexOf("NetChgOI")] || null;
							const percent_chg_oi = items[header.indexOf("%ChgOI")] || null;
							const tbq = items[header.indexOf("TBQ")] || null;
							const taq = items[header.indexOf("TAQ")] || null;
							const atp = items[header.indexOf("ATP")] || null;
							const value_mln = items[header.indexOf("Value(Mln)")] || null;
							const market_lot = items[header.indexOf("Market Lot")] || null;
							const pqu = items[header.indexOf("PQU")] || null;

							if (market == null || target == null) continue;
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


