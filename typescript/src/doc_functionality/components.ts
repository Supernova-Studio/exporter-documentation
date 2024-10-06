export function isComponentSelected(
  selectedComponents: { figmaComponentId: string }[],
  figmaComponentId: string
): boolean {
  return selectedComponents.some(
    selectedComponent => selectedComponent.figmaComponentId === figmaComponentId
  );
}
