package com.example.transactions.service;

import com.example.transactions.model.Transaction;
import com.example.transactions.model.TransactionInfo;

import java.util.List;

public interface TransactionService {
    TransactionInfo registerCustomer(long customerID);
    List<TransactionInfo> getAllTransactionInfo();
    TransactionInfo addNewTransaction(long customerID, Transaction transaction);
    TransactionInfo getCustomerTransactionInfo(long customerID);
    TransactionInfo enableOrDisable(long customerID);
}
