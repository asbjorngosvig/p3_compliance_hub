package com.compliancehub.Strategy.CommunicationStrategy;


import com.compliancehub.compliance_engine.model.Action;
import com.compliancehub.compliance_engine.strategy.CommunicationStrategy.NeedEmailNotice;
import com.compliancehub.dpa_manager.DPA;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class NeedEmailNoticeTest {
    NeedEmailNotice strategy;
    DPA dpa = new DPA();
    Map<String, Object> attributes = new HashMap<>();
    String email = "test@test.com";
    int daysOfNotice = 30;


    @BeforeEach
    void setup() {
        attributes.put("email", email);
        attributes.put("daysOfNotice", daysOfNotice);
        strategy = new NeedEmailNotice(attributes);
    }


    @Test
    void makeSureParsingIsRunWhenInitialized() {
        assertNotNull(strategy.getEmail());
        assertTrue(strategy.getDaysOfNotice() != -1);
    }
    /**
     * Tester om attributes bliver mappet korrekt
     */
    @Test
    void createAttributesMapTest() {
        Map<String, Object> map = strategy.createAttributeMap();
        assertTrue(attributes.equals(map));
    }

    /**
     * Tester om variablerne får de rigtige værdier efter parsing
     */
    @Test
    void parseAttributesTest() {
        strategy.parseAttributes(attributes);
        assertEquals(this.email, strategy.getEmail());
    }

    @Test
    void actionIsGenerated() {
        Action newAction = strategy.createAction(dpa);

        assertNotNull(newAction);

    }

    @Test
    void assertActionDescriptionExists() {
        Action newAction = strategy.createAction(dpa);

        assertNotNull(newAction.getDescription());
    }



}