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

/**
 * If all previews share a single variant property name (e.g., Size), sort the combined list by that property so multiple components interleave by size.
 * Otherwise, fall back to name sorting.
 */
function sortPreviewsBySharedProperty(
  previews: ComponentPreview[]
): ComponentPreview[] {
  if (previews.length < 2) {
    return previews;
  }

  const compareStrings = (a: string, b: string) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  const sortByName = (a: ComponentPreview, b: ComponentPreview) =>
    compareStrings(a.name ?? '', b.name ?? '');

  const sharedPropertyNames = previews.reduce<Set<string> | null>(
    (acc, preview) => {
      const names = new Set(preview.properties.map(property => property.name));
      if (!acc) {
        return names;
      }

      const intersection = new Set<string>();
      names.forEach(name => {
        if (acc.has(name)) {
          intersection.add(name);
        }
      });

      return intersection;
    },
    null
  );

  if (!sharedPropertyNames || sharedPropertyNames.size !== 1) {
    return [...previews].sort(sortByName);
  }

  const [propertyName] = Array.from(sharedPropertyNames);

  return [...previews].sort((aPreview, bPreview) => {
    const aProperty = aPreview.properties.find(
      property => property.name === propertyName
    );
    const bProperty = bPreview.properties.find(
      property => property.name === propertyName
    );

    if (!aProperty || !bProperty) {
      return sortByName(aPreview, bPreview);
    }

    const aValue = aProperty.value ?? aProperty.defaultValue ?? '';
    const bValue = bProperty.value ?? bProperty.defaultValue ?? '';
    const aNumber = Number(aValue);
    const bNumber = Number(bValue);

    if (Number.isFinite(aNumber) && Number.isFinite(bNumber)) {
      const numberValueDifference = bNumber - aNumber;
      if (numberValueDifference !== 0) {
        return numberValueDifference;
      }
    }

    const stringValueDifference = compareStrings(
      String(aValue),
      String(bValue)
    );
    if (stringValueDifference !== 0) {
      return stringValueDifference;
    }

    return sortByName(aPreview, bPreview);
  });
}

function sortPreviewsByOrderIds(
  previews: ComponentPreview[],
  previewOrderIds: string[]
): ComponentPreview[] {
  if (previewOrderIds.length === 0) {
    return previews;
  }

  return [...previews].sort((a, b) => {
    const aIndex = previewOrderIds.indexOf(a.component.id ?? '');
    const bIndex = previewOrderIds.indexOf(b.component.id ?? '');

    // If either ID is not found (index is -1), put it at the end
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    // Otherwise, sort by index
    return aIndex - bIndex;
  });
}

function sortPreviews(
  previews: ComponentPreview[],
  previewOrderIds: string[]
): ComponentPreview[] {
  if (previewOrderIds.length > 0) {
    return sortPreviewsByOrderIds(previews, previewOrderIds);
  }

  return sortPreviewsBySharedProperty(previews);
}

export function sortComponentsPreviews(
  previews: ComponentPreview[],
  previewOrderIds: string[] | undefined
): ComponentPreview[] {
  return sortPreviews(previews, previewOrderIds ?? []);
}
