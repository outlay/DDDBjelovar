package com.errormasters.bithack.security.repository;

import com.errormasters.bithack.security.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);
}
