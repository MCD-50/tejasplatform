const enginePath = require("path").join(__dirname, "../route");
import engineHelper  from "./engineHelper";

// init the route
const route = async (app) => await engineHelper(app, enginePath, true);
export default route;