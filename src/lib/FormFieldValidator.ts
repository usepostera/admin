/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */
import { IFormFieldValidator } from "../@types";
import { TValidatorRule } from "../@types/validators";

export class FormFieldValidator<T, FormType extends object>
  implements IFormFieldValidator<T, FormType>
{
  private rules: TValidatorRule<FormType> | TValidatorRule<FormType>[];
  private isOptional: boolean;

  constructor(
    rules: TValidatorRule<FormType> | TValidatorRule<FormType>[],
    isOptional = false
  ) {
    this.rules = rules;
    this.isOptional = isOptional;
  }

  private runCheck(
    rule: TValidatorRule<FormType>,
    value: T,
    form: FormType
  ): string | null {
    if (
      this.isOptional &&
      (value === null || value === "" || typeof value === "undefined")
    ) {
      return null;
    }

    switch (rule.rule) {
      case "match":
        if (typeof value !== "string") {
          throw Error("Match rule only work with strings");
        }
        return rule.regex.test(value) ? null : rule.message;

      case "min_length":
        if (typeof value !== "string") {
          throw Error("Minimum length rule only work with strings");
        }
        return value.length < rule.min ? rule.message : null;

      case "min":
        if (value === "" || value === null || value === undefined) {
          return "Cannot be empty";
        }
        if (isNaN(Number(value))) {
          throw new Error("Min value rule only work with numbers");
        }
        return Number(value) >= rule.min ? null : rule.message;

      case "not_empty":
        if (typeof value === "undefined" || value === null || value === "") {
          return rule.message;
        }
        break;

      case "equals_other_field":
        if (
          typeof value !== typeof form[rule.key] ||
          value !== form[rule.key]
        ) {
          return rule.message;
        }
        break;
    }

    return null;
  }

  validate(value: T, form: FormType) {
    if (Array.isArray(this.rules)) {
      if (this.rules.length === 0) {
        return null;
      }

      return this.rules.map((rule) => this.runCheck(rule, value, form));
    }

    return this.runCheck(this.rules, value, form);
  }
}

export const emptyValidator = <FormType extends object>(message: string) =>
  new FormFieldValidator<string | null | number, FormType>({
    rule: "not_empty",
    message,
  });

export const emailValidator = <FormType extends object>(message?: string) =>
  new FormFieldValidator<string, FormType>({
    rule: "match",
    regex:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: message || "Invalid email address",
  });

export const usernameValidator = <FormType extends object>(message?: string) =>
  new FormFieldValidator<string, FormType>({
    rule: "match",
    regex: /^(?!.*[_.]{2})[a-zA-Z0-9._]{3,16}(?<![_.])$/,
    message: message || "Invalid username",
  });

export const passwordValidator = <FormType extends object>() =>
  new FormFieldValidator<string, FormType>([
    {
      rule: "min_length",
      min: 8,
      message: "Password must be at least 8 characters long",
    },
    {
      rule: "match",
      regex: /[A-Z]/,
      message: "Password must contain at least one uppercase character",
    },
    {
      rule: "match",
      regex: /[a-z]/,
      message: "Password must contain at least one lowercase character",
    },
    {
      rule: "match",
      regex: /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/,
      message: "Password must contain at least one special character",
    },
    {
      rule: "match",
      regex: /\d/,
      message: "Password must contain at least one digit",
    },
  ]);

export const equalsOtherFieldValidator = <FormType extends object>(
  message: string,
  key: keyof FormType
) =>
  new FormFieldValidator<any, FormType>({
    rule: "equals_other_field",
    key,
    message,
  });
