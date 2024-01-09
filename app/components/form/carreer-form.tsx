"use client";

import { Carreer } from "@prisma/client";
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

export default function CarreerForm(props: { carreer?: Carreer }) {
  // check if object is being passed down to update, else create new one on db
  const formAction = props.carreer ? UpdateCarreer : CreateCarreer;
  const formTitle = props.carreer ? "Update Carreer" : "Create Carreer";

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle>{formTitle}</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, ut.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="grid gap-4">
          <Input
            type="hidden"
            readOnly
            name="id"
            defaultValue={props.carreer?.id}
          />

          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              required
              type="text"
              name="name"
              defaultValue={props.carreer?.name}
            />
          </div>

          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="company">Company</Label>
            <Input
              required
              type="text"
              name="company"
              defaultValue={props.carreer?.company}
            />
          </div>

          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="about">About</Label>
            <Input
              required
              type="text"
              name="about"
              defaultValue={props.carreer?.about}
            />
          </div>

          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="date">Date</Label>
            <Input type="text" name="date" defaultValue={props.carreer?.date} />
          </div>

          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="typeId">Type</Label>
            <Input
              required
              type="number"
              name="typeId"
              defaultValue={props.carreer?.typeId}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
