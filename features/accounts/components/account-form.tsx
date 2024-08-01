import { z } from "zod"
import { Trash, Save, Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { insertAccountSchema } from "@/db/schema"

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from "@/components/ui/form"
import { DialogFooter } from "@/components/ui/dialog"

const formSchema = insertAccountSchema.pick({
   name:true
})

type FormValues = z.input<typeof formSchema>;

type Props = {
   id?: string;
   defaultValues?: FormValues;
   onSubmit: (values: FormValues) => void;
   onDelete?: () => void;
   disabled?: boolean;
}

export const AccountForm = ({
   id,
   defaultValues,
   onSubmit,
   onDelete,
   disabled,
}: Props) => {

   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues:defaultValues,
   });

   const handleSubmit = (values: FormValues) => {
      onSubmit(values);
   }

   const handleDelete = () => {
      onDelete?.();
   }

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 pt-4"
         >
            <FormField
               name="name"
               control={form.control}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>
                        Nome
                     </FormLabel>
                     <FormControl>
                        <Input
                           disabled={disabled}
                           placeholder="Ex.: Dinheiro, Banco, Cartão de Crédito"
                           {...field}
                        />
                     </FormControl>
                  </FormItem>
               )}
            />

            <DialogFooter className="mt-8">
               {!!id && (
                  <Button
                  variant="outline"
                  type="button"
                  disabled={disabled}
                  onClick={handleDelete}
               >
                  <Trash className="size-4" />
               </Button>
               )}
               <Button
                  type="submit"
                  disabled={disabled}
               >
                   {id ? (
                        <>
                           <Save className="size-4 mr-2" /> Atualizar conta
                        </>
                        ) : (
                           <>
                              <Plus className="size-4 mr-2" /> Cadastrar conta
                           </>
                        )}
               </Button>
            </DialogFooter>
         </form>
      </Form>
   )
}