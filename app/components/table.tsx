import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import DeleteFormButton from "@/components/delete-form-button";
import { FaEdit } from "react-icons/fa";
import { Area, Carreer, Project, Type } from "@prisma/client";

interface TableProps {
  data: Project[] | Area[] | Carreer[] | Type[];
  type: "project" | "project-area" | "carreer" | "carreer-type";
}

export default function AdminTable({ data, type }: TableProps) {
  // extracts columns from data prop
  const columns = Object.keys(data[0]) as string[];

  return (
    <Table>
      <TableCaption>list.</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index}>{column}</TableHead>
          ))}

          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            {Object.keys(item).map((key) => (
              <TableCell key={key}>
                {item[key] && item[key].toString()}
              </TableCell>
            ))}

            <TableCell className="flex gap-4">
              <Link
                href={`/admin/${type}/update/${item.id}`}
                className={buttonVariants({
                  variant: "secondary",
                  size: "icon",
                })}
              >
                <FaEdit className="h-4 w-auto" />
              </Link>
              <DeleteFormButton id={item.id} action={type} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}