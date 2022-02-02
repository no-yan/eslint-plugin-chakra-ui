import type { Config } from "../rules/props-order";

// priority range: 0~100
const stylePropsPriority = {
  // System
  System: 0,

  // Positioning
  Position: 10,

  // Box Model
  Flexbox: 20,
  "Grid Layout": 21,
  Layout: 22,
  Width: 23,
  Height: 24,
  Margin: 25,
  Padding: 26,

  // Typography
  Color: 30,
  Typography: 31,

  // Visual
  Background: 40,
  Border: 41,
  "Border Radius": 42,

  // Misc
  Shadow: 50,
  Pseudo: 51,
  "Other Style Props": 52,
} as const;
type Priority = typeof stylePropsPriority;
type PriorityKey = keyof Priority;
type PriorityTuple = TuplifyUnion<PriorityKey>;
type PriorityGroup<T extends PriorityKey> = {
  name: T;
  keys: readonly string[];
  priority: Priority[T];
};
type PriorityGroupList<T extends PriorityKey[] = PriorityTuple> = T extends [...infer U, infer Element]
  ? U extends PriorityKey[]
    ? Element extends PriorityKey
      ? [...PriorityGroupList<U>, PriorityGroup<Element>]
      : never
    : never
  : T;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type LastOf<T> = UnionToIntersection<T extends any ? () => T : never> extends () => infer R ? R : never;

// TS4.0+
type Push<T extends any[], V> = [...T, V];

// TS4.1+
type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = true extends N
  ? []
  : Push<TuplifyUnion<Exclude<T, L>>, L>;

