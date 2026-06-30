export class Router {
  constructor(routes) {
    this.routes = routes;
    window.addEventListener("hashchange", this.handleRoute.bind(this));
    window.addEventListener("load", this.handleRoute.bind(this));
  }

  navigate(path) {
    window.location.hash = path;
  }

  handleRoute() {
    const path = window.location.hash.replace("#", "") || "/";
    const action = this.routes[path] || this.routes["/404"];
    if (typeof action === "function") action();
  }
}

export function navigate(router, path){
  router.navigate(path);
}