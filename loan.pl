% =========================================
% MFS Loan Assessment Expert System
% =========================================

disposable_income(Income, Expenses, Disposable) :-
    Disposable is Income - Expenses.

debt_ratio(Debts, Income, Ratio) :-
    Ratio is Debts / Income.

% APPROVED
loan_decision(Age, Employment, Income, Expenses, CreditScore, Debts, LoanAmount, Period, approved) :-
    Employment == employed,
    Age >= 21,
    Age =< 60,
    CreditScore >= 700,
    disposable_income(Income, Expenses, Disposable),
    Disposable > 0,
    debt_ratio(Debts, Income, Ratio),
    Ratio < 0.4,
    MaxLoan is Disposable * Period * 0.5,
    LoanAmount =< MaxLoan.

% CONDITIONAL APPROVED
loan_decision(Age, Employment, Income, Expenses, CreditScore, Debts, LoanAmount, Period, conditional_approved) :-
    Employment == employed,
    Age >= 21,
    Age =< 65,
    CreditScore >= 600,
    disposable_income(Income, Expenses, Disposable),
    Disposable > 0,
    debt_ratio(Debts, Income, Ratio),
    Ratio < 0.6,
    MaxLoan is Disposable * Period * 0.7,
    LoanAmount =< MaxLoan.

% REJECTED
loan_decision(_, _, _, _, _, _, _, _, rejected).
