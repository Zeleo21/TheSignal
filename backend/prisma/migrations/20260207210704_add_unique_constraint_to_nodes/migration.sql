/*
  Warnings:

  - A unique constraint covering the columns `[parent_id,name]` on the table `nodes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "nodes_parent_id_name_key" ON "nodes"("parent_id", "name");
