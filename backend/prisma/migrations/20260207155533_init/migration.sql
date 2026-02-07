-- CreateTable
CREATE TABLE "nodes" (
    "id" UUID NOT NULL,
    "parent_id" UUID,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(50),
    "metadata" JSONB,
    "frequency_vector" DOUBLE PRECISION[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_nodes_parent" ON "nodes"("parent_id");

-- AddForeignKey
ALTER TABLE "nodes" ADD CONSTRAINT "nodes_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "nodes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
