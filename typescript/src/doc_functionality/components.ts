export function isComponentSelected(
  selectedComponents: { figmaComponentId: string }[],
  figmaComponentId: string
): boolean {
  return selectedComponents.some(
    selectedComponent => selectedComponent.figmaComponentId === figmaComponentId
  );
}

type ComponentPreview = {
  name: string | null;
  component: DesignComponent;
  properties: (DesignComponentProperty & {
    value: string;
  })[];
};

export function getComponentPreviews(
  selectedComponent: DesignComponent,
  selectedPropertyIds: string[],
  areSelectedMultipleComponents: boolean
): ComponentPreview[] {
  const componentProperties = Object.values(
    selectedComponent.componentPropertyDefinitions
  )
    ?.filter(
      // we want to find variants only for variant properties definitions
      definition => definition.type === 'Variant'
    )
    ?.map(propertyDefinition => {
      return {
        ...propertyDefinition,
        isSelected: selectedPropertyIds.includes(propertyDefinition.id)
      };
    });

  if (!componentProperties || componentProperties.length === 0) {
    // render selected component when it has no properties
    return [
      {
        component: selectedComponent,
        name: selectedComponent.name,
        properties: []
      }
    ];
  }

  const componentPropertyMap =
    componentProperties.reduce<
      Record<string, DesignComponentProperty>
    >((acc, property) => {
      acc[property.id] = property;
      return acc;
    }, {}) ?? {};

  const variantsToRender =
    selectedComponent.subcomponents?.reduce<ComponentPreview[]>(
      (acc, componentVariant) => {
        if (!componentVariant.variantPropertyValues) {
          return acc;
        }

        const properties = Object.entries(
          componentVariant.variantPropertyValues
        ).flatMap(([id, value]) => {
          const property = componentPropertyMap[id];

          if (!property) {
            return [];
          }

          return {
            ...property,
            value
          };
        });

        if (areSelectedMultipleComponents || selectedPropertyIds.length === 0) {
          // render default variants when multiple components are selected or no property ids are selected. If variant has all values that are default, consider it as a default variant
          const isDefaultVariant = componentProperties.every(
            definition =>
              componentVariant.variantPropertyValues?.[definition.id] ===
              definition.defaultValue
          );

          if (isDefaultVariant) {
            acc.push({
              component: componentVariant,
              name: selectedComponent.name,
              properties
            });
          }

          return acc;
        }

        const shouldShowVariantBasedOnPropertySelection = componentProperties?.every(
          componentProperty => {
            const componentPropertyVariantValue =
              componentVariant.variantPropertyValues?.[componentProperty.id];
            if (componentProperty.isSelected) {
              return componentPropertyVariantValue;
            }

            // if the property is not selected, check if it has default value
            return (
              componentPropertyVariantValue === componentProperty.defaultValue
            );
          }
        );

        if (shouldShowVariantBasedOnPropertySelection) {
          acc.push({
            component: componentVariant,
            name: selectedComponent.name,
            // return only properties that are selected
            properties: properties.filter(property => selectedPropertyIds.includes(property.id))
          });
        }

        return acc;
      },
      []
    ) ?? [];

  if (variantsToRender.length === 0) {
    // there are no variants to render so render selected component
    return [
      {
        component: selectedComponent,
        name: selectedComponent.name,
        properties: []
      }
    ];
  }

  return variantsToRender;
}
