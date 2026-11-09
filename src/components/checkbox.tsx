import { Check } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { Icon } from "@/components/icon";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      className="flex-row items-center gap-3 self-start py-1"
      hitSlop={8}
      onPress={() => onChange(!checked)}
    >
      <View
        className={
          checked
            ? "size-6 items-center justify-center rounded-md border border-primary bg-primary"
            : "size-6 items-center justify-center rounded-md border border-muted dark:border-muted-dark"
        }
      >
        {checked && (
          <Icon as={Check} className="size-4 text-primary-foreground" />
        )}
      </View>
      <Text className="text-base text-foreground dark:text-foreground-dark">
        {label}
      </Text>
    </Pressable>
  );
}
