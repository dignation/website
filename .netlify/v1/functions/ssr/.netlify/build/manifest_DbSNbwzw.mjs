import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import 'devalue';
import { k as decodeKey } from './chunks/astro/server_DCcrt5yw.mjs';
import 'clsx';
import 'html-escaper';
import { compile } from 'path-to-regexp';

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/peter/repos/dignation-website/","adapterName":"@astrojs/netlify","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/404","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/@astrojs/starlight/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.7qqag-5g.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://www.dignation.nz","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/node_modules/@astrojs/starlight/404.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:node_modules/@astrojs/starlight/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/node_modules/@astrojs/starlight/utils/routing.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/node_modules/@astrojs/starlight/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:node_modules/@astrojs/starlight/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/node_modules/@astrojs/starlight/utils/navigation.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/node_modules/@astrojs/starlight/components/Sidebar.astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:starlight/components/Sidebar",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/node_modules/@astrojs/starlight/components/Page.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/node_modules/@astrojs/starlight/components/SidebarSublist.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/node_modules/@astrojs/starlight/utils/route-data.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/node_modules/@astrojs/starlight/utils/translations.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/node_modules/@astrojs/starlight/internal.ts",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro-expressive-code/preprocess-config",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/node_modules/astro-expressive-code/components/renderer.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/node_modules/astro-expressive-code/components/Code.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/node_modules/astro-expressive-code/components/index.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/node_modules/@astrojs/starlight/components.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/node_modules/@astrojs/starlight/components/Footer.astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:starlight/components/Footer",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/src/content/docs/index.mdx",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/src/content/docs/index.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/node_modules/@astrojs/starlight/user-components/Aside.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/peter/repos/dignation-website/node_modules/@astrojs/starlight/user-components/FileTree.astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:node_modules/@astrojs/starlight/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:node_modules/@astrojs/starlight/index@_@astro":"pages/_---slug_.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DbSNbwzw.mjs","C:/Users/peter/repos/dignation-website/src/content/docs/getting-started/how-to-join.md?astroContentCollectionEntry=true":"chunks/how-to-join_CVqnqFLG.mjs","C:/Users/peter/repos/dignation-website/src/content/docs/index.mdx?astroContentCollectionEntry=true":"chunks/index_B3z-rEbk.mjs","C:/Users/peter/repos/dignation-website/src/content/docs/getting-started/how-to-join.md?astroPropagatedAssets":"chunks/how-to-join_VVAG6BV0.mjs","C:/Users/peter/repos/dignation-website/src/content/docs/index.mdx?astroPropagatedAssets":"chunks/index_DZEisRil.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_D9aVaOQr.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BcEe_9wP.mjs","\u0000virtual:astro-expressive-code/config":"chunks/config_CoF1ZRc0.mjs","C:/Users/peter/repos/dignation-website/node_modules/astro-expressive-code/dist/index.js":"chunks/index_DaVK51eC.mjs","\u0000virtual:astro-expressive-code/preprocess-config":"chunks/preprocess-config_Bpd9UxgB.mjs","C:/Users/peter/repos/dignation-website/src/content/docs/getting-started/how-to-join.md":"chunks/how-to-join_CRpmcBIg.mjs","C:/Users/peter/repos/dignation-website/src/content/docs/index.mdx":"chunks/index_CTyTE8_-.mjs","\u0000virtual:astro-expressive-code/ec-config":"chunks/ec-config_CzTTOeiV.mjs","C:/Users/peter/repos/dignation-website/node_modules/@astrojs/starlight/user-components/Tabs.astro?astro&type=script&index=0&lang.ts":"_astro/Tabs.astro_astro_type_script_index_0_lang.3nBd5krW.js","astro:scripts/page.js":"_astro/page.7qqag-5g.js","/astro/hoisted.js?q=0":"_astro/hoisted.BdrfN73g.js","C:/Users/peter/repos/dignation-website/node_modules/@pagefind/default-ui/npm_dist/mjs/ui-core.mjs":"_astro/ui-core.BPXree7Z.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/ec.j8ofn.css","/_astro/ec.8zarh.js","/_astro/logo.C7L3QbOs.png","/_astro/index.vs9mWhkN.css","/favicon.svg","/_astro/hoisted.BdrfN73g.js","/_astro/page.7qqag-5g.js","/_astro/Tabs.astro_astro_type_script_index_0_lang.3nBd5krW.js","/_astro/ui-core.BPXree7Z.js","/_astro/page.7qqag-5g.js","/404.html"],"i18n":{"strategy":"pathname-prefix-other-locales","locales":["en"],"defaultLocale":"en","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"b++GWPm1zwo83N1LG06eeXyLYdXmDPhx3eEiOgiwt4c=","experimentalEnvGetSecretEnabled":false});

export { manifest };
