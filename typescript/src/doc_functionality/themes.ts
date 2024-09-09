import { escapeHtml } from './string_utils';

export function getThemesTooltip(themes: Array<{ name: string }>) {
  // Escape HTML to prevent html content in the tooltip
  return themes.map(t => escapeHtml(t.name)).join('<br />');
}
