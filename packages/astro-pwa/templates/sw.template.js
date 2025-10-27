// Service Worker for offline support
const CACHE_VERSION = "v1";
const CACHE_NAME = `aka-page-${CACHE_VERSION}`;

// Try both with and without trailing slash
// Note: /offline redirects to /en/offline due to i18n routing, so we only cache the language-prefixed versions
const OFFLINE_URLS = __OFFLINE_URLS__;

// Cache these static assets
const STATIC_ASSETS = [...OFFLINE_URLS, "/favicon/favicon.svg", "/favicon/favicon-96x96.png"];

const mono =
  '"SFMono-Regular", ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

const log = (msg) =>
  console.log(
    "%c [🔮] " + msg,
    `color:#ff4da6; font-family:${mono}; white-space:pre; line-height:1.05;`
  );

// Install event - cache offline page and essential assets
self.addEventListener("install", (event) => {
  log("Installing service worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      log("Caching offline pages and assets");

      // Cache each asset individually to see which one fails
      for (const asset of STATIC_ASSETS) {
        try {
          log(`Caching: ${asset}`);
          await cache.add(asset);
          log(`Successfully cached: ${asset}`);
        } catch (error) {
          console.error(`Failed to cache: ${asset}`, error);
        }
      }

      log("All assets processed");
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  log("Activating service worker...");
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              log(`Deleting old cache: ${cacheName}`);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // List all cached URLs for debugging
      caches.open(CACHE_NAME).then(async (cache) => {
        const keys = await cache.keys();
        log(`Cached URLs: ${keys.map((req) => req.url)}`);
      }),
    ])
  );
  self.clients.claim();
});

// Fetch event - network first with cache fallback
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  const url = new URL(event.request.url);

  // Skip chrome extensions and other non-http(s) requests
  if (!url.protocol.startsWith("http")) {
    return;
  }

  // Skip API routes, health check, and OG image routes
  if (
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/healthz") ||
    url.pathname === "/healthz" ||
    url.pathname.startsWith("/og") ||
    url.pathname.startsWith("/_")
  ) {
    return;
  }

  // Skip external domains (like Google services)
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(networkFirstWithCache(event.request));
});

// Network first strategy with cache fallback
async function networkFirstWithCache(request) {
  const cache = await caches.open(CACHE_NAME);
  const url = new URL(request.url);

  try {
    // Try network first
    log(`Fetching from network: ${url.pathname}`);
    const response = await fetch(request, {
      headers: request.headers,
      mode: "cors",
      credentials: "omit",
    });

    // Cache successful responses for HTML pages
    if (response && response.status === 200) {
      // Cache HTML pages and static assets
      if (
        request.destination === "document" ||
        /\.(css|js|png|jpg|jpeg|svg|gif|webp|woff|woff2)$/i.test(url.pathname)
      ) {
        log(`Caching: ${url.pathname}`);
        cache.put(request, response.clone()).catch(() => {
          // Silently fail if caching fails
        });
      }
    }

    return response;
  } catch (error) {
    log(`Network failed for: ${url.pathname} ${error}`);

    // Network failed, try cache
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      // Found in cache, return it
      log(`Serving from cache: ${url.pathname}`);
      return cachedResponse;
    }

    log("Not in cache, serving offline page");

    // Not in cache and offline - return offline page
    if (request.destination === "document") {
      // Try language-specific offline page first
      const langMatch = url.pathname.match(/^\/(__LANG_PATTERN__)(\/|$)/);
      if (langMatch) {
        const lang = langMatch[1];
        const offlineUrls = [`/${lang}/offline/`, `/${lang}/offline`];

        for (const offlineUrl of offlineUrls) {
          log(`Trying: ${offlineUrl}`);
          const response = await cache.match(offlineUrl);
          if (response) {
            log(`Found and serving: ${offlineUrl}`);
            return response;
          }
        }
      }

      // Try all language offline pages as fallback
      const fallbackUrls = __FALLBACK_URLS__;

      for (const offlineUrl of fallbackUrls) {
        log("Trying fallback:", offlineUrl);
        const response = await cache.match(offlineUrl);
        if (response) {
          log("Found and serving fallback:", offlineUrl);
          return response;
        }
      }
    }

    // Return a basic offline response as last resort
    log("Serving basic offline response");
    return new Response("Offline - Please check your internet connection", {
      status: 503,
      statusText: "Service Unavailable",
      headers: { "Content-Type": "text/plain" },
    });
  }
}
