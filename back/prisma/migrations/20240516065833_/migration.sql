-- CreateEnum
CREATE TYPE "EStatusApp" AS ENUM ('UP', 'DOWN');

-- CreateEnum
CREATE TYPE "ELanguagesTypeVariants" AS ENUM ('RUSSIAN', 'ENGLISH');

-- CreateEnum
CREATE TYPE "ECurrencyTypeVariants" AS ENUM ('RUB', 'USD', 'EUR', 'BYR');

-- CreateEnum
CREATE TYPE "EUserTypeVariants" AS ENUM ('ADMIN', 'MANAGER', 'WORKER', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "EFieldTypeVariants" AS ENUM ('number', 'string', 'array');

-- CreateEnum
CREATE TYPE "EGlobalCategoryVariants" AS ENUM ('PEOPLE', 'MATERIALS', 'OVERHEAD', 'MECHANISMS');

-- CreateTable
CREATE TABLE "register_with_role_key" (
    "uuid" UUID NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "register_with_role_key_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "app_settings" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "status" "EStatusApp" NOT NULL,
    "language" "ELanguagesTypeVariants" NOT NULL,
    "currency" "ECurrencyTypeVariants" NOT NULL,

    CONSTRAINT "app_settings_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "user" (
    "uuid" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "second_name" TEXT,
    "avatar" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT,
    "info" TEXT,
    "documents" TEXT,
    "role_uuid" UUID NOT NULL,
    "creator_of_workspace_uuid" UUID,
    "handbook_manager_uuid" UUID,
    "member_of_workspace_uuid" UUID,
    "member_of_organization_uuid" UUID,
    "member_of_project_uuid" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "role" (
    "uuid" UUID NOT NULL,
    "id_role" SERIAL,
    "name" "EUserTypeVariants" NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "workspace" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "workspace_creator_uuid" UUID NOT NULL,
    "handbook_of_workspace_uuid" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workspace_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "organization" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "workspace_uuid" UUID NOT NULL,
    "organization_leader_uuid" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "project" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "organization_uuid" UUID NOT NULL,
    "customer_email" TEXT NOT NULL,
    "customer_uuid" UUID NOT NULL,
    "responsible_manager_uuid" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "handbook" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "can_customer_view" BOOLEAN DEFAULT false,
    "workspace_uuid" UUID,
    "responsible_manager_uuid" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "handbook_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "field_type" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "js_type" "EFieldTypeVariants" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "handbookUuid" UUID,

    CONSTRAINT "field_type_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "field_variants_for_selector_field_type" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "field_type_uuid" UUID NOT NULL,
    "handbook_uuid" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "field_variants_for_selector_field_type_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "field_unit_measurement" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "comment" TEXT,
    "handbook_uuid" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "field_unit_measurement_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "field_of_category" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "comment" TEXT,
    "is_required" BOOLEAN DEFAULT true,
    "default_value" TEXT,
    "category_material_uuid" UUID NOT NULL,
    "created_by_uuid" UUID NOT NULL,
    "unit_of_measurement_uuid" UUID NOT NULL,
    "field_type_uuid" UUID NOT NULL,
    "handbook_uuid" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "field_of_category_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "global_category" (
    "uuid" UUID NOT NULL,
    "name" "EGlobalCategoryVariants" NOT NULL,
    "name_ru" TEXT NOT NULL,
    "comment" TEXT,
    "color" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "global_category_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "category_material" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "comment" TEXT,
    "template_name" TEXT,
    "global_category_uuid" UUID NOT NULL,
    "handbook_uuid" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_material_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "responsible_partner_producer" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "comment" TEXT,
    "info" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "responsible_partner_producer_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "material" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "comment" TEXT,
    "name_public" TEXT,
    "handbook_uuid" UUID NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unit_measurement_uuid" UUID NOT NULL,
    "category_uuid" UUID NOT NULL,
    "responsible_partner_uuid" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "material_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "price_changing" (
    "uuid" UUID NOT NULL,
    "new_price" DOUBLE PRECISION NOT NULL,
    "comment" TEXT,
    "material_uuid" UUID NOT NULL,
    "changed_by_uuid" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "price_changing_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "status_resource" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "status_resource_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "register_with_role_key_key_key" ON "register_with_role_key"("key");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "role_id_role_key" ON "role"("id_role");

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_workspace_creator_uuid_key" ON "workspace"("workspace_creator_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_handbook_of_workspace_uuid_key" ON "workspace"("handbook_of_workspace_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "handbook_workspace_uuid_key" ON "handbook"("workspace_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "handbook_responsible_manager_uuid_key" ON "handbook"("responsible_manager_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "global_category_name_key" ON "global_category"("name");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_uuid_fkey" FOREIGN KEY ("role_uuid") REFERENCES "role"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_member_of_workspace_uuid_fkey" FOREIGN KEY ("member_of_workspace_uuid") REFERENCES "workspace"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_member_of_organization_uuid_fkey" FOREIGN KEY ("member_of_organization_uuid") REFERENCES "organization"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_member_of_project_uuid_fkey" FOREIGN KEY ("member_of_project_uuid") REFERENCES "project"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_workspace_creator_uuid_fkey" FOREIGN KEY ("workspace_creator_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization" ADD CONSTRAINT "organization_workspace_uuid_fkey" FOREIGN KEY ("workspace_uuid") REFERENCES "workspace"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization" ADD CONSTRAINT "organization_organization_leader_uuid_fkey" FOREIGN KEY ("organization_leader_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_organization_uuid_fkey" FOREIGN KEY ("organization_uuid") REFERENCES "organization"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_customer_uuid_fkey" FOREIGN KEY ("customer_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_responsible_manager_uuid_fkey" FOREIGN KEY ("responsible_manager_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "handbook" ADD CONSTRAINT "handbook_workspace_uuid_fkey" FOREIGN KEY ("workspace_uuid") REFERENCES "workspace"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "handbook" ADD CONSTRAINT "handbook_responsible_manager_uuid_fkey" FOREIGN KEY ("responsible_manager_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_type" ADD CONSTRAINT "field_type_handbookUuid_fkey" FOREIGN KEY ("handbookUuid") REFERENCES "handbook"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_variants_for_selector_field_type" ADD CONSTRAINT "field_variants_for_selector_field_type_field_type_uuid_fkey" FOREIGN KEY ("field_type_uuid") REFERENCES "field_type"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_variants_for_selector_field_type" ADD CONSTRAINT "field_variants_for_selector_field_type_handbook_uuid_fkey" FOREIGN KEY ("handbook_uuid") REFERENCES "handbook"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_unit_measurement" ADD CONSTRAINT "field_unit_measurement_handbook_uuid_fkey" FOREIGN KEY ("handbook_uuid") REFERENCES "handbook"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_of_category" ADD CONSTRAINT "field_of_category_category_material_uuid_fkey" FOREIGN KEY ("category_material_uuid") REFERENCES "category_material"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_of_category" ADD CONSTRAINT "field_of_category_created_by_uuid_fkey" FOREIGN KEY ("created_by_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_of_category" ADD CONSTRAINT "field_of_category_unit_of_measurement_uuid_fkey" FOREIGN KEY ("unit_of_measurement_uuid") REFERENCES "field_unit_measurement"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_of_category" ADD CONSTRAINT "field_of_category_field_type_uuid_fkey" FOREIGN KEY ("field_type_uuid") REFERENCES "field_type"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_of_category" ADD CONSTRAINT "field_of_category_handbook_uuid_fkey" FOREIGN KEY ("handbook_uuid") REFERENCES "handbook"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_material" ADD CONSTRAINT "category_material_global_category_uuid_fkey" FOREIGN KEY ("global_category_uuid") REFERENCES "global_category"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_material" ADD CONSTRAINT "category_material_handbook_uuid_fkey" FOREIGN KEY ("handbook_uuid") REFERENCES "handbook"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material" ADD CONSTRAINT "material_handbook_uuid_fkey" FOREIGN KEY ("handbook_uuid") REFERENCES "handbook"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material" ADD CONSTRAINT "material_unit_measurement_uuid_fkey" FOREIGN KEY ("unit_measurement_uuid") REFERENCES "field_unit_measurement"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material" ADD CONSTRAINT "material_category_uuid_fkey" FOREIGN KEY ("category_uuid") REFERENCES "category_material"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material" ADD CONSTRAINT "material_responsible_partner_uuid_fkey" FOREIGN KEY ("responsible_partner_uuid") REFERENCES "responsible_partner_producer"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_changing" ADD CONSTRAINT "price_changing_material_uuid_fkey" FOREIGN KEY ("material_uuid") REFERENCES "material"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_changing" ADD CONSTRAINT "price_changing_changed_by_uuid_fkey" FOREIGN KEY ("changed_by_uuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