const priorityGroups: PriorityGroupList = [
  {
    name: "System",
    keys: ["as", "sx", "layerStyle", "textStyle"],
    priority: stylePropsPriority["System"],
  },
  {
    name: "Margin",
    keys: [
      "m",
      "margin",
      "mt",
      "marginTop",
      "mr",
      "marginRight",
      "me",
      "marginEnd",
      "mb",
      "marginBottom",
      "ml",
      "marginLeft",
      "ms",
      "marginStart",
      "mx",
      "my",
    ],
    priority: stylePropsPriority["Margin"],
  },
  {
    name: "Padding",
    keys: [
      "p",
      "padding",
      "pt",
      "paddingTop",
      "pr",
      "paddingRight",
      "pe",
      "paddingEnd",
      "pb",
      "paddingBotto",
      "pl",
      "paddingLeft",
      "ps",
      "paddingStart",
      "px",
      "py",
    ],
    priority: stylePropsPriority["Padding"],
  },
  {
    name: "Color",
    keys: ["color", "textColor", "fill", "stroke"],
    priority: stylePropsPriority["Color"],
  },
  {
    name: "Typography",
    keys: [
      "fontFamily",
      "fontSize",
      "fontWeight",
      "lineHeight",
      "letterSpacing",
      "textAlign",
      "fontStyle",
      "textTransform",
      "textDecoration",
    ],
    priority: stylePropsPriority["Typography"],
  },
  {
    name: "Width",
    keys: ["w", "width", "minW", "minWidth", "maxW", "maxWidth"],
    priority: stylePropsPriority["Width"],
  },
  {
    name: "Height",
    keys: ["h", "height", "minH", "minHeight", "maxH", "maxHeight"],
    priority: stylePropsPriority["Height"],
  },
  {
    name: "Layout",
    keys: ["d", "display", "boxSize", "verticalAlign", "overflow", "overflowX", "overflowY"],
    priority: stylePropsPriority["Layout"],
  },
  {
    name: "Flexbox",
    keys: [
      "alignItems",
      "align",
      "alignContent",
      "justifyItems",
      "justifyContent",
      "justify",
      "flexWrap",
      "wrap",
      "flexDirection",
      "flexDir",
      "direction",
      "flex",
      "flexGrow",
      "flexShrink",
      "flexBasis",
      "justifySelf",
      "alignSelf",
      "order",
    ],
    priority: stylePropsPriority["Flexbox"],
  },
  {
    name: "Grid Layout",
    keys: [
      "gridGap",
      "gap",
      "gridRowGap",
      "rowGap",
      "gridColumnGap",
      "columnGap",
      "gridColumn",
      "column",
      "gridRow",
      "row",
      "gridArea",
      "area",
      "gridAutoFlow",
      "autoFlow",
      "gridAutoRows",
      "autoRows",
      "gridAutoColumns",
      "autoColumns",
      "gridTemplateRows",
      "templateRows",
      "gridTemplateColumns",
      "templateColumns",
      "gridTemplateAreas",
      "templateAreas",
    ],
    priority: stylePropsPriority["Grid Layout"],
  },
  {
    name: "Background",
    keys: [
      "bg",
      "background",
      "bgImage",
      "backgroundImage",
      "bgSize",
      "backgroundSize",
      "bgPosition",
      "backgroundPosition",
      "bgRepeat",
      "backgroundRepeat",
      "bgAttachment",
      "backgroundAttachment",
      "bgGradient",
      "bgClip",
      "backgroundClip",
      "opacity",
    ],
    priority: stylePropsPriority["Background"],
  },
  {
    name: "Border",
    keys: [
      "border",
      "borderWidth",
      "borderStyle",
      "borderColor",
      "borderTop",
      "borderTopWidth",
      "borderTopStyle",
      "borderTopColor",
      "borderRight",
      "borderRightWidth",
      "borderRightStyle",
      "borderRightColor",
      "borderBottom",
      "borderBottomWidth",
      "borderBottomStyle",
      "borderBottomColor",
      "borderLeft",
      "borderLeftWidth",
      "borderLeftStyle",
      "borderLeftColor",
      "borderStart",
      "borderStartWidth",
      "borderStartStyle",
      "borderStartColor",
      "borderEnd",
      "borderEndWidth",
      "borderEndStyle",
      "borderEndColor",
      "borderX",
      "borderY",
    ],
    priority: stylePropsPriority["Border"],
  },
  {
    name: "Border Radius",
    keys: [
      "borderRadius",
      "borderTopLeftRadius",
      "borderTopStartRadius",
      "borderTopRightRadius",
      "borderTopEndRadius",
      "borderBottomRightRadius",
      "borderBottomEndRadius",
      "borderBottomLeftRadius",
      "borderBottomStartRadius",
      "borderTopRadius",
      "borderRightRadius",
      "borderEndRadius",
      "borderBottomRadius",
      "borderLeftRadius",
      "borderStartRadius",
    ],
    priority: stylePropsPriority["Border Radius"],
  },
  {
    name: "Position",
    keys: ["pos", "position", "zIndex", "top", "right", "bottom", "left"],
    priority: stylePropsPriority["Position"],
  },
  {
    name: "Shadow",
    keys: ["textShadow", "shadow", "boxShadow"],
    priority: stylePropsPriority["Shadow"],
  },
  {
    name: "Pseudo",
    keys: [
      "_hover",
      "_active",
      "_focus",
      "_highlighted",
      "_focusWithin",
      "_focusVisible",
      "_disabled",
      "_readOnly",
      "_before",
      "_after",
      "_empty",
      "_expanded",
      "_checked",
      "_grabbed",
      "_pressed",
      "_invalid",
      "_valid",
      "_loading",
      "_selected",
      "_hidden",
      "_autofill",
      "_even",
      "_odd",
      "_first",
      "_last",
      "_notFirst",
      "_notLast",
      "_visited",
      "_activeLink",
      "_activeStep",
      "_indeterminate",
      "_groupHover",
      "_peerHover",
      "_groupFocus",
      "_peerFocus",
      "_groupFocusVisible",
      "_peerFocusVisible",
      "_groupActive",
      "_groupDisabled",
      "_peerDisabled",
      "_groupInvalid",
      "_peerInvalid",
      "_groupChecked",
      "_peerChecked",
      "_groupFocusWithin",
      "_peerFocusWithin",
      "_peerPlaceholderShown",
      "_placeholder",
      "_placeholderShown",
      "_fullScreen",
      "_selection",
      "_rtl",
      "_ltr",
      "_mediaDark",
      "_mediaReduceMotion",
      "_dark",
      "_light",
    ],
    priority: stylePropsPriority["Pseudo"],
  },
  {
    name: "Other Style Props",
    keys: [
      "animation",
      "appearance",
      "transform",
      "transformOrigin",
      "visibility",
      "whiteSpace",
      "userSelect",
      "pointerEvents",
      "wordBreak",
      "overflowWrap",
      "textOverflow",
      "boxSizing",
      "cursor",
      "resize",
      "transition",
      "objectFit",
      "objectPosition",
      "float",
      "outline",
    ],
    priority: stylePropsPriority["Other Style Props"],
  },
];

