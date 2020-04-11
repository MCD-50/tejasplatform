//get root folder
const enginePath = require("path").join(__dirname, "");
import engineHelper  from "./engineHelper";

// init the route and schema
const initEngine = async (app) => await engineHelper(app, enginePath);
export default initEngine;