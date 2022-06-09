const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
let items = ["wake up", "wake up"];
let workItems = [];

app.get("/", function (req, res) {
	let day = date.getDate();
	res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
	console.log(req.body);
	let item = req.body.newItem;
	if (req.body.list === "Work List") {
		workItems.push(item);
		res.redirect("/work");
	} else {
		items.push(item);
		res.redirect("/");
	}
});
app.get("/work", function (req, res) {
	res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.listen(3000, function () {
	console.log("server is listening on port");
});
