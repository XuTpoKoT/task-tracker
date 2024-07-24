package com.tasktracker.repo;

import com.tasktracker.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<AppUser, Integer> {
    Optional<AppUser> findByEmail(String email);
}
