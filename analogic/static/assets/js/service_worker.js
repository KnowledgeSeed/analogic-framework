const version = 13;

self.addEventListener("install", evt => self.skipWaiting());

// (B) CLAIM CONTROL INSTANTLY
self.addEventListener("activate", evt => self.clients.claim());

// (C) LISTEN TO PUSH
self.addEventListener("push", evt => {
  const data = evt.data.json();

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
      data: data.data,
    actions: data.actions
  });
});

self.addEventListener(
  "notificationclick",
  (event) => {
    event.notification.close();
    if (event.action === "test") {
      // User selected the Archive action.
      console.log(event);

    } else {
      console.log(event);
    }
    event.waitUntil(
        self.clients.openWindow('http://localhost:5000')
    );
  },
  false,
);
