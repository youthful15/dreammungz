import "./CustomCarousel.css"

export default function CustomCarousel() {
  // Script Goes Here...
  const leftSlide: any = document.querySelector(".left-slides")
  const rightSlide: any = document.querySelector(".right-slides")
  const leftBtn: any = document.querySelector(".left-btn")
  const rightBtn: any = document.querySelector(".right-btn")
  const slidesLength: any = leftSlide.querySelectorAll("div").length

  let currentSlide = 0

  rightSlide.style.transform = `translateY(-${(slidesLength - 1) * 100}%)`

  leftBtn.addEventListener("click", () => changeSlide("left"))
  rightBtn.addEventListener("click", () => changeSlide("right"))

  function changeSlide(btn: any) {
    if (btn == "right") {
      currentSlide++

      if (currentSlide > slidesLength - 1) {
        currentSlide = 0
      }
    } else if (btn == "left") {
      currentSlide--

      if (currentSlide < 0) {
        currentSlide = slidesLength - 1
      }
    }

    rightSlide.style.transform = `translateY(-${
      (slidesLength - 1 - currentSlide) * 100
    }%)`
    leftSlide.style.transform = `translateY(-${currentSlide * 100}%)`
  }

  setInterval(autoChangeSlide, 3000)

  function autoChangeSlide() {
    currentSlide++

    if (currentSlide > slidesLength - 1) {
      currentSlide = 0
    }

    rightSlide.style.transform = `translateY(-${
      (slidesLength - 1 - currentSlide) * 100
    }%)`
    leftSlide.style.transform = `translateY(-${currentSlide * 100}%)`
  }

  return (
    <div className="slider-container">
      <div className="left-slides">
        <div style={{ backgroundColor: "#353b48" }}>
          <h3>Moon</h3>
          <p>making the nights brighter.</p>
        </div>

        <div style={{ backgroundColor: "#be2edd" }}>
          <h3>Volcanic</h3>
          <p>eruptions without lightning.</p>
        </div>

        <div style={{ backgroundColor: "#4bcffa" }}>
          <h3>Blue Kingfisher</h3>
          <p>flies like the beast.</p>
        </div>

        <div style={{ backgroundColor: "#218c74" }}>
          <h3>Intense</h3>
          <p>Misty shroud over a forest.</p>
        </div>

        <div style={{ backgroundColor: "#ff7f50" }}>
          <h3>Beautiful</h3>
          <p>Sunset at Clingmans Dome.</p>
        </div>
      </div>

      <div className="right-slides">
        <div
          style={{
            backgroundImage: `url('https://images.unsplash.com/pho
        to-1500534623283-312aade485b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')`,
          }}
        ></div>

        <div
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')`,
          }}
        ></div>
        <div
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80')`,
          }}
        ></div>

        <div
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516537219851-920e2670c6e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80')`,
          }}
        ></div>
        <div
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1511553677255-ba939e5537e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=628&q=80')`,
          }}
        ></div>
      </div>

      <div className="buttons">
        <button className="left-btn">
          <i className="fas fa-arrow-down"></i>
        </button>
        <button className="right-btn">
          <i className="fas fa-arrow-up"></i>
        </button>
      </div>
    </div>
  )
}
