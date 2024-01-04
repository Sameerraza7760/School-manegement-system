import Students from "./../../../assets/img1.png";
import Classes from "./../../../assets/img2.png";
import Teachers from "./../../../assets/img3.png";
import Fees from "./../../../assets/img4.png";
import Header from "../../components/Header/Header";
import SeeNotice from "../../components/SeeNotice/Notice";

function AdminHome() {
  return (
    <>
      <Header />
      <div className="container mx-auto mt-[90px] mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Total Students */}
          <div className="p-4 bg-white rounded shadow-md flex flex-col items-center">
            <img src={Students} alt="Students" className="w-16 h-16 mb-2" />
            <h2 className="text-lg font-semibold">Total Students</h2>
            {/* Replace Data component with your logic */}
            <span className="text-2xl font-bold text-green-500">13</span>
          </div>

          {/* Total Classes */}
          <div className="p-4 bg-white rounded shadow-md flex flex-col items-center">
            <img src={Classes} alt="Classes" className="w-16 h-16 mb-2" />
            <h2 className="text-lg font-semibold">Total Classes</h2>
            {/* Replace Data component with your logic */}
            <span className="text-2xl font-bold text-green-500">12</span>
          </div>

          {/* Total Teachers */}
          <div className="p-4 bg-white rounded shadow-md flex flex-col items-center">
            <img src={Teachers} alt="Teachers" className="w-16 h-16 mb-2" />
            <h2 className="text-lg font-semibold">Total Teachers</h2>
            {/* Replace Data component with your logic */}
            <span className="text-2xl font-bold text-green-500">0</span>
          </div>

          {/* Fees Collection */}
          <div className="p-4 bg-white rounded shadow-md flex flex-col items-center">
            <img src={Fees} alt="Fees" className="w-16 h-16 mb-2" />
            <h2 className="text-lg font-semibold">Fees Collection</h2>
            {/* Replace Data component with your logic */}
            <span className="text-2xl font-bold text-green-500">$23,000</span>
          </div>
        </div>

        <div className="mt-4 w-[100%] ">
          <div className="p-4 bg-white rounded shadow-md w-full">
            {/* Your additional content goes here */}
            <SeeNotice />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
