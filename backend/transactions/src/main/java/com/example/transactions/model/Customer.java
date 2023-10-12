package com.example.transactions.model;

public class Customer {
    private long customerID;

    public Customer() {
    }

    public Customer(long customerID) {
        this.customerID = customerID;
    }

    public long getCustomerID() {
        return customerID;
    }

    public void setCustomerID(long customerID) {
        this.customerID = customerID;
    }
}
