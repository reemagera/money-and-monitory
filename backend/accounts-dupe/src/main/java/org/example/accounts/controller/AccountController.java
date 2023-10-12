package org.example.accounts.controller;

import org.example.accounts.model.AccountInfo;
import org.example.accounts.model.Balance;
import org.example.accounts.model.SecureAccount;
import org.example.accounts.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/accounts-api")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping("/account/{customerID}")
    public ResponseEntity<AccountInfo> getCustomerAccount(@PathVariable int customerID) {
        AccountInfo accountInfo = accountService.getCustomerAccount(customerID);
        if (accountInfo != null) {
            return new ResponseEntity<>(accountInfo, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/verify")
    public ResponseEntity<SecureAccount> verifyCustomerAccount(@RequestBody SecureAccount secureAccount) {
        SecureAccount accountInfo = accountService.verifyCustomerAccount(secureAccount.getCustomerID());
        if (accountInfo != null) {
            return new ResponseEntity<>(accountInfo, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/account/{customerID}")
    public ResponseEntity<Double> updateAccountBalance(@PathVariable int customerID, @RequestBody Balance balance) {
        Double balance1 = accountService.updateAccountBalance(customerID, balance.getAccountBalance());
        if (balance1 != null) {
            return new ResponseEntity<>(balance1, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }
}
