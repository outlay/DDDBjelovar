package com.errormasters.bithack.security.repository;

import com.errormasters.bithack.security.entity.Role;
import com.errormasters.bithack.security.entity.pojo.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findByName(RoleEnum name);
}
