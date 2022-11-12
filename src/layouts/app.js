import Swup from "swup";
import SwupHeadPlugin from "@swup/head-plugin";
import SwupSlideTheme from "@swup/slide-theme";

const swup = new Swup({
  cache: true,
  animateHistoryBrowsing: true,
  plugins: [new SwupHeadPlugin(), new SwupSlideTheme()],
});
