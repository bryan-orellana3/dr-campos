/* @ds-bundle: {"format":4,"namespace":"DrDavidCamposDesignSystem_2a5067","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"IconButton","sourcePath":"components/actions/IconButton.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"PulseDivider","sourcePath":"components/display/PulseDivider.jsx"},{"name":"SectionHeading","sourcePath":"components/display/SectionHeading.jsx"},{"name":"StatCard","sourcePath":"components/display/StatCard.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Dialog","sourcePath":"components/overlay/Dialog.jsx"},{"name":"Toast","sourcePath":"components/overlay/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/overlay/Tooltip.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"1dfae269d8ca","components/actions/IconButton.jsx":"f61e6bdce580","components/display/Badge.jsx":"94dc33705308","components/display/Card.jsx":"da93df81f403","components/display/PulseDivider.jsx":"f259774317d5","components/display/SectionHeading.jsx":"ff2534c45de9","components/display/StatCard.jsx":"2dabc3da454e","components/display/Tag.jsx":"7f211aa1a23e","components/forms/Checkbox.jsx":"1323c0d72d16","components/forms/Input.jsx":"cf5ef767ddca","components/forms/Radio.jsx":"aeecd1e101a0","components/forms/Select.jsx":"186d954fa74c","components/forms/Switch.jsx":"72b5f9181b14","components/navigation/Tabs.jsx":"7058fa9d1af9","components/overlay/Dialog.jsx":"f2b4436fab1b","components/overlay/Toast.jsx":"81e18d7e4d73","components/overlay/Tooltip.jsx":"5afb74bfa9ea","ui_kits/website/screens.jsx":"f5c2b403fae0","ui_kits/website/sections.jsx":"0c06e375c17a"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DrDavidCamposDesignSystem_2a5067 = window.DrDavidCamposDesignSystem_2a5067 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Primary action button. Variants: primary | secondary | ghost | onDark. Sizes: sm | md | lg. */
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  icon = null,
  children,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const sizes = {
    sm: {
      padding: '9px 18px',
      fontSize: 13
    },
    md: {
      padding: '13px 26px',
      fontSize: 15
    },
    lg: {
      padding: '16px 34px',
      fontSize: 16
    }
  };
  const variants = {
    primary: {
      background: active ? 'var(--dc-navy-800)' : hover ? 'var(--accent-primary-hover)' : 'var(--accent-primary)',
      color: '#fff',
      border: '1px solid transparent'
    },
    secondary: {
      background: hover ? 'var(--surface-wash)' : 'var(--dc-white)',
      color: 'var(--dc-royal-600)',
      border: '1px solid var(--dc-royal-600)'
    },
    ghost: {
      background: hover ? 'var(--dc-neutral-100)' : 'transparent',
      color: 'var(--dc-royal-600)',
      border: '1px solid transparent'
    },
    onDark: {
      background: active ? 'var(--dc-sky-200)' : hover ? 'var(--dc-sky-300)' : '#fff',
      color: 'var(--dc-navy-800)',
      border: '1px solid transparent'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: onClick,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      font: `700 ${sizes[size].fontSize}px/1 var(--font-display)`,
      letterSpacing: '0.02em',
      borderRadius: 'var(--radius-pill)',
      padding: sizes[size].padding,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      width: fullWidth ? '100%' : undefined,
      transform: active && !disabled ? 'translateY(1px)' : 'none',
      transition: 'background var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out)',
      ...variants[variant],
      ...style
    }
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Circular icon-only button. Variants: solid | outline | ghost. */
function IconButton({
  variant = 'outline',
  size = 'md',
  disabled = false,
  label,
  children,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const px = {
    sm: 32,
    md: 40,
    lg: 48
  }[size];
  const variants = {
    solid: {
      background: hover ? 'var(--accent-primary-hover)' : 'var(--accent-primary)',
      color: '#fff',
      border: '1px solid transparent'
    },
    outline: {
      background: hover ? 'var(--surface-wash)' : 'var(--dc-white)',
      color: 'var(--dc-royal-600)',
      border: '1px solid var(--border-strong)'
    },
    ghost: {
      background: hover ? 'var(--dc-neutral-100)' : 'transparent',
      color: 'var(--dc-royal-600)',
      border: '1px solid transparent'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    onClick: onClick,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: px,
      height: px,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'background var(--duration-fast) var(--ease-out)',
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
/** Small status pill. Tones: brand | neutral | success | warning | danger | pulse. */
function Badge({
  tone = 'brand',
  children,
  style
}) {
  const tones = {
    brand: {
      background: 'var(--surface-wash)',
      color: 'var(--dc-royal-600)'
    },
    neutral: {
      background: 'var(--dc-neutral-100)',
      color: 'var(--dc-neutral-700)'
    },
    success: {
      background: 'rgba(30,138,94,0.12)',
      color: 'var(--dc-success)'
    },
    warning: {
      background: 'rgba(185,126,31,0.12)',
      color: 'var(--dc-warning)'
    },
    danger: {
      background: 'rgba(192,69,62,0.12)',
      color: 'var(--dc-danger)'
    },
    pulse: {
      background: 'rgba(62,205,232,0.15)',
      color: '#1793AD'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 11px/1 var(--font-display)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      borderRadius: 'var(--radius-pill)',
      padding: '6px 12px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      ...tones[tone],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Surface card. Variants: default | wash | dark. Set interactive for hover lift. */
function Card({
  variant = 'default',
  interactive = false,
  padding = 24,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const variants = {
    default: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      color: 'var(--text-body)'
    },
    wash: {
      background: 'var(--surface-wash)',
      border: '1px solid transparent',
      color: 'var(--text-body)'
    },
    dark: {
      background: 'var(--surface-dark)',
      border: '1px solid var(--border-on-dark)',
      color: 'var(--text-on-dark)'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderRadius: 'var(--radius-lg)',
      padding,
      boxShadow: interactive && hover ? 'var(--shadow-md)' : variant === 'wash' ? 'none' : 'var(--shadow-sm)',
      transition: 'box-shadow var(--duration-base) var(--ease-out)',
      cursor: interactive ? 'pointer' : undefined,
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/PulseDivider.jsx
try { (() => {
/** The brand's EKG heartbeat rule — one blip on a thin line. Use as section divider. */
function PulseDivider({
  onDark = false,
  width = '100%',
  align = 'center',
  style
}) {
  const id = React.useId().replace(/:/g, '');
  const blipX = {
    left: 120,
    center: 300,
    right: 480
  }[align];
  const p = blipX;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 640 24",
    fill: "none",
    preserveAspectRatio: "none",
    style: {
      width,
      height: 24,
      display: 'block',
      filter: onDark ? 'drop-shadow(0 0 6px rgba(62,205,232,0.7))' : 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: `M0 12 H${p - 20} L${p - 4} 12 ${p + 4} 3 ${p + 16} 21 ${p + 26} 12 H640`,
    stroke: onDark ? 'var(--dc-pulse-400)' : `url(#${id})`,
    strokeWidth: "2",
    strokeLinejoin: "round",
    strokeLinecap: "round",
    vectorEffect: "non-scaling-stroke"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id,
    x1: "0",
    x2: "640",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    stopColor: "#02325A"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#4FA8E0"
  }))));
}
Object.assign(__ds_scope, { PulseDivider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/PulseDivider.jsx", error: String((e && e.message) || e) }); }

// components/display/SectionHeading.jsx
try { (() => {
/** Eyebrow + display heading + optional lede. Core section-opening pattern. */
function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  onDark = false,
  level = 2,
  style
}) {
  const H = `h${level}`;
  const fonts = {
    1: 'var(--type-h1)',
    2: 'var(--type-h2)',
    3: 'var(--type-h3)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align,
      ...style
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: onDark ? 'var(--dc-pulse-400)' : 'var(--dc-royal-600)'
    }
  }, eyebrow), /*#__PURE__*/React.createElement(H, {
    style: {
      font: fonts[level] || fonts[2],
      letterSpacing: 'var(--tracking-display)',
      color: onDark ? '#fff' : 'var(--text-display)',
      margin: 0
    }
  }, title), lede && /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-lg)',
      color: onDark ? 'var(--text-muted-on-dark)' : 'var(--text-muted)',
      margin: 0,
      maxWidth: '58ch'
    }
  }, lede));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/display/StatCard.jsx
try { (() => {
/** Numeric proof card — value + label (+ optional detail). Evidence-first brand pattern. */
function StatCard({
  value,
  label,
  detail,
  onDark = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 40px/1.05 var(--font-display)',
      letterSpacing: 'var(--tracking-display)',
      background: onDark ? 'none' : 'var(--gradient-wordmark)',
      WebkitBackgroundClip: onDark ? undefined : 'text',
      backgroundClip: onDark ? undefined : 'text',
      color: onDark ? '#fff' : 'transparent'
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 14px/1.3 var(--font-display)',
      color: onDark ? 'var(--dc-sky-300)' : 'var(--text-display)'
    }
  }, label), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: onDark ? 'var(--text-muted-on-dark)' : 'var(--text-muted)'
    }
  }, detail));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
/** Removable/selectable content tag (sentence case, unlike Badge). */
function Tag({
  selected = false,
  onClick,
  onRemove,
  children,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      font: 'var(--type-body-sm)',
      fontWeight: 600,
      color: selected ? '#fff' : 'var(--dc-royal-600)',
      background: selected ? 'var(--accent-primary)' : hover && onClick ? 'var(--surface-wash)' : 'var(--dc-white)',
      border: `1px solid ${selected ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-pill)',
      padding: '7px 14px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'background var(--duration-fast) var(--ease-out)',
      ...style
    }
  }, children, onRemove && /*#__PURE__*/React.createElement("svg", {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    style: {
      width: 12,
      height: 12,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/** Checkbox with label. */
function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 'var(--radius-sm)',
      flex: 'none',
      background: checked ? 'var(--accent-primary)' : 'var(--dc-white)',
      border: `1.5px solid ${checked ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background var(--duration-fast) var(--ease-out)'
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      width: 13,
      height: 13
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0
    }
  }), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text input with label, hint and error states. */
function Input({
  label,
  hint,
  error,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 13px/1.2 var(--font-body)',
      color: 'var(--text-display)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      background: disabled ? 'var(--dc-neutral-100)' : 'var(--dc-white)',
      border: `1px solid ${error ? 'var(--dc-danger)' : focus ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-md)',
      padding: '11px 14px',
      outline: 'none',
      boxShadow: focus ? 'var(--focus-ring)' : 'none',
      transition: 'border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)',
      cursor: disabled ? 'not-allowed' : 'text'
    }
  }, rest)), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--dc-danger)'
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
/** Radio button with label. */
function Radio({
  label,
  checked = false,
  onChange,
  disabled = false,
  name,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      flex: 'none',
      boxSizing: 'border-box',
      background: 'var(--dc-white)',
      border: checked ? '6px solid var(--accent-primary)' : '1.5px solid var(--border-strong)',
      transition: 'border var(--duration-fast) var(--ease-out)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0
    }
  }), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Native select styled to match Input. */
function Select({
  label,
  hint,
  options = [],
  value,
  onChange,
  placeholder,
  disabled = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 13px/1.2 var(--font-body)',
      color: 'var(--text-display)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      font: 'var(--type-body)',
      color: value ? 'var(--text-body)' : 'var(--text-muted)',
      background: disabled ? 'var(--dc-neutral-100)' : 'var(--dc-white)',
      border: `1px solid ${focus ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-md)',
      padding: '11px 38px 11px 14px',
      outline: 'none',
      boxShadow: focus ? 'var(--focus-ring)' : 'none',
      width: '100%',
      appearance: 'none',
      WebkitAppearance: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--dc-neutral-500)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      position: 'absolute',
      right: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-caption)',
      color: 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/** Toggle switch with optional label. */
function Switch({
  label,
  checked = false,
  onChange,
  disabled = false,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 24,
      borderRadius: 'var(--radius-pill)',
      flex: 'none',
      position: 'relative',
      background: checked ? 'var(--accent-primary)' : 'var(--dc-neutral-300)',
      transition: 'background var(--duration-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 19 : 3,
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left var(--duration-base) var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0
    }
  }), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/** Horizontal tabs with animated underline. items: [{id, label}] */
function Tabs({
  items = [],
  activeId,
  onChange,
  onDark = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: `1px solid ${onDark ? 'var(--border-on-dark)' : 'var(--border-subtle)'}`,
      ...style
    }
  }, items.map(it => {
    const active = it.id === activeId;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onChange && onChange(it.id),
      style: {
        font: `${active ? 700 : 500} 15px/1 var(--font-body)`,
        color: active ? onDark ? '#fff' : 'var(--dc-royal-600)' : onDark ? 'var(--text-muted-on-dark)' : 'var(--text-muted)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '12px 16px',
        position: 'relative',
        transition: 'color var(--duration-fast) var(--ease-out)'
      }
    }, it.label, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 12,
        right: 12,
        bottom: -1,
        height: 2,
        borderRadius: 2,
        background: active ? onDark ? 'var(--dc-pulse-400)' : 'var(--accent-primary)' : 'transparent',
        transition: 'background var(--duration-fast) var(--ease-out)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Dialog.jsx
try { (() => {
/** Modal dialog with navy scrim. Controlled via open/onClose. */
function Dialog({
  open = false,
  onClose,
  title,
  children,
  footer,
  width = 480,
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(4,26,48,0.55)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-lg)',
      width,
      maxWidth: '100%',
      maxHeight: '85vh',
      overflow: 'auto',
      padding: 'var(--space-6)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-h3)',
      color: 'var(--text-display)',
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      padding: 4
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    style: {
      width: 18,
      height: 18
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Toast.jsx
try { (() => {
/** Inline toast notification. Tones: info | success | danger. */
function Toast({
  tone = 'info',
  title,
  children,
  onClose,
  style
}) {
  const tones = {
    info: {
      border: 'var(--accent-primary)',
      icon: 'M12 16v-4M12 8h.01',
      color: 'var(--dc-royal-600)'
    },
    success: {
      border: 'var(--dc-success)',
      icon: 'M20 6L9 17l-5-5',
      color: 'var(--dc-success)'
    },
    danger: {
      border: 'var(--dc-danger)',
      icon: 'M18 6L6 18M6 6l12 12',
      color: 'var(--dc-danger)'
    }
  };
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-md)',
      padding: '14px 16px',
      maxWidth: 420,
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: t.color,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      width: 18,
      height: 18,
      flex: 'none',
      marginTop: 2
    }
  }, tone === 'info' && /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: t.icon
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 14px/1.3 var(--font-body)',
      color: 'var(--text-display)'
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, children)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      padding: 2
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    style: {
      width: 14,
      height: 14
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Toast.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Tooltip.jsx
try { (() => {
/** Hover tooltip. Wraps its child; shows navy bubble above. */
function Tooltip({
  text,
  children,
  style
}) {
  const [show, setShow] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }, children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      bottom: 'calc(100% + 8px)',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--dc-navy-800)',
      color: '#fff',
      font: 'var(--type-caption)',
      padding: '7px 12px',
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-md)',
      zIndex: 100,
      pointerEvents: 'none'
    }
  }, text));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Tooltip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/screens.jsx
try { (() => {
// Dr. David Campos — website UI kit: screens + app shell
const DS2 = window.DrDavidCamposDesignSystem_2a5067;
const {
  Button: BBtn,
  Card: CCard,
  Badge: BBadge,
  Input: FInput,
  Select: FSelect,
  Checkbox: FCheck,
  Radio: FRadio,
  Tabs: NTabs,
  Dialog: ODialog,
  Toast: OToast,
  SectionHeading: SHead,
  PulseDivider: PDiv,
  StatCard: SStat
} = DS2;
const wrap2 = window.wrapStyle;
function InicioScreen({
  go
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(window.Hero, {
    go: go
  }), /*#__PURE__*/React.createElement(window.Stats, null), /*#__PURE__*/React.createElement(window.Pilares, null), /*#__PURE__*/React.createElement(window.Mentor, null), /*#__PURE__*/React.createElement(CtaBand, {
    go: go
  }));
}
function CtaBand({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--gradient-hero-dark)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap2,
      padding: '72px 32px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(SHead, {
    onDark: true,
    align: "center",
    eyebrow: "Cupos limitados",
    title: "Tu presencia digital puede ser un sistema",
    lede: "Aplica al programa y recibe una evaluaci\xF3n honesta de tu punto de partida. Respuesta en 48 horas."
  }), /*#__PURE__*/React.createElement(BBtn, {
    variant: "onDark",
    size: "lg",
    onClick: () => go('aplicar')
  }, "Aplicar al programa"), /*#__PURE__*/React.createElement(PDiv, {
    onDark: true,
    width: 320
  })));
}
function MetodoScreen({
  go
}) {
  const [tab, setTab] = React.useState('c1');
  const detail = {
    c1: {
      t: 'Constancia',
      d: 'El pilar que sostiene a los demás: un calendario realista de publicación que sobrevive a semanas de guardias. Incluye la plantilla de rutina semanal del Dr. Campos y los indicadores para ajustarla sin abandonarla.',
      m: ['Plantilla de rutina semanal', 'Calendario de 90 días', 'Indicadores de sostenibilidad']
    },
    c2: {
      t: 'Cercanía',
      d: 'Cómo hablar a cámara "como en una cena familiar" sin perder autoridad científica: guiones de tono, estructura de apertura y errores que rompen la confianza del paciente.',
      m: ['Guía de tono conversacional', 'Estructuras de apertura', 'Checklist de autoridad']
    },
    c3: {
      t: 'Contenido',
      d: 'Los formatos que un médico solo puede producir entre consultas, con evidencia como materia prima. Sin tendencias de baile, sin clickbait.',
      m: ['Biblioteca de formatos probados', 'Banco de ideas clínicas', 'Flujo de grabación en 30 min']
    },
    c4: {
      t: 'Conversión',
      d: 'Convertir audiencia en consulta de forma previsible y ética: llamados a la acción medidos, agenda y seguimiento — sin marketing agresivo.',
      m: ['Embudo consulta-primero', 'Guiones de CTA ético', 'Métricas de conversión']
    }
  }[tab];
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap2,
      padding: '72px 32px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(SHead, {
    eyebrow: "El m\xE9todo",
    level: 1,
    title: "M\xE9todo 4C, pilar por pilar",
    lede: "Cada pilar se entrega con plantillas, m\xE9tricas y la rutina real del Dr. Campos como evidencia."
  }), /*#__PURE__*/React.createElement(NTabs, {
    items: [{
      id: 'c1',
      label: 'Constancia'
    }, {
      id: 'c2',
      label: 'Cercanía'
    }, {
      id: 'c3',
      label: 'Contenido'
    }, {
      id: 'c4',
      label: 'Conversión'
    }],
    activeId: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(CCard, {
    padding: 28
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-h3)',
      color: 'var(--text-display)',
      marginBottom: 10
    }
  }, detail.t), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      margin: 0
    }
  }, detail.d), /*#__PURE__*/React.createElement(PDiv, {
    align: "left",
    width: 240,
    style: {
      margin: '18px 0 0'
    }
  })), /*#__PURE__*/React.createElement(CCard, {
    variant: "wash",
    padding: 28
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--dc-royal-600)',
      marginBottom: 14
    }
  }, "Incluye"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, detail.m.map(x => /*#__PURE__*/React.createElement("li", {
    key: x,
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-body)',
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--dc-blue-500)",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      width: 15,
      height: 15,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })), x)))))), /*#__PURE__*/React.createElement(window.Pilares, {
    compact: true
  }), /*#__PURE__*/React.createElement(CtaBand, {
    go: go
  }));
}
function AplicarScreen() {
  const [form, setForm] = React.useState({
    nombre: '',
    correo: '',
    esp: '',
    tiempo: '1-2',
    acepta: false
  });
  const [confirm, setConfirm] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const set = k => e => setForm({
    ...form,
    [k]: e.target ? e.target.value : e
  });
  const submit = () => {
    if (!form.nombre || !form.correo) {
      setErr(true);
      return;
    }
    setErr(false);
    setConfirm(true);
  };
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap2,
      padding: '72px 32px 88px',
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
      gap: 56,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(SHead, {
    eyebrow: "Aplicaci\xF3n",
    level: 1,
    title: "Aplica al programa",
    lede: "Sin compromiso: evaluamos tu punto de partida y te decimos con honestidad si el m\xE9todo es para ti."
  }), /*#__PURE__*/React.createElement(PDiv, {
    align: "left",
    width: 260
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(SStat, {
    value: "48h",
    label: "Tiempo de respuesta"
  }), /*#__PURE__*/React.createElement(SStat, {
    value: "1:1",
    label: "Evaluaci\xF3n personal",
    detail: "Revisada por el equipo del Dr. Campos"
  }))), /*#__PURE__*/React.createElement(CCard, {
    padding: 32,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(FInput, {
    label: "Nombre completo",
    placeholder: "Dra. Ana Rivas",
    value: form.nombre,
    onChange: set('nombre'),
    error: err && !form.nombre ? 'Campo obligatorio' : undefined
  }), /*#__PURE__*/React.createElement(FInput, {
    label: "Correo profesional",
    placeholder: "dr@clinica.com",
    value: form.correo,
    onChange: set('correo'),
    error: err && !form.correo ? 'Campo obligatorio' : undefined,
    hint: err && form.correo ? undefined : 'Nunca compartimos tu correo.'
  }), /*#__PURE__*/React.createElement(FSelect, {
    label: "Especialidad",
    placeholder: "Selecciona\u2026",
    value: form.esp,
    onChange: set('esp'),
    options: ['Cardiología', 'Dermatología', 'Pediatría', 'Medicina interna', 'Otra']
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 13px/1.2 var(--font-body)',
      color: 'var(--text-display)'
    }
  }, "Tiempo disponible por semana"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(FRadio, {
    name: "t",
    label: "1\u20132 horas",
    checked: form.tiempo === '1-2',
    onChange: () => setForm({
      ...form,
      tiempo: '1-2'
    })
  }), /*#__PURE__*/React.createElement(FRadio, {
    name: "t",
    label: "3\u20135 horas",
    checked: form.tiempo === '3-5',
    onChange: () => setForm({
      ...form,
      tiempo: '3-5'
    })
  }), /*#__PURE__*/React.createElement(FRadio, {
    name: "t",
    label: "M\xE1s de 5",
    checked: form.tiempo === '5+',
    onChange: () => setForm({
      ...form,
      tiempo: '5+'
    })
  }))), /*#__PURE__*/React.createElement(FCheck, {
    label: "Acepto recibir la gu\xEDa semanal del M\xE9todo 4C",
    checked: form.acepta,
    onChange: () => setForm({
      ...form,
      acepta: !form.acepta
    })
  }), /*#__PURE__*/React.createElement(BBtn, {
    size: "lg",
    fullWidth: true,
    onClick: submit
  }, "Enviar aplicaci\xF3n"))), /*#__PURE__*/React.createElement(ODialog, {
    open: confirm,
    onClose: () => setConfirm(false),
    title: "Confirmar aplicaci\xF3n",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BBtn, {
      variant: "ghost",
      onClick: () => setConfirm(false)
    }, "Cancelar"), /*#__PURE__*/React.createElement(BBtn, {
      onClick: () => {
        setConfirm(false);
        setSent(true);
      }
    }, "Enviar"))
  }, "Vamos a enviar tu aplicaci\xF3n como ", /*#__PURE__*/React.createElement("strong", null, form.nombre || '—'), " (", form.correo || '—', "). \xBFConfirmas?"), sent && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 200
    }
  }, /*#__PURE__*/React.createElement(OToast, {
    tone: "success",
    title: "Aplicaci\xF3n enviada",
    onClose: () => setSent(false)
  }, "Te responderemos en 48 horas.")));
}
function App() {
  const [view, setView] = React.useState('inicio');
  const go = v => {
    setView(v);
    window.scrollTo(0, 0);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-page)',
      minHeight: '100vh',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement(window.SiteHeader, {
    view: view,
    go: go
  }), view === 'inicio' && /*#__PURE__*/React.createElement(InicioScreen, {
    go: go
  }), view === 'metodo' && /*#__PURE__*/React.createElement(MetodoScreen, {
    go: go
  }), view === 'aplicar' && /*#__PURE__*/React.createElement(AplicarScreen, null), /*#__PURE__*/React.createElement(window.SiteFooter, {
    go: go
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections.jsx
try { (() => {
// Dr. David Campos — website UI kit: shared sections
// Composes design-system primitives from the compiled bundle.
const DS = window.DrDavidCamposDesignSystem_2a5067;
const {
  Button,
  Badge,
  Card,
  StatCard,
  SectionHeading,
  PulseDivider,
  Tag
} = DS;
const wrap = {
  maxWidth: 'var(--container-max)',
  margin: '0 auto',
  padding: '0 32px'
};
function SiteHeader({
  view,
  go
}) {
  const links = [{
    id: 'inicio',
    label: 'Inicio'
  }, {
    id: 'metodo',
    label: 'El método'
  }, {
    id: 'aplicar',
    label: 'Aplicar'
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: 'rgba(246,248,251,0.92)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 72
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.png",
    alt: "Dr. David Campos",
    style: {
      height: 46,
      cursor: 'pointer'
    },
    onClick: () => go('inicio')
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    onClick: () => go(l.id),
    style: {
      font: `${view === l.id ? 700 : 500} 15px/1 var(--font-body)`,
      color: view === l.id ? 'var(--dc-royal-600)' : 'var(--text-body)',
      padding: '10px 14px',
      cursor: 'pointer',
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
      flex: 'none'
    }
  }, l.label)), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => go('aplicar')
  }, "Aplicar al programa"))));
}
function Hero({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--gradient-hero-dark)',
      color: 'var(--text-on-dark)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/bg-studio-mic.png",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: 0.22
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, rgba(2,39,70,0.92) 0%, rgba(2,39,70,0.55) 65%, rgba(2,39,70,0.35) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      position: 'relative',
      padding: '96px 32px 88px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "pulse",
    style: {
      background: 'rgba(62,205,232,0.16)',
      color: 'var(--dc-pulse-400)'
    }
  }, "M\xE9todo 4C \xB7 para m\xE9dicos"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-hero)',
      letterSpacing: 'var(--tracking-display)',
      margin: 0,
      maxWidth: '15ch',
      color: '#fff'
    }
  }, "Presencia digital previsible. Sin burnout."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-lg)',
      color: 'var(--text-muted-on-dark)',
      margin: 0,
      maxWidth: '52ch'
    }
  }, "El sistema que llev\xF3 al Dr. David Campos a 3.9M de seguidores sin agencias, sin equipo de producci\xF3n y sin abandonar la consulta \u2014 documentado paso a paso para que otros m\xE9dicos lo repitan."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "onDark",
    size: "lg",
    onClick: () => go('aplicar')
  }, "Aplicar al programa"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    style: {
      color: 'var(--dc-sky-300)'
    },
    onClick: () => go('metodo')
  }, "Ver el m\xE9todo")), /*#__PURE__*/React.createElement(PulseDivider, {
    onDark: true,
    align: "left",
    width: 360,
    style: {
      marginTop: 8
    }
  })));
}
function Stats() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      padding: '64px 32px',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    value: "3.9M",
    label: "Seguidores combinados",
    detail: "Sin agencias ni pauta"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "4",
    label: "A\xF1os documentados",
    detail: "Rutina real, verificable"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "4C",
    label: "Pilares del m\xE9todo",
    detail: "Constancia \xB7 Cercan\xEDa \xB7 Contenido \xB7 Conversi\xF3n"
  }), /*#__PURE__*/React.createElement(StatCard, {
    value: "0",
    label: "Horas de consulta sacrificadas",
    detail: "El sistema cabe en la agenda cl\xEDnica"
  }));
}
const PILARES = [{
  n: '1',
  t: 'Constancia',
  d: 'Una rutina de publicación sostenible, diseñada para caber dentro de la agenda clínica. La estrategia es no parar.'
}, {
  n: '2',
  t: 'Cercanía',
  d: 'Hablar como en una cena familiar sin perder autoridad científica. La confianza se construye en el tono.'
}, {
  n: '3',
  t: 'Contenido',
  d: 'Educación médica con evidencia, no tendencias. Formatos probados que un solo médico puede producir.'
}, {
  n: '4',
  t: 'Conversión',
  d: 'De la audiencia a la consulta: pacientes y oportunidades de forma previsible, sin marketing agresivo.'
}];
function Pilares({
  compact = false
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--dc-white)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      padding: '80px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "M\xE9todo 4C",
    title: "Cuatro pilares, cero improvisaci\xF3n",
    lede: compact ? undefined : 'No es un hack. Es una rutina — la misma que el Dr. Campos ejecuta cada semana, transferida con métricas y plantillas.'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 18
    }
  }, PILARES.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.n,
    interactive: true,
    variant: compact ? 'wash' : 'default'
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-wash)',
      color: 'var(--dc-royal-600)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: '800 22px/1 var(--font-display)',
      marginBottom: 14
    }
  }, p.n), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-h4)',
      color: 'var(--text-display)',
      marginBottom: 6
    }
  }, p.t), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-body-sm)',
      color: 'var(--text-muted)'
    }
  }, p.d))))));
}
function Mentor() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...wrap,
      padding: '80px 32px',
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "El mentor",
    title: "M\xE9dico primero. Creador despu\xE9s.",
    level: 2
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body)',
      color: 'var(--text-body)',
      margin: 0,
      maxWidth: '58ch'
    }
  }, "El Dr. David Campos es m\xE9dico boliviano radicado en S\xE3o Paulo. Construy\xF3 su audiencia publicando entre consultas \u2014 sin equipo, sin guiones ajenos. Lo que ense\xF1a es lo que hace: cada afirmaci\xF3n del programa est\xE1 respaldada por su propia rutina documentada."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "Pr\xE1ctica cl\xEDnica activa"), /*#__PURE__*/React.createElement(Tag, null, "Evidencia verificable"), /*#__PURE__*/React.createElement(Tag, null, "Sin agencias")), /*#__PURE__*/React.createElement(PulseDivider, {
    align: "left",
    width: 280
  }), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      font: '600 19px/1.5 var(--font-body)',
      fontStyle: 'italic',
      color: 'var(--text-display)',
      maxWidth: '48ch'
    }
  }, "\"La viralidad no es una estrategia. La constancia s\xED.\"")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/bg-studio-shelf.png",
    alt: "Estudio del Dr. Campos",
    style: {
      width: '100%',
      display: 'block'
    }
  })));
}
function SiteFooter({
  go
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--dc-navy-950)',
      color: 'var(--text-muted-on-dark)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      padding: '48px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 17px/1 var(--font-display)',
      letterSpacing: 'var(--tracking-caps)',
      color: '#fff',
      textTransform: 'uppercase'
    }
  }, "David ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--dc-sky-300)'
    }
  }, "Campos")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 24,
      font: 'var(--type-body-sm)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    style: {
      cursor: 'pointer',
      color: 'inherit'
    },
    onClick: () => go('inicio')
  }, "Inicio"), /*#__PURE__*/React.createElement("a", {
    style: {
      cursor: 'pointer',
      color: 'inherit'
    },
    onClick: () => go('metodo')
  }, "El m\xE9todo"), /*#__PURE__*/React.createElement("a", {
    style: {
      cursor: 'pointer',
      color: 'inherit'
    },
    onClick: () => go('aplicar')
  }, "Aplicar")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-caption)'
    }
  }, "\xA9 2026 Dr. David Campos")));
}
Object.assign(window, {
  SiteHeader,
  Hero,
  Stats,
  Pilares,
  Mentor,
  SiteFooter,
  PILARES,
  wrapStyle: wrap
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.PulseDivider = __ds_scope.PulseDivider;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

})();
