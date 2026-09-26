'use client';

import Logo from '@/shared/logo';
import Scrollbar from '@/shared/scrollbar';
import { NAV } from '@/layouts/config-layout';
import { useRef, useState, useEffect } from 'react';
import NavLeftBottom from '@/shared/nav-left-bottom';
import { NavData } from '@/utils/const/data/nav-data';
import { CurrentUserInfo } from '@/entities/auth/lib';
import NavToggleButton from '@/shared/nav-toggle-button';
import { UserRoles } from '@/utils/const/user-roles.enum';
import { useCurrentUserStore } from '@/store/auth/user-auth.store';
import { usePathname } from '@/utils/hooks/router-hooks/use-pathname';
import { NavVerticalProps } from '@/layouts/dashboard/nav-vertical/nav-vertical.props';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';

import { paths } from 'src/utils/routes/paths';
import { useResponsive } from 'src/utils/hooks/use-responsive';

import NavMenuVertical from 'src/shared/nav-section/vertical';
import { AppState } from 'src/api/realisation-requests/app-state.type';
import { useWorkspaceInfoStore } from 'src/store/workspace/workspace.store';
// ---------------------------------------------------------------------

export default function NavVertical({ isOpenedNav, onCloseNav }: NavVerticalProps) {
  const loginedUser: CurrentUserInfo = useCurrentUserStore((state) => state.user);
  const { workspaceInfo } = useWorkspaceInfoStore() as { workspaceInfo: AppState };
  const [menu, setMenu] = useState(NavData);

  const pathname = usePathname();

  const lgUp = useResponsive('up', 'lg');

  useEffect(() => {
    const allCategoriesNames =
      Array.isArray(workspaceInfo?.allCategoryMaterialsOfHandbook) &&
      workspaceInfo?.allCategoryMaterialsOfHandbook?.length &&
      workspaceInfo?.allCategoryMaterialsOfHandbook?.map((category) => ({
        title: category.name,
        path: paths.dashboard.concreteCategoryMaterial.replace(
          ':categoryMaterialId',
          category.uuid
        ),
      }));

    if (Array.isArray(allCategoriesNames) && allCategoriesNames.length) {
      setMenu((prevState) => {
        const newState = [...prevState];
        newState[0].items[0].children = allCategoriesNames;
        return newState;
      });
    }
  }, [workspaceInfo?.allCategoryMaterialsOfHandbook]);

  // Закрываем выезжающее меню после перехода на другую страницу. Сравниваем с прошлым путём:
  // иначе эффект срабатывал и на само открытие (isOpenedNav в зависимостях) и сразу закрывал меню.
  const previousPathname = useRef(pathname);
  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    if (isOpenedNav) {
      onCloseNav();
    }
  }, [onCloseNav, isOpenedNav, pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4, mb: 1 }} />

      {menu && (
        <NavMenuVertical
          data={menu}
          slotProps={{
            currentRole: (loginedUser?.roles && loginedUser?.roles[0]?.name) as UserRoles,
          }}
        />
      )}

      <Box sx={{ flexGrow: 1 }} />

      <NavLeftBottom />
    </Scrollbar>
  );

  // Ниже lg меню не занимает место на экране: оно выезжает по кнопке-бургеру в шапке
  if (!lgUp) {
    return (
      <Drawer
        open={isOpenedNav}
        onClose={onCloseNav}
        PaperProps={{ sx: { width: NAV.W_VERTICAL } }}
      >
        {renderContent}
      </Drawer>
    );
  }

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      <NavToggleButton />

      <Stack
        sx={{
          height: 1,
          position: 'fixed',
          width: NAV.W_VERTICAL,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        {renderContent}
      </Stack>
    </Box>
  );
}
