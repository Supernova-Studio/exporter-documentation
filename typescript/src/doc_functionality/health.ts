// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Health

export function convertHealthTagIfAny(component: any): { id?: string, name: string, backgroundColor: string, slug: string } | null | undefined {

    let properties = component.properties
    let values = component.propertyValues
    let healthStatus = null;

    // Find health property
    for (let property of properties) {
        if (property.codeName === "status") {
            // Get value user selected. This will however only select id of the property, we need human-recognizable tag
            let selectedStatus = values["status"]

            // Get options
            let options = property.options
            for (let option of options) {

                // Select human name from the options
                if (option.id === selectedStatus) {
                    option.slug = slugify(option.name)
                    healthStatus = option
                }
            }
        } 
    }

    if (healthStatus) {
        return healthStatus;
    } else {
        return {
            name: "Unknown",
            slug: "unknown",
            backgroundColor: "#FFFFFF",
        }
    }
}
 
// Slugify a string
function slugify(str: string)
{
    str = str.replace(/^\s+|\s+$/g, '');

    // Make the string lowercase
    str = str.toLowerCase();

    // Remove accents, swap ñ for n, etc
    var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    // Remove invalid chars
    str = str.replace(/[^a-z0-9 -]/g, '') 
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-') 
    // Collapse dashes
    .replace(/-+/g, '-'); 

    return str;
}