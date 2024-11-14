import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';

// ----------------------------------------------------------------------

type EmptyContentProps = StackProps & {
  title?: string;
  imgUrl?: string;
  filled?: boolean;
  description?: string;
  action?: React.ReactNode;
};

export default function EmptyContent({
  title,
  imgUrl,
  action,
  filled,
  description,
  sx,
  ...other
}: EmptyContentProps) {
  return (
    <Stack
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      sx={{
        maxHeight: '80px',
        px: 3,
        height: 1,
        ...(filled && {
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${alpha(theme.palette.grey[500], 0.08)}`,
        }),
        ...sx,
      }}
      {...other}
    >
      <Box
        component="img"
        alt="empty content"
        src={imgUrl || '/assets/icons/empty/ic_content.svg'}
        sx={{ maxWidth: 40 }}
      />

      {title && (
        <Typography
          component="span"
          sx={{ fontSize: '15px', color: 'text.disabled', textAlign: 'center' }}
        >
          {title}
        </Typography>
      )}

      {/* {description && ( */}
      {/*  <Typography */}
      {/*    variant="caption" */}
      {/*    sx={{ fontSize: '12px', color: 'text.disabled', textAlign: 'center' }} */}
      {/*  > */}
      {/*    {description} */}
      {/*  </Typography> */}
      {/* )} */}

      {action && action}
    </Stack>
  );
}
