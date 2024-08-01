import { z } from "zod"
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { insertAccountSchema } from "@/db/schema";

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"




const formSchema = insertAccountSchema.pick({
   name:true
})

type FormValues = z.input<typeof formSchema>;

export const NewAccountDialog = () => {
   const { isOpen, onClose } = useNewAccount();

   const mutation = useCreateAccount();

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
         <DialogTitle>Criar Conta</DialogTitle>
         <DialogDescription>
            É bem simples e rápido.
         </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
               <AccountForm
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