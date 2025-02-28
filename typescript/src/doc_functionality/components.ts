type ComponentPreview = {
  name: string | null;
  component: DesignComponent;
  properties: (DesignComponentProperty & {
    value: string;
  })[];
};

type DesignComponentVariant = DesignComponent['componentPropertyDefinitions'] & {
  value: string;
};

/** If variant has all values that are default, consider it as a default variant */
function getDefaultVariantPreview(
  selectedComponent: DesignComponent,
  componentVariant: DesignComponent,
  componentProperties: DesignComponentProperty[]
) {
  const isDefaultVariant = componentProperties.every(
    definition =>
      componentVariant.variantPropertyValues?.[definition.id] ===
      definition.defaultValue
  );

  if (isDefaultVariant) {
    return {
      component: componentVariant,
      name: selectedComponent.name,
      properties: []
    };
  }

  return null;
}

/** Returns all variant previews that should be rendered based on the selected properties */
function getVariantPreviewsToRender(
  selectedComponent: DesignComponent,
  componentProperties: DesignComponentProperty[],
  selectedPropertiesSet: Set<string>,
  selectedVariants: Record<string, string[]>
) {
  const componentPropertyMap = new Map(
    componentProperties.map(property => [property.id, property])
  );

  return (
    selectedComponent.subcomponents?.reduce<ComponentPreview[]>(
      (acc, componentVariant) => {
        if (!componentVariant.variantPropertyValues) {
          return acc;
        }

        const properties = Object.entries(
          componentVariant.variantPropertyValues
        ).flatMap(([id, value]) => {
          const property = componentPropertyMap.get(id);

          if (!property) {
            return [];
          }

          return {
            ...property,
            value
          };
        });

        const areNoVariantsSelected = properties.every(
          ({ id }) =>
            !selectedVariants[id] || selectedVariants[id]?.length === 0
        );

        if (selectedPropertiesSet.size === 0 && areNoVariantsSelected) {
          // return default variant when no property ids are selected
          const defaultVariantPreview = getDefaultVariantPreview(
            selectedComponent,
            componentVariant,
            componentProperties
          );

          if (defaultVariantPreview) {
            acc.push(defaultVariantPreview);
          }

          return acc;
        }

        if (
          shouldShowVariant(
            componentProperties,
            componentVariant,
            selectedPropertiesSet,
            selectedVariants
          )
        ) {
          acc.push({
            component: componentVariant,
            name: selectedComponent.name,
            // We only want to show properties that are selected
            properties: properties.filter(
              property =>
                selectedPropertiesSet.has(property.id) ||
                selectedVariants[property.id]?.includes(property.value)
            )
          });
        }

        return acc;
      },
      []
    ) ?? []
  );
}

/** Returns true if the variant should be shown based on the selected properties */
function shouldShowVariant(
  componentProperties: DesignComponentProperty[],
  componentVariant: DesignComponent,
  selectedPropertiesSet: Set<string>,
  selectedVariants: Record<string, string[]>
): boolean {
  return componentProperties.every(componentProperty => {
    const componentPropertyVariantValue =
      componentVariant.variantPropertyValues?.[componentProperty.id];

    const selectedComponentVariantValues =
      selectedVariants[componentProperty.id] ?? [];

    if (
      selectedPropertiesSet.has(componentProperty.id) ||
      (selectedComponentVariantValues.length > 0 &&
        componentPropertyVariantValue &&
        selectedComponentVariantValues.includes(componentPropertyVariantValue))
    ) {
      return componentPropertyVariantValue;
    }

    // if the property is not selected, check if it has default value
    return (
      componentPropertyVariantValue === componentProperty.defaultValue &&
      selectedComponentVariantValues.length === 0
    );
  });
}

export function getComponentPreviews(
  selectedComponent: DesignComponent,
  selectedPropertyIds: string[],
  selectedComponentVariants: Record<string, string[]>
): ComponentPreview[] {
  const selectedProperties = selectedPropertyIds ?? [];
  const selectedVariants = selectedComponentVariants ?? {};

  if (!selectedComponent) {
    return [];
  }

  // use a set for faster lookups
  const selectedPropertiesSet = new Set(selectedProperties);
  const componentProperties = Object.values(
    selectedComponent.componentPropertyDefinitions ?? {}
  ).filter(
    // we want to find variants only for variant properties definitions
    definition => definition.type === 'Variant'
  );

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

  const variantsToRender = getVariantPreviewsToRender(
    selectedComponent,
    componentProperties,
    selectedPropertiesSet,
    selectedVariants
  );

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

export function sortComponentsPreviews(
  componentPreviews: ComponentPreview[],
  previewOrderIds: string[] | undefined
): ComponentPreview[] {
  if (!previewOrderIds || previewOrderIds.length === 0) {
    return componentPreviews;
  }

  return [...componentPreviews].sort((a, b) => {
    const aIndex = previewOrderIds.indexOf(a.component.id ?? '');
    const bIndex = previewOrderIds.indexOf(b.component.id ?? '');

    // If either ID is not found (index is -1), put it at the end
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    // Otherwise, sort by index
    return aIndex - bIndex;
  });
}
