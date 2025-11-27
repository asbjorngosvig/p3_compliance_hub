package com.compliancehub.Strategy.CommunicationStrategy;

import com.compliancehub.model.Action;
import com.compliancehub.model.DPA;
import com.compliancehub.strategy.CommunicationStrategy.NeedEmailNotice;
import com.compliancehub.strategy.CommunicationStrategy.NeedWrittenAprooval;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class NeedWrittenAproovalTest {

    NeedWrittenAprooval strategy;
    DPA dpa = new DPA();
    Map<String, Object> attributes = new HashMap<>();
    String email = "test@test.com";


    @BeforeEach
    void setup() {
        attributes.put("email", email);
        strategy = new NeedWrittenAprooval(attributes);
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