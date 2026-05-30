import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { 
  setShowProjectsSection,
} from "@/features/Projects";

export function useProjects() {
  const dispatch = useDispatch();

  useEffect(() => {
    const startProjectsAnimationTimeout = setTimeout(() => {
      dispatch(setShowProjectsSection(true));
    }, 1000);

    return () => clearTimeout(startProjectsAnimationTimeout);
  }, [dispatch]);
}
