import warningUser from "../../assets/images/warningUser.png";
// import client from "../assets/images/client.png";
import electrician from "../../assets/images/electrician.png";
import basicUserElectronics from "../../assets/images/basicUserElectronics.png";
import { Link } from "react-router-dom";
import ClientHeader from "../../components/Header/clientHeader";

const userHome = () => {
  return (
    <>
    <ClientHeader />
      {/*========banner========*/}
      <section className="userHero__section mt-[1px] pt-[80px] 2xl:h-[470px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            <div>
              <div className="lg:w-[700px]">
                <h1 className="text-[30px] leading-[46px] text-white font-[400] font-custom md:text-[40px] md:leading-[70px]">
                  Make the most of your visit – this is where you'll find what
                  you've been searching for
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*========aboutUs========*/}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-[30px] lg:mt-[55px]">
            <div className=" px-5">
              <div className="flex items-center justify-center">
                <img src={warningUser} alt="warningUser" />
              </div>
            </div>
            <div className=" lg:w-full">
              <h2 className="headings text-left">Disclaimer</h2>
              <p className="text__para text-justify">
                <strong>
                  {" "}
                  Protect yourself and your loved ones – electrical safety is
                  paramount.
                </strong>{" "}
                <br /> <br /> Electrical work can be extremely hazardous and
                potentially deadly when not handled by trained professionals. We
                urge everyone to prioritize safety above all else. If you are
                not a qualified electrician, attempting electrical work can have
                severe consequences. Your safety is non-negotiable. We strongly
                advise against any DIY electrical projects or handling live
                wires without proper knowledge and experience. Instead, seek the
                assistance of licensed electricians who have the expertise to
                ensure your safety and the integrity of your electrical systems.
                <br />
                <br />{" "}
                <strong>
                  At ElectroMingle, we are here to help you find the right
                  professionals to solve your electrical issues and ensure your
                  peace of mind.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*========RoleBased Features========*/}
      <section className="features">
  <div className="container">
    <div className="lg:w-[450px] pt-5 mx-auto text-center">
      <h2 className="heading">SCHEDULE YOUR TIME WITH </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-5 lg:gap-[30px] lg:mt-[10px]">
      <div className="px-5 flex flex-col items-center">
        <div className="flex items-center justify-center">
          <Link to="/userElectricianList">
            <img
              className="w-[200px] h-[200px]"
              src={electrician}
              alt="electrician"
            />
          </Link>
        </div>
        <div className="max-w-[400px] text-justify mt-4">
          <h2 className="text-[16px] leading-7 text-black font-[400]">
            Discover and reserve your appointment or engage in a conversation
            with our seasoned electricians, handpicked from our lineup of highly
            skilled electrical experts, tailored to your specific needs.
          </h2>
        </div>
      </div>
    </div>
  </div>
</section>

      {/*========whyChoose========*/}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-[30px]  ">
            <div className="lg:w-full flex flex-col justify-center">
              <div>
                <h2 className="headings">User's Guide for Troubleshooting </h2>
              </div>
              <div className="text-center">
                <p className="text__para text-justify">
                  <ul>
                    <li>
                      <strong>Prioritize Safety: </strong>Always prioritize
                      safety. Turn off the power supply to the affected circuit
                      or the main breaker if you are uncertain.
                    </li>
                    <li>
                      <strong>Visual Inspection:</strong> Examine the electrical
                      components for obvious signs of damage, like exposed
                      wires, scorch marks, or loose connections.
                    </li>
                    <li>
                      {" "}
                      <strong>Reset Circuit Breaker: </strong> If a circuit has
                      tripped, attempt to reset the breaker to see if the issue
                      is resolved. If it trips again immediately, do not force
                      it.
                    </li>
                    <li>
                      {" "}
                      <strong>Noisy or Hot Switches:</strong> If switches feel
                      hot or make noise, turn them off. They might be a fire
                      hazard.
                    </li>
                    <li>
                      <strong>Burning Smell or Sparks:</strong> If you smell
                      burning or see sparks, immediately turn off the power.
                      These are serious safety concerns.
                    </li>
                    <li>
                      <strong> Call a Professional: </strong>If you cannot
                      identify or resolve the issue, or if the fault involves
                      complex systems like the electrical panel, wiring, or
                      serious hazards, it's safer to call a qualified
                      electrician to diagnose and repair the problem.
                    </li>
                  </ul>
                </p>
              </div>
            </div>

            <div className="py-[30px] px-5 flex items-center justify-center">
              <img src={basicUserElectronics} alt="whyChose" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default userHome;
