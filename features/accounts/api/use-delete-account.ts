import { toast } from "sonner";
import { InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>;

export const useDeleteAccount = (id?:string) => {
   const queryClient = useQueryClient();

   const mutation = useMutation<
      ResponseType,
      Error
      >({
         mutationFn: async () => {
            const response = await client.api.accounts[":id"]["$delete"]({
               param: {id},
            });
            return await response.json();
         },
         onSuccess: () => {
            toast.success("Conta excluída com sucesso!")
            queryClient.invalidateQueries({ queryKey: ["account", {id}] });
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
         },
         onError: () => {
            toast.error("Algo de inesperado aconteceu e a conta não foi excluída!")
         }
      })

   return mutation;
}