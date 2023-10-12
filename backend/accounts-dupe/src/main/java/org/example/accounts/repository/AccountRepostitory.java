package org.example.accounts.repository;

import org.example.accounts.model.AccountInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepostitory extends JpaRepository<AccountInfo, Integer> {
}
