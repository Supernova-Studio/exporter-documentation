// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports

import * as CSVParse from 'papaparse'

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Health

/** Create URL that directly download CSV from google sheets API */
export function constructGoogleSheetCSVUrl(sourceIdentifier, sourceName): string {
    return "https://docs.google.com/spreadsheets/d/" + sourceIdentifier + "/gviz/tq?tqx=out:csv&sheet=" + sourceName
}

/** Construct block from component health data */
export function constructDynamicHealthBlock(componentId: string, data: any) {
    
    // Use papaparse(r) to parse the google sheet CSV
    let parsedData = CSVParse.parse(data, {
        header: true
    })

    /* Example parsed output:

    {
        "data":[
            {
                "ID": "Button",
                "Health": "healthy",
                "Published": "1.1.1990",
                "Updated": "1.2.1990",
                "Design URL": "link"
                "Repository URL": "link"
                "Information": "Information about the component"
            }
        ],
    */

    // Find the component that has ID equal to component id
    if (!parsedData) {
        return undefined
    }

    for (let component of parsedData.data) {
        if (component.ID === componentId) {
            return {
                properties: {
                    id: component["ID"],
                    health: component["Health"],
                    published: component["Published"],
                    updated: component["Updated"],
                    designUrl: component["Design URL"],
                    repositoryUrl: component["Repository URL"],
                    documentationUrl: component["Documentation URL"],
                    info: component["Information"]
                }
            }
        }
    }
    
    return undefined
}
 

/** Construct blocks from component health data */
export function constructDynamicHealthList(data: any) {
    
    // Use papaparse(r) to parse the google sheet CSV
    let parsedData = CSVParse.parse(data, {
        header: true
    })

    /* Example parsed output:

    {
        "data":[
            {
                "ID": "Button",
                "Health": "healthy",
                "Published": "1.1.1990",
                "Updated": "1.2.1990",
                "Design URL": "link"
                "Repository URL": "link"
                "Information": "Information about the component"
            }
        ],
    */

    // Find the component that has ID equal to component id
    if (!parsedData) {
        return undefined
    }

    let components: Array<object> = []
    let healthy: number = 0
    let withering: number = 0
    let dormant: number = 0

    for (let component of parsedData.data) {
        components.push({
            id: component["ID"],
            health: component["Health"],
            published: component["Published"],
            updated: component["Updated"],
            designUrl: component["Design URL"],
            repositoryUrl: component["Repository URL"],
            documentationUrl: component["Documentation URL"],
            info: component["Information"]
        })
        let status = component["Health"]
        switch (status) {
            case "healthy": healthy += 1; break
            case "withering": withering += 1; break
            case "dormant": dormant += 1; break
        }
    }

    return {
        summary: {
            healthy: healthy,
            withering: withering,
            dormant: dormant
        }, 
        components: components
    }
}
 
