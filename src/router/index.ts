import { createRouter, createWebHistory } from "vue-router";
import { getMonth, getDate, getYear } from "date-fns";
import DayView from "@/views/DayView.vue";
import AboutView from "@/views/AboutView.vue";
import { isPositiveInteger } from "@/lib/helpers";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      redirect: () => {
        const today = new Date();

        const day = getDate(today);
        const month = getMonth(today);
        const year = getYear(today);

        return { name: "day", params: { day, month, year } };
      },
    },
    {
      path: "/days/:year/:month/:day",
      name: "day",
      component: DayView,
      beforeEnter: ({ params: { day, month, year } }) => {
        const wrongParamGiven = [day, month, year].some(
          (param) => typeof param !== "string" || !isPositiveInteger(param)
        );

        if (wrongParamGiven) return router.push({ name: "root" });
      },
      props: ({ params: { day, month, year } }) => ({
        date: new Date(
          parseInt(year as string),
          parseInt(month as string),
          parseInt(day as string)
        ),
      }),
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
  ],
});

export default router;
