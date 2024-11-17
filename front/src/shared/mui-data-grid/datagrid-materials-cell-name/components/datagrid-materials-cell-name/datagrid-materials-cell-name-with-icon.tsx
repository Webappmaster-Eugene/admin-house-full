'use client';

import { memo, useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { red } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

import { usePathname } from 'src/utils/hooks/router-hooks';

import { isOverflown } from 'src/shared/mui-data-grid/datagrid-materials-cell-name/helpers';
import { GridCellWithIconExpandProps } from 'src/shared/mui-data-grid/datagrid-materials-cell-name/datagrid-materials-cell-name.props';

export const GridCellExpandWithIcon = memo((props: GridCellWithIconExpandProps) => {
  const { width, value, isCellNameNeedToMark, pathToRedirect } = props;
  const wrapper = useRef<HTMLDivElement | null>(null);
  const cellDiv = useRef(null);
  const cellValue = useRef(null);
  const iconProblem = useRef(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElIcon, setAnchorElIcon] = useState<null | HTMLElement>(null);
  const [showFullCell, setShowFullCell] = useState(false);
  const [showPopper, setShowPopper] = useState(false);
  const [showPopperIconProblem, setShowPopperIconProblem] = useState(false);

  const path = usePathname();
  const isCurrentPathWithCategory = path.replace(/\/$/, '') === pathToRedirect;

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current!);
    setShowPopper(false);
    setShowPopperIconProblem(false);
    setAnchorElIcon(null);
    if (isCurrentlyOverflown && !showPopperIconProblem) {
      setShowPopper(true);
      setAnchorEl(cellDiv.current);
      setShowFullCell(true);
    }
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
    setAnchorEl(null);
    setShowPopper(false);
  };

  // @ts-ignore
  const handleMouseIconEnter = (event: MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    setShowPopperIconProblem(true);
    setAnchorElIcon(iconProblem.current);
    setShowFullCell(true);
    setAnchorEl(null);
    setShowPopper(false);
  };

  const handleMouseIconLeave = () => {
    setShowFullCell(false);
    setShowPopperIconProblem(false);
    setShowPopper(false);
    setAnchorEl(null);
    setAnchorElIcon(null);
  };

  const handleClickLinkToCategory = () => {
    setShowFullCell(false);
    setShowPopperIconProblem(false);
    setShowPopper(false);
    setAnchorEl(null);
    setAnchorElIcon(null);
  };

  const handleMouseCurrentIconLeave = () => {
    // setShowPopper(false);
    // setAnchorEl(null);
    // setShowFullCell(false);
    // setShowPopperIconProblem(false);
  };
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showPopperIconProblem) {
      timer = setTimeout(() => {
        setShowPopperIconProblem(false);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [showPopperIconProblem]);

  useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent: KeyboardEvent) {
      if (nativeEvent.key === 'Escape') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <>
      {isCellNameNeedToMark && (
        <Box
          ref={iconProblem}
          sx={{
            marginRight: '4px',
          }}
        >
          <DoNotDisturbIcon
            sx={{ color: red[500], marginTop: '5px' }}
            onMouseEnter={(event) => handleMouseIconEnter(event)}
            onMouseLeave={handleMouseCurrentIconLeave}
          />
        </Box>
      )}
      <Box
        ref={wrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          alignItems: 'center',
          lineHeight: '24px',
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
        }}
      >
        <Box
          ref={cellDiv}
          sx={{
            height: '100%',
            width,
            display: 'block',
            position: 'absolute',
            top: 0,
          }}
        />
        <Box
          ref={cellValue}
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Typography
            sx={
              isCellNameNeedToMark
                ? {
                    fontSize: '14px',
                    lineHeight: 'inherit',
                    position: 'relative',
                    display: 'inline-block',
                    color: 'black', // Цвет текста
                    textDecoration: 'underline' /* Подчёркивание */,
                    textDecorationStyle: 'wavy' /* Волнистая линия */,
                    textDecorationColor: 'red',
                    textUnderlineOffset: '3px',
                    /* Толщина подчёркивания — 4 пикселя */
                    textDecorationThickness: '1px',
                  }
                : {
                    fontSize: '14px',
                    lineHeight: 'inherit',
                    position: 'relative',
                    display: 'inline-block',
                    color: 'black', // Цвет текста
                  }
            }
          >
            {value}
          </Typography>
        </Box>

        {showPopperIconProblem && (
          <Popper
            open={showFullCell && anchorElIcon !== null}
            anchorEl={anchorElIcon}
            onMouseEnter={handleMouseIconEnter}
            onMouseLeave={handleMouseIconLeave}
            style={{
              width: '280px',
              zIndex: '9999',
            }}
          >
            <Paper elevation={1} style={{ minHeight: wrapper.current!.offsetHeight - 3 }}>
              <Typography variant="body2" style={{ padding: 8 }}>
                Вы должны поменять имя данного материала в соответствии с существующей политикой
                наименования материалов в данной категории{' '}
                {!isCurrentPathWithCategory && (
                  <Link onClick={handleClickLinkToCategory} href={pathToRedirect}>
                    Перейти
                  </Link>
                )}
              </Typography>
            </Paper>
          </Popper>
        )}
        {showPopper && !showPopperIconProblem && (
          <Popper
            open={showFullCell && anchorEl !== null}
            anchorEl={anchorEl}
            style={{ width, marginLeft: -17 }}
          >
            <Paper elevation={1} style={{ minHeight: wrapper.current!.offsetHeight - 3 }}>
              <Typography variant="body2" style={{ padding: 8 }}>
                {value}
              </Typography>
            </Paper>
          </Popper>
        )}
      </Box>
    </>
  );
});
