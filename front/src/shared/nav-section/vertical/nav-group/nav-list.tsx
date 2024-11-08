import { useState, useEffect, useCallback } from 'react';

import Collapse from '@mui/material/Collapse';

import { usePathname } from 'src/utils/hooks/router-hooks/use-pathname';
import { useActiveLink } from 'src/utils/hooks/router-hooks/use-active-link';

import NavItem from 'src/shared/nav-section/vertical/nav-group/nav-item';
import { NavListProps, NavSubListProps } from 'src/shared/nav-section/types';

// ----------------------------------------------------------------------

export default function NavList({ data, depth, slotProps }: NavListProps) {
  const pathname = usePathname();

  const active = useActiveLink(data?.path, !!data.children);

  const [openMenu, setOpenMenu] = useState(active);

  const handleToggleMenu = useCallback(() => {
    if (data.children) {
      setOpenMenu((prev) => !prev);
    }
  }, [data.children]);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  useEffect(() => {
    if (!active) {
      handleCloseMenu();
    }
  }, [active, handleCloseMenu, pathname]);

  return (
    <>
      <NavItem
        open={openMenu}
        onClick={handleToggleMenu}
        //
        title={data.title}
        path={data.path}
        icon={data.icon}
        info={data.info}
        roles={data.roles}
        caption={data.caption}
        captionFull={data.captionFull}
        disabled={data.disabled}
        //
        depth={depth}
        hasChild={!!data.children}
        needButtonLink={data.needButtonLink}
        externalLink={data?.path?.includes('http')}
        currentRole={slotProps?.currentRole}
        //
        active={active}
        className={active ? 'active' : ''}
        sx={{
          mb: `${slotProps?.gap}px`,
          ...(depth === 1 ? slotProps?.rootItem : slotProps?.subItem),
        }}
      />

      {!!data.children && (
        <Collapse in={openMenu} unmountOnExit>
          <NavSubList data={data.children} depth={depth} slotProps={slotProps} />
        </Collapse>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

function NavSubList({ data, depth, slotProps }: NavSubListProps) {
  return (
    <>
      {data.map((list) => (
        <NavList key={list.path} data={list} depth={depth + 1} slotProps={slotProps} />
      ))}
    </>
  );
}
