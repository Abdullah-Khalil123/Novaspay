-- AlterTable
CREATE SEQUENCE currency_id_seq;
ALTER TABLE "Currency" ALTER COLUMN "id" SET DEFAULT nextval('currency_id_seq');
ALTER SEQUENCE currency_id_seq OWNED BY "Currency"."id";
