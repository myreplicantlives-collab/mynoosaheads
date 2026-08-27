/**
 * Form primitives — semantic, accessible, paper-themed.
 *
 * Each component renders with proper <label>/<input> association via
 * `htmlFor`/`id` (we accept id explicitly so consumers can wire it up),
 * `aria-describedby` for help/error text, and the right `aria-invalid`
 * state for error handling.
 */

import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
  LabelHTMLAttributes,
} from "react";
import { useId } from "react";

export type FormFieldProps = {
  id?: string;
  label: string;
  help?: ReactNode;
  error?: string;
  required?: boolean;
  children: (props: { id: string; describedBy?: string }) => ReactNode;
};

export function FormField({
  id,
  label,
  help,
  error,
  required,
  children,
}: FormFieldProps) {
  const reactId = useId();
  const fieldId = id ?? `field-${reactId}`;
  const helpId = help ? `${fieldId}-help` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className="space-y-1.5">
      <label htmlFor={fieldId} className="block text-body-sm font-medium text-ink-800">
        {label}
        {required ? (
          <span className="text-ocean-700 ml-0.5" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children({ id: fieldId, describedBy })}
      {help ? (
        <p id={helpId} className="text-caption text-ink-600">
          {help}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-caption text-ocean-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const TextInput = ({
  invalid,
  className,
  ...rest
}: TextInputProps) => (
  <input
    aria-invalid={invalid || undefined}
    className={[
      "block w-full rounded-lg border bg-paper-50 px-3 py-2 text-body text-ink-900 placeholder:text-ink-400",
      "border-paper-300 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-300 focus:outline-none",
      invalid ? "border-ocean-500 focus:border-ocean-600 focus:ring-ocean-300" : "",
      className ?? "",
    ].join(" ")}
    {...rest}
  />
);

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export const TextArea = ({ invalid, className, ...rest }: TextAreaProps) => (
  <textarea
    aria-invalid={invalid || undefined}
    className={[
      "block w-full rounded-lg border bg-paper-50 px-3 py-2 text-body text-ink-900 placeholder:text-ink-400",
      "border-paper-300 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-300 focus:outline-none",
      invalid ? "border-ocean-500 focus:border-ocean-600 focus:ring-ocean-300" : "",
      className ?? "",
    ].join(" ")}
    {...rest}
  />
);

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

export const Select = ({ invalid, className, children, ...rest }: SelectProps) => (
  <select
    aria-invalid={invalid || undefined}
    className={[
      "block w-full rounded-lg border bg-paper-50 px-3 py-2 text-body text-ink-900",
      "border-paper-300 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-300 focus:outline-none",
      invalid ? "border-ocean-500 focus:border-ocean-600 focus:ring-ocean-300" : "",
      className ?? "",
    ].join(" ")}
    {...rest}
  >
    {children}
  </select>
);

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = ({ className, ...rest }: CheckboxProps) => (
  <input
    type="checkbox"
    className={[
      "h-4 w-4 rounded border-paper-400 text-eucalyptus-600 focus:ring-2 focus:ring-eucalyptus-300",
      className ?? "",
    ].join(" ")}
    {...rest}
  />
);

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ className, ...rest }: LabelProps) => (
  <label
    className={["block text-body-sm font-medium text-ink-800", className ?? ""].join(" ")}
    {...rest}
  />
);
