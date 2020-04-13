import moment from "moment";

import * as ticker from "../service/ticker";

import files from "../../files";

// eslint-disable-next-line no-unused-vars
const initialize = (app) => {
	files.map(_path => {
		// socket
		setInterval(() => ticker._read(app, _path, moment()), 30);
	
		// redis
		setInterval(() => ticker._persist(app, _path, moment()), 1000);
	});
};

export default initialize;