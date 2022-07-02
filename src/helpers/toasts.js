import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export function errorToast (message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#A84D61",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}


export function successToast (message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#70A84D",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}