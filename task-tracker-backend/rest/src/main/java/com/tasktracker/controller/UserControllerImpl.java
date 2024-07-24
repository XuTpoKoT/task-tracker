package com.tasktracker.controller;


import com.tasktracker.dto.response.UserInfoResponse;
import com.tasktracker.entity.AppUser;
import com.tasktracker.mapper.UserMapper;
import com.tasktracker.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserControllerImpl implements UserController {
    private final UserMapper userMapper;

    public UserInfoResponse getUserInfo() {
        AppUser appUser = SecurityUtils.getSecurityUser().getAppUser();
        log.info("getUserInfo for " + appUser.getEmail());
        return userMapper.userToDto(appUser);

    }
}
