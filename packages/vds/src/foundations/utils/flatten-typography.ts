type TypographyGroup = {
  [key: string]: {
    fontSize: string;
    lineHeight: string;
    fontWeight: string;
    letterSpacing: string;
  };
};

type NestedTypography = {
  [group: string]: TypographyGroup;
};

export function flattenFontSizes(nested: NestedTypography) {
  const flattened: Record<string, [string, { lineHeight: string; fontWeight: string; letterSpacing: string }]> = {};

  for (const group in nested) {
    const sizes = nested[group];
    for (const size in sizes) {
      const key = `${group}-${size}`; // e.g., vds-title-md
      const { fontSize, lineHeight, fontWeight, letterSpacing } = sizes[size];
      flattened[key] = [
        fontSize,
        {
          lineHeight,
          fontWeight,
          letterSpacing,
        },
      ];
    }
  }

  return flattened;
}
