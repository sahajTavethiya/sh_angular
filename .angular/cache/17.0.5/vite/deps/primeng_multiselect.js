import {
  Overlay,
  OverlayModule,
  Scroller,
  ScrollerModule,
  SearchIcon,
  Tooltip,
  TooltipModule
} from "./chunk-B5AXIFYJ.js";
import {
  BaseIcon,
  ChevronDownIcon,
  DomHandler,
  FilterService,
  Footer,
  Header,
  ObjectUtils,
  OverlayService,
  PrimeNGConfig,
  PrimeTemplate,
  Ripple,
  RippleModule,
  SharedModule,
  TimesIcon,
  TranslationKeys,
  UniqueComponentId
} from "./chunk-KDFQQSEM.js";
import {
  NG_VALUE_ACCESSOR
} from "./chunk-XWDIP5V3.js";
import "./chunk-DVMSSFAD.js";
import {
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  NgTemplateOutlet
} from "./chunk-Y3U3K2HZ.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  NgZone,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation$1,
  computed,
  effect,
  forwardRef,
  setClassMetadata,
  signal,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-HUILGW6O.js";
import "./chunk-2QX7OLQF.js";
import "./chunk-XBTFS7NA.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-OXCW2X5T.js";

// node_modules/primeng/fesm2022/primeng-icons-check.mjs
var CheckIcon = class _CheckIcon extends BaseIcon {
  static ɵfac = (() => {
    let ɵCheckIcon_BaseFactory;
    return function CheckIcon_Factory(t) {
      return (ɵCheckIcon_BaseFactory || (ɵCheckIcon_BaseFactory = ɵɵgetInheritedFactory(_CheckIcon)))(t || _CheckIcon);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _CheckIcon,
    selectors: [["CheckIcon"]],
    standalone: true,
    features: [ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
    decls: 2,
    vars: 5,
    consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M4.86199 11.5948C4.78717 11.5923 4.71366 11.5745 4.64596 11.5426C4.57826 11.5107 4.51779 11.4652 4.46827 11.4091L0.753985 7.69483C0.683167 7.64891 0.623706 7.58751 0.580092 7.51525C0.536478 7.44299 0.509851 7.36177 0.502221 7.27771C0.49459 7.19366 0.506156 7.10897 0.536046 7.03004C0.565935 6.95111 0.613367 6.88 0.674759 6.82208C0.736151 6.76416 0.8099 6.72095 0.890436 6.69571C0.970973 6.67046 1.05619 6.66385 1.13966 6.67635C1.22313 6.68886 1.30266 6.72017 1.37226 6.76792C1.44186 6.81567 1.4997 6.8786 1.54141 6.95197L4.86199 10.2503L12.6397 2.49483C12.7444 2.42694 12.8689 2.39617 12.9932 2.40745C13.1174 2.41873 13.2343 2.47141 13.3251 2.55705C13.4159 2.64268 13.4753 2.75632 13.4938 2.87973C13.5123 3.00315 13.4888 3.1292 13.4271 3.23768L5.2557 11.4091C5.20618 11.4652 5.14571 11.5107 5.07801 11.5426C5.01031 11.5745 4.9368 11.5923 4.86199 11.5948Z", "fill", "currentColor"]],
    template: function CheckIcon_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵnamespaceSVG();
        ɵɵelementStart(0, "svg", 0);
        ɵɵelement(1, "path", 1);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.getClassNames());
        ɵɵattribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckIcon, [{
    type: Component,
    args: [{
      selector: "CheckIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <path
                d="M4.86199 11.5948C4.78717 11.5923 4.71366 11.5745 4.64596 11.5426C4.57826 11.5107 4.51779 11.4652 4.46827 11.4091L0.753985 7.69483C0.683167 7.64891 0.623706 7.58751 0.580092 7.51525C0.536478 7.44299 0.509851 7.36177 0.502221 7.27771C0.49459 7.19366 0.506156 7.10897 0.536046 7.03004C0.565935 6.95111 0.613367 6.88 0.674759 6.82208C0.736151 6.76416 0.8099 6.72095 0.890436 6.69571C0.970973 6.67046 1.05619 6.66385 1.13966 6.67635C1.22313 6.68886 1.30266 6.72017 1.37226 6.76792C1.44186 6.81567 1.4997 6.8786 1.54141 6.95197L4.86199 10.2503L12.6397 2.49483C12.7444 2.42694 12.8689 2.39617 12.9932 2.40745C13.1174 2.41873 13.2343 2.47141 13.3251 2.55705C13.4159 2.64268 13.4753 2.75632 13.4938 2.87973C13.5123 3.00315 13.4888 3.1292 13.4271 3.23768L5.2557 11.4091C5.20618 11.4652 5.14571 11.5107 5.07801 11.5426C5.01031 11.5745 4.9368 11.5923 4.86199 11.5948Z"
                fill="currentColor"
            />
        </svg>
    `
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-icons-timescircle.mjs
var TimesCircleIcon = class _TimesCircleIcon extends BaseIcon {
  pathId;
  ngOnInit() {
    this.pathId = "url(#" + UniqueComponentId() + ")";
  }
  static ɵfac = (() => {
    let ɵTimesCircleIcon_BaseFactory;
    return function TimesCircleIcon_Factory(t) {
      return (ɵTimesCircleIcon_BaseFactory || (ɵTimesCircleIcon_BaseFactory = ɵɵgetInheritedFactory(_TimesCircleIcon)))(t || _TimesCircleIcon);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _TimesCircleIcon,
    selectors: [["TimesCircleIcon"]],
    standalone: true,
    features: [ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
    decls: 6,
    vars: 7,
    consts: [["width", "14", "height", "14", "viewBox", "0 0 14 14", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["fill-rule", "evenodd", "clip-rule", "evenodd", "d", "M7 14C5.61553 14 4.26215 13.5895 3.11101 12.8203C1.95987 12.0511 1.06266 10.9579 0.532846 9.67879C0.00303296 8.3997 -0.13559 6.99224 0.134506 5.63437C0.404603 4.2765 1.07129 3.02922 2.05026 2.05026C3.02922 1.07129 4.2765 0.404603 5.63437 0.134506C6.99224 -0.13559 8.3997 0.00303296 9.67879 0.532846C10.9579 1.06266 12.0511 1.95987 12.8203 3.11101C13.5895 4.26215 14 5.61553 14 7C14 8.85652 13.2625 10.637 11.9497 11.9497C10.637 13.2625 8.85652 14 7 14ZM7 1.16667C5.84628 1.16667 4.71846 1.50879 3.75918 2.14976C2.79989 2.79074 2.05222 3.70178 1.61071 4.76768C1.16919 5.83358 1.05367 7.00647 1.27876 8.13803C1.50384 9.26958 2.05941 10.309 2.87521 11.1248C3.69102 11.9406 4.73042 12.4962 5.86198 12.7212C6.99353 12.9463 8.16642 12.8308 9.23232 12.3893C10.2982 11.9478 11.2093 11.2001 11.8502 10.2408C12.4912 9.28154 12.8333 8.15373 12.8333 7C12.8333 5.45291 12.2188 3.96918 11.1248 2.87521C10.0308 1.78125 8.5471 1.16667 7 1.16667ZM4.66662 9.91668C4.58998 9.91704 4.51404 9.90209 4.44325 9.87271C4.37246 9.84333 4.30826 9.8001 4.2544 9.74557C4.14516 9.6362 4.0838 9.48793 4.0838 9.33335C4.0838 9.17876 4.14516 9.0305 4.2544 8.92113L6.17553 7L4.25443 5.07891C4.15139 4.96832 4.09529 4.82207 4.09796 4.67094C4.10063 4.51982 4.16185 4.37563 4.26872 4.26876C4.3756 4.16188 4.51979 4.10066 4.67091 4.09799C4.82204 4.09532 4.96829 4.15142 5.07887 4.25446L6.99997 6.17556L8.92106 4.25446C9.03164 4.15142 9.1779 4.09532 9.32903 4.09799C9.48015 4.10066 9.62434 4.16188 9.73121 4.26876C9.83809 4.37563 9.89931 4.51982 9.90198 4.67094C9.90464 4.82207 9.84855 4.96832 9.74551 5.07891L7.82441 7L9.74554 8.92113C9.85478 9.0305 9.91614 9.17876 9.91614 9.33335C9.91614 9.48793 9.85478 9.6362 9.74554 9.74557C9.69168 9.8001 9.62748 9.84333 9.55669 9.87271C9.4859 9.90209 9.40996 9.91704 9.33332 9.91668C9.25668 9.91704 9.18073 9.90209 9.10995 9.87271C9.03916 9.84333 8.97495 9.8001 8.9211 9.74557L6.99997 7.82444L5.07884 9.74557C5.02499 9.8001 4.96078 9.84333 4.88999 9.87271C4.81921 9.90209 4.74326 9.91704 4.66662 9.91668Z", "fill", "currentColor"], [3, "id"], ["width", "14", "height", "14", "fill", "white"]],
    template: function TimesCircleIcon_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵnamespaceSVG();
        ɵɵelementStart(0, "svg", 0)(1, "g");
        ɵɵelement(2, "path", 1);
        ɵɵelementEnd();
        ɵɵelementStart(3, "defs")(4, "clipPath", 2);
        ɵɵelement(5, "rect", 3);
        ɵɵelementEnd()()();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.getClassNames());
        ɵɵattribute("aria-label", ctx.ariaLabel)("aria-hidden", ctx.ariaHidden)("role", ctx.role);
        ɵɵadvance(1);
        ɵɵattribute("clip-path", ctx.pathId);
        ɵɵadvance(3);
        ɵɵproperty("id", ctx.pathId);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimesCircleIcon, [{
    type: Component,
    args: [{
      selector: "TimesCircleIcon",
      standalone: true,
      imports: [BaseIcon],
      template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 14C5.61553 14 4.26215 13.5895 3.11101 12.8203C1.95987 12.0511 1.06266 10.9579 0.532846 9.67879C0.00303296 8.3997 -0.13559 6.99224 0.134506 5.63437C0.404603 4.2765 1.07129 3.02922 2.05026 2.05026C3.02922 1.07129 4.2765 0.404603 5.63437 0.134506C6.99224 -0.13559 8.3997 0.00303296 9.67879 0.532846C10.9579 1.06266 12.0511 1.95987 12.8203 3.11101C13.5895 4.26215 14 5.61553 14 7C14 8.85652 13.2625 10.637 11.9497 11.9497C10.637 13.2625 8.85652 14 7 14ZM7 1.16667C5.84628 1.16667 4.71846 1.50879 3.75918 2.14976C2.79989 2.79074 2.05222 3.70178 1.61071 4.76768C1.16919 5.83358 1.05367 7.00647 1.27876 8.13803C1.50384 9.26958 2.05941 10.309 2.87521 11.1248C3.69102 11.9406 4.73042 12.4962 5.86198 12.7212C6.99353 12.9463 8.16642 12.8308 9.23232 12.3893C10.2982 11.9478 11.2093 11.2001 11.8502 10.2408C12.4912 9.28154 12.8333 8.15373 12.8333 7C12.8333 5.45291 12.2188 3.96918 11.1248 2.87521C10.0308 1.78125 8.5471 1.16667 7 1.16667ZM4.66662 9.91668C4.58998 9.91704 4.51404 9.90209 4.44325 9.87271C4.37246 9.84333 4.30826 9.8001 4.2544 9.74557C4.14516 9.6362 4.0838 9.48793 4.0838 9.33335C4.0838 9.17876 4.14516 9.0305 4.2544 8.92113L6.17553 7L4.25443 5.07891C4.15139 4.96832 4.09529 4.82207 4.09796 4.67094C4.10063 4.51982 4.16185 4.37563 4.26872 4.26876C4.3756 4.16188 4.51979 4.10066 4.67091 4.09799C4.82204 4.09532 4.96829 4.15142 5.07887 4.25446L6.99997 6.17556L8.92106 4.25446C9.03164 4.15142 9.1779 4.09532 9.32903 4.09799C9.48015 4.10066 9.62434 4.16188 9.73121 4.26876C9.83809 4.37563 9.89931 4.51982 9.90198 4.67094C9.90464 4.82207 9.84855 4.96832 9.74551 5.07891L7.82441 7L9.74554 8.92113C9.85478 9.0305 9.91614 9.17876 9.91614 9.33335C9.91614 9.48793 9.85478 9.6362 9.74554 9.74557C9.69168 9.8001 9.62748 9.84333 9.55669 9.87271C9.4859 9.90209 9.40996 9.91704 9.33332 9.91668C9.25668 9.91704 9.18073 9.90209 9.10995 9.87271C9.03916 9.84333 8.97495 9.8001 8.9211 9.74557L6.99997 7.82444L5.07884 9.74557C5.02499 9.8001 4.96078 9.84333 4.88999 9.87271C4.81921 9.90209 4.74326 9.91704 4.66662 9.91668Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath [id]="pathId">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `
    }]
  }], null, null);
})();

// node_modules/primeng/fesm2022/primeng-multiselect.mjs
function MultiSelectItem_ng_container_3_CheckIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "CheckIcon", 7);
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-checkbox-icon");
    ɵɵattribute("aria-hidden", true);
  }
}
function MultiSelectItem_ng_container_3_span_2_1_ng_template_0_Template(rf, ctx) {
}
function MultiSelectItem_ng_container_3_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelectItem_ng_container_3_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function MultiSelectItem_ng_container_3_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 8);
    ɵɵtemplate(1, MultiSelectItem_ng_container_3_span_2_1_Template, 1, 0, null, 9);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = ɵɵnextContext(2);
    ɵɵattribute("aria-hidden", true);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r4.checkIconTemplate);
  }
}
function MultiSelectItem_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelectItem_ng_container_3_CheckIcon_1_Template, 1, 2, "CheckIcon", 5)(2, MultiSelectItem_ng_container_3_span_2_Template, 2, 2, "span", 6);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r0.checkIconTemplate);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.checkIconTemplate);
  }
}
function MultiSelectItem_span_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    let tmp_0_0;
    ɵɵadvance(1);
    ɵɵtextInterpolate((tmp_0_0 = ctx_r1.label) !== null && tmp_0_0 !== void 0 ? tmp_0_0 : "empty");
  }
}
function MultiSelectItem_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
var _c0 = (a0) => ({
  height: a0
});
var _c1 = (a1, a2, a3) => ({
  "p-multiselect-item": true,
  "p-highlight": a1,
  "p-disabled": a2,
  "p-focus": a3
});
var _c2 = (a0) => ({
  "p-highlight": a0
});
var _c3 = (a0) => ({
  $implicit: a0
});
var _c4 = ["container"];
var _c5 = ["overlay"];
var _c6 = ["filterInput"];
var _c7 = ["focusInput"];
var _c8 = ["items"];
var _c9 = ["scroller"];
var _c10 = ["lastHiddenFocusableEl"];
var _c11 = ["firstHiddenFocusableEl"];
var _c12 = ["headerCheckbox"];
function MultiSelect_ng_container_7_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r9 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ctx_r9.label() || "empty");
  }
}
function MultiSelect_ng_container_7_ng_container_2_div_1_ng_container_4_TimesCircleIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "TimesCircleIcon", 20);
    ɵɵlistener("click", function MultiSelect_ng_container_7_ng_container_2_div_1_ng_container_4_TimesCircleIcon_1_Template_TimesCircleIcon_click_0_listener() {
      ɵɵrestoreView(_r21);
      const item_r13 = ɵɵnextContext(2).$implicit;
      const ctx_r19 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r19.removeOption(item_r13, ctx_r19.event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-multiselect-token-icon");
    ɵɵattribute("data-pc-section", "clearicon")("aria-hidden", true);
  }
}
function MultiSelect_ng_container_7_ng_container_2_div_1_ng_container_4_span_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_container_7_ng_container_2_div_1_ng_container_4_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 21);
    ɵɵlistener("click", function MultiSelect_ng_container_7_ng_container_2_div_1_ng_container_4_span_2_Template_span_click_0_listener() {
      ɵɵrestoreView(_r25);
      const item_r13 = ɵɵnextContext(2).$implicit;
      const ctx_r23 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r23.removeOption(item_r13, ctx_r23.event));
    });
    ɵɵtemplate(1, MultiSelect_ng_container_7_ng_container_2_div_1_ng_container_4_span_2_ng_container_1_Template, 1, 0, "ng-container", 22);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r18 = ɵɵnextContext(5);
    ɵɵattribute("data-pc-section", "clearicon")("aria-hidden", true);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r18.removeTokenIconTemplate);
  }
}
function MultiSelect_ng_container_7_ng_container_2_div_1_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_7_ng_container_2_div_1_ng_container_4_TimesCircleIcon_1_Template, 1, 3, "TimesCircleIcon", 18)(2, MultiSelect_ng_container_7_ng_container_2_div_1_ng_container_4_span_2_Template, 2, 3, "span", 19);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r16 = ɵɵnextContext(4);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r16.removeTokenIconTemplate);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r16.removeTokenIconTemplate);
  }
}
function MultiSelect_ng_container_7_ng_container_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 15, 16)(2, "span", 17);
    ɵɵtext(3);
    ɵɵelementEnd();
    ɵɵtemplate(4, MultiSelect_ng_container_7_ng_container_2_div_1_ng_container_4_Template, 3, 2, "ng-container", 7);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r13 = ctx.$implicit;
    const ctx_r11 = ɵɵnextContext(3);
    ɵɵadvance(3);
    ɵɵtextInterpolate(ctx_r11.getLabelByValue(item_r13));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r11.disabled);
  }
}
function MultiSelect_ng_container_7_ng_container_2_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r12 = ɵɵnextContext(3);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ctx_r12.placeholder() || ctx_r12.defaultLabel || "empty");
  }
}
function MultiSelect_ng_container_7_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_7_ng_container_2_div_1_Template, 5, 2, "div", 14)(2, MultiSelect_ng_container_7_ng_container_2_ng_container_2_Template, 2, 1, "ng-container", 7);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r10 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r10.chipSelectedItems());
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r10.modelValue() || ctx_r10.modelValue().length === 0);
  }
}
function MultiSelect_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_7_ng_container_1_Template, 2, 1, "ng-container", 7)(2, MultiSelect_ng_container_7_ng_container_2_Template, 3, 2, "ng-container", 7);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r2.display === "comma");
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r2.display === "chip");
  }
}
function MultiSelect_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_container_9_TimesIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "TimesIcon", 20);
    ɵɵlistener("click", function MultiSelect_ng_container_9_TimesIcon_1_Template_TimesIcon_click_0_listener($event) {
      ɵɵrestoreView(_r29);
      const ctx_r28 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r28.clear($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-multiselect-clear-icon");
    ɵɵattribute("data-pc-section", "clearicon")("aria-hidden", true);
  }
}
function MultiSelect_ng_container_9_span_2_1_ng_template_0_Template(rf, ctx) {
}
function MultiSelect_ng_container_9_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_container_9_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function MultiSelect_ng_container_9_span_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "span", 24);
    ɵɵlistener("click", function MultiSelect_ng_container_9_span_2_Template_span_click_0_listener($event) {
      ɵɵrestoreView(_r33);
      const ctx_r32 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r32.clear($event));
    });
    ɵɵtemplate(1, MultiSelect_ng_container_9_span_2_1_Template, 1, 0, null, 22);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r27 = ɵɵnextContext(2);
    ɵɵattribute("data-pc-section", "clearicon")("aria-hidden", true);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r27.clearIconTemplate);
  }
}
function MultiSelect_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_9_TimesIcon_1_Template, 1, 3, "TimesIcon", 18)(2, MultiSelect_ng_container_9_span_2_Template, 2, 3, "span", 23);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r4 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r4.clearIconTemplate);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r4.clearIconTemplate);
  }
}
function MultiSelect_ng_container_11_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 27);
  }
  if (rf & 2) {
    const ctx_r34 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ctx_r34.dropdownIcon);
    ɵɵattribute("data-pc-section", "triggericon")("aria-hidden", true);
  }
}
function MultiSelect_ng_container_11_ChevronDownIcon_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "ChevronDownIcon", 28);
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-multiselect-trigger-icon");
    ɵɵattribute("data-pc-section", "triggericon")("aria-hidden", true);
  }
}
function MultiSelect_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_container_11_span_1_Template, 1, 3, "span", 25)(2, MultiSelect_ng_container_11_ChevronDownIcon_2_Template, 1, 3, "ChevronDownIcon", 26);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r5 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r5.dropdownIcon);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r5.dropdownIcon);
  }
}
function MultiSelect_span_12_1_ng_template_0_Template(rf, ctx) {
}
function MultiSelect_span_12_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_span_12_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function MultiSelect_span_12_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 29);
    ɵɵtemplate(1, MultiSelect_span_12_1_Template, 1, 0, null, 22);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r6 = ɵɵnextContext();
    ɵɵattribute("data-pc-section", "triggericon")("aria-hidden", true);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r6.dropdownIconTemplate);
  }
}
function MultiSelect_ng_template_15_div_3_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_15_div_3_ng_container_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
var _c13 = (a0) => ({
  options: a0
});
function MultiSelect_ng_template_15_div_3_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_template_15_div_3_ng_container_3_ng_container_1_Template, 1, 0, "ng-container", 8);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r47 = ɵɵnextContext(3);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r47.filterTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c13, ctx_r47.filterOptions));
  }
}
function MultiSelect_ng_template_15_div_3_ng_template_4_div_0_ng_container_5_CheckIcon_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "CheckIcon", 28);
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-checkbox-icon");
    ɵɵattribute("aria-hidden", true);
  }
}
function MultiSelect_ng_template_15_div_3_ng_template_4_div_0_ng_container_5_span_2_1_ng_template_0_Template(rf, ctx) {
}
function MultiSelect_ng_template_15_div_3_ng_template_4_div_0_ng_container_5_span_2_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_15_div_3_ng_template_4_div_0_ng_container_5_span_2_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function MultiSelect_ng_template_15_div_3_ng_template_4_div_0_ng_container_5_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 51);
    ɵɵtemplate(1, MultiSelect_ng_template_15_div_3_ng_template_4_div_0_ng_container_5_span_2_1_Template, 1, 0, null, 8);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r58 = ɵɵnextContext(6);
    ɵɵattribute("aria-hidden", true);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r58.checkIconTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(3, _c3, ctx_r58.allSelected()));
  }
}
function MultiSelect_ng_template_15_div_3_ng_template_4_div_0_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_template_15_div_3_ng_template_4_div_0_ng_container_5_CheckIcon_1_Template, 1, 2, "CheckIcon", 26)(2, MultiSelect_ng_template_15_div_3_ng_template_4_div_0_ng_container_5_span_2_Template, 2, 5, "span", 50);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r56 = ɵɵnextContext(5);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r56.checkIconTemplate);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r56.checkIconTemplate);
  }
}
var _c14 = (a0) => ({
  "p-checkbox-disabled": a0
});
var _c15 = (a0, a1, a2) => ({
  "p-highlight": a0,
  "p-focus": a1,
  "p-disabled": a2
});
function MultiSelect_ng_template_15_div_3_ng_template_4_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r62 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 46);
    ɵɵlistener("click", function MultiSelect_ng_template_15_div_3_ng_template_4_div_0_Template_div_click_0_listener($event) {
      ɵɵrestoreView(_r62);
      const ctx_r61 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r61.onToggleAll($event));
    })("keydown", function MultiSelect_ng_template_15_div_3_ng_template_4_div_0_Template_div_keydown_0_listener($event) {
      ɵɵrestoreView(_r62);
      const ctx_r63 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r63.onHeaderCheckboxKeyDown($event));
    });
    ɵɵelementStart(1, "div", 2)(2, "input", 47, 48);
    ɵɵlistener("focus", function MultiSelect_ng_template_15_div_3_ng_template_4_div_0_Template_input_focus_2_listener() {
      ɵɵrestoreView(_r62);
      const ctx_r64 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r64.onHeaderCheckboxFocus());
    })("blur", function MultiSelect_ng_template_15_div_3_ng_template_4_div_0_Template_input_blur_2_listener() {
      ɵɵrestoreView(_r62);
      const ctx_r65 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r65.onHeaderCheckboxBlur());
    });
    ɵɵelementEnd()();
    ɵɵelementStart(4, "div", 49);
    ɵɵtemplate(5, MultiSelect_ng_template_15_div_3_ng_template_4_div_0_ng_container_5_Template, 3, 2, "ng-container", 7);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r51 = ɵɵnextContext(4);
    ɵɵproperty("ngClass", ɵɵpureFunction1(9, _c14, ctx_r51.disabled || ctx_r51.toggleAllDisabled));
    ɵɵadvance(1);
    ɵɵattribute("data-p-hidden-accessible", true);
    ɵɵadvance(1);
    ɵɵproperty("readonly", ctx_r51.readonly)("disabled", ctx_r51.disabled || ctx_r51.toggleAllDisabled);
    ɵɵattribute("checked", ctx_r51.allSelected())("aria-label", ctx_r51.toggleAllAriaLabel);
    ɵɵadvance(2);
    ɵɵproperty("ngClass", ɵɵpureFunction3(11, _c15, ctx_r51.allSelected(), ctx_r51.headerCheckboxFocus, ctx_r51.disabled || ctx_r51.toggleAllDisabled));
    ɵɵattribute("aria-checked", ctx_r51.allSelected());
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r51.allSelected());
  }
}
function MultiSelect_ng_template_15_div_3_ng_template_4_div_1_SearchIcon_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "SearchIcon", 28);
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-multiselect-filter-icon");
  }
}
function MultiSelect_ng_template_15_div_3_ng_template_4_div_1_span_4_1_ng_template_0_Template(rf, ctx) {
}
function MultiSelect_ng_template_15_div_3_ng_template_4_div_1_span_4_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_15_div_3_ng_template_4_div_1_span_4_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function MultiSelect_ng_template_15_div_3_ng_template_4_div_1_span_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 56);
    ɵɵtemplate(1, MultiSelect_ng_template_15_div_3_ng_template_4_div_1_span_4_1_Template, 1, 0, null, 22);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r68 = ɵɵnextContext(5);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r68.filterIconTemplate);
  }
}
function MultiSelect_ng_template_15_div_3_ng_template_4_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r72 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 52)(1, "input", 53, 54);
    ɵɵlistener("input", function MultiSelect_ng_template_15_div_3_ng_template_4_div_1_Template_input_input_1_listener($event) {
      ɵɵrestoreView(_r72);
      const ctx_r71 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r71.onFilterInputChange($event));
    })("keydown", function MultiSelect_ng_template_15_div_3_ng_template_4_div_1_Template_input_keydown_1_listener($event) {
      ɵɵrestoreView(_r72);
      const ctx_r73 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r73.onFilterKeyDown($event));
    })("click", function MultiSelect_ng_template_15_div_3_ng_template_4_div_1_Template_input_click_1_listener($event) {
      ɵɵrestoreView(_r72);
      const ctx_r74 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r74.onInputClick($event));
    })("blur", function MultiSelect_ng_template_15_div_3_ng_template_4_div_1_Template_input_blur_1_listener($event) {
      ɵɵrestoreView(_r72);
      const ctx_r75 = ɵɵnextContext(4);
      return ɵɵresetView(ctx_r75.onFilterBlur($event));
    });
    ɵɵelementEnd();
    ɵɵtemplate(3, MultiSelect_ng_template_15_div_3_ng_template_4_div_1_SearchIcon_3_Template, 1, 1, "SearchIcon", 26)(4, MultiSelect_ng_template_15_div_3_ng_template_4_div_1_span_4_Template, 2, 1, "span", 55);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r52 = ɵɵnextContext(4);
    ɵɵadvance(1);
    ɵɵproperty("value", ctx_r52._filterValue() || "")("disabled", ctx_r52.disabled);
    ɵɵattribute("autocomplete", ctx_r52.autocomplete)("placeholder", ctx_r52.filterPlaceHolder)("aria-owns", ctx_r52.id + "_list")("aria-activedescendant", ctx_r52.focusedOptionId)("placeholder", ctx_r52.filterPlaceHolder)("aria-label", ctx_r52.ariaFilterLabel);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r52.filterIconTemplate);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r52.filterIconTemplate);
  }
}
function MultiSelect_ng_template_15_div_3_ng_template_4_TimesIcon_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "TimesIcon", 28);
  }
  if (rf & 2) {
    ɵɵproperty("styleClass", "p-multiselect-close-icon");
  }
}
function MultiSelect_ng_template_15_div_3_ng_template_4_span_4_1_ng_template_0_Template(rf, ctx) {
}
function MultiSelect_ng_template_15_div_3_ng_template_4_span_4_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_15_div_3_ng_template_4_span_4_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function MultiSelect_ng_template_15_div_3_ng_template_4_span_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 57);
    ɵɵtemplate(1, MultiSelect_ng_template_15_div_3_ng_template_4_span_4_1_Template, 1, 0, null, 22);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r54 = ɵɵnextContext(4);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r54.closeIconTemplate);
  }
}
function MultiSelect_ng_template_15_div_3_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r79 = ɵɵgetCurrentView();
    ɵɵtemplate(0, MultiSelect_ng_template_15_div_3_ng_template_4_div_0_Template, 6, 15, "div", 42)(1, MultiSelect_ng_template_15_div_3_ng_template_4_div_1_Template, 5, 10, "div", 43);
    ɵɵelementStart(2, "button", 44);
    ɵɵlistener("click", function MultiSelect_ng_template_15_div_3_ng_template_4_Template_button_click_2_listener($event) {
      ɵɵrestoreView(_r79);
      const ctx_r78 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r78.close($event));
    });
    ɵɵtemplate(3, MultiSelect_ng_template_15_div_3_ng_template_4_TimesIcon_3_Template, 1, 1, "TimesIcon", 26)(4, MultiSelect_ng_template_15_div_3_ng_template_4_span_4_Template, 2, 1, "span", 45);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r48 = ɵɵnextContext(3);
    ɵɵproperty("ngIf", ctx_r48.showToggleAll && !ctx_r48.selectionLimit);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r48.filter);
    ɵɵadvance(1);
    ɵɵattribute("aria-label", ctx_r48.closeAriaLabel);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r48.closeIconTemplate);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r48.closeIconTemplate);
  }
}
function MultiSelect_ng_template_15_div_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 39);
    ɵɵprojection(1);
    ɵɵtemplate(2, MultiSelect_ng_template_15_div_3_ng_container_2_Template, 1, 0, "ng-container", 22)(3, MultiSelect_ng_template_15_div_3_ng_container_3_Template, 2, 4, "ng-container", 40)(4, MultiSelect_ng_template_15_div_3_ng_template_4_Template, 5, 5, "ng-template", null, 41, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const _r49 = ɵɵreference(5);
    const ctx_r39 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r39.headerTemplate);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r39.filterTemplate)("ngIfElse", _r49);
  }
}
function MultiSelect_ng_template_15_p_scroller_5_ng_template_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
var _c16 = (a0, a1) => ({
  $implicit: a0,
  options: a1
});
function MultiSelect_ng_template_15_p_scroller_5_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_15_p_scroller_5_ng_template_2_ng_container_0_Template, 1, 0, "ng-container", 8);
  }
  if (rf & 2) {
    const items_r83 = ctx.$implicit;
    const scrollerOptions_r84 = ctx.options;
    ɵɵnextContext(2);
    const _r43 = ɵɵreference(8);
    ɵɵproperty("ngTemplateOutlet", _r43)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c16, items_r83, scrollerOptions_r84));
  }
}
function MultiSelect_ng_template_15_p_scroller_5_ng_container_3_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_15_p_scroller_5_ng_container_3_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_15_p_scroller_5_ng_container_3_ng_template_1_ng_container_0_Template, 1, 0, "ng-container", 8);
  }
  if (rf & 2) {
    const scrollerOptions_r87 = ctx.options;
    const ctx_r86 = ɵɵnextContext(4);
    ɵɵproperty("ngTemplateOutlet", ctx_r86.loaderTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c13, scrollerOptions_r87));
  }
}
function MultiSelect_ng_template_15_p_scroller_5_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_template_15_p_scroller_5_ng_container_3_ng_template_1_Template, 1, 4, "ng-template", 60);
    ɵɵelementContainerEnd();
  }
}
function MultiSelect_ng_template_15_p_scroller_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r90 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "p-scroller", 58, 59);
    ɵɵlistener("onLazyLoad", function MultiSelect_ng_template_15_p_scroller_5_Template_p_scroller_onLazyLoad_0_listener($event) {
      ɵɵrestoreView(_r90);
      const ctx_r89 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r89.onLazyLoad.emit($event));
    });
    ɵɵtemplate(2, MultiSelect_ng_template_15_p_scroller_5_ng_template_2_Template, 1, 5, "ng-template", 13)(3, MultiSelect_ng_template_15_p_scroller_5_ng_container_3_Template, 2, 0, "ng-container", 7);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r40 = ɵɵnextContext(2);
    ɵɵstyleMap(ɵɵpureFunction1(9, _c0, ctx_r40.scrollHeight));
    ɵɵproperty("items", ctx_r40.visibleOptions())("itemSize", ctx_r40.virtualScrollItemSize || ctx_r40._itemSize)("autoSize", true)("tabindex", -1)("lazy", ctx_r40.lazy)("options", ctx_r40.virtualScrollOptions);
    ɵɵadvance(3);
    ɵɵproperty("ngIf", ctx_r40.loaderTemplate);
  }
}
function MultiSelect_ng_template_15_ng_container_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
var _c17 = () => ({});
function MultiSelect_ng_template_15_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, MultiSelect_ng_template_15_ng_container_6_ng_container_1_Template, 1, 0, "ng-container", 8);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    ɵɵnextContext();
    const _r43 = ɵɵreference(8);
    const ctx_r41 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", _r43)("ngTemplateOutletContext", ɵɵpureFunction2(3, _c16, ctx_r41.visibleOptions(), ɵɵpureFunction0(2, _c17)));
  }
}
function MultiSelect_ng_template_15_ng_template_7_ng_template_2_ng_container_0_span_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span");
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const option_r98 = ɵɵnextContext(2).$implicit;
    const ctx_r102 = ɵɵnextContext(3);
    ɵɵadvance(1);
    ɵɵtextInterpolate(ctx_r102.getOptionGroupLabel(option_r98.optionGroup));
  }
}
function MultiSelect_ng_template_15_ng_template_7_ng_template_2_ng_container_0_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_15_ng_template_7_ng_template_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "li", 65);
    ɵɵtemplate(2, MultiSelect_ng_template_15_ng_template_7_ng_template_2_ng_container_0_span_2_Template, 2, 1, "span", 7)(3, MultiSelect_ng_template_15_ng_template_7_ng_template_2_ng_container_0_ng_container_3_Template, 1, 0, "ng-container", 8);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r106 = ɵɵnextContext();
    const i_r99 = ctx_r106.index;
    const option_r98 = ctx_r106.$implicit;
    const scrollerOptions_r93 = ɵɵnextContext().options;
    const ctx_r100 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngStyle", ɵɵpureFunction1(5, _c0, scrollerOptions_r93.itemSize + "px"));
    ɵɵattribute("id", ctx_r100.id + "_" + ctx_r100.getOptionIndex(i_r99, scrollerOptions_r93));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r100.groupTemplate);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r100.groupTemplate)("ngTemplateOutletContext", ɵɵpureFunction1(7, _c3, option_r98.optionGroup));
  }
}
function MultiSelect_ng_template_15_ng_template_7_ng_template_2_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r109 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "p-multiSelectItem", 66);
    ɵɵlistener("onClick", function MultiSelect_ng_template_15_ng_template_7_ng_template_2_ng_container_1_Template_p_multiSelectItem_onClick_1_listener($event) {
      ɵɵrestoreView(_r109);
      const i_r99 = ɵɵnextContext().index;
      const scrollerOptions_r93 = ɵɵnextContext().options;
      const ctx_r107 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r107.onOptionSelect($event, false, ctx_r107.getOptionIndex(i_r99, scrollerOptions_r93)));
    })("onMouseEnter", function MultiSelect_ng_template_15_ng_template_7_ng_template_2_ng_container_1_Template_p_multiSelectItem_onMouseEnter_1_listener($event) {
      ɵɵrestoreView(_r109);
      const i_r99 = ɵɵnextContext().index;
      const scrollerOptions_r93 = ɵɵnextContext().options;
      const ctx_r111 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r111.onOptionMouseEnter($event, ctx_r111.getOptionIndex(i_r99, scrollerOptions_r93)));
    });
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r114 = ɵɵnextContext();
    const i_r99 = ctx_r114.index;
    const option_r98 = ctx_r114.$implicit;
    const scrollerOptions_r93 = ɵɵnextContext().options;
    const ctx_r101 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("id", ctx_r101.id + "_" + ctx_r101.getOptionIndex(i_r99, scrollerOptions_r93))("option", option_r98)("selected", ctx_r101.isSelected(option_r98))("label", ctx_r101.getOptionLabel(option_r98))("disabled", ctx_r101.isOptionDisabled(option_r98))("template", ctx_r101.itemTemplate)("checkIconTemplate", ctx_r101.checkIconTemplate)("itemSize", scrollerOptions_r93.itemSize)("focused", ctx_r101.focusedOptionIndex() === ctx_r101.getOptionIndex(i_r99, scrollerOptions_r93))("ariaPosInset", ctx_r101.getAriaPosInset(ctx_r101.getOptionIndex(i_r99, scrollerOptions_r93)))("ariaSetSize", ctx_r101.ariaSetSize);
  }
}
function MultiSelect_ng_template_15_ng_template_7_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MultiSelect_ng_template_15_ng_template_7_ng_template_2_ng_container_0_Template, 4, 9, "ng-container", 7)(1, MultiSelect_ng_template_15_ng_template_7_ng_template_2_ng_container_1_Template, 2, 11, "ng-container", 7);
  }
  if (rf & 2) {
    const option_r98 = ctx.$implicit;
    const ctx_r95 = ɵɵnextContext(3);
    ɵɵproperty("ngIf", ctx_r95.isOptionGroup(option_r98));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r95.isOptionGroup(option_r98));
  }
}
function MultiSelect_ng_template_15_ng_template_7_li_3_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r116 = ɵɵnextContext(4);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ctx_r116.emptyFilterMessageLabel, " ");
  }
}
function MultiSelect_ng_template_15_ng_template_7_li_3_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0, null, 68);
  }
}
function MultiSelect_ng_template_15_ng_template_7_li_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 67);
    ɵɵtemplate(1, MultiSelect_ng_template_15_ng_template_7_li_3_ng_container_1_Template, 2, 1, "ng-container", 40)(2, MultiSelect_ng_template_15_ng_template_7_li_3_ng_container_2_Template, 2, 0, "ng-container", 22);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const scrollerOptions_r93 = ɵɵnextContext().options;
    const ctx_r96 = ɵɵnextContext(2);
    ɵɵproperty("ngStyle", ɵɵpureFunction1(4, _c0, scrollerOptions_r93.itemSize + "px"));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r96.emptyFilterTemplate && !ctx_r96.emptyTemplate)("ngIfElse", ctx_r96.emptyFilter);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r96.emptyFilterTemplate || ctx_r96.emptyTemplate);
  }
}
function MultiSelect_ng_template_15_ng_template_7_li_4_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r120 = ɵɵnextContext(4);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ctx_r120.emptyMessageLabel, " ");
  }
}
function MultiSelect_ng_template_15_ng_template_7_li_4_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0, null, 69);
  }
}
function MultiSelect_ng_template_15_ng_template_7_li_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "li", 67);
    ɵɵtemplate(1, MultiSelect_ng_template_15_ng_template_7_li_4_ng_container_1_Template, 2, 1, "ng-container", 40)(2, MultiSelect_ng_template_15_ng_template_7_li_4_ng_container_2_Template, 2, 0, "ng-container", 22);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const scrollerOptions_r93 = ɵɵnextContext().options;
    const ctx_r97 = ɵɵnextContext(2);
    ɵɵproperty("ngStyle", ɵɵpureFunction1(4, _c0, scrollerOptions_r93.itemSize + "px"));
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r97.emptyTemplate)("ngIfElse", ctx_r97.empty);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", ctx_r97.emptyTemplate);
  }
}
function MultiSelect_ng_template_15_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ul", 61, 62);
    ɵɵtemplate(2, MultiSelect_ng_template_15_ng_template_7_ng_template_2_Template, 2, 2, "ng-template", 63)(3, MultiSelect_ng_template_15_ng_template_7_li_3_Template, 3, 6, "li", 64)(4, MultiSelect_ng_template_15_ng_template_7_li_4_Template, 3, 6, "li", 64);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const items_r92 = ctx.$implicit;
    const scrollerOptions_r93 = ctx.options;
    const ctx_r42 = ɵɵnextContext(2);
    ɵɵstyleMap(scrollerOptions_r93.contentStyle);
    ɵɵproperty("ngClass", scrollerOptions_r93.contentStyleClass);
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", items_r92);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r42.hasFilter() && ctx_r42.isEmpty());
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r42.hasFilter() && ctx_r42.isEmpty());
  }
}
function MultiSelect_ng_template_15_div_9_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function MultiSelect_ng_template_15_div_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 70);
    ɵɵprojection(1, 1);
    ɵɵtemplate(2, MultiSelect_ng_template_15_div_9_ng_container_2_Template, 1, 0, "ng-container", 22);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r44 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r44.footerTemplate);
  }
}
function MultiSelect_ng_template_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r126 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 30)(1, "span", 31, 32);
    ɵɵlistener("focus", function MultiSelect_ng_template_15_Template_span_focus_1_listener($event) {
      ɵɵrestoreView(_r126);
      const ctx_r125 = ɵɵnextContext();
      return ɵɵresetView(ctx_r125.onFirstHiddenFocus($event));
    });
    ɵɵelementEnd();
    ɵɵtemplate(3, MultiSelect_ng_template_15_div_3_Template, 6, 3, "div", 33);
    ɵɵelementStart(4, "div", 34);
    ɵɵtemplate(5, MultiSelect_ng_template_15_p_scroller_5_Template, 4, 11, "p-scroller", 35)(6, MultiSelect_ng_template_15_ng_container_6_Template, 2, 6, "ng-container", 7)(7, MultiSelect_ng_template_15_ng_template_7_Template, 5, 6, "ng-template", null, 36, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
    ɵɵtemplate(9, MultiSelect_ng_template_15_div_9_Template, 3, 1, "div", 37);
    ɵɵelementStart(10, "span", 31, 38);
    ɵɵlistener("focus", function MultiSelect_ng_template_15_Template_span_focus_10_listener($event) {
      ɵɵrestoreView(_r126);
      const ctx_r127 = ɵɵnextContext();
      return ɵɵresetView(ctx_r127.onLastHiddenFocus($event));
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r8 = ɵɵnextContext();
    ɵɵclassMap(ctx_r8.panelStyleClass);
    ɵɵproperty("ngClass", "p-multiselect-panel p-component")("ngStyle", ctx_r8.panelStyle);
    ɵɵadvance(1);
    ɵɵattribute("aria-hidden", "true")("tabindex", 0)("data-p-hidden-accessible", true)("data-p-hidden-focusable", true);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r8.showHeader);
    ɵɵadvance(1);
    ɵɵstyleProp("max-height", ctx_r8.virtualScroll ? "auto" : ctx_r8.scrollHeight || "auto");
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r8.virtualScroll);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r8.virtualScroll);
    ɵɵadvance(3);
    ɵɵproperty("ngIf", ctx_r8.footerFacet || ctx_r8.footerTemplate);
    ɵɵadvance(1);
    ɵɵattribute("aria-hidden", true)("tabindex", 0)("data-p-hidden-accessible", true)("data-p-hidden-focusable", true);
  }
}
var _c18 = [[["p-header"]], [["p-footer"]]];
var _c19 = (a0, a1) => ({
  $implicit: a0,
  removeChip: a1
});
var _c20 = ["p-header", "p-footer"];
var MULTISELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiSelect),
  multi: true
};
var MultiSelectItem = class _MultiSelectItem {
  id;
  option;
  selected;
  label;
  disabled;
  itemSize;
  focused;
  ariaPosInset;
  ariaSetSize;
  template;
  checkIconTemplate;
  onClick = new EventEmitter();
  onMouseEnter = new EventEmitter();
  onOptionClick(event) {
    this.onClick.emit({
      originalEvent: event,
      option: this.option,
      selected: this.selected
    });
    event.stopPropagation();
  }
  onOptionMouseEnter(event) {
    this.onMouseEnter.emit({
      originalEvent: event,
      option: this.option,
      selected: this.selected
    });
  }
  static ɵfac = function MultiSelectItem_Factory(t) {
    return new (t || _MultiSelectItem)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MultiSelectItem,
    selectors: [["p-multiSelectItem"]],
    hostAttrs: [1, "p-element"],
    inputs: {
      id: "id",
      option: "option",
      selected: "selected",
      label: "label",
      disabled: "disabled",
      itemSize: "itemSize",
      focused: "focused",
      ariaPosInset: "ariaPosInset",
      ariaSetSize: "ariaSetSize",
      template: "template",
      checkIconTemplate: "checkIconTemplate"
    },
    outputs: {
      onClick: "onClick",
      onMouseEnter: "onMouseEnter"
    },
    decls: 6,
    vars: 26,
    consts: [["pRipple", "", 1, "p-multiselect-item", 3, "ngStyle", "ngClass", "id", "click", "mouseenter"], [1, "p-checkbox", "p-component"], [1, "p-checkbox-box", 3, "ngClass"], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "styleClass", 4, "ngIf"], ["class", "p-checkbox-icon", 4, "ngIf"], [3, "styleClass"], [1, "p-checkbox-icon"], [4, "ngTemplateOutlet"]],
    template: function MultiSelectItem_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "li", 0);
        ɵɵlistener("click", function MultiSelectItem_Template_li_click_0_listener($event) {
          return ctx.onOptionClick($event);
        })("mouseenter", function MultiSelectItem_Template_li_mouseenter_0_listener($event) {
          return ctx.onOptionMouseEnter($event);
        });
        ɵɵelementStart(1, "div", 1)(2, "div", 2);
        ɵɵtemplate(3, MultiSelectItem_ng_container_3_Template, 3, 2, "ng-container", 3);
        ɵɵelementEnd()();
        ɵɵtemplate(4, MultiSelectItem_span_4_Template, 2, 1, "span", 3)(5, MultiSelectItem_ng_container_5_Template, 1, 0, "ng-container", 4);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵproperty("ngStyle", ɵɵpureFunction1(16, _c0, ctx.itemSize + "px"))("ngClass", ɵɵpureFunction3(18, _c1, ctx.selected, ctx.disabled, ctx.focused))("id", ctx.id);
        ɵɵattribute("aria-label", ctx.label)("aria-setsize", ctx.ariaSetSize)("aria-posinset", ctx.ariaPosInset)("aria-selected", ctx.selected)("data-p-focused", ctx.focused)("data-p-highlight", ctx.selected)("data-p-disabled", ctx.disabled);
        ɵɵadvance(2);
        ɵɵproperty("ngClass", ɵɵpureFunction1(22, _c2, ctx.selected));
        ɵɵattribute("aria-checked", ctx.selected);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.selected);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", !ctx.template);
        ɵɵadvance(1);
        ɵɵproperty("ngTemplateOutlet", ctx.template)("ngTemplateOutletContext", ɵɵpureFunction1(24, _c3, ctx.option));
      }
    },
    dependencies: () => [NgClass, NgIf, NgTemplateOutlet, NgStyle, Ripple, CheckIcon],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MultiSelectItem, [{
    type: Component,
    args: [{
      selector: "p-multiSelectItem",
      template: `
        <li
            pRipple
            [ngStyle]="{ height: itemSize + 'px' }"
            class="p-multiselect-item"
            [ngClass]="{ 'p-multiselect-item': true, 'p-highlight': selected, 'p-disabled': disabled, 'p-focus': focused }"
            [id]="id"
            [attr.aria-label]="label"
            [attr.aria-setsize]="ariaSetSize"
            [attr.aria-posinset]="ariaPosInset"
            [attr.aria-selected]="selected"
            [attr.data-p-focused]="focused"
            [attr.data-p-highlight]="selected"
            [attr.data-p-disabled]="disabled"
            (click)="onOptionClick($event)"
            (mouseenter)="onOptionMouseEnter($event)"
        >
            <div class="p-checkbox p-component">
                <div class="p-checkbox-box" [ngClass]="{ 'p-highlight': selected }" [attr.aria-checked]="selected">
                    <ng-container *ngIf="selected">
                        <CheckIcon *ngIf="!checkIconTemplate" [styleClass]="'p-checkbox-icon'" [attr.aria-hidden]="true" />
                        <span *ngIf="checkIconTemplate" class="p-checkbox-icon" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="checkIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </div>
            </div>
            <span *ngIf="!template">{{ label ?? 'empty' }}</span>
            <ng-container *ngTemplateOutlet="template; context: { $implicit: option }"></ng-container>
        </li>
    `,
      encapsulation: ViewEncapsulation$1.None,
      host: {
        class: "p-element"
      }
    }]
  }], null, {
    id: [{
      type: Input
    }],
    option: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    label: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    itemSize: [{
      type: Input
    }],
    focused: [{
      type: Input
    }],
    ariaPosInset: [{
      type: Input
    }],
    ariaSetSize: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    checkIconTemplate: [{
      type: Input
    }],
    onClick: [{
      type: Output
    }],
    onMouseEnter: [{
      type: Output
    }]
  });
})();
var MultiSelect = class _MultiSelect {
  el;
  renderer;
  cd;
  zone;
  filterService;
  config;
  overlayService;
  /**
   * Unique identifier of the component
   * @group Props
   */
  id;
  /**
   * Defines a string that labels the input for accessibility.
   * @group Props
   */
  ariaLabel;
  /**
   * Inline style of the element.
   * @group Props
   */
  style;
  /**
   * Style class of the element.
   * @group Props
   */
  styleClass;
  /**
   * Inline style of the overlay panel.
   * @group Props
   */
  panelStyle;
  /**
   * Style class of the overlay panel element.
   * @group Props
   */
  panelStyleClass;
  /**
   * Identifier of the focus input to match a label defined for the component.
   * @group Props
   */
  inputId;
  /**
   * When present, it specifies that the element should be disabled.
   * @group Props
   */
  disabled;
  /**
   * When present, it specifies that the component cannot be edited.
   * @group Props
   */
  readonly;
  /**
   * Whether to display options as grouped when nested options are provided.
   * @group Props
   */
  group;
  /**
   * When specified, displays an input field to filter the items on keyup.
   * @group Props
   */
  filter = true;
  /**
   * Defines placeholder of the filter input.
   * @group Props
   */
  filterPlaceHolder;
  /**
   * Locale to use in filtering. The default locale is the host environment's current locale.
   * @group Props
   */
  filterLocale;
  /**
   * Specifies the visibility of the options panel.
   * @group Props
   */
  overlayVisible;
  /**
   * Index of the element in tabbing order.
   * @group Props
   */
  tabindex = 0;
  /**
   * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
   * @group Props
   */
  appendTo;
  /**
   * A property to uniquely identify a value in options.
   * @group Props
   */
  dataKey;
  /**
   * Name of the input element.
   * @group Props
   */
  name;
  /**
   * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
   * @group Props
   */
  ariaLabelledBy;
  /**
   * Whether to show labels of selected item labels or use default label.
   * @group Props
   * @defaultValue true
   */
  set displaySelectedLabel(val) {
    this._displaySelectedLabel = val;
  }
  get displaySelectedLabel() {
    return this._displaySelectedLabel;
  }
  /**
   * Decides how many selected item labels to show at most.
   * @group Props
   * @defaultValue 3
   */
  set maxSelectedLabels(val) {
    this._maxSelectedLabels = val;
  }
  get maxSelectedLabels() {
    return this._maxSelectedLabels;
  }
  /**
   * Decides how many selected item labels to show at most.
   * @group Props
   */
  selectionLimit;
  /**
   * Label to display after exceeding max selected labels e.g. ({0} items selected), defaults "ellipsis" keyword to indicate a text-overflow.
   * @group Props
   */
  selectedItemsLabel;
  /**
   * Whether to show the checkbox at header to toggle all items at once.
   * @group Props
   */
  showToggleAll = true;
  /**
   * Text to display when filtering does not return any results.
   * @group Props
   */
  emptyFilterMessage = "";
  /**
   * Text to display when there is no data. Defaults to global value in i18n translation configuration.
   * @group Props
   */
  emptyMessage = "";
  /**
   * Clears the filter value when hiding the dropdown.
   * @group Props
   */
  resetFilterOnHide = false;
  /**
   * Icon class of the dropdown icon.
   * @group Props
   */
  dropdownIcon;
  /**
   * Name of the label field of an option.
   * @group Props
   */
  optionLabel;
  /**
   * Name of the value field of an option.
   * @group Props
   */
  optionValue;
  /**
   * Name of the disabled field of an option.
   * @group Props
   */
  optionDisabled;
  /**
   * Name of the label field of an option group.
   * @group Props
   */
  optionGroupLabel = "label";
  /**
   * Name of the options field of an option group.
   * @group Props
   */
  optionGroupChildren = "items";
  /**
   * Whether to show the header.
   * @group Props
   */
  showHeader = true;
  /**
   * When filtering is enabled, filterBy decides which field or fields (comma separated) to search against.
   * @group Props
   */
  filterBy;
  /**
   * Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
   * @group Props
   */
  scrollHeight = "200px";
  /**
   * Defines if data is loaded and interacted with in lazy manner.
   * @group Props
   */
  lazy = false;
  /**
   * Whether the data should be loaded on demand during scroll.
   * @group Props
   */
  virtualScroll;
  /**
   * Height of an item in the list for VirtualScrolling.
   * @group Props
   */
  virtualScrollItemSize;
  /**
   * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
   * @group Props
   */
  virtualScrollOptions;
  /**
   * Whether to use overlay API feature. The properties of overlay API can be used like an object in it.
   * @group Props
   */
  overlayOptions;
  /**
   * Defines a string that labels the filter input.
   * @group Props
   */
  ariaFilterLabel;
  /**
   * Defines how the items are filtered.
   * @group Props
   */
  filterMatchMode = "contains";
  /**
   * Advisory information to display in a tooltip on hover.
   * @group Props
   */
  tooltip = "";
  /**
   * Position of the tooltip.
   * @group Props
   */
  tooltipPosition = "right";
  /**
   * Type of CSS position.
   * @group Props
   */
  tooltipPositionStyle = "absolute";
  /**
   * Style class of the tooltip.
   * @group Props
   */
  tooltipStyleClass;
  /**
   * Applies focus to the filter element when the overlay is shown.
   * @group Props
   */
  autofocusFilter = true;
  /**
   * Defines how the selected items are displayed.
   * @group Props
   */
  display = "comma";
  /**
   * Defines the autocomplete is active.
   * @group Props
   */
  autocomplete = "off";
  /**
   * When enabled, a clear icon is displayed to clear the value.
   * @group Props
   */
  showClear = false;
  /**
   * @deprecated since v14.2.0, use overlayOptions property instead.
   * Whether to automatically manage layering.
   * @group Props
   */
  get autoZIndex() {
    return this._autoZIndex;
  }
  set autoZIndex(val) {
    this._autoZIndex = val;
    console.warn("The autoZIndex property is deprecated since v14.2.0, use overlayOptions property instead.");
  }
  /**
   * @deprecated since v14.2.0, use overlayOptions property instead.
   * Base zIndex value to use in layering.
   * @group Props
   */
  get baseZIndex() {
    return this._baseZIndex;
  }
  set baseZIndex(val) {
    this._baseZIndex = val;
    console.warn("The baseZIndex property is deprecated since v14.2.0, use overlayOptions property instead.");
  }
  /**
   * Transition options of the show animation.
   * @group Props
   * @deprecated since v14.2.0, use overlayOptions property instead.
   */
  get showTransitionOptions() {
    return this._showTransitionOptions;
  }
  set showTransitionOptions(val) {
    this._showTransitionOptions = val;
    console.warn("The showTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.");
  }
  /**
   * Transition options of the hide animation.
   * @group Props
   * @deprecated since v14.2.0, use overlayOptions property instead.
   */
  get hideTransitionOptions() {
    return this._hideTransitionOptions;
  }
  set hideTransitionOptions(val) {
    this._hideTransitionOptions = val;
    console.warn("The hideTransitionOptions property is deprecated since v14.2.0, use overlayOptions property instead.");
  }
  /**
   * Label to display when there are no selections.
   * @group Props
   * @deprecated Use placeholder instead.
   */
  set defaultLabel(val) {
    this._defaultLabel = val;
    console.warn("defaultLabel property is deprecated since 16.6.0, use placeholder instead");
  }
  get defaultLabel() {
    return this._defaultLabel;
  }
  /**
   * Label to display when there are no selections.
   * @group Props
   */
  set placeholder(val) {
    this._placeholder.set(val);
  }
  get placeholder() {
    return this._placeholder.asReadonly();
  }
  /**
   * An array of objects to display as the available options.
   * @group Props
   */
  get options() {
    const options = this._options();
    return options;
  }
  set options(val) {
    if (!ObjectUtils.deepEquals(this._options(), val)) {
      this._options.set(val);
    }
  }
  /**
   * When specified, filter displays with this value.
   * @group Props
   */
  get filterValue() {
    return this._filterValue();
  }
  set filterValue(val) {
    this._filterValue.set(val);
  }
  /**
   * Item size of item to be virtual scrolled.
   * @group Props
   * @deprecated use virtualScrollItemSize property instead.
   */
  get itemSize() {
    return this._itemSize;
  }
  set itemSize(val) {
    this._itemSize = val;
    console.warn("The itemSize property is deprecated, use virtualScrollItemSize property instead.");
  }
  /**
   * Whether all data is selected.
   * @group Props
   */
  get selectAll() {
    return this._selectAll;
  }
  set selectAll(value) {
    this._selectAll = value;
  }
  /**
   * Fields used when filtering the options, defaults to optionLabel.
   * @group Props
   */
  focusOnHover = false;
  /**
   * Fields used when filtering the options, defaults to optionLabel.
   * @group Props
   */
  filterFields;
  /**
   * Determines if the option will be selected on focus.
   * @group Props
   */
  selectOnFocus = false;
  /**
   * Whether to focus on the first visible or selected element when the overlay panel is shown.
   * @group Props
   */
  autoOptionFocus = true;
  /**
   * Callback to invoke when value changes.
   * @param {MultiSelectChangeEvent} event - Custom change event.
   * @group Emits
   */
  onChange = new EventEmitter();
  /**
   * Callback to invoke when data is filtered.
   * @param {MultiSelectFilterEvent} event - Custom filter event.
   * @group Emits
   */
  onFilter = new EventEmitter();
  /**
   * Callback to invoke when multiselect receives focus.
   * @param {MultiSelectFocusEvent} event - Custom focus event.
   * @group Emits
   */
  onFocus = new EventEmitter();
  /**
   * Callback to invoke when multiselect loses focus.
   * @param {MultiSelectBlurEvent} event - Custom blur event.
   * @group Emits
   */
  onBlur = new EventEmitter();
  /**
   * Callback to invoke when component is clicked.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onClick = new EventEmitter();
  /**
   * Callback to invoke when input field is cleared.
   * @group Emits
   */
  onClear = new EventEmitter();
  /**
   * Callback to invoke when overlay panel becomes visible.
   * @group Emits
   */
  onPanelShow = new EventEmitter();
  /**
   * Callback to invoke when overlay panel becomes hidden.
   * @group Emits
   */
  onPanelHide = new EventEmitter();
  /**
   * Callback to invoke in lazy mode to load new data.
   * @param {MultiSelectLazyLoadEvent} event - Lazy load event.
   * @group Emits
   */
  onLazyLoad = new EventEmitter();
  /**
   * Callback to invoke in lazy mode to load new data.
   * @param {MultiSelectRemoveEvent} event - Remove event.
   * @group Emits
   */
  onRemove = new EventEmitter();
  /**
   * Callback to invoke when all data is selected.
   * @param {MultiSelectSelectAllChangeEvent} event - Custom select event.
   * @group Emits
   */
  onSelectAllChange = new EventEmitter();
  containerViewChild;
  overlayViewChild;
  filterInputChild;
  focusInputViewChild;
  itemsViewChild;
  scroller;
  lastHiddenFocusableElementOnOverlay;
  firstHiddenFocusableElementOnOverlay;
  headerCheckboxViewChild;
  footerFacet;
  headerFacet;
  templates;
  searchValue;
  searchTimeout;
  _selectAll = null;
  _autoZIndex;
  _baseZIndex;
  _showTransitionOptions;
  _hideTransitionOptions;
  _defaultLabel;
  _placeholder = signal(void 0);
  _itemSize;
  _selectionLimit;
  value;
  _filteredOptions;
  onModelChange = () => {
  };
  onModelTouched = () => {
  };
  valuesAsString;
  focus;
  filtered;
  itemTemplate;
  groupTemplate;
  loaderTemplate;
  headerTemplate;
  filterTemplate;
  footerTemplate;
  emptyFilterTemplate;
  emptyTemplate;
  selectedItemsTemplate;
  checkIconTemplate;
  filterIconTemplate;
  removeTokenIconTemplate;
  closeIconTemplate;
  clearIconTemplate;
  dropdownIconTemplate;
  headerCheckboxFocus;
  filterOptions;
  preventModelTouched;
  preventDocumentDefault;
  focused = false;
  itemsWrapper;
  _displaySelectedLabel = true;
  _maxSelectedLabels = 3;
  modelValue = signal(null);
  _filterValue = signal(null);
  _options = signal(null);
  startRangeIndex = signal(-1);
  focusedOptionIndex = signal(-1);
  selectedOptions;
  clickInProgress = false;
  get containerClass() {
    return {
      "p-multiselect p-component p-inputwrapper": true,
      "p-disabled": this.disabled,
      "p-multiselect-clearable": this.showClear && !this.disabled,
      "p-multiselect-chip": this.display === "chip",
      "p-focus": this.focused
    };
  }
  get inputClass() {
    return {
      "p-multiselect-label p-inputtext": true,
      "p-placeholder": (this.placeholder() || this.defaultLabel) && (this.label() === this.placeholder() || this.label() === this.defaultLabel),
      "p-multiselect-label-empty": !this.selectedItemsTemplate && (this.label() === "p-emptylabel" || this.label().length === 0)
    };
  }
  get panelClass() {
    return {
      "p-multiselect-panel p-component": true,
      "p-input-filled": this.config.inputStyle === "filled",
      "p-ripple-disabled": this.config.ripple === false
    };
  }
  get labelClass() {
    return {
      "p-multiselect-label": true,
      "p-placeholder": this.label() === this.placeholder() || this.label() === this.defaultLabel,
      "p-multiselect-label-empty": !this.placeholder() && !this.defaultLabel && (!this.modelValue() || this.modelValue().length === 0)
    };
  }
  get emptyMessageLabel() {
    return this.emptyMessage || this.config.getTranslation(TranslationKeys.EMPTY_MESSAGE);
  }
  get emptyFilterMessageLabel() {
    return this.emptyFilterMessage || this.config.getTranslation(TranslationKeys.EMPTY_FILTER_MESSAGE);
  }
  get filled() {
    if (typeof this.modelValue() === "string")
      return !!this.modelValue();
    return ObjectUtils.isNotEmpty(this.modelValue());
  }
  get isVisibleClearIcon() {
    return this.modelValue() != null && this.modelValue() !== "" && ObjectUtils.isNotEmpty(this.modelValue()) && this.showClear && !this.disabled && this.filled;
  }
  get toggleAllAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria[this.allSelected() ? "selectAll" : "unselectAll"] : void 0;
  }
  get closeAriaLabel() {
    return this.config.translation.aria ? this.config.translation.aria.close : void 0;
  }
  visibleOptions = computed(() => {
    const options = this.group ? this.flatOptions(this.options) : this.options || [];
    if (this._filterValue()) {
      const filteredOptions = this.filterService.filter(options, this.searchFields(), this._filterValue(), this.filterMatchMode, this.filterLocale);
      if (this.group) {
        const optionGroups = this.options || [];
        const filtered = [];
        optionGroups.forEach((group) => {
          const groupChildren = this.getOptionGroupChildren(group);
          const filteredItems = groupChildren.filter((item) => filteredOptions.includes(item));
          if (filteredItems.length > 0)
            filtered.push(__spreadProps(__spreadValues({}, group), {
              [typeof this.optionGroupChildren === "string" ? this.optionGroupChildren : "items"]: [...filteredItems]
            }));
        });
        return this.flatOptions(filtered);
      }
      return filteredOptions;
    }
    return options;
  });
  label = computed(() => {
    let label;
    const modelValue = this.modelValue();
    if (modelValue && modelValue.length && this.displaySelectedLabel) {
      if (ObjectUtils.isNotEmpty(this.maxSelectedLabels) && modelValue.length > this.maxSelectedLabels) {
        return this.getSelectedItemsLabel();
      } else {
        label = "";
        for (let i = 0; i < modelValue.length; i++) {
          if (i !== 0) {
            label += ", ";
          }
          label += this.getLabelByValue(modelValue[i]);
        }
      }
    } else {
      label = this.placeholder() || this.defaultLabel || "";
    }
    return label;
  });
  chipSelectedItems = computed(() => {
    return ObjectUtils.isNotEmpty(this.maxSelectedLabels) && this.modelValue() && this.modelValue().length > this.maxSelectedLabels ? this.modelValue().slice(0, this.maxSelectedLabels) : this.modelValue();
  });
  constructor(el, renderer, cd, zone, filterService, config, overlayService) {
    this.el = el;
    this.renderer = renderer;
    this.cd = cd;
    this.zone = zone;
    this.filterService = filterService;
    this.config = config;
    this.overlayService = overlayService;
    effect(() => {
      const modelValue = this.modelValue();
      const visibleOptions = this.visibleOptions();
      if (visibleOptions && ObjectUtils.isNotEmpty(visibleOptions)) {
        if (this.optionValue && this.optionLabel && modelValue) {
          this.selectedOptions = visibleOptions.filter((option) => modelValue.includes(option[this.optionLabel]) || modelValue.includes(option[this.optionValue]));
        } else {
          this.selectedOptions = modelValue;
        }
        this.cd.markForCheck();
      }
    });
  }
  ngOnInit() {
    this.id = this.id || UniqueComponentId();
    this.autoUpdateModel();
    if (this.filterBy) {
      this.filterOptions = {
        filter: (value) => this.onFilterInputChange(value),
        reset: () => this.resetFilter()
      };
    }
  }
  maxSelectionLimitReached() {
    return this.selectionLimit && this.modelValue() && this.modelValue().length === this.selectionLimit;
  }
  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case "item":
          this.itemTemplate = item.template;
          break;
        case "group":
          this.groupTemplate = item.template;
          break;
        case "selectedItems":
          this.selectedItemsTemplate = item.template;
          break;
        case "header":
          this.headerTemplate = item.template;
          break;
        case "filter":
          this.filterTemplate = item.template;
          break;
        case "emptyfilter":
          this.emptyFilterTemplate = item.template;
          break;
        case "empty":
          this.emptyTemplate = item.template;
          break;
        case "footer":
          this.footerTemplate = item.template;
          break;
        case "loader":
          this.loaderTemplate = item.template;
          break;
        case "checkicon":
          this.checkIconTemplate = item.template;
          break;
        case "filtericon":
          this.filterIconTemplate = item.template;
          break;
        case "removetokenicon":
          this.removeTokenIconTemplate = item.template;
          break;
        case "closeicon":
          this.closeIconTemplate = item.template;
          break;
        case "clearicon":
          this.clearIconTemplate = item.template;
          break;
        case "dropdownicon":
          this.dropdownIconTemplate = item.template;
          break;
        default:
          this.itemTemplate = item.template;
          break;
      }
    });
  }
  ngAfterViewInit() {
    if (this.overlayVisible) {
      this.show();
    }
  }
  ngAfterViewChecked() {
    if (this.filtered) {
      this.zone.runOutsideAngular(() => {
        setTimeout(() => {
          this.overlayViewChild?.alignOverlay();
        }, 1);
      });
      this.filtered = false;
    }
  }
  flatOptions(options) {
    return (options || []).reduce((result, option, index) => {
      result.push({
        optionGroup: option,
        group: true,
        index
      });
      const optionGroupChildren = this.getOptionGroupChildren(option);
      optionGroupChildren && optionGroupChildren.forEach((o) => result.push(o));
      return result;
    }, []);
  }
  autoUpdateModel() {
    if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption()) {
      this.focusedOptionIndex.set(this.findFirstFocusedOptionIndex());
      const value = this.getOptionValue(this.visibleOptions()[this.focusedOptionIndex()]);
      this.onOptionSelect({
        originalEvent: null,
        option: [value]
      });
    }
  }
  /**
   * Updates the model value.
   * @group Method
   */
  updateModel(value, event) {
    this.value = value;
    this.onModelChange(value);
    this.modelValue.set(value);
  }
  onInputClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.focusedOptionIndex.set(-1);
  }
  onOptionSelect(event, isFocus = false, index = -1) {
    const {
      originalEvent,
      option
    } = event;
    if (this.disabled || this.isOptionDisabled(option)) {
      return;
    }
    let selected = this.isSelected(option);
    let value = null;
    if (selected) {
      value = this.modelValue().filter((val) => !ObjectUtils.equals(val, this.getOptionValue(option), this.equalityKey()));
    } else {
      value = [...this.modelValue() || [], this.getOptionValue(option)];
    }
    this.updateModel(value, originalEvent);
    index !== -1 && this.focusedOptionIndex.set(index);
    isFocus && DomHandler.focus(this.focusInputViewChild?.nativeElement);
    this.onChange.emit({
      originalEvent: event,
      value,
      itemValue: option
    });
  }
  findSelectedOptionIndex() {
    return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
  }
  onOptionSelectRange(event, start = -1, end = -1) {
    start === -1 && (start = this.findNearestSelectedOptionIndex(end, true));
    end === -1 && (end = this.findNearestSelectedOptionIndex(start));
    if (start !== -1 && end !== -1) {
      const rangeStart = Math.min(start, end);
      const rangeEnd = Math.max(start, end);
      const value = this.visibleOptions().slice(rangeStart, rangeEnd + 1).filter((option) => this.isValidOption(option)).map((option) => this.getOptionValue(option));
      this.updateModel(value, event);
    }
  }
  searchFields() {
    return (this.filterBy || this.optionLabel || "label").split(",");
  }
  findNearestSelectedOptionIndex(index, firstCheckUp = false) {
    let matchedOptionIndex = -1;
    if (this.hasSelectedOption()) {
      if (firstCheckUp) {
        matchedOptionIndex = this.findPrevSelectedOptionIndex(index);
        matchedOptionIndex = matchedOptionIndex === -1 ? this.findNextSelectedOptionIndex(index) : matchedOptionIndex;
      } else {
        matchedOptionIndex = this.findNextSelectedOptionIndex(index);
        matchedOptionIndex = matchedOptionIndex === -1 ? this.findPrevSelectedOptionIndex(index) : matchedOptionIndex;
      }
    }
    return matchedOptionIndex > -1 ? matchedOptionIndex : index;
  }
  findPrevSelectedOptionIndex(index) {
    const matchedOptionIndex = this.hasSelectedOption() && index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions().slice(0, index), (option) => this.isValidSelectedOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex : -1;
  }
  findFirstFocusedOptionIndex() {
    const selectedIndex = this.findFirstSelectedOptionIndex();
    return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
  }
  findFirstOptionIndex() {
    return this.visibleOptions().findIndex((option) => this.isValidOption(option));
  }
  findFirstSelectedOptionIndex() {
    return this.hasSelectedOption() ? this.visibleOptions().findIndex((option) => this.isValidSelectedOption(option)) : -1;
  }
  findNextSelectedOptionIndex(index) {
    const matchedOptionIndex = this.hasSelectedOption() && index < this.visibleOptions().length - 1 ? this.visibleOptions().slice(index + 1).findIndex((option) => this.isValidSelectedOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : -1;
  }
  equalityKey() {
    return this.optionValue ? null : this.dataKey;
  }
  hasSelectedOption() {
    return ObjectUtils.isNotEmpty(this.modelValue());
  }
  isValidSelectedOption(option) {
    return this.isValidOption(option) && this.isSelected(option);
  }
  isOptionGroup(option) {
    return (this.group || this.optionGroupLabel) && option.optionGroup && option.group;
  }
  isValidOption(option) {
    return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
  }
  isOptionDisabled(option) {
    if (this.maxSelectionLimitReached() && !this.isSelected(option)) {
      return true;
    }
    return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : option && option.disabled !== void 0 ? option.disabled : false;
  }
  isSelected(option) {
    const optionValue = this.getOptionValue(option);
    return (this.modelValue() || []).some((value) => ObjectUtils.equals(value, optionValue, this.equalityKey()));
  }
  isOptionMatched(option) {
    return this.isValidOption(option) && this.getOptionLabel(option).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale));
  }
  isEmpty() {
    return !this._options() || this.visibleOptions() && this.visibleOptions().length === 0;
  }
  getOptionIndex(index, scrollerOptions) {
    return this.virtualScrollerDisabled ? index : scrollerOptions && scrollerOptions.getItemOptions(index)["index"];
  }
  getAriaPosInset(index) {
    return (this.optionGroupLabel ? index - this.visibleOptions().slice(0, index).filter((option) => this.isOptionGroup(option)).length : index) + 1;
  }
  get ariaSetSize() {
    return this.visibleOptions().filter((option) => !this.isOptionGroup(option)).length;
  }
  getLabelByValue(value) {
    const options = this.group ? this.flatOptions(this._options()) : this._options() || [];
    const matchedOption = options.find((option) => !this.isOptionGroup(option) && ObjectUtils.equals(this.getOptionValue(option), value, this.equalityKey()));
    return matchedOption ? this.getOptionLabel(matchedOption) : null;
  }
  getSelectedItemsLabel() {
    let pattern = /{(.*?)}/;
    let message = this.selectedItemsLabel ? this.selectedItemsLabel : this.config.getTranslation(TranslationKeys.SELECTION_MESSAGE);
    if (pattern.test(message)) {
      return message.replace(message.match(pattern)[0], this.modelValue().length + "");
    }
    return message;
  }
  getOptionLabel(option) {
    return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option && option.label != void 0 ? option.label : option;
  }
  getOptionValue(option) {
    return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : !this.optionLabel && option && option.value !== void 0 ? option.value : option;
  }
  getOptionGroupLabel(optionGroup) {
    return this.optionGroupLabel ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel) : optionGroup && optionGroup.label != void 0 ? optionGroup.label : optionGroup;
  }
  getOptionGroupChildren(optionGroup) {
    return this.optionGroupChildren ? ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren) : optionGroup.items;
  }
  onKeyDown(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    const metaKey = event.metaKey || event.ctrlKey;
    switch (event.code) {
      case "ArrowDown":
        this.onArrowDownKey(event);
        break;
      case "ArrowUp":
        this.onArrowUpKey(event);
        break;
      case "Home":
        this.onHomeKey(event);
        break;
      case "End":
        this.onEndKey(event);
        break;
      case "PageDown":
        this.onPageDownKey(event);
        break;
      case "PageUp":
        this.onPageUpKey(event);
        break;
      case "Enter":
      case "Space":
        this.onEnterKey(event);
        break;
      case "Escape":
        this.onEscapeKey(event);
        break;
      case "Tab":
        this.onTabKey(event);
        break;
      case "ShiftLeft":
      case "ShiftRight":
        this.onShiftKey();
        break;
      default:
        if (event.code === "KeyA" && metaKey) {
          const value = this.visibleOptions().filter((option) => this.isValidOption(option)).map((option) => this.getOptionValue(option));
          this.updateModel(value, event);
          event.preventDefault();
          break;
        }
        if (!metaKey && ObjectUtils.isPrintableCharacter(event.key)) {
          !this.overlayVisible && this.show();
          this.searchOptions(event, event.key);
          event.preventDefault();
        }
        break;
    }
  }
  onFilterKeyDown(event) {
    switch (event.code) {
      case "ArrowDown":
        this.onArrowDownKey(event);
        break;
      case "ArrowUp":
        this.onArrowUpKey(event, true);
        break;
      case "ArrowLeft":
      case "ArrowRight":
        this.onArrowLeftKey(event, true);
        break;
      case "Home":
        this.onHomeKey(event, true);
        break;
      case "End":
        this.onEndKey(event, true);
        break;
      case "Enter":
        this.onEnterKey(event);
        break;
      case "Escape":
        this.onEscapeKey(event);
        break;
      case "Tab":
        this.onTabKey(event, true);
        break;
      default:
        break;
    }
  }
  onArrowLeftKey(event, pressedInInputText = false) {
    pressedInInputText && this.focusedOptionIndex.set(-1);
  }
  onArrowDownKey(event) {
    const optionIndex = this.focusedOptionIndex() !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex()) : this.findFirstFocusedOptionIndex();
    if (event.shiftKey) {
      this.onOptionSelectRange(event, this.startRangeIndex(), optionIndex);
    }
    this.changeFocusedOptionIndex(event, optionIndex);
    !this.overlayVisible && this.show();
    event.preventDefault();
    event.stopPropagation();
  }
  onArrowUpKey(event, pressedInInputText = false) {
    if (event.altKey && !pressedInInputText) {
      if (this.focusedOptionIndex() !== -1) {
        this.onOptionSelect(event, this.visibleOptions()[this.focusedOptionIndex()]);
      }
      this.overlayVisible && this.hide();
      event.preventDefault();
    } else {
      const optionIndex = this.focusedOptionIndex() !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex()) : this.findLastFocusedOptionIndex();
      if (event.shiftKey) {
        this.onOptionSelectRange(event, optionIndex, this.startRangeIndex());
      }
      this.changeFocusedOptionIndex(event, optionIndex);
      !this.overlayVisible && this.show();
      event.preventDefault();
    }
    event.stopPropagation();
  }
  onHomeKey(event, pressedInInputText = false) {
    const {
      currentTarget
    } = event;
    if (pressedInInputText) {
      const len = currentTarget.value.length;
      currentTarget.setSelectionRange(0, event.shiftKey ? len : 0);
      this.focusedOptionIndex.set(-1);
    } else {
      let metaKey = event.metaKey || event.ctrlKey;
      let optionIndex = this.findFirstOptionIndex();
      if (event.shiftKey && metaKey) {
        this.onOptionSelectRange(event, optionIndex, this.startRangeIndex());
      }
      this.changeFocusedOptionIndex(event, optionIndex);
      !this.overlayVisible && this.show();
    }
    event.preventDefault();
  }
  onEndKey(event, pressedInInputText = false) {
    const {
      currentTarget
    } = event;
    if (pressedInInputText) {
      const len = currentTarget.value.length;
      currentTarget.setSelectionRange(event.shiftKey ? 0 : len, len);
      this.focusedOptionIndex.set(-1);
    } else {
      let metaKey = event.metaKey || event.ctrlKey;
      let optionIndex = this.findLastFocusedOptionIndex();
      if (event.shiftKey && metaKey) {
        this.onOptionSelectRange(event, this.startRangeIndex(), optionIndex);
      }
      this.changeFocusedOptionIndex(event, optionIndex);
      !this.overlayVisible && this.show();
    }
    event.preventDefault();
  }
  onPageDownKey(event) {
    this.scrollInView(this.visibleOptions().length - 1);
    event.preventDefault();
  }
  onPageUpKey(event) {
    this.scrollInView(0);
    event.preventDefault();
  }
  onEnterKey(event) {
    if (!this.overlayVisible) {
      this.onArrowDownKey(event);
    } else {
      if (this.focusedOptionIndex() !== -1) {
        if (event.shiftKey) {
          this.onOptionSelectRange(event, this.focusedOptionIndex());
        } else {
          this.onOptionSelect({
            originalEvent: event,
            option: this.visibleOptions()[this.focusedOptionIndex()]
          });
        }
      }
    }
    event.preventDefault();
  }
  onEscapeKey(event) {
    this.overlayVisible && this.hide(true);
    event.preventDefault();
  }
  onDeleteKey(event) {
    if (this.showClear) {
      this.clear(event);
      event.preventDefault();
    }
  }
  onTabKey(event, pressedInInputText = false) {
    if (!pressedInInputText) {
      if (this.overlayVisible && this.hasFocusableElements()) {
        DomHandler.focus(event.shiftKey ? this.lastHiddenFocusableElementOnOverlay.nativeElement : this.firstHiddenFocusableElementOnOverlay.nativeElement);
        event.preventDefault();
      } else {
        if (this.focusedOptionIndex() !== -1) {
          this.onOptionSelect({
            originalEvent: event,
            option: this.visibleOptions()[this.focusedOptionIndex()]
          });
        }
        this.overlayVisible && this.hide(this.filter);
      }
    }
  }
  onShiftKey() {
    this.startRangeIndex.set(this.focusedOptionIndex());
  }
  onContainerClick(event) {
    if (this.disabled || this.readonly || event.target.isSameNode(this.focusInputViewChild?.nativeElement)) {
      return;
    }
    if (event.target.tagName === "INPUT" || event.target.getAttribute("data-pc-section") === "clearicon" || event.target.closest('[data-pc-section="clearicon"]')) {
      event.preventDefault();
      return;
    } else if (!this.overlayViewChild || !this.overlayViewChild.el.nativeElement.contains(event.target)) {
      if (this.clickInProgress) {
        return;
      }
      this.clickInProgress = true;
      setTimeout(() => {
        this.clickInProgress = false;
      }, 150);
      this.overlayVisible ? this.hide(true) : this.show(true);
    }
    this.focusInputViewChild?.nativeElement.focus({
      preventScroll: true
    });
    this.onClick.emit(event);
    this.cd.detectChanges();
  }
  onFirstHiddenFocus(event) {
    const focusableEl = event.relatedTarget === this.focusInputViewChild?.nativeElement ? DomHandler.getFirstFocusableElement(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInputViewChild?.nativeElement;
    DomHandler.focus(focusableEl);
  }
  onInputFocus(event) {
    this.focused = true;
    const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
    this.focusedOptionIndex.set(focusedOptionIndex);
    this.overlayVisible && this.scrollInView(this.focusedOptionIndex());
    this.onFocus.emit({
      originalEvent: event
    });
  }
  onInputBlur(event) {
    this.focused = false;
    this.onBlur.emit({
      originalEvent: event
    });
    if (!this.preventModelTouched) {
      this.onModelTouched();
    }
    this.preventModelTouched = false;
  }
  onFilterInputChange(event) {
    let value = event.target.value;
    this._filterValue.set(value);
    this.focusedOptionIndex.set(-1);
    this.onFilter.emit({
      originalEvent: event,
      filter: this._filterValue()
    });
    !this.virtualScrollerDisabled && this.scroller.scrollToIndex(0);
  }
  onLastHiddenFocus(event) {
    const focusableEl = event.relatedTarget === this.focusInputViewChild?.nativeElement ? DomHandler.getLastFocusableElement(this.overlayViewChild?.overlayViewChild?.nativeElement, ':not([data-p-hidden-focusable="true"])') : this.focusInputViewChild?.nativeElement;
    DomHandler.focus(focusableEl);
  }
  onOptionMouseEnter(event, index) {
    if (this.focusOnHover) {
      this.changeFocusedOptionIndex(event, index);
    }
  }
  onHeaderCheckboxKeyDown(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    switch (event.code) {
      case "Space":
        this.onToggleAll(event);
        break;
      case "Enter":
        this.onToggleAll(event);
        break;
      default:
        break;
    }
  }
  onFilterBlur(event) {
    this.focusedOptionIndex.set(-1);
  }
  onHeaderCheckboxFocus() {
    this.headerCheckboxFocus = true;
  }
  onHeaderCheckboxBlur() {
    this.headerCheckboxFocus = false;
  }
  onToggleAll(event) {
    if (this.disabled || this.readonly) {
      return;
    }
    if (this.selectAll != null) {
      this.onSelectAllChange.emit({
        originalEvent: event,
        checked: !this.allSelected()
      });
    } else {
      const value = this.allSelected() ? [] : this.visibleOptions().filter((option) => this.isValidOption(option)).map((option) => this.getOptionValue(option));
      this.updateModel(value, event);
    }
    DomHandler.focus(this.headerCheckboxViewChild.nativeElement);
    this.headerCheckboxFocus = true;
    event.preventDefault();
    event.stopPropagation();
  }
  changeFocusedOptionIndex(event, index) {
    if (this.focusedOptionIndex() !== index) {
      this.focusedOptionIndex.set(index);
      this.scrollInView();
    }
  }
  get virtualScrollerDisabled() {
    return !this.virtualScroll;
  }
  scrollInView(index = -1) {
    const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
    if (this.itemsViewChild && this.itemsViewChild.nativeElement) {
      const element = DomHandler.findSingle(this.itemsViewChild.nativeElement, `li[id="${id}"]`);
      if (element) {
        element.scrollIntoView && element.scrollIntoView({
          block: "nearest",
          inline: "nearest"
        });
      } else if (!this.virtualScrollerDisabled) {
        setTimeout(() => {
          this.virtualScroll && this.scroller?.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex());
        }, 0);
      }
    }
  }
  get focusedOptionId() {
    return this.focusedOptionIndex() !== -1 ? `${this.id}_${this.focusedOptionIndex()}` : null;
  }
  writeValue(value) {
    this.value = value;
    this.modelValue.set(this.value);
    this.cd.markForCheck();
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onModelTouched = fn;
  }
  setDisabledState(val) {
    this.disabled = val;
    this.cd.markForCheck();
  }
  allSelected() {
    return this.selectAll !== null ? this.selectAll : ObjectUtils.isNotEmpty(this.visibleOptions()) && this.visibleOptions().every((option) => this.isOptionGroup(option) || this.isOptionDisabled(option) || this.isSelected(option));
  }
  /**
   * Displays the panel.
   * @group Method
   */
  show(isFocus) {
    this.overlayVisible = true;
    const focusedOptionIndex = this.focusedOptionIndex() !== -1 ? this.focusedOptionIndex() : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
    this.focusedOptionIndex.set(focusedOptionIndex);
    if (isFocus) {
      DomHandler.focus(this.focusInputViewChild?.nativeElement);
    }
    this.cd.markForCheck();
  }
  /**
   * Hides the panel.
   * @group Method
   */
  hide(isFocus) {
    this.overlayVisible = false;
    this.focusedOptionIndex.set(-1);
    if (this.filter && this.resetFilterOnHide) {
      this.resetFilter();
    }
    isFocus && DomHandler.focus(this.focusInputViewChild?.nativeElement);
    this.onPanelHide.emit();
    this.cd.markForCheck();
  }
  onOverlayAnimationStart(event) {
    switch (event.toState) {
      case "visible":
        this.itemsWrapper = DomHandler.findSingle(this.overlayViewChild?.overlayViewChild?.nativeElement, this.virtualScroll ? ".p-scroller" : ".p-multiselect-items-wrapper");
        this.virtualScroll && this.scroller?.setContentEl(this.itemsViewChild?.nativeElement);
        if (this._options() && this._options().length) {
          if (this.virtualScroll) {
            const selectedIndex = ObjectUtils.isNotEmpty(this.modelValue()) ? this.focusedOptionIndex() : -1;
            if (selectedIndex !== -1) {
              this.scroller?.scrollToIndex(selectedIndex);
            }
          } else {
            let selectedListItem = DomHandler.findSingle(this.itemsWrapper, ".p-multiselect-item.p-highlight");
            if (selectedListItem) {
              selectedListItem.scrollIntoView({
                block: "nearest",
                inline: "nearest"
              });
            }
          }
        }
        if (this.filterInputChild && this.filterInputChild.nativeElement) {
          this.preventModelTouched = true;
          if (this.autofocusFilter) {
            this.filterInputChild.nativeElement.focus();
          }
        }
        this.onPanelShow.emit();
      case "void":
        this.itemsWrapper = null;
        this.onModelTouched();
        break;
    }
  }
  resetFilter() {
    if (this.filterInputChild && this.filterInputChild.nativeElement) {
      this.filterInputChild.nativeElement.value = "";
    }
    this._filterValue.set(null);
    this._filteredOptions = null;
  }
  close(event) {
    this.hide();
    event.preventDefault();
    event.stopPropagation();
  }
  clear(event) {
    this.value = null;
    this.updateModel(null, event);
    this.selectedOptions = null;
    this.onClear.emit();
    event.stopPropagation();
  }
  removeOption(optionValue, event) {
    let value = this.modelValue().filter((val) => !ObjectUtils.equals(val, optionValue, this.equalityKey()));
    this.updateModel(value, event);
    this.onChange.emit({
      originalEvent: event,
      value,
      itemValue: optionValue
    });
    event && event.stopPropagation();
  }
  findNextItem(item) {
    let nextItem = item.nextElementSibling;
    if (nextItem)
      return DomHandler.hasClass(nextItem.children[0], "p-disabled") || DomHandler.isHidden(nextItem.children[0]) || DomHandler.hasClass(nextItem, "p-multiselect-item-group") ? this.findNextItem(nextItem) : nextItem.children[0];
    else
      return null;
  }
  findPrevItem(item) {
    let prevItem = item.previousElementSibling;
    if (prevItem)
      return DomHandler.hasClass(prevItem.children[0], "p-disabled") || DomHandler.isHidden(prevItem.children[0]) || DomHandler.hasClass(prevItem, "p-multiselect-item-group") ? this.findPrevItem(prevItem) : prevItem.children[0];
    else
      return null;
  }
  findNextOptionIndex(index) {
    const matchedOptionIndex = index < this.visibleOptions().length - 1 ? this.visibleOptions().slice(index + 1).findIndex((option) => this.isValidOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
  }
  findPrevOptionIndex(index) {
    const matchedOptionIndex = index > 0 ? ObjectUtils.findLastIndex(this.visibleOptions().slice(0, index), (option) => this.isValidOption(option)) : -1;
    return matchedOptionIndex > -1 ? matchedOptionIndex : index;
  }
  findLastSelectedOptionIndex() {
    return this.hasSelectedOption() ? ObjectUtils.findLastIndex(this.visibleOptions(), (option) => this.isValidSelectedOption(option)) : -1;
  }
  findLastFocusedOptionIndex() {
    const selectedIndex = this.findLastSelectedOptionIndex();
    return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
  }
  findLastOptionIndex() {
    return ObjectUtils.findLastIndex(this.visibleOptions(), (option) => this.isValidOption(option));
  }
  searchOptions(event, char) {
    this.searchValue = (this.searchValue || "") + char;
    let optionIndex = -1;
    let matched = false;
    if (this.focusedOptionIndex() !== -1) {
      optionIndex = this.visibleOptions().slice(this.focusedOptionIndex()).findIndex((option) => this.isOptionMatched(option));
      optionIndex = optionIndex === -1 ? this.visibleOptions().slice(0, this.focusedOptionIndex()).findIndex((option) => this.isOptionMatched(option)) : optionIndex + this.focusedOptionIndex();
    } else {
      optionIndex = this.visibleOptions().findIndex((option) => this.isOptionMatched(option));
    }
    if (optionIndex !== -1) {
      matched = true;
    }
    if (optionIndex === -1 && this.focusedOptionIndex() === -1) {
      optionIndex = this.findFirstFocusedOptionIndex();
    }
    if (optionIndex !== -1) {
      this.changeFocusedOptionIndex(event, optionIndex);
    }
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.searchValue = "";
      this.searchTimeout = null;
    }, 500);
    return matched;
  }
  activateFilter() {
    if (this.hasFilter() && this._options) {
      if (this.group) {
        let filteredGroups = [];
        for (let optgroup of this.options) {
          let filteredSubOptions = this.filterService.filter(this.getOptionGroupChildren(optgroup), this.searchFields(), this.filterValue, this.filterMatchMode, this.filterLocale);
          if (filteredSubOptions && filteredSubOptions.length) {
            filteredGroups.push(__spreadValues(__spreadValues({}, optgroup), {
              [this.optionGroupChildren]: filteredSubOptions
            }));
          }
        }
        this._filteredOptions = filteredGroups;
      } else {
        this._filteredOptions = this.filterService.filter(this.options, this.searchFields(), this.filterValue, this.filterMatchMode, this.filterLocale);
      }
    } else {
      this._filteredOptions = null;
    }
  }
  hasFocusableElements() {
    return DomHandler.getFocusableElements(this.overlayViewChild.overlayViewChild.nativeElement, ':not([data-p-hidden-focusable="true"])').length > 0;
  }
  hasFilter() {
    return this._filterValue() && this._filterValue().trim().length > 0;
  }
  static ɵfac = function MultiSelect_Factory(t) {
    return new (t || _MultiSelect)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(FilterService), ɵɵdirectiveInject(PrimeNGConfig), ɵɵdirectiveInject(OverlayService));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MultiSelect,
    selectors: [["p-multiSelect"]],
    contentQueries: function MultiSelect_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, Footer, 5);
        ɵɵcontentQuery(dirIndex, Header, 5);
        ɵɵcontentQuery(dirIndex, PrimeTemplate, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.footerFacet = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerFacet = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.templates = _t);
      }
    },
    viewQuery: function MultiSelect_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c4, 5);
        ɵɵviewQuery(_c5, 5);
        ɵɵviewQuery(_c6, 5);
        ɵɵviewQuery(_c7, 5);
        ɵɵviewQuery(_c8, 5);
        ɵɵviewQuery(_c9, 5);
        ɵɵviewQuery(_c10, 5);
        ɵɵviewQuery(_c11, 5);
        ɵɵviewQuery(_c12, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.containerViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.overlayViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.filterInputChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.focusInputViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemsViewChild = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.scroller = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.lastHiddenFocusableElementOnOverlay = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.firstHiddenFocusableElementOnOverlay = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerCheckboxViewChild = _t.first);
      }
    },
    hostAttrs: [1, "p-element", "p-inputwrapper"],
    hostVars: 4,
    hostBindings: function MultiSelect_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("p-inputwrapper-focus", ctx.focused || ctx.overlayVisible)("p-inputwrapper-filled", ctx.filled);
      }
    },
    inputs: {
      id: "id",
      ariaLabel: "ariaLabel",
      style: "style",
      styleClass: "styleClass",
      panelStyle: "panelStyle",
      panelStyleClass: "panelStyleClass",
      inputId: "inputId",
      disabled: "disabled",
      readonly: "readonly",
      group: "group",
      filter: "filter",
      filterPlaceHolder: "filterPlaceHolder",
      filterLocale: "filterLocale",
      overlayVisible: "overlayVisible",
      tabindex: "tabindex",
      appendTo: "appendTo",
      dataKey: "dataKey",
      name: "name",
      ariaLabelledBy: "ariaLabelledBy",
      displaySelectedLabel: "displaySelectedLabel",
      maxSelectedLabels: "maxSelectedLabels",
      selectionLimit: "selectionLimit",
      selectedItemsLabel: "selectedItemsLabel",
      showToggleAll: "showToggleAll",
      emptyFilterMessage: "emptyFilterMessage",
      emptyMessage: "emptyMessage",
      resetFilterOnHide: "resetFilterOnHide",
      dropdownIcon: "dropdownIcon",
      optionLabel: "optionLabel",
      optionValue: "optionValue",
      optionDisabled: "optionDisabled",
      optionGroupLabel: "optionGroupLabel",
      optionGroupChildren: "optionGroupChildren",
      showHeader: "showHeader",
      filterBy: "filterBy",
      scrollHeight: "scrollHeight",
      lazy: "lazy",
      virtualScroll: "virtualScroll",
      virtualScrollItemSize: "virtualScrollItemSize",
      virtualScrollOptions: "virtualScrollOptions",
      overlayOptions: "overlayOptions",
      ariaFilterLabel: "ariaFilterLabel",
      filterMatchMode: "filterMatchMode",
      tooltip: "tooltip",
      tooltipPosition: "tooltipPosition",
      tooltipPositionStyle: "tooltipPositionStyle",
      tooltipStyleClass: "tooltipStyleClass",
      autofocusFilter: "autofocusFilter",
      display: "display",
      autocomplete: "autocomplete",
      showClear: "showClear",
      autoZIndex: "autoZIndex",
      baseZIndex: "baseZIndex",
      showTransitionOptions: "showTransitionOptions",
      hideTransitionOptions: "hideTransitionOptions",
      defaultLabel: "defaultLabel",
      placeholder: "placeholder",
      options: "options",
      filterValue: "filterValue",
      itemSize: "itemSize",
      selectAll: "selectAll",
      focusOnHover: "focusOnHover",
      filterFields: "filterFields",
      selectOnFocus: "selectOnFocus",
      autoOptionFocus: "autoOptionFocus"
    },
    outputs: {
      onChange: "onChange",
      onFilter: "onFilter",
      onFocus: "onFocus",
      onBlur: "onBlur",
      onClick: "onClick",
      onClear: "onClear",
      onPanelShow: "onPanelShow",
      onPanelHide: "onPanelHide",
      onLazyLoad: "onLazyLoad",
      onRemove: "onRemove",
      onSelectAllChange: "onSelectAllChange"
    },
    features: [ɵɵProvidersFeature([MULTISELECT_VALUE_ACCESSOR])],
    ngContentSelectors: _c20,
    decls: 16,
    vars: 41,
    consts: [[3, "ngClass", "ngStyle", "click"], ["container", ""], [1, "p-hidden-accessible"], ["role", "combobox", 3, "pTooltip", "tooltipPosition", "positionStyle", "tooltipStyleClass", "focus", "blur", "keydown"], ["focusInput", ""], [1, "p-multiselect-label-container", 3, "pTooltip", "tooltipPosition", "positionStyle", "tooltipStyleClass"], [3, "ngClass"], [4, "ngIf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "p-multiselect-trigger"], ["class", "p-multiselect-trigger-icon", 4, "ngIf"], [3, "visible", "options", "target", "appendTo", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "visibleChange", "onAnimationStart", "onHide"], ["overlay", ""], ["pTemplate", "content"], ["class", "p-multiselect-token", 4, "ngFor", "ngForOf"], [1, "p-multiselect-token"], ["token", ""], [1, "p-multiselect-token-label"], [3, "styleClass", "click", 4, "ngIf"], ["class", "p-multiselect-token-icon", 3, "click", 4, "ngIf"], [3, "styleClass", "click"], [1, "p-multiselect-token-icon", 3, "click"], [4, "ngTemplateOutlet"], ["class", "p-multiselect-clear-icon", 3, "click", 4, "ngIf"], [1, "p-multiselect-clear-icon", 3, "click"], ["class", "p-multiselect-trigger-icon", 3, "ngClass", 4, "ngIf"], [3, "styleClass", 4, "ngIf"], [1, "p-multiselect-trigger-icon", 3, "ngClass"], [3, "styleClass"], [1, "p-multiselect-trigger-icon"], [3, "ngClass", "ngStyle"], ["role", "presentation", 1, "p-hidden-accessible", "p-hidden-focusable", 3, "focus"], ["firstHiddenFocusableEl", ""], ["class", "p-multiselect-header", 4, "ngIf"], [1, "p-multiselect-items-wrapper"], [3, "items", "style", "itemSize", "autoSize", "tabindex", "lazy", "options", "onLazyLoad", 4, "ngIf"], ["buildInItems", ""], ["class", "p-multiselect-footer", 4, "ngIf"], ["lastHiddenFocusableEl", ""], [1, "p-multiselect-header"], [4, "ngIf", "ngIfElse"], ["builtInFilterElement", ""], ["class", "p-checkbox p-component", 3, "ngClass", "click", "keydown", 4, "ngIf"], ["class", "p-multiselect-filter-container", 4, "ngIf"], ["type", "button", "pRipple", "", 1, "p-multiselect-close", "p-link", "p-button-icon-only", 3, "click"], ["class", "p-multiselect-close-icon", 4, "ngIf"], [1, "p-checkbox", "p-component", 3, "ngClass", "click", "keydown"], ["type", "checkbox", 3, "readonly", "disabled", "focus", "blur"], ["headerCheckbox", ""], ["role", "checkbox", 1, "p-checkbox-box", 3, "ngClass"], ["class", "p-checkbox-icon", 4, "ngIf"], [1, "p-checkbox-icon"], [1, "p-multiselect-filter-container"], ["type", "text", "role", "searchbox", 1, "p-multiselect-filter", "p-inputtext", "p-component", 3, "value", "disabled", "input", "keydown", "click", "blur"], ["filterInput", ""], ["class", "p-multiselect-filter-icon", 4, "ngIf"], [1, "p-multiselect-filter-icon"], [1, "p-multiselect-close-icon"], [3, "items", "itemSize", "autoSize", "tabindex", "lazy", "options", "onLazyLoad"], ["scroller", ""], ["pTemplate", "loader"], ["role", "listbox", "aria-multiselectable", "true", 1, "p-multiselect-items", "p-component", 3, "ngClass"], ["items", ""], ["ngFor", "", 3, "ngForOf"], ["class", "p-multiselect-empty-message", 3, "ngStyle", 4, "ngIf"], ["role", "option", 1, "p-multiselect-item-group", 3, "ngStyle"], [3, "id", "option", "selected", "label", "disabled", "template", "checkIconTemplate", "itemSize", "focused", "ariaPosInset", "ariaSetSize", "onClick", "onMouseEnter"], [1, "p-multiselect-empty-message", 3, "ngStyle"], ["emptyFilter", ""], ["empty", ""], [1, "p-multiselect-footer"]],
    template: function MultiSelect_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c18);
        ɵɵelementStart(0, "div", 0, 1);
        ɵɵlistener("click", function MultiSelect_Template_div_click_0_listener($event) {
          return ctx.onContainerClick($event);
        });
        ɵɵelementStart(2, "div", 2)(3, "input", 3, 4);
        ɵɵlistener("focus", function MultiSelect_Template_input_focus_3_listener($event) {
          return ctx.onInputFocus($event);
        })("blur", function MultiSelect_Template_input_blur_3_listener($event) {
          return ctx.onInputBlur($event);
        })("keydown", function MultiSelect_Template_input_keydown_3_listener($event) {
          return ctx.onKeyDown($event);
        });
        ɵɵelementEnd()();
        ɵɵelementStart(5, "div", 5)(6, "div", 6);
        ɵɵtemplate(7, MultiSelect_ng_container_7_Template, 3, 2, "ng-container", 7)(8, MultiSelect_ng_container_8_Template, 1, 0, "ng-container", 8);
        ɵɵelementEnd();
        ɵɵtemplate(9, MultiSelect_ng_container_9_Template, 3, 2, "ng-container", 7);
        ɵɵelementEnd();
        ɵɵelementStart(10, "div", 9);
        ɵɵtemplate(11, MultiSelect_ng_container_11_Template, 3, 2, "ng-container", 7)(12, MultiSelect_span_12_Template, 2, 3, "span", 10);
        ɵɵelementEnd();
        ɵɵelementStart(13, "p-overlay", 11, 12);
        ɵɵlistener("visibleChange", function MultiSelect_Template_p_overlay_visibleChange_13_listener($event) {
          return ctx.overlayVisible = $event;
        })("onAnimationStart", function MultiSelect_Template_p_overlay_onAnimationStart_13_listener($event) {
          return ctx.onOverlayAnimationStart($event);
        })("onHide", function MultiSelect_Template_p_overlay_onHide_13_listener() {
          return ctx.hide();
        });
        ɵɵtemplate(15, MultiSelect_ng_template_15_Template, 12, 18, "ng-template", 13);
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.styleClass);
        ɵɵproperty("ngClass", ctx.containerClass)("ngStyle", ctx.style);
        ɵɵattribute("id", ctx.id);
        ɵɵadvance(2);
        ɵɵattribute("data-p-hidden-accessible", true);
        ɵɵadvance(1);
        ɵɵproperty("pTooltip", ctx.tooltip)("tooltipPosition", ctx.tooltipPosition)("positionStyle", ctx.tooltipPositionStyle)("tooltipStyleClass", ctx.tooltipStyleClass);
        ɵɵattribute("aria-disabled", ctx.disabled)("id", ctx.inputId)("aria-label", ctx.ariaLabel)("aria-labelledby", ctx.ariaLabelledBy)("aria-haspopup", "listbox")("aria-expanded", ctx.overlayVisible)("aria-controls", ctx.id + "_list")("tabindex", !ctx.disabled ? ctx.tabindex : -1)("aria-activedescendant", ctx.focused ? ctx.focusedOptionId : void 0);
        ɵɵadvance(2);
        ɵɵproperty("pTooltip", ctx.tooltip)("tooltipPosition", ctx.tooltipPosition)("positionStyle", ctx.tooltipPositionStyle)("tooltipStyleClass", ctx.tooltipStyleClass);
        ɵɵadvance(1);
        ɵɵproperty("ngClass", ctx.labelClass);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", !ctx.selectedItemsTemplate);
        ɵɵadvance(1);
        ɵɵproperty("ngTemplateOutlet", ctx.selectedItemsTemplate)("ngTemplateOutletContext", ɵɵpureFunction2(38, _c19, ctx.selectedOptions, ctx.removeOption.bind(ctx)));
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.isVisibleClearIcon);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", !ctx.dropdownIconTemplate);
        ɵɵadvance(1);
        ɵɵproperty("ngIf", ctx.dropdownIconTemplate);
        ɵɵadvance(1);
        ɵɵproperty("visible", ctx.overlayVisible)("options", ctx.overlayOptions)("target", "@parent")("appendTo", ctx.appendTo)("autoZIndex", ctx.autoZIndex)("baseZIndex", ctx.baseZIndex)("showTransitionOptions", ctx.showTransitionOptions)("hideTransitionOptions", ctx.hideTransitionOptions);
      }
    },
    dependencies: () => [NgClass, NgForOf, NgIf, NgTemplateOutlet, NgStyle, Overlay, PrimeTemplate, Tooltip, Ripple, Scroller, CheckIcon, SearchIcon, TimesCircleIcon, TimesIcon, ChevronDownIcon, MultiSelectItem],
    styles: ["@layer primeng{.p-multiselect{display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;user-select:none}.p-multiselect-trigger{display:flex;align-items:center;justify-content:center;flex-shrink:0}.p-multiselect-label-container{overflow:hidden;flex:1 1 auto;cursor:pointer;display:flex}.p-multiselect-label{display:block;white-space:nowrap;cursor:pointer;overflow:hidden;text-overflow:ellipsis}.p-multiselect-label-empty{overflow:hidden;visibility:hidden}.p-multiselect-token{cursor:default;display:inline-flex;align-items:center;flex:0 0 auto}.p-multiselect-token-icon{cursor:pointer}.p-multiselect-token-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100px}.p-multiselect-items-wrapper{overflow:auto}.p-multiselect-items{margin:0;padding:0;list-style-type:none}.p-multiselect-item{cursor:pointer;display:flex;align-items:center;font-weight:400;white-space:nowrap;position:relative;overflow:hidden}.p-multiselect-header{display:flex;align-items:center;justify-content:space-between}.p-multiselect-filter-container{position:relative;flex:1 1 auto}.p-multiselect-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-multiselect-filter-container .p-inputtext{width:100%}.p-multiselect-close{display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;position:relative}.p-fluid .p-multiselect{display:flex}.p-multiselect-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-multiselect-clearable{position:relative}}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MultiSelect, [{
    type: Component,
    args: [{
      selector: "p-multiSelect",
      template: `
        <div #container [attr.id]="id" [ngClass]="containerClass" [ngStyle]="style" [class]="styleClass" (click)="onContainerClick($event)">
            <div class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                <input
                    #focusInput
                    [pTooltip]="tooltip"
                    [tooltipPosition]="tooltipPosition"
                    [positionStyle]="tooltipPositionStyle"
                    [tooltipStyleClass]="tooltipStyleClass"
                    [attr.aria-disabled]="disabled"
                    [attr.id]="inputId"
                    role="combobox"
                    [attr.aria-label]="ariaLabel"
                    [attr.aria-labelledby]="ariaLabelledBy"
                    [attr.aria-haspopup]="'listbox'"
                    [attr.aria-expanded]="overlayVisible"
                    [attr.aria-controls]="id + '_list'"
                    [attr.tabindex]="!disabled ? tabindex : -1"
                    [attr.aria-activedescendant]="focused ? focusedOptionId : undefined"
                    (focus)="onInputFocus($event)"
                    (blur)="onInputBlur($event)"
                    (keydown)="onKeyDown($event)"
                />
            </div>
            <div class="p-multiselect-label-container" [pTooltip]="tooltip" [tooltipPosition]="tooltipPosition" [positionStyle]="tooltipPositionStyle" [tooltipStyleClass]="tooltipStyleClass">
                <div [ngClass]="labelClass">
                    <ng-container *ngIf="!selectedItemsTemplate">
                        <ng-container *ngIf="display === 'comma'">{{ label() || 'empty' }}</ng-container>
                        <ng-container *ngIf="display === 'chip'">
                            <div #token *ngFor="let item of chipSelectedItems(); let i = index" class="p-multiselect-token">
                                <span class="p-multiselect-token-label">{{ getLabelByValue(item) }}</span>
                                <ng-container *ngIf="!disabled">
                                    <TimesCircleIcon *ngIf="!removeTokenIconTemplate" [styleClass]="'p-multiselect-token-icon'" (click)="removeOption(item, event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true" />
                                    <span *ngIf="removeTokenIconTemplate" class="p-multiselect-token-icon" (click)="removeOption(item, event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true">
                                        <ng-container *ngTemplateOutlet="removeTokenIconTemplate"></ng-container>
                                    </span>
                                </ng-container>
                            </div>
                            <ng-container *ngIf="!modelValue() || modelValue().length === 0">{{ placeholder() || defaultLabel || 'empty' }}</ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-container *ngTemplateOutlet="selectedItemsTemplate; context: { $implicit: selectedOptions, removeChip: removeOption.bind(this) }"></ng-container>
                </div>
                <ng-container *ngIf="isVisibleClearIcon">
                    <TimesIcon *ngIf="!clearIconTemplate" [styleClass]="'p-multiselect-clear-icon'" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true" />
                    <span *ngIf="clearIconTemplate" class="p-multiselect-clear-icon" (click)="clear($event)" [attr.data-pc-section]="'clearicon'" [attr.aria-hidden]="true">
                        <ng-template *ngTemplateOutlet="clearIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <div class="p-multiselect-trigger">
                <ng-container *ngIf="!dropdownIconTemplate">
                    <span *ngIf="dropdownIcon" class="p-multiselect-trigger-icon" [ngClass]="dropdownIcon" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true"></span>
                    <ChevronDownIcon *ngIf="!dropdownIcon" [styleClass]="'p-multiselect-trigger-icon'" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true" />
                </ng-container>
                <span *ngIf="dropdownIconTemplate" class="p-multiselect-trigger-icon" [attr.data-pc-section]="'triggericon'" [attr.aria-hidden]="true">
                    <ng-template *ngTemplateOutlet="dropdownIconTemplate"></ng-template>
                </span>
            </div>
            <p-overlay
                #overlay
                [(visible)]="overlayVisible"
                [options]="overlayOptions"
                [target]="'@parent'"
                [appendTo]="appendTo"
                [autoZIndex]="autoZIndex"
                [baseZIndex]="baseZIndex"
                [showTransitionOptions]="showTransitionOptions"
                [hideTransitionOptions]="hideTransitionOptions"
                (onAnimationStart)="onOverlayAnimationStart($event)"
                (onHide)="hide()"
            >
                <ng-template pTemplate="content">
                    <div [ngClass]="'p-multiselect-panel p-component'" [ngStyle]="panelStyle" [class]="panelStyleClass">
                        <span
                            #firstHiddenFocusableEl
                            role="presentation"
                            [attr.aria-hidden]="'true'"
                            class="p-hidden-accessible p-hidden-focusable"
                            [attr.tabindex]="0"
                            (focus)="onFirstHiddenFocus($event)"
                            [attr.data-p-hidden-accessible]="true"
                            [attr.data-p-hidden-focusable]="true"
                        >
                        </span>
                        <div class="p-multiselect-header" *ngIf="showHeader">
                            <ng-content select="p-header"></ng-content>
                            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                            <ng-container *ngIf="filterTemplate; else builtInFilterElement">
                                <ng-container *ngTemplateOutlet="filterTemplate; context: { options: filterOptions }"></ng-container>
                            </ng-container>
                            <ng-template #builtInFilterElement>
                                <div
                                    class="p-checkbox p-component"
                                    *ngIf="showToggleAll && !selectionLimit"
                                    [ngClass]="{ 'p-checkbox-disabled': disabled || toggleAllDisabled }"
                                    (click)="onToggleAll($event)"
                                    (keydown)="onHeaderCheckboxKeyDown($event)"
                                >
                                    <div class="p-hidden-accessible" [attr.data-p-hidden-accessible]="true">
                                        <input
                                            #headerCheckbox
                                            type="checkbox"
                                            [readonly]="readonly"
                                            [attr.checked]="allSelected()"
                                            (focus)="onHeaderCheckboxFocus()"
                                            (blur)="onHeaderCheckboxBlur()"
                                            [disabled]="disabled || toggleAllDisabled"
                                            [attr.aria-label]="toggleAllAriaLabel"
                                        />
                                    </div>
                                    <div class="p-checkbox-box" role="checkbox" [attr.aria-checked]="allSelected()" [ngClass]="{ 'p-highlight': allSelected(), 'p-focus': headerCheckboxFocus, 'p-disabled': disabled || toggleAllDisabled }">
                                        <ng-container *ngIf="allSelected()">
                                            <CheckIcon [styleClass]="'p-checkbox-icon'" *ngIf="!checkIconTemplate" [attr.aria-hidden]="true" />
                                            <span *ngIf="checkIconTemplate" class="p-checkbox-icon" [attr.aria-hidden]="true">
                                                <ng-template *ngTemplateOutlet="checkIconTemplate; context: { $implicit: allSelected() }"></ng-template>
                                            </span>
                                        </ng-container>
                                    </div>
                                </div>
                                <div class="p-multiselect-filter-container" *ngIf="filter">
                                    <input
                                        #filterInput
                                        type="text"
                                        [attr.autocomplete]="autocomplete"
                                        [attr.placeholder]="filterPlaceHolder"
                                        role="searchbox"
                                        [attr.aria-owns]="id + '_list'"
                                        [attr.aria-activedescendant]="focusedOptionId"
                                        [value]="_filterValue() || ''"
                                        (input)="onFilterInputChange($event)"
                                        (keydown)="onFilterKeyDown($event)"
                                        (click)="onInputClick($event)"
                                        (blur)="onFilterBlur($event)"
                                        class="p-multiselect-filter p-inputtext p-component"
                                        [disabled]="disabled"
                                        [attr.placeholder]="filterPlaceHolder"
                                        [attr.aria-label]="ariaFilterLabel"
                                    />
                                    <SearchIcon [styleClass]="'p-multiselect-filter-icon'" *ngIf="!filterIconTemplate" />
                                    <span *ngIf="filterIconTemplate" class="p-multiselect-filter-icon">
                                        <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                                    </span>
                                </div>

                                <button class="p-multiselect-close p-link p-button-icon-only" type="button" (click)="close($event)" pRipple [attr.aria-label]="closeAriaLabel">
                                    <TimesIcon [styleClass]="'p-multiselect-close-icon'" *ngIf="!closeIconTemplate" />
                                    <span *ngIf="closeIconTemplate" class="p-multiselect-close-icon">
                                        <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                                    </span>
                                </button>
                            </ng-template>
                        </div>
                        <div class="p-multiselect-items-wrapper" [style.max-height]="virtualScroll ? 'auto' : scrollHeight || 'auto'">
                            <p-scroller
                                *ngIf="virtualScroll"
                                #scroller
                                [items]="visibleOptions()"
                                [style]="{ height: scrollHeight }"
                                [itemSize]="virtualScrollItemSize || _itemSize"
                                [autoSize]="true"
                                [tabindex]="-1"
                                [lazy]="lazy"
                                (onLazyLoad)="onLazyLoad.emit($event)"
                                [options]="virtualScrollOptions"
                            >
                                <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                                    <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                                </ng-template>
                                <ng-container *ngIf="loaderTemplate">
                                    <ng-template pTemplate="loader" let-scrollerOptions="options">
                                        <ng-container *ngTemplateOutlet="loaderTemplate; context: { options: scrollerOptions }"></ng-container>
                                    </ng-template>
                                </ng-container>
                            </p-scroller>
                            <ng-container *ngIf="!virtualScroll">
                                <ng-container *ngTemplateOutlet="buildInItems; context: { $implicit: visibleOptions(), options: {} }"></ng-container>
                            </ng-container>

                            <ng-template #buildInItems let-items let-scrollerOptions="options">
                                <ul #items class="p-multiselect-items p-component" [ngClass]="scrollerOptions.contentStyleClass" [style]="scrollerOptions.contentStyle" role="listbox" aria-multiselectable="true">
                                    <ng-template ngFor let-option [ngForOf]="items" let-i="index">
                                        <ng-container *ngIf="isOptionGroup(option)">
                                            <li [attr.id]="id + '_' + getOptionIndex(i, scrollerOptions)" class="p-multiselect-item-group" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }" role="option">
                                                <span *ngIf="!groupTemplate">{{ getOptionGroupLabel(option.optionGroup) }}</span>
                                                <ng-container *ngTemplateOutlet="groupTemplate; context: { $implicit: option.optionGroup }"></ng-container>
                                            </li>
                                        </ng-container>
                                        <ng-container *ngIf="!isOptionGroup(option)">
                                            <p-multiSelectItem
                                                [id]="id + '_' + getOptionIndex(i, scrollerOptions)"
                                                [option]="option"
                                                [selected]="isSelected(option)"
                                                [label]="getOptionLabel(option)"
                                                [disabled]="isOptionDisabled(option)"
                                                [template]="itemTemplate"
                                                [checkIconTemplate]="checkIconTemplate"
                                                [itemSize]="scrollerOptions.itemSize"
                                                [focused]="focusedOptionIndex() === getOptionIndex(i, scrollerOptions)"
                                                [ariaPosInset]="getAriaPosInset(getOptionIndex(i, scrollerOptions))"
                                                [ariaSetSize]="ariaSetSize"
                                                (onClick)="onOptionSelect($event, false, getOptionIndex(i, scrollerOptions))"
                                                (onMouseEnter)="onOptionMouseEnter($event, getOptionIndex(i, scrollerOptions))"
                                            ></p-multiSelectItem>
                                        </ng-container>
                                    </ng-template>

                                    <li *ngIf="hasFilter() && isEmpty()" class="p-multiselect-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }">
                                        <ng-container *ngIf="!emptyFilterTemplate && !emptyTemplate; else emptyFilter">
                                            {{ emptyFilterMessageLabel }}
                                        </ng-container>
                                        <ng-container #emptyFilter *ngTemplateOutlet="emptyFilterTemplate || emptyTemplate"></ng-container>
                                    </li>
                                    <li *ngIf="!hasFilter() && isEmpty()" class="p-multiselect-empty-message" [ngStyle]="{ height: scrollerOptions.itemSize + 'px' }">
                                        <ng-container *ngIf="!emptyTemplate; else empty">
                                            {{ emptyMessageLabel }}
                                        </ng-container>
                                        <ng-container #empty *ngTemplateOutlet="emptyTemplate"></ng-container>
                                    </li>
                                </ul>
                            </ng-template>
                        </div>
                        <div class="p-multiselect-footer" *ngIf="footerFacet || footerTemplate">
                            <ng-content select="p-footer"></ng-content>
                            <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                        </div>

                        <span
                            #lastHiddenFocusableEl
                            role="presentation"
                            [attr.aria-hidden]="true"
                            class="p-hidden-accessible p-hidden-focusable"
                            [attr.tabindex]="0"
                            (focus)="onLastHiddenFocus($event)"
                            [attr.data-p-hidden-accessible]="true"
                            [attr.data-p-hidden-focusable]="true"
                        ></span>
                    </div>
                </ng-template>
            </p-overlay>
        </div>
    `,
      host: {
        class: "p-element p-inputwrapper",
        "[class.p-inputwrapper-focus]": "focused || overlayVisible",
        "[class.p-inputwrapper-filled]": "filled"
      },
      providers: [MULTISELECT_VALUE_ACCESSOR],
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      styles: ["@layer primeng{.p-multiselect{display:inline-flex;cursor:pointer;position:relative;-webkit-user-select:none;user-select:none}.p-multiselect-trigger{display:flex;align-items:center;justify-content:center;flex-shrink:0}.p-multiselect-label-container{overflow:hidden;flex:1 1 auto;cursor:pointer;display:flex}.p-multiselect-label{display:block;white-space:nowrap;cursor:pointer;overflow:hidden;text-overflow:ellipsis}.p-multiselect-label-empty{overflow:hidden;visibility:hidden}.p-multiselect-token{cursor:default;display:inline-flex;align-items:center;flex:0 0 auto}.p-multiselect-token-icon{cursor:pointer}.p-multiselect-token-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100px}.p-multiselect-items-wrapper{overflow:auto}.p-multiselect-items{margin:0;padding:0;list-style-type:none}.p-multiselect-item{cursor:pointer;display:flex;align-items:center;font-weight:400;white-space:nowrap;position:relative;overflow:hidden}.p-multiselect-header{display:flex;align-items:center;justify-content:space-between}.p-multiselect-filter-container{position:relative;flex:1 1 auto}.p-multiselect-filter-icon{position:absolute;top:50%;margin-top:-.5rem}.p-multiselect-filter-container .p-inputtext{width:100%}.p-multiselect-close{display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;position:relative}.p-fluid .p-multiselect{display:flex}.p-multiselect-clear-icon{position:absolute;top:50%;margin-top:-.5rem;cursor:pointer}.p-multiselect-clearable{position:relative}}\n"]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: ChangeDetectorRef
  }, {
    type: NgZone
  }, {
    type: FilterService
  }, {
    type: PrimeNGConfig
  }, {
    type: OverlayService
  }], {
    id: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input
    }],
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    panelStyle: [{
      type: Input
    }],
    panelStyleClass: [{
      type: Input
    }],
    inputId: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    readonly: [{
      type: Input
    }],
    group: [{
      type: Input
    }],
    filter: [{
      type: Input
    }],
    filterPlaceHolder: [{
      type: Input
    }],
    filterLocale: [{
      type: Input
    }],
    overlayVisible: [{
      type: Input
    }],
    tabindex: [{
      type: Input
    }],
    appendTo: [{
      type: Input
    }],
    dataKey: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    ariaLabelledBy: [{
      type: Input
    }],
    displaySelectedLabel: [{
      type: Input
    }],
    maxSelectedLabels: [{
      type: Input
    }],
    selectionLimit: [{
      type: Input
    }],
    selectedItemsLabel: [{
      type: Input
    }],
    showToggleAll: [{
      type: Input
    }],
    emptyFilterMessage: [{
      type: Input
    }],
    emptyMessage: [{
      type: Input
    }],
    resetFilterOnHide: [{
      type: Input
    }],
    dropdownIcon: [{
      type: Input
    }],
    optionLabel: [{
      type: Input
    }],
    optionValue: [{
      type: Input
    }],
    optionDisabled: [{
      type: Input
    }],
    optionGroupLabel: [{
      type: Input
    }],
    optionGroupChildren: [{
      type: Input
    }],
    showHeader: [{
      type: Input
    }],
    filterBy: [{
      type: Input
    }],
    scrollHeight: [{
      type: Input
    }],
    lazy: [{
      type: Input
    }],
    virtualScroll: [{
      type: Input
    }],
    virtualScrollItemSize: [{
      type: Input
    }],
    virtualScrollOptions: [{
      type: Input
    }],
    overlayOptions: [{
      type: Input
    }],
    ariaFilterLabel: [{
      type: Input
    }],
    filterMatchMode: [{
      type: Input
    }],
    tooltip: [{
      type: Input
    }],
    tooltipPosition: [{
      type: Input
    }],
    tooltipPositionStyle: [{
      type: Input
    }],
    tooltipStyleClass: [{
      type: Input
    }],
    autofocusFilter: [{
      type: Input
    }],
    display: [{
      type: Input
    }],
    autocomplete: [{
      type: Input
    }],
    showClear: [{
      type: Input
    }],
    autoZIndex: [{
      type: Input
    }],
    baseZIndex: [{
      type: Input
    }],
    showTransitionOptions: [{
      type: Input
    }],
    hideTransitionOptions: [{
      type: Input
    }],
    defaultLabel: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    filterValue: [{
      type: Input
    }],
    itemSize: [{
      type: Input
    }],
    selectAll: [{
      type: Input
    }],
    focusOnHover: [{
      type: Input
    }],
    filterFields: [{
      type: Input
    }],
    selectOnFocus: [{
      type: Input
    }],
    autoOptionFocus: [{
      type: Input
    }],
    onChange: [{
      type: Output
    }],
    onFilter: [{
      type: Output
    }],
    onFocus: [{
      type: Output
    }],
    onBlur: [{
      type: Output
    }],
    onClick: [{
      type: Output
    }],
    onClear: [{
      type: Output
    }],
    onPanelShow: [{
      type: Output
    }],
    onPanelHide: [{
      type: Output
    }],
    onLazyLoad: [{
      type: Output
    }],
    onRemove: [{
      type: Output
    }],
    onSelectAllChange: [{
      type: Output
    }],
    containerViewChild: [{
      type: ViewChild,
      args: ["container"]
    }],
    overlayViewChild: [{
      type: ViewChild,
      args: ["overlay"]
    }],
    filterInputChild: [{
      type: ViewChild,
      args: ["filterInput"]
    }],
    focusInputViewChild: [{
      type: ViewChild,
      args: ["focusInput"]
    }],
    itemsViewChild: [{
      type: ViewChild,
      args: ["items"]
    }],
    scroller: [{
      type: ViewChild,
      args: ["scroller"]
    }],
    lastHiddenFocusableElementOnOverlay: [{
      type: ViewChild,
      args: ["lastHiddenFocusableEl"]
    }],
    firstHiddenFocusableElementOnOverlay: [{
      type: ViewChild,
      args: ["firstHiddenFocusableEl"]
    }],
    headerCheckboxViewChild: [{
      type: ViewChild,
      args: ["headerCheckbox"]
    }],
    footerFacet: [{
      type: ContentChild,
      args: [Footer]
    }],
    headerFacet: [{
      type: ContentChild,
      args: [Header]
    }],
    templates: [{
      type: ContentChildren,
      args: [PrimeTemplate]
    }]
  });
})();
var MultiSelectModule = class _MultiSelectModule {
  static ɵfac = function MultiSelectModule_Factory(t) {
    return new (t || _MultiSelectModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MultiSelectModule,
    declarations: [MultiSelect, MultiSelectItem],
    imports: [CommonModule, OverlayModule, SharedModule, TooltipModule, RippleModule, ScrollerModule, CheckIcon, SearchIcon, TimesCircleIcon, TimesIcon, ChevronDownIcon, CheckIcon],
    exports: [MultiSelect, OverlayModule, SharedModule, ScrollerModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, OverlayModule, SharedModule, TooltipModule, RippleModule, ScrollerModule, CheckIcon, SearchIcon, TimesCircleIcon, TimesIcon, ChevronDownIcon, CheckIcon, OverlayModule, SharedModule, ScrollerModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MultiSelectModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, OverlayModule, SharedModule, TooltipModule, RippleModule, ScrollerModule, CheckIcon, SearchIcon, TimesCircleIcon, TimesIcon, ChevronDownIcon, CheckIcon],
      exports: [MultiSelect, OverlayModule, SharedModule, ScrollerModule],
      declarations: [MultiSelect, MultiSelectItem]
    }]
  }], null, null);
})();
export {
  MULTISELECT_VALUE_ACCESSOR,
  MultiSelect,
  MultiSelectItem,
  MultiSelectModule
};
//# sourceMappingURL=primeng_multiselect.js.map
