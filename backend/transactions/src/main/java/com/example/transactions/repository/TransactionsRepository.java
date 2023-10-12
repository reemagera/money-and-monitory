package com.example.transactions.repository;

import com.example.transactions.model.TransactionInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface TransactionsRepository extends MongoRepository<TransactionInfo, String> {

    Optional<TransactionInfo> findByCustomerID(long customerID);
}
