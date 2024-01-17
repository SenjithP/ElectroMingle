import { useEffect, useState } from "react";
import AdminSideBar from "../../components/Admin/adminSideBar";
import AdminHeader from "../../components/Header/adminHeader";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { useAdminDashboardDataMutation } from "../../slices/adminApiSlice";

const AdminHome = () => {
  const [clientCount, setClientCount] = useState(0);
  const [electricianCount, setElectricianCount] = useState(0);
  const [bookingDatas, setBookingDatas] = useState([]);
  const [adminDashboardData] = useAdminDashboardDataMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminDashboardDetails = await adminDashboardData().unwrap();
        if (adminDashboardDetails) {
          setClientCount(adminDashboardDetails.clientCount);
          setElectricianCount(adminDashboardDetails.electricianCount);
          setBookingDatas(adminDashboardDetails.BookingData);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [adminDashboardData]);

  console.log(clientCount, "clientCount");
  console.log(electricianCount, "electricianCount");
  console.log(bookingDatas, "bookingDatas");

  // USER COUNT
  const userData = [
    { category: "Clients", value: clientCount },
    { category: "Electricians", value: electricianCount },
  ];

  //BOOKING OVER TIME
  const dateBookingsMap = bookingDatas.reduce((accumulator, items) => {
    const date = items.createdAt.split("T")[0];
    const bookings = items.workCompletedStatus === "Accepted" ? 1 : 0;

    if (!accumulator[date]) {
      accumulator[date] = bookings;
    } else {
      accumulator[date] += bookings;
    }

    return accumulator;
  }, {});

  const booking = Object.keys(dateBookingsMap)
    .filter((date) => dateBookingsMap[date] > 0)
    .map((date) => ({
      date,
      bookings: dateBookingsMap[date],
    }));
    console.log(booking,"ddscv")

  const bookingData = booking.map((item) => ({
    date: item.date,
    bookings: item.bookings,
  }));

  //REVENUE OVER TIME
  const revenueMap = bookingDatas.reduce((accumulator, items) => {
    const date = items.createdAt.split("T")[0];
    const revenue =
      items.workCompletedStatus === "PaymentSuccess"
        ? items.workPaymentAmount
        : 0;

    if (!accumulator[date]) {
      accumulator[date] = revenue;
    } else {
      accumulator[date] += revenue;
    }

    return accumulator;
  }, {});

  const revenue = Object.keys(revenueMap)
    .filter((date) => revenueMap[date] > 0)
    .map((date) => ({
      date,
      revenues: revenueMap[date],
    }));

  const revenueData = revenue.map((item) => ({
    date: item.date,
    revenue: item.revenues,
  }));

  //COMPLETED WORKS OVERTIME
  const dateCompletedWorksMap = bookingDatas.reduce((accumulator, items) => {
    const date = items.createdAt.split("T")[0];
    const works = items.workCompletedStatus === "PaymentSuccess" ? 1 : 0;

    if (!accumulator[date]) {
      accumulator[date] = works;
    } else {
      accumulator[date] += works;
    }

    return accumulator;
  }, {});

  const work = Object.keys(dateCompletedWorksMap)
    .filter((date) => dateCompletedWorksMap[date] > 0)
    .map((date) => ({
      date,
      works: dateCompletedWorksMap[date],
    }));

  const completedWorksData = work.map((item) => ({
    date: item.date,
    completedWorks: item.works,
  }));

  const colors = ["#8884d8", "#82ca9d"];

  const totalRevenue = bookingDatas.reduce(
    (sum, amount) =>
      amount.workCompletedStatus === "PaymentSuccess"
        ? sum + amount.workPaymentAmount
        : sum,
    0
  );
  const paymentSuccessCount = bookingDatas.filter(
    (amount) => amount.workCompletedStatus === "PaymentSuccess"
  ).length;
  const avgRevenue = paymentSuccessCount
    ? totalRevenue / paymentSuccessCount
    : 0;

  const completedWorks = bookingDatas.reduce(
    (count, entry) =>
      entry.workCompletedStatus === "PaymentSuccess" ? count + 1 : count,
    0
  );

  return (
    <>
      <section className="p-0  overflow-hidden flex h-screen  flex-col md:flex-row">
        <AdminSideBar />
        <div className="lg:w-3/4  text-center">
          <div className="flex items-center  bg-gray-100 justify-end p-6 md:shadow-md">
            <AdminHeader />
          </div>

          <div className="flex flex-col p-12 overflow-y-auto max-h-screen bg-gradient-to-l from-blue-200 via-blue-100 to-blue-50 scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-gray-300">
            <div className="flex flex-wrap">
              <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Total Users
                  </h2>
                  <p className="text-gray-600">
                    {clientCount + electricianCount}
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Total Bookings
                  </h2>
                  <p className="text-gray-600">{bookingDatas.length}</p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Total Revenue Avg
                  </h2>
                  <p className="text-gray-600">₹{avgRevenue}/-</p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Works Completed
                  </h2>
                  <p className="text-gray-600">{completedWorks}</p>
                </div>
              </div>
            </div>

            <div className="flex p-12 flex-wrap">
              {/* Users Pie Chart */}
              <div className="w-full md:w-1/2 mb-12">
                <h2 className="text-2xl font-semibold mb-4">
                  Users Distribution
                </h2>
                <PieChart width={400} height={250}>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={userData}
                    dataKey="value"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {userData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              {/* Bookings Line Chart */}
              <div className="w-full md:w-1/2 mb-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Bookings Over Time
                </h2>
                <LineChart width={400} height={250} data={bookingData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
                </LineChart>
              </div>

              {/* Revenue Chart */}
              <div className="w-full md:w-1/2 mb-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Revenue Over Time
                </h2>
                <AreaChart width={400} height={250} data={revenueData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </div>

              {/* Completed Works Bar Chart */}
              <div className="w-full md:w-1/2 mb-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Completed Works Over Time
                </h2>
                <BarChart width={400} height={250} data={completedWorksData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completedWorks" fill="#8884d8" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminHome;
