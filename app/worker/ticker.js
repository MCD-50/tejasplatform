import moment from "moment";

import * as ticker from "../service/ticker";

// eslint-disable-next-line no-unused-vars
const initialize = (app) => {
	// socket
	setInterval(() => ticker._read(app, "/home/mcd-50/Downloads/tcx.xlsx", moment()), 30);

	// redis
	setInterval(() => ticker._persist(app, "/home/mcd-50/Downloads/tcx.xlsx", moment()), 1000);
};

export default initialize;