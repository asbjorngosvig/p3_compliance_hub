package com.compliancehub.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data // lombok laver getters og setters
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true) // sørger for, at Lombok medtager superclass felter i equals() og hashCode()
@Entity
@DiscriminatorValue("ADMIN")
public class Admin extends User {
    public Admin(String name, String email, String password) {
        super(null, name, email, password); // id = null, Hibernate sætter det ved instantiation
    }
}
