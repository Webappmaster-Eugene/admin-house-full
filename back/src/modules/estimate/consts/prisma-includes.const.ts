import { Prisma } from '.prisma/client';

/**
 * Включает оба snapshot-набора (компоненты единички + слои пирога) для одной строки сметы.
 * Используется во всех repository-методах, возвращающих EstimateItem с детализацией.
 */
export const ITEM_BREAKDOWN_INCLUDE = {
  components: { orderBy: { orderIndex: 'asc' as const } },
  pieLayers: { orderBy: { orderIndex: 'asc' as const } },
} satisfies Prisma.EstimateItemInclude;

/**
 * Полное дерево раздела с до 2 уровней вложенности (раздел → подраздел) и строками с детализацией.
 * Используется в getById для возврата полной структуры сметы.
 */
export const SECTION_TREE_INCLUDE = {
  items: {
    orderBy: { orderIndex: 'asc' as const },
    include: ITEM_BREAKDOWN_INCLUDE,
  },
  childSections: {
    orderBy: { orderIndex: 'asc' as const },
    include: {
      items: {
        orderBy: { orderIndex: 'asc' as const },
        include: ITEM_BREAKDOWN_INCLUDE,
      },
      childSections: {
        orderBy: { orderIndex: 'asc' as const },
        include: {
          items: {
            orderBy: { orderIndex: 'asc' as const },
            include: ITEM_BREAKDOWN_INCLUDE,
          },
        },
      },
    },
  },
} satisfies Prisma.EstimateSectionInclude;
