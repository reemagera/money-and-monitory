package com.example.transactions.controller;

import com.example.transactions.model.Customer;
import com.example.transactions.model.Transaction;
import com.example.transactions.model.TransactionInfo;
import com.example.transactions.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions-api")
public class TransactionController {
    @Autowired
    TransactionService transactionService;

    @GetMapping("/transactions")
    public ResponseEntity<List<TransactionInfo>> getAllTransactionInfo() {
        List<TransactionInfo> transactionInfos = transactionService.getAllTransactionInfo();
        if (transactionInfos != null) {
            return new ResponseEntity<>(transactionInfos, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/transactions/{customerID}")
    public ResponseEntity<TransactionInfo> pushNewTransaction(@PathVariable("customerID") long customerID, @RequestBody Transaction transaction) {
        TransactionInfo transactionInfo = transactionService.addNewTransaction(customerID, transaction);
        if (transactionInfo != null) {
            return new ResponseEntity<>(transactionInfo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/transactions/{customerID}")
    public ResponseEntity<TransactionInfo> getTransactionInfoByCustomerID(@PathVariable("customerID") long customerID) {
        TransactionInfo transactionInfo = transactionService.getCustomerTransactionInfo(customerID);
        if (transactionInfo != null) {
            return new ResponseEntity<>(transactionInfo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/addCustomer")
    public ResponseEntity<TransactionInfo> registerCustomer(@RequestBody Customer customer) {
        TransactionInfo transactionInfo = transactionService.registerCustomer(customer.getCustomerID());
        if (transactionInfo != null) {
            return new ResponseEntity<>(transactionInfo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/addCustomer2")
    public ResponseEntity<TransactionInfo> registerCustomer2(@RequestParam long customerID) {
        TransactionInfo transactionInfo = transactionService.registerCustomer(customerID);
        if (transactionInfo != null) {
            return new ResponseEntity<>(transactionInfo, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/change-enable-status")
    public ResponseEntity<Boolean> enableOrDisable2(@RequestBody Customer customer) {
        TransactionInfo transactionInfo = transactionService.enableOrDisable(customer.getCustomerID());
        Boolean status = transactionInfo.getRoundUpenabled();
        if (status != null) {
            return new ResponseEntity<>(status, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
