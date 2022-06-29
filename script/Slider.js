
class Slider {
    constructor(rangeElement, valueElement, options) {
        this.rangeElement = rangeElement
        this.valueElement = valueElement
        this.options = options

        // Attach a listener to "change" event
        this.rangeElement.addEventListener('input', this.updateSlider.bind(this))
    }

    // Initialize the slider
    init() {
        this.rangeElement.setAttribute('min', this.options.min)
        this.rangeElement.setAttribute('max', this.options.max)
        this.rangeElement.value = this.options.cur

        this.updateSlider()
    }

    // Format the money
    asMoney(value) {
        return parseFloat(value)
            .toLocaleString('en-US', { maximumFractionDigits: 2 })
    }

    generateBackground(rangeElement) {
        if (this.rangeElement.value === this.options.min) {
            return
        }

        let percentage = (this.rangeElement.value - this.options.min) / (this.options.max - this.options.min) * 100
        return 'background: linear-gradient(90deg, #ffc663 ' + percentage + '%, #333 ' + percentage + '%, #333 100%)'
    }

    updateSlider(newValue) {
        this.valueElement.innerHTML = this.asMoney(this.rangeElement.value)
        this.rangeElement.style = this.generateBackground(this.rangeElement.value)
    }
}