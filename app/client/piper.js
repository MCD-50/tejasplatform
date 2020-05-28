const xlsx = require("node-xlsx");

class Piper {
	stream(fileurl, callback) {
		try {
			var obj = xlsx.parse(fileurl); // parses a file
			obj.forEach(x => {
				if (x.data && x.data.length > 0) {
					// eslint-disable-next-line no-unused-vars
					let header = x.data[0].slice();
					if (header.length == 1 && header[0] == "DDE Sample") {
						header = x.data[1].slice();
						for (var i = 2; i < x.data.length; i++) {
							const items = x.data[i].slice();

							try {
								const market = "INTL";
								const target = items[header.indexOf("Symbol")] || "";
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
									market: String(market),
									target: String(target),
									time: String(time),
									bid_qty: String(bid_qty),
									bid: String(bid),
									ask: String(ask),
									ask_qty: String(ask_qty),
									ltp: String(ltp),
									net_chg: String(net_chg),
									percent_chg: String(percent_chg),
									volume: String(volume),
									open: String(open),
									high: String(high),
									low: String(low),
									close: String(close),
									year_high: String(year_high),
									year_low: String(year_low),
									oi: String(oi),
									net_chg_oi: String(net_chg_oi),
									percent_chg_oi: String(percent_chg_oi),
									tbq: String(tbq),
									taq: String(taq),
									atp: String(atp),
									value_mln: String(value_mln),
									market_lot: String(market_lot),
									pqu: String(pqu)
								};

								callback({ ...entry });
							} catch (exe) {
								console.log(exe);
							}
						}
					} else {
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
									market: String(market),
									target: String(target),
									time: String(time),
									bid_qty: String(bid_qty),
									bid: String(bid),
									ask: String(ask),
									ask_qty: String(ask_qty),
									ltp: String(ltp),
									net_chg: String(net_chg),
									percent_chg: String(percent_chg),
									volume: String(volume),
									open: String(open),
									high: String(high),
									low: String(low),
									close: String(close),
									year_high: String(year_high),
									year_low: String(year_low),
									oi: String(oi),
									net_chg_oi: String(net_chg_oi),
									percent_chg_oi: String(percent_chg_oi),
									tbq: String(tbq),
									taq: String(taq),
									atp: String(atp),
									value_mln: String(value_mln),
									market_lot: String(market_lot),
									pqu: String(pqu)
								};

								callback({ ...entry });
							} catch (exe) {
								console.log(exe);
							}
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


