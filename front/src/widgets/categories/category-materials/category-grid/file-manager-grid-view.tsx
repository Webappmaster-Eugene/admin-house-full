import { useRef, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';

import { useBoolean } from 'src/utils/hooks/use-boolean';

import Iconify from 'src/shared/iconify';
import CreateNewCategoryDialog from 'src/widgets/categories/create-new-category-dialog';
import FileManagerActionSelected from 'src/widgets/categories/file-manager-action-selected';
import { CategoryGridProps } from 'src/widgets/categories/category-materials/category-grid/category-grid.props';
import FileManagerFolderItem from 'src/widgets/categories/category-materials/category-item/file-manager-folder-item';

export default function FileManagerGridView({
  table,
  dataFiltered,
  onDeleteItem,
  onOpenConfirm,
  onOpenChangerPopup,
}: CategoryGridProps) {
  const { selected, onSelectRow: onSelectItem, onSelectAllRows: onSelectAllItems } = table;

  const containerRef = useRef(null);

  const [folderName, setFolderName] = useState('');

  const newFolder = useBoolean();

  const folders = useBoolean();

  const handleChangeFolderName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value);
  }, []);

  return (
    <>
      <Box ref={containerRef}>
        {/* <FileManagerPanel */}
        {/*  title="Категории справочника" */}
        {/*  subTitle={`Всего: ${dataFiltered.length} категорий`} */}
        {/*  onOpen={newFolder.onTrue} */}
        {/*  collapse={folders.value} */}
        {/*  onCollapse={folders.onToggle} */}
        {/* /> */}

        <Collapse in={!folders.value} unmountOnExit>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
          >
            {dataFiltered.map((category) => (
              <FileManagerFolderItem
                key={category.uuid}
                category={category}
                selected={selected.includes(category.uuid)}
                onSelect={() => onSelectItem(category.uuid)}
                onDelete={() => onDeleteItem(category.uuid)}
                sx={{ maxWidth: 'auto' }}
              />
            ))}
          </Box>
        </Collapse>

        {!!selected?.length && (
          <FileManagerActionSelected
            numSelected={selected.length}
            rowCount={dataFiltered.length}
            selected={selected}
            onSelectAllItems={(checked) =>
              onSelectAllItems(
                checked,
                dataFiltered.map((row) => row.uuid)
              )
            }
            action={
              <Button
                size="small"
                color="error"
                variant="contained"
                startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                onClick={onOpenConfirm}
                sx={{ mr: 1 }}
              >
                Удалить
              </Button>
            }
          />
        )}
      </Box>

      {/* <CreateNewCategoryDialog open={upload.value} onClose={upload.onFalse} /> */}

      <CreateNewCategoryDialog
        open={newFolder.value}
        onClose={newFolder.onFalse}
        title="New Folder"
        onCreate={() => {
          newFolder.onFalse();
          setFolderName('');
          console.info('CREATE NEW FOLDERR', folderName);
        }}
        folderName={folderName}
        onChangeFolderName={handleChangeFolderName}
      />
    </>
  );
}
