import { useState } from 'react';
import { NavigateOptions, useNavigate } from 'react-router';

const useFileContextMenu = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(false);

  const onOpenChange = (open: boolean) => setSelected(open);

  const onLinkClick = (
    path: string,
    options?: NavigateOptions & { target?: '_self' | '_blank' | '_parent' | '_top'; features?: string },
  ) => {
    if (options && options?.target) {
      window.open(path, options.target, options.features);
      return;
    }
    navigate(path, options);
  };

  const onCopyClick = () => {};

  const onMoveClick = () => {};

  const onRenameClick = () => {};

  const onDeleteClick = () => {};

  const onDetailInfoClick = () => {};

  return {
    selected,
    onOpenChange,
    onLinkClick,
    onCopyClick,
    onMoveClick,
    onRenameClick,
    onDeleteClick,
    onDetailInfoClick,
  };
};

export default useFileContextMenu;
