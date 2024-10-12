type TValidatorRuleMatch = {
  rule: "match";
  regex: RegExp;
};

type TValidatorRuleMinLength = {
  rule: "min_length";
  min: number;
};

type TValidatorRuleMin = {
  rule: "min";
  min: number;
};

type TValidatorRuleMaxLength = {
  rule: "max_length";
  max: number;
};

type TValidatorRuleExactLength = {
  rule: "exact_length";
  length: number;
};

type TValidatorRuleNotEmpty = {
  rule: "not_empty";
};

type TValidatorRuleEqualsOtherField<FormType extends object> = {
  rule: "equals_other_field";
  key: keyof FormType;
};

export type TValidatorRule<FormType extends object> = (
  | TValidatorRuleMatch
  | TValidatorRuleMinLength
  | TValidatorRuleMaxLength
  | TValidatorRuleExactLength
  | TValidatorRuleNotEmpty
  | TValidatorRuleEqualsOtherField<FormType>
  | TValidatorRuleMin
) & { message: string };
