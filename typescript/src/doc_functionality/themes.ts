import { escapeHtml } from './string_utils';

/** Returns a string of themes separated by <br /> used for the tooltip */
export function getThemesTooltip(themes: Array<{ name: string }>) {
  // Escape HTML to prevent html content in the tooltip
  return themes.map(t => escapeHtml(t.name)).join('<br />');
}
