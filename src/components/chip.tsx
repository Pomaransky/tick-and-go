import { Pressable, Text } from "react-native";

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
}

export function Chip({ label, selected = false, onPress }: ChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={
        selected
          ? "rounded-full border border-primary bg-primary px-4 py-2"
          : "rounded-full border border-border px-4 py-2 active:opacity-70 dark:border-border-dark"
      }
      onPress={onPress}
    >
      <Text
        className={
          selected
            ? "text-primary-foreground"
            : "text-foreground dark:text-foreground-dark"
        }
      >
        {label}
      </Text>
    </Pressable>
  );
}
