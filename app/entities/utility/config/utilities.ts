export const utilityTypes = ["base64", "url"] as const;

export type UtilityType = (typeof utilityTypes)[number];

export type UtilityDefinition = {
  type: UtilityType;
  path: string;
  color: string;
  icon: "FileCode2" | "Link";
  translationKey: UtilityType;
};

export const utilities: UtilityDefinition[] = [
  {
    type: "base64",
    path: "/utility/base64",
    color: "#34d399",
    icon: "FileCode2",
    translationKey: "base64",
  },
  {
    type: "url",
    path: "/utility/url",
    color: "#38bdf8",
    icon: "Link",
    translationKey: "url",
  },
];

export function getUtility(type?: string) {
  return utilities.find((utility) => utility.type === type);
}
