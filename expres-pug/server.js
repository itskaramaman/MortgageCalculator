const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res)=>{
    res.render("index");
})

app.post("/", (req, res)=>{
    let purchaseAmount =  0;
    let downPayment =  0;
    let termSelected =  0;
    let monthlyPayment =  0;
    let monthlyInterest =  0;
    let totalMonthlyPayment = 0;
    let totalPayment = 0;
    if(req.body.submitBtn === "calculate") {
        purchaseAmount =  Number(req.body.purchaseAmount);
        downPayment =  Number(req.body.downPayment);
        termSelected =  Number(req.body.termSelected);

        monthlyPayment = purchaseAmount / (termSelected * 12);
        monthlyInterest = (6 / (12 * 100)) * (purchaseAmount - downPayment);
        totalMonthlyPayment = monthlyPayment + monthlyInterest;
        totalPayment = purchaseAmount + (monthlyInterest * termSelected * 12);
        monthlyPayment = monthlyPayment.toFixed(2);
        monthlyInterest = monthlyInterest.toFixed(2);
        totalMonthlyPayment = totalMonthlyPayment.toFixed(2);


        let payments = [];
        let month=1;
        while (month<=termSelected*12) {
            amountPaid = month++ * totalMonthlyPayment;
            payments.push({amountPaid: amountPaid.toFixed(2), amountLeft: (totalPayment-amountPaid).toFixed(2)});
        }
        payments.push({amountPaid: totalPayment, amountLeft: 0})
    } 
        let payments = [];
        res.render("index", {purchaseAmount, downPayment, termSelected, monthlyInterest, monthlyPayment, totalMonthlyPayment, totalPayment, payments});
})



app.get("/about", (req, res)=>{
    res.render("about");
})

app.listen(3000, ()=>console.log("Server running on port 3000"));
