package org.example.accounts.service;

import org.example.accounts.model.AccountInfo;
import org.example.accounts.model.SecureAccount;
import org.example.accounts.repository.AccountRepostitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class AccountServiceImpl implements AccountService{

    @Autowired
    private AccountRepostitory accountRepostitory;

    @Override
    public AccountInfo getCustomerAccount(int customerID) {
        Optional<AccountInfo> accountInfo = accountRepostitory.findById(customerID);
        return accountInfo.orElse(null);
    }

    @Override
    public Double updateAccountBalance(int customerID, double currentBalance) {
        if (currentBalance < 0) {
            return null;
        }
        Optional<AccountInfo> accountInfo = accountRepostitory.findById(customerID);
        if (accountInfo.isPresent()) {
            AccountInfo accountInfo1 = accountInfo.get();
            accountInfo1.setAccountBalance(currentBalance);
            accountRepostitory.save(accountInfo1);
            return accountInfo1.getAccountBalance();
        }
        return null;
    }

    @Override
    public SecureAccount verifyCustomerAccount(int customerID) {
        Optional<AccountInfo> accountInfo = accountRepostitory.findById(customerID);
        if (accountInfo.isPresent()) {
            AccountInfo accountInfo1 = accountInfo.get();
            return new SecureAccount(customerID, accountInfo1.getAccountNumber(), accountInfo1.getCustomerName());
        } else {
            return null;
        }
    }
}
