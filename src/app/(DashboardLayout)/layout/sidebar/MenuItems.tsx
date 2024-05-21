import {
  IconMessageQuestion,
  IconLayoutDashboard
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Extra",
  },
  {
    id: uniqueId(),
    title: "Pertanyaan",
    icon: IconMessageQuestion,
    href: "/questions",
  },
];

export default Menuitems;
