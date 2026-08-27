import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { Orientation, setOrientation } from "@/features/Orientation";

export function useOrientation() {
  const dispatch = useDispatch();
  const orientation = useSelector((state: RootState) => state.orientationSlice.orientation);

  const handleOrientationChange = useCallback((key: keyof Orientation, value: string | number) => {
    dispatch(setOrientation({[key]: value}))
  }, [dispatch]);
  
  useEffect(() => {
    const {type, angle} = screen.orientation;

    handleOrientationChange("orientation", type.split("-")[0].toLowerCase());
    handleOrientationChange("angle", angle);
  }, []);

  useEffect(() => {    
    const handleOrientationListener = () => {
      const {type, angle} = screen.orientation;

      handleOrientationChange("orientation", type.split("-")[0].toLowerCase());
      handleOrientationChange("angle", angle);
    };

    screen.orientation.addEventListener("change", handleOrientationListener);
    return () => screen.orientation.removeEventListener("change", handleOrientationListener)
  }, [orientation]);

  return {
    orientation,
  }
}
