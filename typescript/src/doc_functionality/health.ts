// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Health

export function convertHealthTagIfAny(component: any): "healthy" | "withering" | "dormant" | "unknown" {

    let properties = component.properties
    let values = component.propertyValues
    let selectedOptionName: string | null = null

    // Find health property
    for (let property of properties) {
        if (property.name === "Health") {
            // Get value user selected. This will however only select id of the property, we need human-recognizable tag
            let selectedOption = values[property.persistentId]
            
            // Get options
            let options = property.options
            for (let option of options) {
                // Select human name from the options
                if (option.id === selectedOption) {
                    selectedOptionName = option.name
                }
            }
        } 
    }

    // Make sure it is lowercased for proper check
    if (selectedOptionName) {
        selectedOptionName = selectedOptionName.toLowerCase()
    } else {
        return "unknown"
    }
    
    // Check for health status, or none
    switch (selectedOptionName) {
        case "healthy": return "healthy"
        case "dormant": return "dormant"
        case "withering": return "withering"
        default: return "unknown"
    }
}
 
