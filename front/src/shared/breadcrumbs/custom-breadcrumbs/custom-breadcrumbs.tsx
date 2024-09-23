'use client';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { usePathname } from 'src/utils/hooks/router-hooks';
import { PathsTransformerBreadcrumbMap } from 'src/utils/paths-transformer.breadcrumb';

import LinkItem from './link-item';
import { BreadcrumbsLinkProps, CustomBreadcrumbsProps } from './types';

// ----------------------------------------------------------------------

export default function CustomBreadcrumbs({
  links,
  action,
  heading,
  moreLink,
  activeLast,
  sx,
  ...other
}: CustomBreadcrumbsProps) {
  const pathname = usePathname();
  const linksTexts = pathname.split('/');
  const allLinks: BreadcrumbsLinkProps[] = [];
  const linksMap = linksTexts.reduce((acc, curValue) => {
    const elem: BreadcrumbsLinkProps = {};
    if (/[a-zA-Zа-яА-ЯёЁ0-9]{1,}/g.test(curValue)) {
      elem.name = PathsTransformerBreadcrumbMap[curValue]?.name || curValue;
      if (curValue !== linksTexts[linksTexts.length - 2]) {
        elem.href = PathsTransformerBreadcrumbMap[curValue]?.link;
      }
      acc.push(elem);
    }
    return acc;
  }, allLinks);

  // console.log(linksMap);
  links = links || linksMap;

  const lastLink = links && links[links.length - 1].name;

  return (
    <Box sx={{ ...sx }}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {/* HEADING */}
          {heading && (
            <Typography variant="h4" gutterBottom>
              {heading}
            </Typography>
          )}

          {/* BREADCRUMBS */}
          {!!links.length && (
            <Breadcrumbs separator={<Separator />} {...other}>
              {links.map((link) => (
                <LinkItem
                  key={link.name || ''}
                  link={link}
                  activeLast={activeLast}
                  disabled={link.name === lastLink}
                />
              ))}
            </Breadcrumbs>
          )}
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
      </Stack>

      {/* MORE LINK */}
      {!!moreLink && (
        <Box sx={{ mt: 2 }}>
          {moreLink.map((href) => (
            <Link
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{ display: 'table' }}
            >
              {href}
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

function Separator() {
  return (
    <Box
      component="span"
      sx={{
        width: 4,
        height: 4,
        borderRadius: '50%',
        bgcolor: 'text.disabled',
      }}
    />
  );
}
