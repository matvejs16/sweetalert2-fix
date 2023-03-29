import globalState, { restoreActiveElement } from '../globalState.js'
import { removeKeydownHandler } from '../keydown-handler.js'
import privateMethods from '../privateMethods.js'
import privateProps from '../privateProps.js'
import { unsetAriaHidden } from '../utils/aria.js'
import { swalClasses } from '../utils/classes.js'
import * as dom from '../utils/dom/index.js'
import { undoIOSfix } from '../utils/iosFix.js'
import { undoScrollbar } from '../utils/scrollbarFix.js'

<<<<<<< HEAD
/*
 * Instance method to close sweetAlert
 */

=======
/**
 * @param {SweetAlert2} instance
 * @param {HTMLElement} container
 * @param {boolean} returnFocus
 * @param {Function} didClose
 */
>>>>>>> upstream/main
function removePopupAndResetState(instance, container, returnFocus, didClose) {
  if (dom.isToast()) {
    triggerDidCloseAndDispose(instance, didClose)
  } else {
    restoreActiveElement(returnFocus).then(() => triggerDidCloseAndDispose(instance, didClose))
    removeKeydownHandler(globalState)
  }

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  // workaround for #2088
  // for some reason removing the container in Safari will scroll the document to bottom
  if (isSafari) {
    container.setAttribute('style', 'display:none !important')
    container.removeAttribute('class')
    container.innerHTML = ''
  } else {
    container.remove()
  }

  if (dom.isModal()) {
    undoScrollbar()
    undoIOSfix()
    unsetAriaHidden()
  }

  removeBodyClasses()
}

<<<<<<< HEAD
=======
/**
 * Remove SweetAlert2 classes from body
 */
>>>>>>> upstream/main
function removeBodyClasses() {
  dom.removeClass(
    [document.documentElement, document.body],
    [swalClasses.shown, swalClasses['height-auto'], swalClasses['no-backdrop'], swalClasses['toast-shown']]
  )
}

<<<<<<< HEAD
=======
/**
 * Instance method to close sweetAlert
 *
 * @param {any} resolveValue
 */
>>>>>>> upstream/main
export function close(resolveValue) {
  resolveValue = prepareResolveValue(resolveValue)

  const swalPromiseResolve = privateMethods.swalPromiseResolve.get(this)

  const didClose = triggerClosePopup(this)

  if (this.isAwaitingPromise()) {
    // A swal awaiting for a promise (after a click on Confirm or Deny) cannot be dismissed anymore #2335
    if (!resolveValue.isDismissed) {
      handleAwaitingPromise(this)
      swalPromiseResolve(resolveValue)
    }
  } else if (didClose) {
    // Resolve Swal promise
    swalPromiseResolve(resolveValue)
  }
}

<<<<<<< HEAD
=======
/**
 * @returns {boolean}
 */
>>>>>>> upstream/main
export function isAwaitingPromise() {
  return !!privateProps.awaitingPromise.get(this)
}

const triggerClosePopup = (instance) => {
  const popup = dom.getPopup()

  if (!popup) {
    return false
  }

  const innerParams = privateProps.innerParams.get(instance)
  if (!innerParams || dom.hasClass(popup, innerParams.hideClass.popup)) {
    return false
  }

  dom.removeClass(popup, innerParams.showClass.popup)
  dom.addClass(popup, innerParams.hideClass.popup)

  const backdrop = dom.getContainer()
  dom.removeClass(backdrop, innerParams.showClass.backdrop)
  dom.addClass(backdrop, innerParams.hideClass.backdrop)

  handlePopupAnimation(instance, popup, innerParams)

  return true
}

<<<<<<< HEAD
=======
/**
 * @param {any} error
 */
>>>>>>> upstream/main
export function rejectPromise(error) {
  const rejectPromise = privateMethods.swalPromiseReject.get(this)
  handleAwaitingPromise(this)
  if (rejectPromise) {
    // Reject Swal promise
    rejectPromise(error)
  }
}

<<<<<<< HEAD
export const handleAwaitingPromise = (instance) => {
=======
/**
 * @param {SweetAlert2} instance
 */
export const handleAwaitingPromise = (instance) => {
  // @ts-ignore
>>>>>>> upstream/main
  if (instance.isAwaitingPromise()) {
    privateProps.awaitingPromise.delete(instance)
    // The instance might have been previously partly destroyed, we must resume the destroy process in this case #2335
    if (!privateProps.innerParams.get(instance)) {
<<<<<<< HEAD
=======
      // @ts-ignore
>>>>>>> upstream/main
      instance._destroy()
    }
  }
}

<<<<<<< HEAD
=======
/**
 * @param {any} resolveValue
 * @returns {SweetAlertResult}
 */
>>>>>>> upstream/main
const prepareResolveValue = (resolveValue) => {
  // When user calls Swal.close()
  if (typeof resolveValue === 'undefined') {
    return {
      isConfirmed: false,
      isDenied: false,
      isDismissed: true,
    }
  }

  return Object.assign(
    {
      isConfirmed: false,
      isDenied: false,
      isDismissed: false,
    },
    resolveValue
  )
}

<<<<<<< HEAD
=======
/**
 * @param {SweetAlert2} instance
 * @param {HTMLElement} popup
 * @param {SweetAlertOptions} innerParams
 */
>>>>>>> upstream/main
const handlePopupAnimation = (instance, popup, innerParams) => {
  const container = dom.getContainer()
  // If animation is supported, animate
  const animationIsSupported = dom.animationEndEvent && dom.hasCssAnimation(popup)

  if (typeof innerParams.willClose === 'function') {
    innerParams.willClose(popup)
  }

  if (animationIsSupported) {
    animatePopup(instance, popup, container, innerParams.returnFocus, innerParams.didClose)
  } else {
    // Otherwise, remove immediately
    removePopupAndResetState(instance, container, innerParams.returnFocus, innerParams.didClose)
  }
}

<<<<<<< HEAD
=======
/**
 * @param {SweetAlert2} instance
 * @param {HTMLElement} popup
 * @param {HTMLElement} container
 * @param {boolean} returnFocus
 * @param {Function} didClose
 */
>>>>>>> upstream/main
const animatePopup = (instance, popup, container, returnFocus, didClose) => {
  globalState.swalCloseEventFinishedCallback = removePopupAndResetState.bind(
    null,
    instance,
    container,
    returnFocus,
    didClose
  )
  popup.addEventListener(dom.animationEndEvent, function (e) {
    if (e.target === popup) {
      globalState.swalCloseEventFinishedCallback()
      delete globalState.swalCloseEventFinishedCallback
    }
  })
}

<<<<<<< HEAD
const triggerDidCloseAndDispose = (instance, didClose) => {
  setTimeout(() => {
    if (typeof didClose === 'function') {
      didClose.bind(instance.params)()
    }
=======
/**
 * @param {SweetAlert2} instance
 * @param {Function} didClose
 */
const triggerDidCloseAndDispose = (instance, didClose) => {
  setTimeout(() => {
    if (typeof didClose === 'function') {
      // @ts-ignore
      didClose.bind(instance.params)()
    }
    // @ts-ignore
>>>>>>> upstream/main
    instance._destroy()
  })
}

export { close as closePopup, close as closeModal, close as closeToast }
