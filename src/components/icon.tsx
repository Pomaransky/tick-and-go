import type { LucideIcon, LucideProps } from "lucide-react-native";
import { cssInterop } from "nativewind";

type IconProps = LucideProps & {
  as: LucideIcon;
};

function IconImpl({ as: IconComponent, ...props }: IconProps) {
  return <IconComponent {...props} />;
}

cssInterop(IconImpl, {
  className: {
    target: "style",
    nativeStyleToProp: {
      color: true,
      opacity: true,
      width: "size",
      height: "size",
    },
  },
});

export function Icon(props: IconProps) {
  return <IconImpl {...props} />;
}
