import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function useEmailState() {
  const isSubmitDisabled = useSelector((state: RootState) => state.emailFormSlice.isSubmitDisabled);
  const isSubmitLoading = useSelector((state: RootState) => state.emailFormSlice.isSubmitLoading);

  return {
    isSubmitDisabled,
    isSubmitLoading,
  };
}
