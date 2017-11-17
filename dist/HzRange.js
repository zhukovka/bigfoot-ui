import { html, render } from '../node_modules/lit-html/lit-html.js';
const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host{
            display: block;
            --width: 400px; 
            --tw: 10px; 
            --th: 15px; 
            --bg: #25252B;
            --fill:#6C717E;
            --thumb: white;
        }
        #hz-range {
            position: relative;
        }
        
        input[type="range"] {
            position: absolute;
            height: 5px;
            width: var(--width);
            top: 0;
            left: 0px;
            padding: 10px 0px;
            margin: 0;
            -webkit-appearance: none;
            background: transparent;
            border: none;
            outline: none;
        }
        input[type="range"]:focus{
            box-shadow: 0 0 2px;
        }
        
    
        input[type="range"]::-ms-track {
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
            height: var(--tw);
            width: var(--th);
            background: transparent;
        }
    
        /* All the same stuff for Firefox */
        input[type=range]::-moz-range-thumb {
            height: var(--tw);
            width: var(--th);
            background: transparent;
            border: none;
        }
    
        /* All the same stuff for IE */
        input[type=range]::-ms-thumb {
            height: var(--tw);
            width: var(--th);
            background: transparent;
            border: none;
        }
    
    </style>
    <div id="hz-range">
        <input type="range">
        <div id="svg">
            Sorry, your browser does not support inline SVG.
        </div>
    </div>
  `;
let ShadyCSS = window["ShadyCSS"];
if (ShadyCSS) {
    ShadyCSS.prepareTemplate(template, 'hz-range');
}
export default class HzRange extends HTMLElement {
    constructor() {
        super();
        if (ShadyCSS) {
            ShadyCSS.styleElement(this);
        }
        this.attachShadow({ mode: 'open' });
        if (this.shadowRoot) {
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            this.inputRange = this.shadowRoot.querySelector("input[type='range']");
            this.svgRange = this.shadowRoot.querySelector("#svg");
            this._x1 = 5;
            this._x2 = 400;
            this._y1 = 17;
            this._y2 = 7;
            this.addOnChange();
        }
    }
    connectedCallback() {
        if (this.parentElement && this.inputRange) {
            this._x2 = this.parentElement.clientWidth - 10;
            this.style.setProperty('--width', this.parentElement.clientWidth + "px");
            this.render();
        }
    }
    addOnChange() {
        if (this.inputRange) {
            this._value = +this.inputRange.value;
            this.inputRange.addEventListener("input", e => {
                let target = e.currentTarget;
                this._value = +target.value;
                this.render();
                this.dispatchEvent(new CustomEvent('range-change', {
                    bubbles: true,
                    composed: true,
                    detail: this._value
                }));
            });
        }
    }
    svgRangeTemplate() {
        const { _x1, _x2, _y1, _y2 } = this;
        let k = this._value / 100;
        const w = Math.max(_x2 * k, _x1);
        const h = _y1 - (_y1 - _y2) * k;
        const t = (5 + 5 * k) / 2;
        const basePoints = [[_x1, _y1], [_x2, _y1], [_x2, _y2]].join(" ");
        const rangePoints = [[_x1, _y1], [w, _y1], [w, h]].join(" ");
        const thumbPoints = [[w - t, _y1 + 4], [w + t, _y1 + 4], [w + t, h - 3], [w, h - 6], [w - t, h - 3]].join(" ");
        return html`
                    <svg height="${_y1 + 5}" width="${_x2 + 7}">
                        <defs>
                            <filter id="shadow">
                              <feDropShadow dx="0" dy="0" stdDeviation="1"/>
                            </filter>
                          </defs>
                        <polygon points="${basePoints}" style="fill:var(--bg);stroke: var(--bg); stroke-width: 2; stroke-linecap: round" />
                        <polygon points="${rangePoints}" style="fill:var(--fill);stroke: var(--fill); stroke-width: 2;stroke-linecap: round"/>
                        <polygon points="${thumbPoints}" style="fill:var(--thumb);" filter="url(#shadow)"/>
                    </svg>`;
    }
    render() {
        if (this.svgRange) {
            render(this.svgRangeTemplate(), this.svgRange);
        }
    }
}
window.customElements.define('hz-range', HzRange);
//# sourceMappingURL=HzRange.js.map