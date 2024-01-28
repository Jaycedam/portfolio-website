import { Button } from "@components/ui/button";
import { IoMdAdd } from "react-icons/io";
import { Dialog, DialogContent, DialogTrigger } from "@components/ui/dialog";
import ProjectForm from "@components/form/project-form";
import { getProjects, getProjectAreas } from "@utils/get-data";
import { DataTable } from "@/components/react-table";
import { projectColumns } from "@/components/table-column-definitions";

export default async function ProjectAdminPage() {
  const data = await getProjects();
  const cbo = await getProjectAreas();

  return (
    <section className="overflow-hidden">
      <div className="container space-y-4 overflow-auto">
        <div className="flex items-center gap-4">
          <h1 className="heading">Project list</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon">
                <IoMdAdd className="h-4 w-auto" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <ProjectForm areaCbo={cbo} />
            </DialogContent>
          </Dialog>
        </div>

        <DataTable type="project" data={data} columns={projectColumns} />
      </div>
    </section>
  );
}
