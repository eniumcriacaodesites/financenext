"use cliente"

import { Button } from "@/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useDeleteCategory } from "@/features/categories/api/use-delete-category"
import { useOpenCategory } from "@/features/categories/hooks/use-open-category"
import { useConfirm } from "@/hooks/use-confirm"
import { Edit, MoreHorizontal, Trash } from "lucide-react"

type Props = {
   id: string
}

export const Actions = ({ id }: Props) => {
     const [ConfirmDialog, confirm] = useConfirm(
      "Tem certeza?",
      "Esta ação vai excluir o item de forma irreversível"
   );
   const deleteMutation = useDeleteCategory(id);
   const { onOpen } = useOpenCategory();
   const handleDelete = async () => {
      const ok = await confirm();

      if (ok) {
         deleteMutation.mutate()
      }
   }

   return (
      <>
         <ConfirmDialog />
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="size-8 p-0">
                  <MoreHorizontal className="size-4" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuItem
                  disabled={deleteMutation.isPending}
                  onClick={()=>onOpen(id)}
               >
                  <Edit className="size-4 mr-2" />
                  Editar
               </DropdownMenuItem>
               <DropdownMenuItem
                  disabled={deleteMutation.isPending}
                  onClick={handleDelete}
               >
                  <Trash className="size-4 mr-2" />
                  Excluir
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   )
}