import * as ticker from "../service/ticker";

// eslint-disable-next-line no-unused-vars
const initialize = (app) => {
	setInterval(() => ticker._read(app, "/home/mcd-50/Downloads/tcx.xlsx"), 2000);
	// setInterval(() => piper.stream("/home/mcd-50/Downloads/tcx.xlsx"), 20);
	// setInterval(() => piper.stream("/home/mcd-50/Downloads/tcx.xlsx"), 20);
	// setInterval(() => piper.stream("/home/mcd-50/Downloads/tcx.xlsx"), 20);
	// setInterval(() => piper.stream("/home/mcd-50/Downloads/tcx.xlsx"), 20);
	// setInterval(() => piper.stream("/home/mcd-50/Downloads/tcx.xlsx"), 20);
	// setInterval(() => piper.stream("/home/mcd-50/Downloads/tcx.xlsx"), 20);
	// setInterval(() => piper.stream("/home/mcd-50/Downloads/tcx.xlsx"), 20);
};

export default initialize;