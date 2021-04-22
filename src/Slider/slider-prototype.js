function Slider(slider) {
    if (!(slider instanceof Element)) {
        throw new Error("No slider pass in");
    }
    this.slider = slider;
    this.slides = slider.querySelector(".slides");
    const nextButton = slider.querySelector(".goToNext");
    const preButton = slider.querySelector(".goToPrev");
    this.startSlider();
    this.applyClasses();
    this.move = this.move.bind(this);
    //Event listener
    preButton.addEventListener("click", () => this.move("back"));
    //this.nextButton.addEventListener("click", this.move.bind(this));
    nextButton.addEventListener("click", this.move);


}

Slider.prototype.startSlider = function() {
    this.current = this.slider.querySelector(".current") || this.slides.firstElementChild;
    this.prev = this.current.previousElementSibling || this.slides.lastElementChild;
    this.next = this.current.nextElementSibling || this.slides.firstElementChild;
    // console.log({ current, prev, next });
}

Slider.prototype.applyClasses = function() {
    this.current.classList.add("current");
    this.prev.classList.add("prev");
    this.next.classList.add("next");
}

Slider.prototype.move = function(direction) {
        const classesToRemove = ["prev", "current", "next"];
        this.prev.classList.remove(...classesToRemove);
        this.current.classList.remove(...classesToRemove);
        this.next.classList.remove(...classesToRemove);
        if (direction === "back") {
            [this.prev, this.current, this.next] = [
                this.prev.previousElementSibling || this.slides.lastElementChild, this.prev, this.current,
            ];
        } else {
            [this.prev, this.current, this.next] = [this.current, this.next, this.next.nextElementSibling || this.slides.firstElementChild, ];
        }
        this.applyClasses();
    }
    // when the slider is created run the start slider function

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));

window.addEventListener("keyup", function(e) {
    if (e.key === "ArrowRight") {
        dogSlider.move();
    }
    if (e.key === "ArrowLeft") {
        dogSlider.move();
    }
})