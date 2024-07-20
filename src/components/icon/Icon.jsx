import React from "react";
import { Logo } from "./icons/Logo";
import { Plane } from "./icons/Plane";
import { BriefCase } from "./icons/BriefCase";
import { Filter } from "./icons/Filter";
import { Chevron } from "./icons/Chevron";
import { SlashEye } from "./icons/SlashEye";
import { Star } from "./icons/Star";
import { Clear } from "./icons/Clear";
import { Calendar } from "./icons/Calendar";
import { Clock } from "./icons/Clock";
import { Stack } from "./icons/Stack";
import { Graduation } from "./icons/Graduation";
import { Salary } from "./icons/Salary";
import { TomeJob } from "./icons/TomeJob";
import { MoreFilters } from "./icons/MoreFilters";
import { OpenEye } from "./icons/OpenEye";

const Icon = ({ name, ...props }) => {
  switch (name) {
    case "logo":
      return <Logo {...props} />;
    case "plane":
      return <Plane {...props} />;
    case "briefCase":
      return <BriefCase {...props} />;
    case "filter":
      return <Filter {...props} />;
    case "chevron":
      return <Chevron {...props} />;
    case "slashEye":
      return <SlashEye {...props} />;
    case "openEye":
      return <OpenEye {...props} />;
    case "star":
      return <Star {...props} />;
    case "clear":
      return <Clear {...props} />;
    case "calendar":
      return <Calendar {...props} />;
    case "clock":
      return <Clock {...props} />;
    case "stack":
      return <Stack {...props} />;
    case "graduation":
      return <Graduation {...props} />;
    case "salary":
      return <Salary {...props} />;
    case "tomeJob":
      return <TomeJob {...props} />;
    case "moreFilters":
      return <MoreFilters {...props} />;
    default:
      return null;
  }
};

export default Icon;
