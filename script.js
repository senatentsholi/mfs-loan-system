document.getElementById("loanForm").addEventListener("submit", function(e) {
    e.preventDefault();

    fetch("http://localhost:3000/evaluate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            age: document.getElementById("age").value,
            employment: document.getElementById("employment").value,
            income: document.getElementById("income").value,
            expenses: document.getElementById("expenses").value,
            credit: document.getElementById("credit").value,
            debts: document.getElementById("debts").value,
            loan: document.getElementById("loan").value,
            period: document.getElementById("period").value
        })
    })
    .then(response => response.json())
    .then(data => {

        let decisionText = data.decision.toUpperCase();

        if (decisionText === "APPROVED")
            result.style.color = "green";
        else if (decisionText === "CONDITIONAL_APPROVED")
            result.style.color = "orange";
        else
            result.style.color = "red";

        result.innerHTML = "Loan Decision: " + decisionText;
    });
});
