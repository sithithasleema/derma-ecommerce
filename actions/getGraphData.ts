/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import moment from "moment";

export default async function getGraphData() {
  try {
    // Get start and end dates for the data range
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");

    //   Query the DB to get order data grouped by CreatedDate
    const result = await prisma.order.groupBy({
      by: ["createDate"],
      where: {
        createDate: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "completed",
      },
      _sum: {
        amount: true,
      },
    });

    //   Initialize an object to aggregate the data by day
    const aggregatedData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    //   Create a clone of the start date to iterate over each day
    const currentDate = startDate.clone();

    //   iterate over each day in the date range
    while (currentDate <= endDate) {
      //   Format the day as a string
      const day = currentDate.format("dddd");

      // Initialize the aggregatedData for the day with the day, date, and totalAmount
      aggregatedData[day] = {
        day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
      };

      // Move to the next day
      currentDate.add(1, "day");
    }

    //   Calculate the total amount for each day by summing the order amounts
    result.forEach((entry) => {
      const day = moment(entry.createDate).format("dddd");
      const amount = entry._sum.amount || 0;
      aggregatedData[day].totalAmount += amount;
    });

    //   Convert the aggregatedData object to an array and sort it by date
    const formattedData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );

    //   Return the formatted data
    return formattedData;
  } catch (error: any) {
    throw new Error(error);
  }
}
