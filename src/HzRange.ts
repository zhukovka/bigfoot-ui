import {html, render} from '../node_modules/lit-html/lit-html.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
    :host{
        display: block;
        --width: 400px; 
    }
    #hz-range {
                        position: relative;
                    }
                
                    input[type="range"] {
                        position: absolute;
                        height: 5px;
                        width: var(--width);
                        top: 0;
                        left: 0;
                        padding: 7px 0 0;
                        margin: 0;
                        -webkit-appearance: none;
                        background: transparent;
                        border: none;
                    }
                    input[type="range"]::-ms-track{
                        width: 100%;
                        /* Hides the slider so custom styles can be added */
                        background: transparent;
                        border-color: transparent;
                        color: transparent;
                
                    }
                    input[type=range]::-moz-range-track {
                        width: 100%;
                        background: transparent;
                    }
                    /* Special styling for WebKit/Blink */
                    input[type=range]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        height: 12px;
                        width: 7px;
                        background: black;
                    }
                
                    /* All the same stuff for Firefox */
                    input[type=range]::-moz-range-thumb {
                        height: 12px;
                        width: 7px;
                        background: black;
                        border: none;
                        border-radius: 0;
                    }
                
                    /* All the same stuff for IE */
                    input[type=range]::-ms-thumb {
                        height: 12px;
                        width: 7px;
                        background: black;
                        border: none;
                        border-radius: 0;
                    }
    
    </style>
    <div id="hz-range">
        <input type="range">
        <div id="svg">
            Sorry, your browser does not support inline SVG.
        </div>
    </div>
  `;
export default class HzRange extends HTMLElement {
    private _x1: number;
    private _x2: number;
    private _y1: number;
    private _y2: number;
    private inputRange: HTMLInputElement | null;
    private svgRange: Element | null;
    private _value: number;

    constructor () {
        super();
        this.attachShadow({mode : 'open'});
        if (this.shadowRoot) {
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.inputRange = this.shadowRoot.querySelector("input[type='range']") as HTMLInputElement;
            this.svgRange = this.shadowRoot.querySelector("#svg");
            this._x1 = 0;
            this._x2 = 400;
            this._y1 = 15;
            this._y2 = 5;
            this.addOnChange();
        }
    }

    connectedCallback () {
        if (this.parentElement && this.inputRange) {
            this._x2 = this.parentElement.clientWidth;
            this.style.setProperty('--width', this._x2 + "px");
            this.render();

        }
    }

    addOnChange () {
        if (this.inputRange) {
            this._value = +this.inputRange.value;
            this.inputRange.addEventListener("input", (e) => {
                let target = e.currentTarget as HTMLInputElement;
                this._value = +target.value;
                this.render();
                this.dispatchEvent(new CustomEvent('range-change', {
                    bubbles : true,
                    composed : true,
                    detail : this._value
                } as any));
            })
        }
    }

    svgRangeTemplate (w: number, h: number): any {
        const {_x1, _x2, _y1, _y2} = this;
        return html`
                    <svg height="${_y1 + 5}" width="${_x2 + 5}">
                        <polygon points="${_x1},${_y1} ${_x2},${_y1} ${_x2},${_y2}" style="fill:lime;stroke: black; stroke-width: 2; stroke-linecap: round"/>
                        <polygon points="${_x1},${_y1} ${w},${_y1} ${w},${h}" style="fill:purple;stroke: black; stroke-width: 2;stroke-linecap: round"/>
                    </svg>`;
    }

    render () {
        if (this.svgRange) {
            let k = (this._value / 100);
            const w = this._x2 * k;
            const h = this._y1 - (this._y1 - this._y2) * k;
            render(this.svgRangeTemplate(w, h), this.svgRange);
        }
    }
}
