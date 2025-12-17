package com.compliancehub.compliance_engine.service.factory;

import com.compliancehub.compliance_engine.strategy.CommunicationActionGenerator.ICommunicationStrategy;
import com.compliancehub.compliance_engine.strategy.CommunicationActionGenerator.NeedEmailNotice;
import com.compliancehub.compliance_engine.strategy.CommunicationActionGenerator.NeedWrittenApproval;
import org.springframework.stereotype.Component;

import java.util.InputMismatchException;
import java.util.Map;

@Component
public class CommunicationStrategyFactory {
    public ICommunicationStrategy create(String strategy, Map<String, Object> attributes){
        switch (strategy) {
            case "NeedEmailNotice": return new NeedEmailNotice(attributes);
            case "NeedWrittenApproval": return new NeedWrittenApproval(attributes);

            //  Add more Evaluators

            default: throw new InputMismatchException("Error getting requirement strategy "+strategy);
        }
    }
}
