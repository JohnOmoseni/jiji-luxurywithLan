import { locations, socials } from "@/constants";
import { ArrowRight, FooterImage } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  const isChatPage = pathname.includes("messaging");
  return (
    <footer
      className={cn(
        "bg-secondary text-secondary-foreground relative max-[480px]:mt-14 mt-20 md:mt-40 lg:mt-56",
        isChatPage && "hidden"
      )}
    >
      <FooterImage className="absolute bottom-[97%] left-0 right-0 min-h-[100px] max-h-[180px] w-full h-fit" />

      <div className="md:row-flex-btwn mt-8 flex-column gap-12 px-4 py-6 sm:pt-[5%] md:gap-6 md:px-[4%] !items-start">
        <div className="flex-column w-4/5">
          <Link to="/" className="group relative">
            {/* <img src={logo} className="w-fit h-24" />
             */}
            <h2 className="text-white">Luxury With Lan</h2>
          </Link>

          <p className="mt-3 capitalize text-sm leading-6 md:mt-5 md:w-[40ch]">
            We're passionate about delivering exceptional luxury experiences in real estates and car
            sales. Our goal is to make your journey with us seamless, enjoyable and tailored to your
            unique needs.
            <br />
            <br />
            Copyright &copy; {new Date().getFullYear()} Luxury With Lan
          </p>
        </div>

        <div className="flex-column flex w-full justify-between gap-12 md:flex-row">
          <div className="w-full md:w-[50%]">
            <h3 className="text-lg text-white">Location</h3>

            <ul className="flex-column mt-4 gap-4 text-base">
              {locations.map((item) => {
                return (
                  <p key={item} className="transition-colors">
                    {item}
                  </p>
                );
              })}
            </ul>
          </div>

          <div className="w-full md:mt-[0.4rem]">
            <h3 className="text-[1.05rem] text-white">Contact Info</h3>

            <div className="flex-column gap-5 mt-3">
              {/* <div className="flex-column gap-2">
                <p className="text-sm font-light mb-2">Address:</p>
                <p className="text-xs">
                  Port-Harcourt Office: No 6. Nsirim road off Ada Goerge, Port Harcourt. Rivers
                  State.
                </p>
                <p className="text-xs">
                  Osogbo Office: MMM Olayinka Shopping Complex Okinni/Ido Osun Road, Osogbo, Osun
                  State.
                </p>
                <p className="text-xs">
                  Bayelsa Office: Beside Otiotio Road, Along Isaac Adaka Boro Express Way, Bayelsa
                  State.
                </p>
                <p className="text-xs">Lagos Office: Addo Road Beside Eco-Bank, Lagos State.</p>
              </div> */}

              <div className="row-flex-start gap-1">
                <span className="text-sm leading-n3 font-light">Phone:</span>
                <span className=" text-xs">+2349013854829, +2348074764296</span>
              </div>

              <div className="row-flex-start gap-1">
                <span className="text-sm font-light">Email:</span>
                <a href="mailto:info@luxurywithlan.com" className="text-sm !underline">
                  info@luxurywithlan.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex border-t border-grey p-3.5 sm:py-5 sm:mx-3">
        <div className="row-flex-start gap-3">
          <p className="row-flex-start gap-1 text-white text-sm sm:text-base whitespace-nowrap">
            Follow Us
            <ArrowRight />
          </p>
          <div className="row-flex-start gap-x-3">
            {socials?.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                title={social.tag}
                target="_blank"
                rel="noopener noreferrer"
                className="group transition hover:scale-105"
              >
                <social.label className="size-5 transition-colors group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>

        <span className="row-flex-start text-center text-sm leading-5 max-md:mx-auto">
          <Link
            to="/privacy-policy"
            className="border-right border-secondary pr-3 text-foreground-variant transition hover:underline"
          >
            Terms of Service
          </Link>{" "}
          <Link
            to="/privacy-policy"
            className="border-l border-secondary px-3 text-foreground-variant transition hover:underline"
          >
            Privacy Policy
          </Link>{" "}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
