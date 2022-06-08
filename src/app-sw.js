function notificarme() {

  if ( !window.Notification ) {
      console.log('Este navegador no soporta notificaciones');
      return;
  }

  if ( Notification.permission === 'granted' ) {
      
      // new Notification('Hola Mundo! - granted');
      enviarNotificacion();

  } else if ( Notification.permission !== 'denied' || Notification.permission === 'default' )  {

      Notification.requestPermission( function( permission ) {

          console.log( permission );

          if ( permission === 'granted' ) {
              // new Notification('Hola Mundo! - pregunta');
              enviarNotificacion();
          }

      });

  }



}
function enviarNotificacion() {

  const notificationOpts = {
      body: 'Este es el cuerpo de la notificación',
      icon: 'img/icons/icon-72x72.png'
  };


  const n = new Notification('Hola Mundo', notificationOpts);

  n.onclick = () => {
      console.log('Click');
  };

}

function getPublicKey() {

  // fetch('api/key')
  //     .then( res => res.text())
  //     .then( console.log );

  return fetch('api/key')
      .then( res => res.arrayBuffer())
      // returnar arreglo, pero como un Uint8array
      .then( key => new Uint8Array(key) );


}