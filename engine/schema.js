const enginePath = require("path").join(__dirname, "../schema/mongo");
import engineHelper  from "./engineHelper";

// init the schema
const schema = async (app) => await engineHelper(app, enginePath);

export default schema;
