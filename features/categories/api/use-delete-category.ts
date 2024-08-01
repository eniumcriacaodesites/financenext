import { toast } from "sonner";
import { InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>;

export const useDeleteCategory = (id?:string) => {
   const queryClient = useQueryClient();

   const mutation = useMutation<
      ResponseType,
      Error
      >({
         mutationFn: async () => {
            const response = await client.api.categories[":id"]["$delete"]({
               param: {id},
            });
            return await response.json();
         },
         onSuccess: () => {
            toast.success("Categoria excluída com sucesso!")
            queryClient.invalidateQueries({ queryKey: ["category", {id}] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
         },
         onError: () => {
            toast.error("Algo de inesperado aconteceu e a categoria não foi excluída!")
         }
      })

   return mutation;
}