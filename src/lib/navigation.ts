const ROUTE_CHANGE_EVENT = "portfolio:route-change"

export function getCurrentPath() {
  return window.location.pathname.replace(/\/+$/, "") || "/"
}

export function navigateTo(path: string) {
  const normalizedPath = path.replace(/\/+$/, "") || "/"

  if (getCurrentPath() === normalizedPath) return

  window.history.pushState({}, "", normalizedPath)
  window.dispatchEvent(new Event(ROUTE_CHANGE_EVENT))
}

export function onRouteChange(callback: () => void) {
  window.addEventListener("popstate", callback)
  window.addEventListener(ROUTE_CHANGE_EVENT, callback)

  return () => {
    window.removeEventListener("popstate", callback)
    window.removeEventListener(ROUTE_CHANGE_EVENT, callback)
  }
}
