import privateProps from '../privateProps.js'
import { swalClasses } from '../utils/classes.js'
import * as dom from '../utils/dom/index.js'

<<<<<<< HEAD
// Show block with validation message
=======
/**
 * Show block with validation message
 *
 * @param {string} error
 */
>>>>>>> upstream/main
export function showValidationMessage(error) {
  const domCache = privateProps.domCache.get(this)
  const params = privateProps.innerParams.get(this)
  dom.setInnerHtml(domCache.validationMessage, error)
  domCache.validationMessage.className = swalClasses['validation-message']
  if (params.customClass && params.customClass.validationMessage) {
    dom.addClass(domCache.validationMessage, params.customClass.validationMessage)
  }
  dom.show(domCache.validationMessage)

  const input = this.getInput()
  if (input) {
    input.setAttribute('aria-invalid', true)
    input.setAttribute('aria-describedby', swalClasses['validation-message'])
    dom.focusInput(input)
    dom.addClass(input, swalClasses.inputerror)
  }
}

<<<<<<< HEAD
// Hide block with validation message
=======
/**
 * Hide block with validation message
 */
>>>>>>> upstream/main
export function resetValidationMessage() {
  const domCache = privateProps.domCache.get(this)
  if (domCache.validationMessage) {
    dom.hide(domCache.validationMessage)
  }

  const input = this.getInput()
  if (input) {
    input.removeAttribute('aria-invalid')
    input.removeAttribute('aria-describedby')
    dom.removeClass(input, swalClasses.inputerror)
  }
}
