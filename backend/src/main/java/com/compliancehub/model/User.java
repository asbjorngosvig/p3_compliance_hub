package com.compliancehub.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
// Fortæller JPA at alle subklasser af User skal gemmes i én tabel (users)
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
// Fortæller JPA, at kolonnen "role" afgør, hvilken subklasse (fx ADMIN eller EMPLOYEE) en række tilhører.
@DiscriminatorColumn(name = "role", discriminatorType = DiscriminatorType.STRING)
@Data

@NoArgsConstructor
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "role", insertable = false, updatable = false)
    private String role;

    public User(Long id, String name, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public boolean isAdmin(){
        return "ADMIN".equalsIgnoreCase(this.role);
    }

    public boolean isEmployee(){
        return "EMPLOYEE".equalsIgnoreCase(this.role);
    }
}
