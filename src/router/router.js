// Simple hash-based router for LuminaUI
// No dependencies. Pure vanilla JS.

let currentRoute = null;
let routeParams = {};
let rerouter = null;
let routes = new Map();

// Parse route parameters (e.g., "/users/:id" matches "/users/123")
function matchRoute(path, routePath) {
  const pathParts = path.split("/").filter(Boolean);
  const routeParts = routePath.split("/").filter(Boolean);
  
  if (pathParts.length !== routeParts.length) return null;
  
  const params = {};
  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(":")) {
      params[routeParts[i].slice(1)] = pathParts[i];
    } else if (routeParts[i] !== pathParts[i]) {
      return null;
    }
  }
  return params;
}

// Get current hash path (without the #)
function getHashPath() {
  let hash = window.location.hash.slice(1);
  // Remove query string if present
  const queryIndex = hash.indexOf("?");
  if (queryIndex !== -1) hash = hash.slice(0, queryIndex);
  return hash || "/";
}

// Get query parameters from URL
function getQueryParams() {
  const hash = window.location.hash.slice(1);
  const queryIndex = hash.indexOf("?");
  if (queryIndex === -1) return {};
  
  const queryString = hash.slice(queryIndex + 1);
  const params = {};
  queryString.split("&").forEach(pair => {
    const [key, value] = pair.split("=");
    if (key) params[decodeURIComponent(key)] = decodeURIComponent(value || "");
  });
  return params;
}

// Navigate to a new route
export function navigate(to, options = {}) {
  const { replace = false, state = {} } = options;
  const newHash = to.startsWith("/") ? to : "/" + to;
  
  if (replace) {
    window.location.replace(`#${newHash}`);
  } else {
    window.location.hash = newHash;
  }
  
  // Update router state
  if (rerouter) rerouter();
}

// Navigate back
export function goBack() {
  window.history.back();
}

// Navigate forward
export function goForward() {
  window.history.forward();
}

// Define routes
export function createRouter(routeDefinitions) {
  routes.clear();
  for (const [path, handler] of Object.entries(routeDefinitions)) {
    routes.set(path, handler);
  }
  
  // Handle route change
  function handleRouteChange() {
    const path = getHashPath();
    const query = getQueryParams();
    
    let matchedRoute = null;
    let matchedParams = {};
    
    // Try to match route (supports dynamic params)
    for (const [routePath, handler] of routes.entries()) {
      const params = matchRoute(path, routePath);
      if (params !== null) {
        matchedRoute = handler;
        matchedParams = params;
        break;
      }
    }
    
    // Fallback to 404 if no route matches
    if (!matchedRoute && routes.has("*")) {
      matchedRoute = routes.get("*");
    } else if (!matchedRoute && routes.has("/404")) {
      matchedRoute = routes.get("/404");
    } else if (!matchedRoute) {
      console.warn(`No route found for: ${path}`);
      return;
    }
    
    currentRoute = matchedRoute;
    routeParams = matchedParams;
    
    // Notify router subscribers
    if (rerouter) rerouter();
  }
  
  // Listen for hash changes
  window.addEventListener("hashchange", handleRouteChange);
  window.addEventListener("popstate", handleRouteChange);
  
  // Initial route handling
  handleRouteChange();
  
  // Return router object
  return {
    get currentPath() {
      return getHashPath();
    },
    get params() {
      return routeParams;
    },
    get query() {
      return getQueryParams();
    },
    get currentComponent() {
      return currentRoute;
    },
    refresh() {
      handleRouteChange();
    },
    destroy() {
      window.removeEventListener("hashchange", handleRouteChange);
      window.removeEventListener("popstate", handleRouteChange);
      rerouter = null;
    },
  };
}

// Subscribe to route changes (for use in components)
export function useRouter(forceUpdate) {
  rerouter = forceUpdate;
  return {
    currentPath: getHashPath(),
    params: routeParams,
    query: getQueryParams(),
    navigate,
    goBack,
    goForward,
  };
}

// Link component for navigation
export function Link({ to, children, replace = false, className = "", style = {}, onClick = null }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to, { replace });
  };
  
  return {
    tag: "a",
    props: {
      href: `#${to.startsWith("/") ? to : "/" + to}`,
      onClick: handleClick,
      className,
      style: {
        cursor: "pointer",
        textDecoration: "none",
        ...style,
      },
    },
    children: Array.isArray(children) ? children : [children],
  };
}

// Redirect component
export function Redirect({ to, replace = true }) {
  // Execute navigation immediately
  setTimeout(() => navigate(to, { replace }), 0);
  return null;
}

// Protected route wrapper
export function ProtectedRoute({ component, fallback = null, condition = null }) {
  const isAuthenticated = condition ? condition() : false;
  
  if (!isAuthenticated) {
    return fallback || Redirect({ to: "/login", replace: true });
  }
  
  return component;
}

// Route component (used inside RouterSwitch)
export function Route({ path, component, exact = false }) {
  const currentPath = getHashPath();
  const matches = exact ? currentPath === path : currentPath.startsWith(path);
  
  if (!matches) return null;
  
  // Extract params if path has dynamic segments
  const params = matchRoute(currentPath, path);
  if (params) {
    routeParams = { ...routeParams, ...params };
  }
  
  return component;
}

// Router switch component (renders first matching route)
export function RouterSwitch({ routes: routeConfig, fallback = null, forceUpdate = null }) {
  const currentPath = getHashPath();
  
  // Find first matching route
  for (const { path, component, exact = false } of routeConfig) {
    const matches = exact ? currentPath === path : currentPath.startsWith(path);
    if (matches) {
      return component;
    }
  }
  
  // Check for wildcard route
  const wildcard = routeConfig.find(r => r.path === "*");
  if (wildcard) return wildcard.component;
  
  return fallback;
}

// Create a RoutedApp wrapper component
export function createRoutedApp(routes, NotFoundComponent = null) {
  const router = createRouter(routes);
  
  return function RoutedApp(forceUpdate) {
    useRouter(forceUpdate);
    const Component = router.currentComponent;
    
    if (!Component && NotFoundComponent) {
      return NotFoundComponent;
    }
    
    return Component || null;
  };
}

// Generate navigation links (for breadcrumbs or menus)
export function generateBreadcrumbs() {
  const path = getHashPath();
  const segments = path.split("/").filter(Boolean);
  const breadcrumbs = [];
  
  let currentPath = "";
  for (const segment of segments) {
    currentPath += "/" + segment;
    breadcrumbs.push({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: currentPath,
    });
  }
  
  return breadcrumbs;
}