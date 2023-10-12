package com.example.transactions.model;

import java.util.Date;

public class Transaction {
    private String transactionID;
    private String type;
    private String method;
    private double amount;
    private float roundUp;
    private Date timestamp;
    private double currentBalance;
    private String toOrFrom;
    private double currentSavings;

    public Transaction() {
    }
    public Transaction( String type, String method, double amount, float roundUp, double currentBalance, String toOrFrom) {
        this.transactionID = "";
        this.type = type;
        this.method = method;
        this.amount = amount;
        this.roundUp = roundUp;
        this.currentBalance = currentBalance;
        this.toOrFrom = toOrFrom;
    }

    public String getTransactionID() {
        return transactionID;
    }

    public void setTransactionID(String transactionID) {
        this.transactionID = transactionID;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public float getRoundUp() {
        return roundUp;
    }

    public void setRoundUp(float roundUp) {
        this.roundUp = roundUp;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public double getCurrentBalance() {
        return currentBalance;
    }

    public void setCurrentBalance(double currentBalance) {
        this.currentBalance = currentBalance;
    }

    public String getToOrFrom() {
        return toOrFrom;
    }

    public void setToOrFrom(String toOrFrom) {
        this.toOrFrom = toOrFrom;
    }

    public double getCurrentSavings() {
        return currentSavings;
    }

    public void setCurrentSavings(double currentSavings) {
        this.currentSavings = currentSavings;
    }
}
