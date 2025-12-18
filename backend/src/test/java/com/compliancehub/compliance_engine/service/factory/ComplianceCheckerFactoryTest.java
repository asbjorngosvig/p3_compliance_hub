package com.compliancehub.compliance_engine.service.factory;

import com.compliancehub.compliance_engine.model.Requirement;
import com.compliancehub.compliance_engine.strategy.RequirementsComplianceChecker.IRequirementsComplianceChecker;
import com.compliancehub.compliance_engine.strategy.RequirementsComplianceChecker.ProcessingLocationComplianceChecker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ComplianceCheckerFactoryTest {

    public ComplianceCheckerFactory complianceCheckerFactory;

    @BeforeEach
    void setUp(){
        complianceCheckerFactory = new ComplianceCheckerFactory();
    }

    @Test
    void createShouldReturnCorrectEvaluator() {
        Requirement req = new Requirement();
        req.setReqEvaluator("ProcessingLocationEvaluator");
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("allowedLocations", List.of("EU"));
        req.setAttributes(attributes);

        IRequirementsComplianceChecker reqEvaluator = complianceCheckerFactory.create(req.getReqEvaluator(), req.getAttributes());

        assertTrue(reqEvaluator instanceof ProcessingLocationComplianceChecker);
    }

    @Test
    void createShouldThrowExeptionIfInvalidEvaluator()  {

        Requirement req = new Requirement();
        req.setReqEvaluator("INVALIDEVALUATOR");
        req.setAttributes(new HashMap<>());

        // tester at vi får en exception, hvis den er invalid
        RuntimeException exception = assertThrows(InputMismatchException.class, ()-> {
            complianceCheckerFactory.create(req.getReqEvaluator(),req.getAttributes());
        });
    }

    @Test
    void getInvalidReqEvaluatorTest()  {

    }
}
