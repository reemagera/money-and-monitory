package com.example.transactions.service;

import com.example.transactions.model.Transaction;
import com.example.transactions.model.TransactionInfo;
import com.example.transactions.repository.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class TransactionServiceImpl implements TransactionService{

    @Autowired
    TransactionsRepository transactionsRepository;
    @Override
    public TransactionInfo registerCustomer(long customerID) {
        Optional<TransactionInfo> transactionInfo1 = transactionsRepository.findByCustomerID(customerID);
        if (transactionInfo1.isEmpty()) {
            TransactionInfo transactionInfo = new TransactionInfo();
            transactionInfo.setCustomerID(customerID);
            transactionInfo.setTransactions(new ArrayList<Transaction>());
            Random random = new Random();
            transactionInfo.setInstantSavingsAcc((customerID + 12345) % 100000 + 100000);
            transactionInfo.setRoundUpBalance(0);
            transactionInfo.setRoundUpenabled(true);
            return transactionsRepository.save(transactionInfo);
        } else {
            return transactionInfo1.get();
        }
    }

    @Override
    public List<TransactionInfo> getAllTransactionInfo() {
        try {
            return transactionsRepository.findAll();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public TransactionInfo addNewTransaction(long customerID, Transaction transaction) {
        if (transaction.getAmount() < 0) {
            return null;
        }
        Optional<TransactionInfo> transactionInfoOptional = transactionsRepository.findByCustomerID(customerID);

        if (transactionInfoOptional.isPresent()) {
            TransactionInfo transactionInfo = transactionInfoOptional.get();

            SimpleDateFormat sdf = new SimpleDateFormat("HHmmss");
            SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMMdd");
            Date timestamp = new Date();
            String dateID = sdf2.format(timestamp);
            String timePortion = sdf.format(timestamp);
            transaction.setTimestamp(timestamp);
            String timeWithoutColons = timePortion.replace(":", "");
            String newID = transactionInfo.getCustomerID() + dateID + timeWithoutColons;
            transaction.setTransactionID(newID);

            double roundUpBalance = transactionInfo.getRoundUpBalance();
            float roundUpAmt = transaction.getRoundUp();
            double amt = transaction.getAmount();
            double currBal = transaction.getCurrentBalance();

            if (transaction.getType().equals("debit")) {
                if (amt <= currBal) {
                    roundUpBalance += roundUpAmt;
                    currBal -= amt;
                } else {
                    return null;
                }

            } else if (transaction.getType().equals("credit")) {
                transaction.setRoundUp(0);
                if (amt <= roundUpBalance) {
                    roundUpBalance -= transaction.getAmount();
                    currBal += amt;
                } else {
                    return null;
                }
            }
            transaction.setCurrentSavings(roundUpBalance);
            transaction.setCurrentBalance(currBal);

            transactionInfo.setRoundUpBalance(roundUpBalance);

            List<Transaction> transactions = new ArrayList<>(transactionInfo.getTransactions());
            transactions.add(transaction);
            transactionInfo.setTransactions(transactions);

            return transactionsRepository.save(transactionInfo);
        } else {
            return null; // Handle case where customerID is not found
        }
    }

    @Override
    public TransactionInfo getCustomerTransactionInfo(long customerID) {
        Optional<TransactionInfo> transactionInfo = transactionsRepository.findByCustomerID(customerID);
        return transactionInfo.orElse(null);
    }

    @Override
    public TransactionInfo enableOrDisable(long customerID) {
        Optional<TransactionInfo> transactionInfo = transactionsRepository.findByCustomerID(customerID);
        if (transactionInfo.isPresent()) {
            TransactionInfo transactionInfo1 = transactionInfo.get();
            Boolean enableStatus = transactionInfo1.getRoundUpenabled();
            transactionInfo1.setRoundUpenabled(!enableStatus);
            return transactionsRepository.save(transactionInfo1);
        } else {
            return null;
        }
    }
}
