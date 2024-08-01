import { z } from "zod"

import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { useEditAccount } from "@/features/accounts/api/use-edit-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { insertAccountSchema } from "@/db/schema";
import { useConfirm } from "@/hooks/use-confirm";

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { Loader2 } from "lucide-react";



const formSchema = insertAccountSchema.pick({
   name:true
})

type FormValues = z.input<typeof formSchema>;

export const EditAccountDialog = () => {
   const { isOpen, onClose, id } = useOpenAccount();

   const [ConfirmDialog, confirm] = useConfirm(
      "Tem certeza?",
      "Esta ação vai excluir o item de forma irreversível"
   );

   const accountQuery = useGetAccount(id)
   const editMutation = useEditAccount(id);
   const deleteMutation = useDeleteAccount(id);

   const isPending = editMutation.isPending || deleteMutation.isPending;
   const isLoading = accountQuery.isLoading;

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

   const defaultValues = accountQuery.data ? {
      name: accountQuery.data.name
   } : {
      name: ""
   }

   return (
      <>
         <ConfirmDialog />
         <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Editar Conta</DialogTitle>
               <DialogDescription>
                  Atualize uma conta existente.
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
                              <AccountForm
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