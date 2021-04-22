function Slider(slider) {
    if (!(slider instanceof Element)) {
        throw new Error("No slider pass in");
    }
    let next;
    let prev;
    let current;
    const slides = slider.querySelector(".slides");
    const nextButton = slider.querySelector(".goToNext");
    const prevButton = slider.querySelector(".goToPrev");

    function startSlider() {
        current = slider.querySelector(".current") || slides.firstElementChild;
        prev = current.previousElementSibling || slides.lastElementChild;
        next = current.nextElementSibling || slides.firstElementChild;
        // console.log({ current, prev, next });
    }

    function applyClasses() {
        current.classList.add("current");
        prev.classList.add("prev");
        next.classList.add("next");
    }

    function move(direction) {
        const classesToRemove = ["prev", "current", "next"];
        prev.classList.remove(...classesToRemove);
        current.classList.remove(...classesToRemove);
        next.classList.remove(...classesToRemove);
        if (direction === "back") {
            [prev, current, next] = [
                prev.previousElementSibling || slides.lastElementChild, prev, current,
            ];
        } else {
            [prev, current, next] = [current, next, next.nextElementSibling || slides.firstElementChild, ];
        }
        applyClasses();
    }
    // when the slider is created run the start slider function
    startSlider();
    applyClasses();

    //Event listener
    prevButton.addEventListener("click", () => move("back"));
    nextButton.addEventListener("click", move);

}
const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));