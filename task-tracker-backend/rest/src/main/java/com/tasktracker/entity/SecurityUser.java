package com.tasktracker.entity;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class SecurityUser implements UserDetails {
    @Getter
    private AppUser appUser;

    public SecurityUser(AppUser appUser) {
        this.appUser = appUser;
    }

    @Override
    public String getUsername() {
        return appUser.getEmail();
    }

    @Override
    public String getPassword() {
        return appUser.getPassword();
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
