import {
  AdditionalIcon,
  ArrowIcon,
  BagIcon,
  DirectionIcon,
  StarIcon,
  Clock,
  Stack,
  CalendarIcon,
  EducationIcon,
  CoinsIcon,
  BagClockIcon,
  OtherIcon,
} from "./icons";
import { EyeIcon } from "./icons/EyeIcon";

const icons = {
  additional: <AdditionalIcon />,
  arrow: <ArrowIcon />,
  bag: <BagIcon />,
  direction: <DirectionIcon />,
  eye: <EyeIcon />,
  star: <StarIcon />,
  clock: <Clock />,
  stack: <Stack />,
  calendar: <CalendarIcon />,
  education: <EducationIcon />,
  coins: <CoinsIcon />,
  bagClock: <BagClockIcon />,
  other: <OtherIcon />,
};

export function IconsFilter({ icon }) {
  if (!icons[icon]) return null;
  return icons[icon];
}
