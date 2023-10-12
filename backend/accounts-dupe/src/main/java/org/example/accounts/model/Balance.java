package org.example.accounts.model;

public class Balance {
    private double accountBalance;

    public Balance(double accountBalance) {
        this.accountBalance = accountBalance;
    }

    public Balance() {
    }

    public double getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(double accountBalance) {
        this.accountBalance = accountBalance;
    }
}
