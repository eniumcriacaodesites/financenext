import { toast, Toaster } from "sonner";
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteCategories = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation<
      ResponseType,
      Error,
      RequestType
      >({
         mutationFn: async (json) => {
            const response = await client.api.categories["bulk-delete"]["$post"]({ json });
            return await response.json();
         },
         onSuccess: () => {
            toast.success("Categoria removida!")
            queryClient.invalidateQueries({ queryKey: ["categories"]})
         },
         onError: () => {
            toast.error("Algo de inesperado aconteceu e a categoria não foi removida!")
         }
      })

   return mutation;
}