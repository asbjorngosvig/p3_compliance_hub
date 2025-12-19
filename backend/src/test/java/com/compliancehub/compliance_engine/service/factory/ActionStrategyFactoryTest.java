package com.compliancehub.compliance_engine.service.factory;


import com.compliancehub.compliance_engine.strategy.ActionStrategy.EmailNoticeStrategy;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.InputMismatchException;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class ActionStrategyFactoryTest {
    public ActionStrategyFactory factory;

    @BeforeEach
    void setUp(){
        factory = new ActionStrategyFactory();
    }

    @Test
    void createShouldReturnCorrectEvaluator() {
        String strategy = "NeedEmailNotice";

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("daysOfNotice", 30);
        attributes.put("email", "test@test.com");


        assertInstanceOf(EmailNoticeStrategy.class, factory.create(strategy, attributes));
    }

    @Test
    void createShouldThrowExeptionIfInvalidEvaluator()  {
        String strategy = "INVALID STRATEGY";
        Map<String, Object> attributes = new HashMap<>(); // emtpy attributes

        // tester at vi får en exception, hvis den er invalid
        assertThrows(InputMismatchException.class, ()-> {
            factory.create(strategy, attributes);
        });
    }

    @Test
    void getInvalidReqEvaluatorTest()  {

    }

}
