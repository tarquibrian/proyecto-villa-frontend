/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== "navigate") {
      return false;
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith("/_")) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.

self.addEventListener("install", async (event) => {
  const cache = await caches.open("cache-1");

  await cache.addAll([
    "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css",
    "/favicon.ico",
  ]);
});

const apiOfflineFallbacks = [
  `${process.env.REACT_APP_API_URL}/auth/renew`,
  `${process.env.REACT_APP_API_URL}/panel-admin`,
];

self.addEventListener("fetch", (event) => {

  if (!apiOfflineFallbacks.includes(event.request.url)) return;

  const resp = fetch(event.request)
    .then((response) => {
      if (!response) {
        return caches.match(event.request);
      }

      // Guardar en cach?? la respuesta
      caches.open("cache-dynamic").then((cache) => {
        cache.put(event.request, response);
      });

      return response.clone();
    })
    .catch((err) => {
      console.log("offline response");
      return caches.match(event.request);
    });

  event.respondWith(resp);
});


self.addEventListener("push", (e) => {

  const data = JSON.parse(e.data.text());
  console.log(data);
  const title = data.titulo;
  const options = {
    body: data.cuerpo,
    image:
      "https://www.opinion.com.bo/media/opinion/images/2012/03/09/2012N47141.jpg",
    badge: "https://www.opinion.com.bo/media/opinion/images/2012/03/09/2012N47141.jpg",
    icon: "logo.png",
    vibrate: [125,75,125,275,200,275,125,75,125,275,200,600,200,600],
  };

  e.waitUntil(self.registration.showNotification(title, options));
});
