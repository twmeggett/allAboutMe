import { useSelector, TypedUseSelectorHook } from "react-redux";

import { ApptState } from "../store";

export const useAppSelector: TypedUseSelectorHook<ApptState> = useSelector;
