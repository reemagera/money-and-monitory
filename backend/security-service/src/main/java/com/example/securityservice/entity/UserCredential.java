package com.example.securityservice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserCredential {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String customerID;
    private String name;
    private String email;
    private String password;

    public UserCredential() {
    }

    public UserCredential(String customerID, String name, String email, String password) {
        this.customerID = customerID;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public String getCustomerID() {
        return customerID;
    }

    public void setCustomerID(String customerID) {
        this.customerID = customerID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
