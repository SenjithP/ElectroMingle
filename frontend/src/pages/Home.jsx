import aboutUs from "../assets/images/aboutUs.png";
import client from "../assets/images/client.png";
import electrician from "../assets/images/electrician.png";
import whyChose from "../assets/images/whyChoose.png";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";


const Home = () => {
  return (
    <>
    <Header />
      {/*========banner========*/}
      <section className="hero__section  mt-[1px] pt-[80px] 2xl:h-[470px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            <div>
              <div className="lg:w-[600px]">
                <h1 className="text-[30px] leading-[46px] text-white font-[400] font-custom md:text-[40px] md:leading-[70px]">
                  Your One-Stop Destination for Electrical Solutions and
                  Innovation
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
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={aboutUs} alt="aboutUs" />
              </div>
            </div>
            <div className=" lg:w-full">
              <h2 className="headings text-left">About Us</h2>
              <p className="text__para text-justify">
                At ElecroMingle, we believe in the power of connections and
                knowledge sharing. We've built a digital haven for electricians and
                users to come together and light up a world
                filled with possibilities.
              </p>
              <h2 className="headings text-left pt-[20px]">Our Mission</h2>
              <p className="text__para text-justify">
                Our mission is to empower the electrical industry by providing a
                platform that fosters collaboration, innovation, and access to
                professional services. Whether you're a seasoned electrician, a
                DIY enthusiast, we're here to help you connect,
                learn, and grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*========RoleBased Features========*/}
      <section className="features">
        <div className="container">
          <div className="lg:w-[500px] mt-1 mx-auto">
            <h2 className="heading text-center">Features Based On Roles</h2>
            <p className="text__para text-center">
              We offer the finest solutions tailored to your requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-[30px] lg:mt-[30px]">
            <div className="px-5">
              <div className="flex items-center justify-center">
                <Link to="/login">
                  <img
                    className="w-[200px] h-[200px]"
                    src={client}
                    alt="client"
                  />
                </Link>
              </div>
              <div className="mt-[4px]">
                <h2 className="text-[16px] leading-7 text-black font-[400] text-center">
                  Users can find qualified electricians, seek advice, and book
                  services for their electrical needs.
                </h2>
              </div>
            </div>

            <div className="px-5">
              <div className="flex items-center justify-center">
                <Link to="/login">
                  <img
                    className="w-[200px] h-[200px]"
                    src={electrician}
                    alt="electrician"
                  />
                </Link>
              </div>
              <div className="mt-[4px]">
                <h2 className="text-[16px] leading-7 text-black font-[400] text-center">
                  Electricians can share their expertise, collaborate with
                  peers, and offer their services to users in need.
                  
                </h2>
              </div>
            </div>

           
          </div>
        </div>
      </section>

      {/*========whyChoose========*/}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-[30px] ">
            <div className="lg:w-full flex flex-col justify-center">
              <div>
                <h2 className="headings">Why Choose ElectroMingle?</h2>
              </div>
              <div className="text-center">
                <p className="text__para text-justify">
                  Community: Join a vibrant community of electrical experts and
                  enthusiasts, all passionate about the world of electrons and
                  circuits. Innovation: Stay up-to-date with the latest industry
                  trends, innovative solutions, and breakthrough technologies.
                  Convenience: Whether you need an electrician for a quick fix,
                  want to explore new products, or simply seek advice,
                  ElectroMingle is your one-stop destination. Transparency: Our
                  platform promotes transparency through user reviews and
                  ratings, ensuring you make informed decisions.
                </p>
              </div>
            </div>

            <div className="py-[30px] px-5 flex items-center justify-center">
              <img src={whyChose} alt="whyChose" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
