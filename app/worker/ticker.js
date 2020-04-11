import * as ticker from "../service/ticker";
import moment from "moment";

// eslint-disable-next-line no-unused-vars
const initialize = (app) => {
	setInterval(() => ticker._read(app, "/home/mcd-50/Downloads/tcx.xlsx", moment()), 30);
	setInterval(() => ticker._read(app, "/home/mcd-50/Downloads/tcx.xlsx", moment()), 30);
	setInterval(() => ticker._read(app, "/home/mcd-50/Downloads/tcx.xlsx", moment()), 30);
};

export default initialize;