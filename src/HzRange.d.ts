export default class HzRange extends HTMLElement {
    private _x1;
    private _x2;
    private _y1;
    private _y2;
    private inputRange;
    private svgRange;
    private _value;
    constructor();
    connectedCallback(): void;
    addOnChange(): void;
    svgRangeTemplate(): any;
    render(): void;
}
