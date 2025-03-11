import { useState } from 'react';
import { useNavigate } from 'react-router';

const useFileContextMenu = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(false);

  const onOpenChange = (open: boolean) => setSelected(open);

  const onLinkClick = (path: string) => navigate(path);

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
