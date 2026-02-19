const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Serve frontend
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/evaluate", (req, res) => {

    const age = parseInt(req.body.age);
    const employment = req.body.employment;
    const income = parseFloat(req.body.income);
    const expenses = parseFloat(req.body.expenses);
    const credit = parseInt(req.body.credit);
    const debts = parseFloat(req.body.debts);
    const loan = parseFloat(req.body.loan);
    const period = parseInt(req.body.period);

    const prologCommand =
`swipl -q -s loan.pl -g "loan_decision(${age}, '${employment}', ${income}, ${expenses}, ${credit}, ${debts}, ${loan}, ${period}, Decision), write(Decision), halt."`;

    console.log("Running Prolog Command:");
    console.log(prologCommand);

    exec(prologCommand, (error, stdout, stderr) => {

        if (error) {
            console.log("ERROR:", error);
            return res.json({ decision: "rejected" });
        }

        if (stderr) {
            console.log("STDERR:", stderr);
        }

        const decision = stdout.trim();

        if (!decision) {
            return res.json({ decision: "rejected" });
        }

        res.json({ decision: decision });
    });
});

// Render dynamic port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
