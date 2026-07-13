def get_suggestions(risk_percentage, bmi, hba1c_level, blood_glucose_level):
    suggestions = []
    
    # Base suggestions on overall risk
    if risk_percentage > 70:
        suggestions.append("Consult a physician immediately for a comprehensive checkup.")
        suggestions.append("Monitor blood sugar levels closely on a daily basis.")
    elif risk_percentage > 40:
        suggestions.append("Schedule an appointment with a doctor for a routine evaluation.")
        suggestions.append("Consider lifestyle modifications including diet and exercise.")
    else:
        suggestions.append("Maintain your current healthy lifestyle.")
        suggestions.append("Continue regular annual checkups.")
        
    # Specific metric suggestions
    if bmi >= 30:
        suggestions.append("Incorporate at least 150 minutes of moderate aerobic activity per week.")
        suggestions.append("Consult a dietitian for a personalized weight management plan.")
    elif bmi >= 25:
        suggestions.append("Adopt a balanced diet focusing on whole grains, lean proteins, and vegetables to manage weight.")
        
    if hba1c_level >= 6.5:
        suggestions.append("Strictly reduce intake of simple carbohydrates and sugary beverages.")
    elif hba1c_level >= 5.7:
        suggestions.append("Focus on a low glycemic index diet to prevent further increases in HbA1c.")
        
    if blood_glucose_level >= 126:
        suggestions.append("Immediate intervention may be required to lower fasting glucose levels.")
    elif blood_glucose_level >= 100:
        suggestions.append("Be mindful of portion sizes and avoid late-night eating.")
        
    # Ensure we return at least 3 but not too many
    return list(set(suggestions))[:4]
