package com.compliancehub.Strategy.factory;

import com.compliancehub.dpa_manager.Requirement;
import com.compliancehub.compliance_engine.strategy.RequirementsEvaluator.IRequirementsEvaluator;
import com.compliancehub.compliance_engine.strategy.RequirementsEvaluator.ProcessingLocationEvaluator;
import com.compliancehub.compliance_engine.service.factory.EvaluatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class EvaluatorFactoryTest {

    public EvaluatorFactory evaluatorFactory;

    @BeforeEach
    void setUp(){
        evaluatorFactory = new EvaluatorFactory();
    }

    @Test
    void createShouldReturnCorrectEvaluator() {
        Requirement req = new Requirement();
        req.setReqEvaluator("ProcessingLocationEvaluator");
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("allowedLocations", List.of("EU"));
        req.setAttributes(attributes);

        IRequirementsEvaluator reqEvaluator = evaluatorFactory.create(req.getReqEvaluator(), req.getAttributes());

        assertTrue(reqEvaluator instanceof ProcessingLocationEvaluator);
    }

    @Test
    void createShouldThrowExeptionIfInvalidEvaluator()  {

        Requirement req = new Requirement();
        req.setReqEvaluator("INVALIDEVALUATOR");
        req.setAttributes(new HashMap<>());

        // tester at vi får en exception, hvis den er invalid
        RuntimeException exception = assertThrows(InputMismatchException.class, ()-> {
            evaluatorFactory.create(req.getReqEvaluator(),req.getAttributes());
        });
    }

    @Test
    void getInvalidReqEvaluatorTest()  {

    }
}
