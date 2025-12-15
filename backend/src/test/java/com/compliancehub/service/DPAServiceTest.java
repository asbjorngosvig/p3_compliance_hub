package com.compliancehub.service;
import com.compliancehub.dto.ViolationDTO;
import com.compliancehub.mockClasses.MockDPA;
import com.compliancehub.mockClasses.MockDataProcessor;
import com.compliancehub.mockClasses.MockProcessingLocationsRequirement;
import com.compliancehub.model.DPA;
import com.compliancehub.model.DataProcessor;
import com.compliancehub.model.Requirement;
import com.compliancehub.repository.DPARepository;
import com.compliancehub.strategy.RequirementsEvaluator.ProcessingLocationEvaluator;
import com.compliancehub.strategy.RequirementsEvaluator.IRequirementsEvaluator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import static org.junit.jupiter.api.Assertions.*;


//fra jUnit5. init mocks så det ik skal gøres længere nede
@ExtendWith(MockitoExtension.class)
class DPAServiceTest {

    @Mock
    private DPARepository dpaRepository;

    @InjectMocks
    private DPAService dpaService;


    @Test
    void getValidReqEvaluatorTest()  {
        Requirement requirement= new Requirement();
        requirement.setReqEvaluator("ProcessingLocationEvaluator");
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("allowedLocations", List.of("EU"));
        requirement.setAttributes(attributes);

        IRequirementsEvaluator reqEvaluator = dpaService.getReqEvaluator(requirement);
        assertTrue(reqEvaluator instanceof ProcessingLocationEvaluator);

    }

    @Test
    void getInvalidReqEvaluatorTest()  {
        Requirement requirement= new Requirement();
        requirement.setReqEvaluator("INVALIDEVALUATOR");
        requirement.setAttributes(new HashMap<>());

        // tester at vi får en exception, hvis den er invalid
        RuntimeException exception = assertThrows(RuntimeException.class, ()-> {
            dpaService.getReqEvaluator(requirement);
        });
    }


    // sørger for at der rent faktisk bliver oprettet maks èn violation pr requirement
    @Test
    void evaluateAllRequirementsTest_violationsGenerated() {
        DPA dpa = MockDPA.getMock();
        DataProcessor dataProcessor = MockDataProcessor.getMock();

        Requirement requirement = MockProcessingLocationsRequirement.getMockWithValidLocations(dpa);

        dpa.setRequirements(List.of(requirement));

        dpaService.evaluateAllRequirements(dpa, dataProcessor);

        // sørger for at der er genereret violation efter evaluering
        assertFalse(dpa.getViolations().isEmpty());

        // sørger for at der er genereret max 1 violation pr requirement
        assertTrue(dpa.getViolations().size() <= dpa.getRequirements().size());
    }

    // sørger for at der IKKE bliver oprettet en violation hvis der ikke er fejl
    @Test
    void evaluateAllRequirementsTest_violationsNotGenerated() {
        DPA dpa = MockDPA.getMock();
        DataProcessor dataProcessor = MockDataProcessor.getMock();

        Requirement requirement = MockProcessingLocationsRequirement.getMockWithInvalidLocations(dpa);

        dpa.setRequirements(List.of(requirement));

        // sørger for at DataProcessor har præcis samme locations som processing locations som requirement
        dataProcessor.setProcessingLocations((List<String>) requirement.getAttributes().get("allowedLocations"));

        dpaService.evaluateAllRequirements(dpa, dataProcessor);

        // sørger for at der ikke er genereret violation efter evaluering
        assertTrue(dpa.getViolations().isEmpty());

    }

    @Test
    void createViolationsDTOTest() {
        Object dpa = MockDPA.getMock();
        Method[] methods = DPAService.class.getDeclaredMethods();

        for (Method m : methods) {
            if (m.getName().equals("createViolationDTOFromDPA")) {
                m.setAccessible(true);

                try {
                    List<ViolationDTO.standardResponse> dto = (List<ViolationDTO.standardResponse>) m.invoke(dpaService, dpa);
                } catch (InvocationTargetException e) {
                    throw new RuntimeException(e);
                } catch (IllegalAccessException e) {
                    throw new RuntimeException(e);
                }
            }
        }

    }


}

