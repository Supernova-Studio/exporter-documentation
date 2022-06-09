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
        if (property.codeName === "status") {
            // Get value user selected. This will however only select id of the property, we need human-recognizable tag
            let selectedOption = values[property.codeName]

            // Get options
            let options = property.options
            for (let option of options) {
                // Select human name from the options
                if (option.id === selectedOption) {
                    selectedOptionName = option.id
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
        case "status-healthy": return "healthy"
        case "status-known-issues": return "withering"
        case "status-deprecated": return "dormant"
        default: return "unknown"
    }
}
 
