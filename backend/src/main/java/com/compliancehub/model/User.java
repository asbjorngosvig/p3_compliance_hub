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
//hibernate SKAL bruge en no args for at instantiere objekter fra databasen
@NoArgsConstructor
@AllArgsConstructor
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

    public void createUser() {
        throw new UnsupportedOperationException("Not allowed");
    }
}