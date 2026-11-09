import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { Checkbox } from "@/components/checkbox";
import { Input } from "@/components/input";
import { SuggestionChips } from "@/components/suggestion-chips";
import { usePlaces } from "@/features/places/hooks/usePlaces";
import { useSuggestions } from "@/features/search/hooks/useSuggestions";

interface PlaceInputProps {
  value: string;
  onChangeText: (value: string) => void;
  savePlace: boolean;
  onSavePlaceChange: (savePlace: boolean) => void;
}

export function PlaceInput({
  value,
  onChangeText,
  savePlace,
  onSavePlaceChange,
}: PlaceInputProps) {
  const { t } = useTranslation();
  const places = usePlaces();
  const { suggestions, hasExactMatch } = useSuggestions(places, value);
  const showSavePlace = value.trim() !== "" && !hasExactMatch;

  return (
    <View className="gap-2">
      <Text className="text-sm text-muted dark:text-muted-dark">
        {t("common.placeInput.label")}
      </Text>
      <Input
        placeholder={t("common.placeInput.placeholder")}
        value={value}
        onChangeText={onChangeText}
      />
      <SuggestionChips
        suggestions={suggestions}
        query={value}
        onSelect={(place) => onChangeText(place.name)}
      />
      {showSavePlace && (
        <Checkbox
          label={t("common.placeInput.save")}
          checked={savePlace}
          onChange={onSavePlaceChange}
        />
      )}
    </View>
  );
}
