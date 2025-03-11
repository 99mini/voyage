export const copyToClipboard = async (
  href: string,
  options?: {
    onSuccess?: () => void;
    onError?: () => void;
  },
) => {
  const { onSuccess, onError } = options ?? {};

  try {
    await navigator.clipboard.writeText(href);
    onSuccess?.();
  } catch (error) {
    console.error('Failed to copy: ', error);
    onError?.();
  }
};
