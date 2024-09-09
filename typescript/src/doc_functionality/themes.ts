export function getThemesTooltip(themes: Array<{ name: string }>) {
  return themes.map(t => t.name).join(', ');
}
