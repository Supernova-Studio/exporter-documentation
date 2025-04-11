export function convertStoryPropsToJson(
  input?: unknown,
  defaultValue?: unknown
) {
  if (!input) {
    return JSON.stringify(defaultValue);
  }

  return JSON.stringify(input);
}
