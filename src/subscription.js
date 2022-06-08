//conditional render
let clicked = true;
let swReg;
var url = window.location.href;
var swLocation = "/service-worker.js";

if (navigator.serviceWorker) {
  // if ( url.includes('localhost') ) {
  //     swLocation = '/sw.js';
  // }

  window.addEventListener("load", function () {
    navigator.serviceWorker.register(swLocation).then(function (reg) {
      swReg = reg;
      swReg.pushManager.getSubscription();
    });
  });
}

export function notificarme() {
  if (!window.Notification) {
    console.log("Este navegador no soporta notificaciones");
    return;
  }

  if (Notification.permission === "granted") {
    //new Notification('Hola Mundo! - granted');
    //enviarNotificacion();
  } else if (
    Notification.permission !== "denied" ||
    Notification.permission === "default"
  ) {
    Notification.requestPermission(function (permission) {
      console.log(permission);

      if (permission === "granted") {

      }
    });
  }
  getPublicKey().then(function (key) {
    return navigator.serviceWorker
      .register("/service-worker.js")
      .then(function (registration) {
        return registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: key,
          })
          .then((res) => res.toJSON())
          .then((pushSubscription) => {
            console.log("Received PushSubscription: ", key, pushSubscription);
            fetch(`${process.env.REACT_APP_API_URL}/notification/subscribe`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(pushSubscription),
            });
          })
          .catch(console.log("error"));
      });
  });
}

function enviarNotificacion() {
  const notificationOpts = {
    body: "Este es el cuerpo de la notificación",
    icon: "https://ichef.bbci.co.uk/news/976/cpsprodpb/9A50/production/_118740593_gettyimages-1231144196.jpg",
  };
  const n = new Notification("Hola Mundo", notificationOpts);

  n.onclick = () => {
    console.log("Click");
  };
}

function getPublicKey() {
  // fetch('http://localhost:4000/api/notification/key')
  //     .then( res => res.text())
  //     .then( console.log );
  return (
    fetch(`${process.env.REACT_APP_API_URL}/notification/key`)
      .then((res) => res.arrayBuffer())
      // returnar arreglo, pero como un Uint8array
      .then((key) => new Uint8Array(key)).catch(console.log("error"))
  );
}
