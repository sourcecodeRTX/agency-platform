// Color normalization utilities

const NAMED_COLORS: Record<string, string> = {
  cyan:     '#06B6D4',
  purple:   '#8B5CF6',
  green:    '#10B981',
  blue:     '#3B82F6',
  orange:   '#F97316',
  red:      '#EF4444',
  pink:     '#EC4899',
  amber:    '#F59E0B',
  teal:     '#14B8A6',
  indigo:   '#6366F1',
  violet:   '#7C3AED',
  rose:     '#F43F5E',
  lime:     '#84CC16',
  fuchsia:  '#D946EF',
  slate:    '#64748B',
  gray:     '#6B7280',
  gold:     '#EAB308',
  emerald:  '#10B981',
  sky:      '#0EA5E9',
  yellow:   '#EAB308',
  // Additional color variations
  'light-blue': '#38BDF8',
  'light-green': '#4ADE80',
  'light-purple': '#A78BFA',
};

/**
 * Normalize color value to hex format
 * Accepts: hex (#RRGGBB), named colors (cyan, purple, etc.)
 * Returns: valid hex color or fallback indigo
 */
export function normalizeColor(color: string): string {
  if (!color) return '#6366F1'; // indigo fallback
  
  const trimmed = color.trim().toLowerCase();
  
  // Already hex format
  if (trimmed.startsWith('#')) {
    // Validate hex format
    if (/^#[0-9A-Fa-f]{6}$/.test(trimmed)) {
      return trimmed.toUpperCase();
    }
    return '#6366F1'; // invalid hex, use fallback
  }
  
  // Named color lookup
  return NAMED_COLORS[trimmed] ?? '#6366F1';
}

/**
 * Convert hex color to RGB string for CSS rgba() usage
 * Example: "#3B82F6" -> "59, 130, 246"
 */
export function hexToRgb(hex: string): string {
  const normalized = normalizeColor(hex);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);
  
  if (!result) return '99, 102, 241'; // indigo fallback RGB
  
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

/**
 * Get all available named colors for UI display
 */
export function getNamedColors(): Array<{ name: string; hex: string }> {
  return Object.entries(NAMED_COLORS).map(([name, hex]) => ({ name, hex }));
}