export function getPriority(key: string, config: Config): number {
  // getPriority returns a number. The smaller is the heigher priority.
  // Properties will have their "group priority", determined by which group property belongs, and "inGroup priority", determined by index in that group.
  const { firstProps, lastProps, componentSpecificProps } = config;
  const indexInFirstProps = firstProps.indexOf(key);
  const indexInLastProps = lastProps.indexOf(key);

  if (indexInFirstProps !== -1) {
    return calcPriorityFromIndex({ type: "reservedFirstProps", value: indexInFirstProps }, config);
  }
  if (indexInLastProps !== -1) {
    return calcPriorityFromIndex({ type: "reservedLastProps", value: indexInLastProps }, config);
  }

  if (componentSpecificProps) {
    const index = componentSpecificProps.indexOf(key);
    if (index !== -1) {
      return calcPriorityFromIndex({ type: "componentSpecificProps", value: index }, config);
    }
  }

  // Then it can be either `stylePropsPriority` or `otherPropsPriority`
  const groupIndex = priorityGroups.findIndex((group) => {
    return group.keys.includes(key);
  });

  const isStyleProps = groupIndex > -1;
  if (isStyleProps) {
    const keyIndex = getIndexInGroup(key, groupIndex);
    return calcPriorityFromIndex({ type: "styleProps", groupIndex, keyIndex }, config);
  }

  return calcPriorityFromIndex({ type: "otherProps" }, config);
}

type Index =
  | { type: "reservedFirstProps" | "componentSpecificProps" | "reservedLastProps"; value: number }
  | { type: "styleProps"; groupIndex: number; keyIndex: number }
  | { type: "otherProps" };

const calcPriorityFromIndex = (index: Index, config: Config) => {
  // Calculates the priority in which every property has different priority.
  // As an exception, non-predefined properties have the same precedence.
  // They will be treated as "other Props".

  // Currently, the priority is determined from the index of the array.
  // We assume that the length of each array is atmost 100.
  // When changing the specification, be sure to check that the stylePropsPriority range does not overlap with others.
  // Now it's range is [200, 10200]. 10200 is 100 * 100 + 200.

  // Perhaps we may want to handle -1 as error in some future.
  // Therefore I set the priority to numbers greater than or equal to zero.
  const isComponentSpecBeforeStyle = config.isCompPropsBeforeStyleProps;
  const basePriorities = {
    firstProps: 0,
    styleProps: 200,
    componentSpecificProps: isComponentSpecBeforeStyle ? 100 : 10 * 5,
    otherProps: 10 ** 6,
    lastProps: 10 ** 6 + 1,
  };

  switch (index.type) {
    case "reservedFirstProps": {
      const groupPriority = basePriorities.firstProps;
      const InGroupPriority = index.value;

      return groupPriority + InGroupPriority;
    }
    case "styleProps": {
      const { groupIndex, keyIndex } = index;
      const basePriority = basePriorities.styleProps;
      const groupPriority = priorityGroups[groupIndex].priority;
      const InGroupPriority = keyIndex;

      // By useing the following formula, we can assign a unique priority to each props of style props.
      // Justification: Since priorityGroups[**].length is less than 100, there is no duplicate.
      return basePriority + groupPriority * 100 + InGroupPriority;
    }
    case "componentSpecificProps": {
      const groupPriority = basePriorities.componentSpecificProps;
      return groupPriority;
    }
    case "otherProps": {
      const groupPriority = basePriorities.otherProps;
      // This will always return same priority value. It needs non-priority-based sorting.
      return groupPriority;
    }
    case "reservedLastProps": {
      const groupPriority = basePriorities.lastProps;
      const InGroupPriority = index.value;
      return groupPriority + InGroupPriority;
    }
    default: {
      const _x: never = index;
      return -1;
    }
  }
};

const getIndexInGroup = (key: string, groupIndex: number): number => {
  const keys = priorityGroups[groupIndex].keys;
  return keys.indexOf(key);
};
