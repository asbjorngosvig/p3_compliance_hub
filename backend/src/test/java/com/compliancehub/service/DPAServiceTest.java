package com.compliancehub.service;
import com.compliancehub.model.Requirement;
import com.compliancehub.repository.DPARepository;
import com.compliancehub.strategy.RequirementsEvaluator.ProcessingLocationEvaluator;
import com.compliancehub.strategy.RequirementsEvaluator.RequirementsEvaluator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;
import java.util.jar.Attributes;


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
        requirement.setReqEvaluator("ProcessingLocationsEvaluator");
        requirement.setAttributes(new HashMap<>());

        RequirementsEvaluator reqEvaluator = dpaService.getReqEvaluator(requirement);
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




}

