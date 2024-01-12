"use client";

import { Carreer, Type } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateCarreer, UpdateCarreer } from "@/actions/carreer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CarreerForm({
  carreer,
  typeCbo,
}: {
  carreer?: Carreer;
  typeCbo: Type[];
}) {
  // check if object is being passed down to update, else create new one on db
  const formAction = carreer ? UpdateCarreer : CreateCarreer;
  const formTitle = carreer ? "Update Carreer" : "Create Carreer";

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle>{formTitle}</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, ut.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="grid gap-6">
          <Input type="hidden" readOnly name="id" defaultValue={carreer?.id} />

          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              required
              type="text"
              name="name"
              defaultValue={carreer?.name}
            />
          </div>

          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="company">Company</Label>
            <Input
              required
              type="text"
              name="company"
              defaultValue={carreer?.company}
            />
          </div>

          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="about">About</Label>
            <Input
              required
              type="text"
              name="about"
              defaultValue={carreer?.about}
            />
          </div>

          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="date">Date</Label>
            <Input type="text" name="date" defaultValue={carreer?.date ?? ""} />
          </div>

          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="typeId">Type</Label>
            <Select
              required
              defaultValue={carreer?.typeId.toString()}
              name="typeId"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {typeCbo.map((item, index) => (
                  <SelectItem key={index} value={item.id.toString()}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
