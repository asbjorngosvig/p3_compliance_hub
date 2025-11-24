package com.compliancehub.service;


import com.compliancehub.model.CommunicationStrategy;
import com.compliancehub.model.DPA;
import com.compliancehub.repository.DPARepository;
import com.compliancehub.strategy.RequirementsEvaluator.RequirementsEvaluator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DPAService {
    private final DPARepository dpaRepository;

    public DPA getDPAById(UUID id) {
        try {
            List<DPA> DPAList = dpaRepository.getDPAByDPAId(id);
            if (DPAList.size() < 1)
                throw new RuntimeException("No DPA with same id: " + id);
            if (DPAList.size() > 1)
                throw new RuntimeException("Mutiple DPA with id: " + id);

            return DPAList.getFirst();
        } catch (RuntimeException error) {
            throw new RuntimeException(error);
        }
    }

    public List<DPA> getAllDPA() {

        return new ArrayList<>();
    }

    public void createDPA(DPA dpa) {

    }

    public void saveDPA(DPA dpa) {

    }

    public RequirementsEvaluator parseReqEvaluator(String input) {

        return null;
    }

    public void createActions() {

    }

}
