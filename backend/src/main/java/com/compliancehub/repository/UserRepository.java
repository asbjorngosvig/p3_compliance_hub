package com.compliancehub.repository;

import com.compliancehub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/*
 Metoder (dækket automatisk):
 * userRepository.save(user)             - gemmer nyt User/Admin/Employee eller opdaterer eksisterende
 * userRepository.saveAll(users)         - gemmer/opdaterer flere Users samtidig
 * userRepository.findById(id)           - finder User efter id, returnerer Optional<User>
 * userRepository.existsById(id)         - tjekker om User med givet id findes
 * userRepository.findAll()              - henter alle Users
 * userRepository.findAllById(ids)       - henter flere Users efter liste af id'er
 * userRepository.count()                - tæller hvor mange Users der findes
 * userRepository.deleteById(id)         - sletter User med given id
 * userRepository.delete(user)           - sletter et givet User objekt
 * userRepository.deleteAllById(ids)     - sletter Users med liste af id'er
 * userRepository.deleteAll(users)       - sletter flere Users
 * userRepository.deleteAll()            - sletter alle Users i tabellen
 *
 * Tips:
 * - Polymorfi: Repository håndterer også Admin og Employee automatisk
 * - Custom queries: fx userRepository.findByEmail(email), userRepository.findByRole(role)
 */

@Repository
public interface UserRepository extends JpaRepository <User, UUID> {
    Optional<User> findByEmail(String email);
}
