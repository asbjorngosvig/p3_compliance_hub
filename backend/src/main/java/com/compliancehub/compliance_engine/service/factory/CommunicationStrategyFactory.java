package com.compliancehub.compliance_engine.service.factory;

import com.compliancehub.compliance_engine.strategy.CommunicationActionStrategy.IActionStrategy;
import com.compliancehub.compliance_engine.strategy.CommunicationActionStrategy.EmailNoticeStrategy;
import com.compliancehub.compliance_engine.strategy.CommunicationActionStrategy.WrittenApprovalStrategy;
import org.springframework.stereotype.Component;

import java.util.InputMismatchException;
import java.util.Map;

@Component
public class CommunicationStrategyFactory {
    public IActionStrategy create(String strategy, Map<String, Object> attributes){
        switch (strategy) {
            case "NeedEmailNotice": return new EmailNoticeStrategy(attributes);
            case "NeedWrittenApproval": return new WrittenApprovalStrategy(attributes);

            //  Add more Evaluators

            default: throw new InputMismatchException("Error getting requirement strategy "+strategy);
        }
    }
}
