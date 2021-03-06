const supportsShadowDOMV1 = !!HTMLElement.prototype.attachShadow;
console.log(supportsShadowDOMV1);
if (!supportsShadowDOMV1) {
    require("@webcomponents/custom-elements/custom-elements.min.js");
    require("@webcomponents/shadydom/shadydom.min.js");
    require("@webcomponents/shadycss/scoping-shim.min.js");
    require("@webcomponents/shadycss/apply-shim.min.js");
    require("@webcomponents/shadycss/custom-style-interface.min.js");
}
require("./HzRange.js");