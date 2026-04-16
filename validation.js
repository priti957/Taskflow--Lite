export function validateTaskInput(text) {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    alert('Task cannot be empty');
    return false;
  }
  if (trimmed.length > 100) {
    alert('Task too long. Max 100 characters');
    return false;
  }
  return true;
}

export function escapeHTML(str) {
  return str.replace(/[&<>"']/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[tag]));
}