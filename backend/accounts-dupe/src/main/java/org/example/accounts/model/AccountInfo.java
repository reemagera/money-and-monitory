package org.example.accounts.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Date;

@Entity
@Table(name = "accountsDB")
public class AccountInfo {
    @Id
    private int customerID;
    private long accountNumber;
    private String customerName;
    private Date DOB;
    private long debitCardNumber;
    private String expiryMonth;
    private String expiryYear;
    private int CVV;
    private String netBanking;
    private String password;
    private double accountBalance;

    public AccountInfo() {
    }

    public AccountInfo(int customerID, long accountNumber, String customerName, Date DOB,
                       long debitCardNumber, String expiryMonth, String expiryYear, int CVV,
                       String netBanking, String password, double accountBalance) {
        this.customerID = customerID;
        this.accountNumber = accountNumber;
        this.customerName = customerName;
        this.DOB = DOB;
        this.debitCardNumber = debitCardNumber;
        this.expiryMonth = expiryMonth;
        this.expiryYear = expiryYear;
        this.CVV = CVV;
        this.netBanking = netBanking;
        this.password = password;
        this.accountBalance = accountBalance;
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

    public Date getDOB() {
        return DOB;
    }

    public void setDOB(Date DOB) {
        this.DOB = DOB;
    }

    public long getDebitCardNumber() {
        return debitCardNumber;
    }

    public void setDebitCardNumber(long debitCardNumber) {
        this.debitCardNumber = debitCardNumber;
    }

    public String getExpiryMonth() {
        return expiryMonth;
    }

    public void setExpiryMonth(String expiryMonth) {
        this.expiryMonth = expiryMonth;
    }

    public String getExpiryYear() {
        return expiryYear;
    }

    public void setExpiryYear(String expiryYear) {
        this.expiryYear = expiryYear;
    }

    public int getCVV() {
        return CVV;
    }

    public void setCVV(int CVV) {
        this.CVV = CVV;
    }

    public String getNetBanking() {
        return netBanking;
    }

    public void setNetBanking(String netBanking) {
        this.netBanking = netBanking;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public double getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(double accountBalance) {
        this.accountBalance = accountBalance;
    }

    @Override
    public String toString() {
        return "AccountInfo{" +
                "customerID=" + customerID +
                ", accountNumber=" + accountNumber +
                ", customerName='" + customerName + '\'' +
                ", DOB=" + DOB +
                ", debitCardNumber=" + debitCardNumber +
                ", expiryMonth='" + expiryMonth + '\'' +
                ", expiryYear='" + expiryYear + '\'' +
                ", CVV=" + CVV +
                ", netBanking='" + netBanking + '\'' +
                ", password='" + password + '\'' +
                ", accountBalance=" + accountBalance +
                '}';
    }
}
