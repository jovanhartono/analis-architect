import { payload } from "@/app/(frontend)/lib/payload";
import { transformToWork } from "@/app/(frontend)/lib/utils";
import { WorkList } from "@/app/(frontend)/works/work-list";

export default async function WorksPage() {
  const [{ docs: architectures }, { docs: interiors }] = await Promise.all([
    payload.find({
      collection: "architectures",
    }),
    payload.find({
      collection: "interiors",
    }),
  ]);

  return (
    <main className="margin-header padding padding-y">
      <WorkList works={transformToWork({ architectures, interiors })} />
    </main>
  );
}
