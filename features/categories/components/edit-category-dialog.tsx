import { z } from "zod"

import { useGetCategory } from "@/features/categories/api/use-get-category";
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { CategoryForm } from "@/features/categories/components/category-form";
import { useEditCategory } from "@/features/categories/api/use-edit-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { insertCategorySchema } from "@/db/schema";
import { useConfirm } from "@/hooks/use-confirm";

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react";

const formSchema = insertCategorySchema.pick({
   name:true
})

type FormValues = z.input<typeof formSchema>;

export const EditCategoryDialog = () => {
   const { isOpen, onClose, id } = useOpenCategory();

   const [ConfirmDialog, confirm] = useConfirm(
      "Tem certeza?",
      "Esta ação vai excluir o item de forma irreversível"
   );

   const categoryQuery = useGetCategory(id)
   const editMutation = useEditCategory(id);
   const deleteMutation = useDeleteCategory(id);

   const isPending = editMutation.isPending || deleteMutation.isPending;
   const isLoading = categoryQuery.isLoading;

   const onSubmit = (values: FormValues) => {
      editMutation.mutate(values, {
         onSuccess: () => {
            onClose();
         }
      })
   }

   const onDelete = async () => {
      const ok = await confirm();

      if (ok) {
         deleteMutation.mutate(undefined, {
            onSuccess: () => {
               onClose();
            }
         })
      }
   }

   const defaultValues = categoryQuery.data ? {
      name: categoryQuery.data.name
   } : {
      name: ""
   }

   return (
      <>
         <ConfirmDialog />
         <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Editar Categoria</DialogTitle>
               <DialogDescription>
                  Atualize uma categoria existente.
               </DialogDescription>
            </DialogHeader>
                  <div className="grid gap-4 py-4">

                     {
                        isLoading ? (
                              <div className="flex flex-col items-center">
                              <Loader2 className="size-4 text-muted-foreground animate-spin" />
                              </div>
                        ) : 
                           (
                              <CategoryForm
                                 id={id}
                                 onSubmit={onSubmit}
                                 defaultValues={
                                    defaultValues
                                 }
                                 disabled={isPending}
                                 onDelete={onDelete}
                              />
                           )
                     }

            </div>
            </DialogContent>
         </Dialog>
      </>
   );
};