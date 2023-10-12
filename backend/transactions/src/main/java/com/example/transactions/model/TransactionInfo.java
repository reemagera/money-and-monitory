package com.example.transactions.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Random;

@Document(collection = "transactionDB")
public class TransactionInfo {
    @Id
    private String id;
    private long customerID;
    private List<Transaction> transactions;
    private long instantSavingsAcc;
    private double roundUpBalance;
    private Boolean roundUpenabled;

    public TransactionInfo() {
    }

    public TransactionInfo(String id, long customerID, List<Transaction> transactions, long instantSavingsAcc, double roundUpBalance, Boolean roundUpenabled) {
        this.id = id;
        this.customerID = customerID;
        this.transactions = transactions;
        this.instantSavingsAcc = instantSavingsAcc;
        this.roundUpBalance = roundUpBalance;
        this.roundUpenabled = roundUpenabled;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public long getCustomerID() {
        return customerID;
    }

    public void setCustomerID(long customerID) {
        this.customerID = customerID;
    }

    public long getInstantSavingsAcc() {
        return instantSavingsAcc;
    }

    public void setInstantSavingsAcc(long instantSavingsAcc) {
        this.instantSavingsAcc = instantSavingsAcc;
    }

    public double getRoundUpBalance() {
        return roundUpBalance;
    }

    public void setRoundUpBalance(double roundUpBalance) {
        this.roundUpBalance = roundUpBalance;
    }

    public Boolean getRoundUpenabled() {
        return roundUpenabled;
    }

    public void setRoundUpenabled(Boolean roundUpenabled) {
        this.roundUpenabled = roundUpenabled;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

    @Override
    public String toString() {
        return "TransactionInfo{" +
                "id='" + id + '\'' +
                ", customerID=" + customerID +
                ", transactions=" + transactions +
                ", instantSavingsAcc=" + instantSavingsAcc +
                ", roundUpBalance=" + roundUpBalance +
                ", roundUpenabled=" + roundUpenabled +
                '}';
    }


}
