import { payload } from "@/app/(frontend)/lib/payload";

export const getArchitectures = async () => {
  const architectures = await payload.find({
    collection: "architectures",
    pagination: false,
    where: {
      gallery: {
        exists: true,
      },
    },
  });

  return architectures;
};
export type GetArchitecturesReturnType = Awaited<
  ReturnType<typeof getArchitectures>
>;
