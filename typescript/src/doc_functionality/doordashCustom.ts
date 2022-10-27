import { pageUrl } from "./urls"

export function getPlatformTeams() {
   return [
      "i-os",
      "android",
      "design",
      "web"
   ]
}

export function getQuickLinkTypes() {
   return {
      figma: {
         name: 'figma',
         label: 'Figma',
         icon: '/comeback'
      },
      github: {
         name: 'github',
         label: 'GitHub',
         icon: '/comeback'
      },
      prism: {
         name: 'prism',
         label: 'Design Guidance',
         icon: '/comeback'
      },
      storybook: {
         name: 'storybook',
         label: 'Storybook',
         icon: '/comeback'
      }
   }
}


/** Do a console dump */
export function debug(data: any) {
   return JSON.stringify(data)
}

export function getComponentByName(name: string, components: any) {
   const component = components.filter(component => component.name === name)[0]  
   return component || null

}

export function androidLinks() {
   const quickLinkTypes = getQuickLinkTypes()
   return [
      {
         codeName: "designDocumentationLink",
         type: quickLinkTypes.prism.name,
         label: 'Design Guidance'
      },
      {
         codeName: "androidViewsRepository",
         type: quickLinkTypes.github.name,
         label: 'Views Source'
      },
      {
         codeName: "androidJetpackComposeRepository",
         type: quickLinkTypes.github.name,
         label: 'Jetpack Source'
      }
   ]
}


export function iOSLinks() {
   const quickLinkTypes = getQuickLinkTypes()
   return [
      {
         codeName: "designDocumentationLink",
         type: quickLinkTypes.prism.name,
         label: 'Design Guidance'
      },
      {
         codeName: "iosSwiftRepository",
         type: quickLinkTypes.github.name,
         label: 'SwiftUI Source'
      },
      {
         codeName: "iosUikitRepository",
         type: quickLinkTypes.github.name,
         label: 'UIKit Source'
      }
   ]
}

export function webLinks() {
   const quickLinkTypes = getQuickLinkTypes()
   return [
      {
         codeName: "designDocumentationLink",
         type: quickLinkTypes.prism.name,
         label: 'Design Guidance'
      },
      {
         codeName: "webRepository",
         type: quickLinkTypes.github.name,
         label: 'Source'
      },
      {
         codeName: "storybookLink",
         type: quickLinkTypes.storybook.name,
         label: 'Storybook'
      }
   ]
}


export function designLinks() {
   const quickLinkTypes = getQuickLinkTypes()
   return [
      {
         codeName: "cxfigmaComponent",
         type: quickLinkTypes.figma.name,
         label: 'Cx Figma'
      },
      {
         codeName: "mxfigmaComponent",
         type: quickLinkTypes.figma.name,
         label: 'Mx Figma'
      },      
      {
         codeName: "storybookLink",
         type: quickLinkTypes.storybook.name,
         label: 'Storybook'
      }
   ]
}

/** Find out if a link set has any info */
export function hasActiveQuickLinks(links: any, component: any) {
   return links.filter(link => component.propertyValues[link.codeName]).length ? true : false
}

/** Find Component Based on Page */
export function getComponentByPageSlug(pageData: any, components: any) {

   const platformTeams = getPlatformTeams()

   if(components.length === 0 ) {
      return { error: 'no components found in design system.' }
   }

   const url = pageUrl(pageData, undefined)
   
   /** Get platform name */
   const platform = url.split('/')[1]

   /** Section does not contains component relationships */
   if(!platformTeams.includes(platform)) {
      return { error: `${platform} platform is not supported.` }
   }
   
   const platformSection = url.split('/')[2]

   /** If this isn't the components section, then bail */
   if(platformSection !== 'components') {
      return { error: `${platformSection} section is not a components section.` }
   }
   
   const platformSectionComponentRaw =  url.split('/')[3].split('-')

   /** If no page for some reason. */
   if(!platformSectionComponentRaw) {
      return { error: 'no component found in url slug'}
   }


   /** Convert slug to title case */
   const platformSectionComponent = !platformSectionComponentRaw.length ? platformSectionComponentRaw[0] : platformSectionComponentRaw.map(word => {
      return word.slice(0, 1).toUpperCase() + word.slice(1)
    })
    .join(' ')
    //in case page doesn't have tabs...we also split off the html
    .split('.html')[0]
   
   const component = getComponentByName(platformSectionComponent, components)  

   /** Bail if the component does not exist in our status table */
   if(!component) {
      return { error: `${platformSectionComponent} was not found in component table` }
   }
   
   return {
      platform,
      platformSection,
      platformSectionComponent,
      componentData: component
   }
}