package com.compliancehub.Strategy.factory;


import com.compliancehub.compliance_engine.service.factory.CommunicationStrategyFactory;

import com.compliancehub.compliance_engine.strategy.CommunicationActionGenerator.NeedEmailNotice;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.InputMismatchException;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class CommunicationStrategyFactoryTest {
    public CommunicationStrategyFactory strategyFactory;

    @BeforeEach
    void setUp(){
        strategyFactory = new CommunicationStrategyFactory();
    }

    @Test
    void createShouldReturnCorrectEvaluator() {
        String strategy = "NeedEmailNotice";

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("daysOfNotice", 30);
        attributes.put("email", "test@test.com");


        assertInstanceOf(NeedEmailNotice.class, strategyFactory.create(strategy, attributes));
    }

    @Test
    void createShouldThrowExeptionIfInvalidEvaluator()  {
        String strategy = "INVALID STRATEGY";
        Map<String, Object> attributes = new HashMap<>(); // emtpy attributes

        // tester at vi får en exception, hvis den er invalid
        assertThrows(InputMismatchException.class, ()-> {
            strategyFactory.create(strategy, attributes);
        });
    }

    @Test
    void getInvalidReqEvaluatorTest()  {

    }

}
