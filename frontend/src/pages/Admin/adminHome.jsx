import React from "react";
import AdminSideBar from "../../components/Admin/adminSideBar";
import AdminHeader from "../../components/Header/adminHeader";

const AdminHome = () => {
  return (
    <>
      <section className="p-0  flex flex-col md:flex-row">
        <AdminSideBar />
        <div className="lg:w-3/4 text-center  ">
          <div className="flex items-center bg-gray-100 justify-end p-6 md:shadow-md">
            <AdminHeader />
          </div>

        </div>
      </section>
    </>
  );
};

export default AdminHome;
