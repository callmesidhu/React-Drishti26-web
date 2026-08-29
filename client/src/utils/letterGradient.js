/**
 * Splits the text content of a DOM element into individual character spans,
 * each with the specified gradient class applied (defaults to 'text-gold-gradient').
 *
 * @param {HTMLElement} el - The DOM element to apply the effect to
 * @param {string} gradientClass - CSS class for text gradient (e.g. 'text-gold-gradient' or 'text-blue-gradient')
 */
export function applyLetterGradient(el, gradientClass = 'text-gold-gradient') {
  if (!el) return
  const text = el.textContent
  el.textContent = ''
  const fragment = document.createDocumentFragment()
  text.split('').forEach((char) => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.display = 'inline-block'
    span.className = gradientClass
    fragment.appendChild(span)
  })
  el.appendChild(fragment)
}
