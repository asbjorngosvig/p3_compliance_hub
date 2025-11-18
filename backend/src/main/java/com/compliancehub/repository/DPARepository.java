package com.compliancehub.repository;

import com.compliancehub.model.DPA;
import com.compliancehub.model.DataProcessor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

/*
 Metoder (dækket automatisk):
 * DPARepository.save(DPA)             - gemmer nyt DPA/Admin/Employee eller opdaterer eksisterende
 * DPARepository.saveAll(DPAs)         - gemmer/opdaterer flere DPAs samtidig
 * DPARepository.findById(id)           - finder DPA efter id, returnerer Optional<DPA>
 * DPARepository.existsById(id)         - tjekker om DPA med givet id findes
 * DPARepository.findAll()              - henter alle DPAs
 * DPARepository.findAllById(ids)       - henter flere DPAs efter liste af id'er
 * DPARepository.count()                - tæller hvor mange DPAs der findes
 * DPARepository.deleteById(id)         - sletter DPA med given id
 * DPARepository.delete(DPA)           - sletter et givet DPA objekt
 * DPARepository.deleteAllById(ids)     - sletter DPAs med liste af id'er
 * DPARepository.deleteAll(DPAs)       - sletter flere DPAs
 * DPARepository.deleteAll()            - sletter alle DPAs i tabellen
 */

@Repository
public interface DPARepository extends JpaRepository<DPA, UUID> { }