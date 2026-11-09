import { Text, View } from "react-native";

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function Field({ label, error, children }: FieldProps) {
  return (
    <View className="gap-2">
      <Text className="text-sm text-muted dark:text-muted-dark">{label}</Text>
      {children}
      {error && <Text className="text-sm text-danger">{error}</Text>}
    </View>
  );
}
