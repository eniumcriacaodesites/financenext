import { z } from "zod"
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { CategoryForm } from "@/features/categories/components/category-form";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { insertCategorySchema } from "@/db/schema";

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"




const formSchema = insertCategorySchema.pick({
   name:true
})

type FormValues = z.input<typeof formSchema>;

export const NewCategoryDialog = () => {
   const { isOpen, onClose } = useNewCategory();

   const mutation = useCreateCategory();

   const onSubmit = (values: FormValues) => {
      mutation.mutate(values, {
         onSuccess: () => {
            onClose();
         }
      })
   }

   return (
   <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
         <DialogTitle>Criar Categoria</DialogTitle>
         <DialogDescription>
            É bem simples e rápido.
         </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
               <CategoryForm
                  onSubmit={onSubmit}
                  defaultValues={
                     {
                        name:""
                     }
                  }
                  disabled={mutation.isPending} />
      </div>
      </DialogContent>
   </Dialog>
   );
};