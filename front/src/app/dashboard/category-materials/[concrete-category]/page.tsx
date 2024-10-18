import { Metadata, ResolvingMetadata } from 'next';
import {
  MaterialGetAllCommand,
  UserGetFullInfoCommand,
  CategoryMaterialGetCommand,
  FieldOfCategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

import { PageProps } from 'src/utils/types/page-props/page-props.type';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import NotFoundPage from 'src/app/not-found';
import { Error } from 'src/shared/error/error';
import Materials from 'src/widgets/materials/materials';
import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';
import { getAllMaterialsInCategoryMaterial } from 'src/api/actions/material/get-all-materials-in-category-material.action';
import { getOneCategoryMaterialOfHandbook } from 'src/api/actions/category-material/get-one-category-material-of-handbook.action';

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const currentUser = (await getCurrentUser()) as UserGetFullInfoCommand.ResponseEntity;

  const workspaceToSearchUuid = ((currentUser.memberOfWorkspaces &&
    currentUser.memberOfWorkspaces[0]?.uuid) ||
    currentUser.creatorOfWorkspaceUuid) as string;

  const handbookToSearchUuid = ((currentUser?.memberOfWorkspaces &&
    currentUser?.memberOfWorkspaces.length > 0 &&
    currentUser?.memberOfWorkspaces[0].handbookOfWorkspaceUuid) ||
    currentUser?.creatorOfWorkspace?.handbookOfWorkspaceUuid) as string;

  const currentCategory = (await getOneCategoryMaterialOfHandbook(
    workspaceToSearchUuid,
    handbookToSearchUuid,
    params['concrete-category']
  )) as CategoryMaterialGetCommand.ResponseEntity;

  return {
    title: `Категория материалов: ${currentCategory.name}`,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}

export default async function ConcreteCategoryPage({ params, searchParams }: PageProps) {
  const currentUser = (await getCurrentUser()) as UserGetFullInfoCommand.ResponseEntity;

  const workspaceToSearchUuid = ((currentUser.memberOfWorkspaces &&
    currentUser.memberOfWorkspaces[0]?.uuid) ||
    currentUser.creatorOfWorkspaceUuid) as string;

  const handbookToSearchUuid = ((currentUser?.memberOfWorkspaces &&
    currentUser?.memberOfWorkspaces.length > 0 &&
    currentUser?.memberOfWorkspaces[0].handbookOfWorkspaceUuid) ||
    currentUser?.creatorOfWorkspace?.handbookOfWorkspaceUuid) as string;

  const currentCategory = (await getOneCategoryMaterialOfHandbook(
    workspaceToSearchUuid,
    handbookToSearchUuid,
    params['concrete-category']
  )) as CategoryMaterialGetCommand.ResponseEntity;

  if (isErrorFieldTypeGuard(currentCategory)) {
    return <NotFoundPage />;
  }

  let allMaterialsInCurrentHandbook = await getAllMaterialsInCategoryMaterial(
    workspaceToSearchUuid,
    handbookToSearchUuid,
    currentCategory.uuid
  );

  if (!isErrorFieldTypeGuard(allMaterialsInCurrentHandbook)) {
    allMaterialsInCurrentHandbook =
      allMaterialsInCurrentHandbook as MaterialGetAllCommand.ResponseEntity;
  }

  // let allResponsiblePartnerProducersInCurrentHandbook =
  //   await getAllResponsiblePartnersProducersInHandbook(workspaceToSearchUuid, handbookToSearchUuid);

  // if (!isErrorFieldTypeGuard(allResponsiblePartnerProducersInCurrentHandbook)) {
  //   allResponsiblePartnerProducersInCurrentHandbook =
  //     allResponsiblePartnerProducersInCurrentHandbook as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
  // }

  return isErrorFieldTypeGuard(allMaterialsInCurrentHandbook) ? (
    <Error />
  ) : (
    <Materials
      materialsInfo={allMaterialsInCurrentHandbook}
      additionalFields={
        currentCategory?.fieldsOfCategoryMaterials as FieldOfCategoryMaterialGetAllCommand.ResponseEntity
      }
    />
  );
}
