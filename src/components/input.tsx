import { TextInput, type TextInputProps } from "react-native";

import { colors } from "@/theme/colors";

export function Input({ className, ...props }: TextInputProps) {
  return (
    <TextInput
      className={`rounded-lg border border-border px-4 py-3 text-base text-foreground dark:border-border-dark dark:text-foreground-dark ${className ?? ""}`}
      placeholderTextColor={colors.muted.DEFAULT}
      {...props}
    />
  );
}
