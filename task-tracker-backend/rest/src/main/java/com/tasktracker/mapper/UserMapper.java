package com.tasktracker.mapper;

import com.tasktracker.dto.response.UserInfoResponse;
import com.tasktracker.entity.AppUser;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserInfoResponse userToDto(AppUser user);
}
