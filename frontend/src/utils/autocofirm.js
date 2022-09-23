export default function autoConfirm() {
  setInterval(function () {
    console.log("Scanning for new transactions...")

    var a = document.getElementsByTagName("div")
    var queue
    for (var i = 0; i < a.length; i++) {
      if (a[i].classList.contains("transaction-list-item--unconfirmed")) {
        queue = a[i]
        break
      }
    }

    if (typeof queue !== "undefined") {
      if (
        queue.getElementsByTagName("h3")[0].getElementsByTagName("div")[0]
          .textContent == "Unapproved"
      ) {
        console.log("New transaction found")
        queue.click()
      }
    }

    var c = document.getElementsByTagName("button")
    var btnConfirm
    for (var i = 0; i < c.length; i++) {
      if (c[i].textContent == "확인") {
        btnConfirm = c[i]
        break
      }
    }
    var btnReject
    for (var j = 0; j < c.length; j++) {
      if (c[j].textContent == "거부") {
        btnReject = c[j]
        break
      }
    }

    if (typeof btnConfirm !== "undefined" && typeof btnReject !== "undefined") {
      if (!btnConfirm.disabled) {
        btnConfirm.click()
      } else {
        btnReject.click()
      }
    }
  }, 1000)
}
// this.connection.addEventListener("open",this._onConnect.bind(this))
