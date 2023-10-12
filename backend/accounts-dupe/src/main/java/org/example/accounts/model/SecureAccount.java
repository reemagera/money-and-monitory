package org.example.accounts.model;

public class SecureAccount {
    private int customerID;
    private long accountNumber;
    private String customerName;

    public SecureAccount() {
    }

    public SecureAccount(int customerID, long accountNumber, String customerName) {
        this.customerID = customerID;
        this.accountNumber = accountNumber;
        this.customerName = customerName;
    }

    public int getCustomerID() {
        return customerID;
    }

    public void setCustomerID(int customerID) {
        this.customerID = customerID;
    }

    public long getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(long accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
}
