const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "bn3vgajxhfcy8vutwr6q-mysql.services.clever-cloud.com",
    user: "u70dsw8s2aqs7aju",
    password: "wJOsu0tflZPPqRvE4Lc8",
    database: "bn3vgajxhfcy8vutwr6q",
    port:3306,
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database: ", err);
    } else {
        console.log("Connected to the database");
    }
});

app.post("/employee", (req, res) => {
    const sql = "INSERT INTO login (`firstName`, `lastName`, `employeeId`, `email`, `phone`, `department`, `dateofjoining`, `role`) VALUES (?)";
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.employeeId,
        req.body.email,
        req.body.phone,
        req.body.department,
        req.body.dateofjoining,
        req.body.role,
    ];

    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Error during insertion: ", err);
            return res.status(500).json({ message: "Error inserting data", error: err });
        }
        return res.status(201).json({ message: "Employee data inserted successfully", data });
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
