package com.compliancehub.repository;

import com.compliancehub.model.DataProcessor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*
 Metoder (dækket automatisk):
 * DataProcessorRepository.save(user)             - gemmer nyt User/Admin/Employee eller opdaterer eksisterende
 * DataProcessorRepository.saveAll(users)         - gemmer/opdaterer flere Users samtidig
 * DataProcessorRepository.findById(id)           - finder User efter id, returnerer Optional<User>
 * DataProcessorRepository.existsById(id)         - tjekker om User med givet id findes
 * DataProcessorRepository.findAll()              - henter alle Users
 * DataProcessorRepository.findAllById(ids)       - henter flere Users efter liste af id'er
 * DataProcessorRepository.count()                - tæller hvor mange Users der findes
 * DataProcessorRepository.deleteById(id)         - sletter User med given id
 * DataProcessorRepository.delete(user)           - sletter et givet User objekt
 * DataProcessorRepository.deleteAllById(ids)     - sletter Users med liste af id'er
 * DataProcessorRepository.deleteAll(users)       - sletter flere Users
 * DataProcessorRepository.deleteAll()            - sletter alle Users i tabellen
 *
 * Tips:
 * - Polymorfi: Repository håndterer også Admin og Employee automatisk
 * - Custom queries: fx DataProcessorRepository.findByEmail(email), DataProcessorRepository.findByRole(role)
 */


@Repository
public interface DataProcessorRepository extends JpaRepository<DataProcessor, Long> {
}
