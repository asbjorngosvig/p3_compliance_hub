package com.compliancehub.repository;

import com.compliancehub.model.DataProcessor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

/*
 Metoder (dækket automatisk):
 * DataProcessorRepository.save(DataProcessor)    - gemmer nyt DataProcessor/Admin/Employee eller opdaterer eksisterende
 * DataProcessorRepository.saveAll(DataProcessors)- gemmer/opdaterer flere DataProcessors samtidig
 * DataProcessorRepository.findById(id)           - finder DataProcessor efter id, returnerer Optional<DataProcessor>
 * DataProcessorRepository.existsById(id)         - tjekker om DataProcessor med givet id findes
 * DataProcessorRepository.findAll()              - henter alle DataProcessors
 * DataProcessorRepository.findAllById(ids)       - henter flere DataProcessors efter liste af id'er
 * DataProcessorRepository.count()                - tæller hvor mange DataProcessors der findes
 * DataProcessorRepository.deleteById(id)         - sletter DataProcessor med given id
 * DataProcessorRepository.delete(DataProcessor)  - sletter et givet DataProcessor objekt
 * DataProcessorRepository.deleteAllById(ids)     - sletter DataProcessors med liste af id'er
 * DataProcessorRepository.deleteAll(DataProcessors) - sletter flere DataProcessors
 * DataProcessorRepository.deleteAll()            - sletter alle DataProcessors i tabellen
 */

@Repository
public interface DataProcessorRepository extends JpaRepository<DataProcessor, UUID> { }