/**
 * Design system — single import surface.
 *
 * Components here are consumed by the marketing pages and the style guide.
 * Each component is exported both by named export (for tree-shaking) and
 * here as a barrel so consumers can `import { Button, Card } from "@/components/ui"`.
 */

export { Button } from "./Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./Button";

export { Card, CardBody, CardHeader, CardFooter } from "./Card";
export type { CardProps, CardVariant, CardBodyProps, CardHeaderProps, CardFooterProps } from "./Card";

export { Hero } from "./Hero";
export type { HeroProps } from "./Hero";

export { LiveDataWidget, LiveDataGrid } from "./LiveDataWidget";
export type { LiveDataWidgetProps, LiveDataKind, LiveDataState } from "./LiveDataWidget";

export {
  FormField,
  TextInput,
  TextArea,
  Select,
  Checkbox,
  Label,
} from "./Form";
export type {
  FormFieldProps,
  TextInputProps,
  TextAreaProps,
  SelectProps,
  CheckboxProps,
  LabelProps,
} from "./Form";

export { Logo, LogoCompare } from "./Logo";
export type { LogoProps, LogoMark } from "./Logo";

export { NavBar } from "./NavBar";
export type { NavBarProps, NavItem } from "./NavBar";

export { Footer } from "./Footer";
export type { FooterProps, FooterColumn } from "./Footer";

export { Icons } from "./Icon";
export type { IconProps, IconName } from "./Icon";
