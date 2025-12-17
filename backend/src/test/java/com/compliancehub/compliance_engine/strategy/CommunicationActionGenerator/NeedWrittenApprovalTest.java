package com.compliancehub.compliance_engine.strategy.CommunicationActionGenerator;

import com.compliancehub.compliance_engine.model.Action;
import com.compliancehub.dpa_manager.DPA;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class NeedWrittenApprovalTest {

    NeedWrittenApproval strategy;
    DPA dpa = new DPA();
    Map<String, Object> attributes = new HashMap<>();
    String email = "test@test.com";


    @BeforeEach
    void setup() {
        attributes.put("email", email);
        strategy = new NeedWrittenApproval(attributes);
    }


    @Test
    void makeSureParsingIsRunWhenInitialized() {
        assertNotNull(strategy.getEmail());
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