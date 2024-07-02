'use client';

import { memo } from 'react';

import Stack from '@mui/material/Stack';

import { NavGroup } from 'src/shared/nav-section/vertical/nav-group/nav-group';

import { NavProps } from '../types';

// ----------------------------------------------------------------------

function NavMenuVertical({ data, slotProps, ...other }: NavProps) {
  return (
    <Stack component="nav" id="nav-section-vertical" {...other}>
      {data.map(
        (group, index) =>
          (!group?.roles ||
            (slotProps?.currentRole && group?.roles?.includes(slotProps.currentRole))) && (
            <NavGroup
              key={group.subheader || index}
              subheader={group.subheader}
              items={group.items}
              slotProps={slotProps}
            />
          )
      )}
    </Stack>
  );
}

export default memo(NavMenuVertical);
