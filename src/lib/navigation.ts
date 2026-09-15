const ROUTE_CHANGE_EVENT = "portfolio:route-change"

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> }
}

export function getCurrentPath() {
  return window.location.pathname.replace(/\/+$/, "") || "/"
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function navigateTo(path: string) {
  const normalizedPath = path.replace(/\/+$/, "") || "/"

  if (getCurrentPath() === normalizedPath) return

  const updateRoute = () => {
    window.history.pushState({}, "", normalizedPath)
    window.dispatchEvent(new Event(ROUTE_CHANGE_EVENT))
  }
  const transitionDocument = document as ViewTransitionDocument

  if (!transitionDocument.startViewTransition || prefersReducedMotion()) {
    updateRoute()
    return
  }

  document.documentElement.dataset.pageTransition = "route"
  const transition = transitionDocument.startViewTransition(updateRoute)
  transition.finished.finally(() => {
    delete document.documentElement.dataset.pageTransition
  })
}

export function onRouteChange(callback: () => void) {
  window.addEventListener("popstate", callback)
  window.addEventListener(ROUTE_CHANGE_EVENT, callback)

  return () => {
    window.removeEventListener("popstate", callback)
    window.removeEventListener(ROUTE_CHANGE_EVENT, callback)
  }
}
