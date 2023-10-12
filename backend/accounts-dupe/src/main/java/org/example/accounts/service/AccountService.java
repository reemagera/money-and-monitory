package org.example.accounts.service;

import org.example.accounts.model.AccountInfo;
import org.example.accounts.model.SecureAccount;

public interface AccountService {
    AccountInfo getCustomerAccount(int customerID);
    Double updateAccountBalance(int customerID, double currentBalance);
    SecureAccount verifyCustomerAccount(int customerID);
}
