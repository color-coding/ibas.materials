package org.colorcoding.ibas.materials.rules.material;

import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.i18n.I18N;
import org.colorcoding.ibas.bobas.rule.BusinessRule;
import org.colorcoding.ibas.bobas.rule.BusinessRuleContext;
import org.colorcoding.ibas.bobas.rule.BusinessRuleException;

/**
 * @author Fancy
 * @date 2017/12/1
 */
public class RequiredMaterialsCodeRules extends BusinessRule {


    public RequiredMaterialsCodeRules(IPropertyInfo itemCodeProperty){
        this.itemCodeProperty  = itemCodeProperty;
    }
    @Override
    protected void execute(BusinessRuleContext businessRuleContext) throws Exception {
        String itemCode = businessRuleContext.getInputPropertyValues().get(this.itemCodeProperty).toString();
        if(itemCode.isEmpty()){
            throw new BusinessRuleException( String.format(I18N.prop("msg_mm_material_miss_itemcode")));
        }
    }

    IPropertyInfo itemCodeProperty;
    @Override
    protected String getName() {
        return null;
    }
}
