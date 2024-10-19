package com.errormasters.bithack.security.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "USERs")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "FIRST_NAME")
    private String firstName;

    @Column(name = "LAST_NAME")
    private String lastName;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "ROLE_NAME")
    private String role;

//    @Column(name = "creation_time", columnDefinition = "TIMESTAMP WITH TIME ZONE")
//    private Instant creationTime;
//
//    @Column(name = "last_login_time", columnDefinition = "TIMESTAMP WITH TIME ZONE")
//    private Instant lastLoginTime;

    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

