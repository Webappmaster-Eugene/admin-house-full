import { useRef } from 'react';
import CategoryItem from '@/widgets/categories/category-materials/category-item/category-item';
import CategoryActionSelected from '@/widgets/categories/category-materials/category-action-selected';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';

import { useBoolean } from 'src/utils/hooks/use-boolean';

import Iconify from 'src/shared/iconify';
import { CategoryGridProps } from 'src/widgets/categories/category-materials/category-grid/category-grid.props';

export default function AllCategoriesGridView({
  table,
  dataFiltered,
  onDeleteCategory,
  onOpenChangerCategoryPopup,
  onOpenDeletingOneCategoryPopup,
}: CategoryGridProps) {
  const { selected, onSelectRow: onSelectItem, onSelectAllRows: onSelectAllItems } = table;

  const containerRef = useRef(null);

  const folders = useBoolean();

  return (
    <Box ref={containerRef}>
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
            <CategoryItem
              key={category.uuid}
              category={category}
              selected={selected.includes(category.uuid)}
              onSelect={() => onSelectItem(category.uuid)}
              onDelete={() => onDeleteCategory(category.uuid)}
              onOpenChangerPopup={onOpenChangerCategoryPopup}
              sx={{ maxWidth: 'auto' }}
            />
          ))}
        </Box>
      </Collapse>

      {!!selected?.length && (
        <CategoryActionSelected
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
              onClick={onOpenDeletingOneCategoryPopup}
              sx={{ mr: 1 }}
            >
              Удалить
            </Button>
          }
        />
      )}
    </Box>
  );
}
