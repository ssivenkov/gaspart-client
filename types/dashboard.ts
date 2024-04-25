import {IBoilerPart} from "@/types/boilerParts";

export interface IDashboardSlider {
  items: IBoilerPart[];
  spinner: boolean;
  goToPartPage?: boolean;
}
