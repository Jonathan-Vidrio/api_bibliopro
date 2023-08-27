import app from "./app";
import "./database/database";

const main = () => {
    app.listen(app.get("port"));
    console.log("Server on port", app.get("port"));
};

main();