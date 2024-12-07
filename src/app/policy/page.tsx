import { privacyPolicy } from "@/constants";
import Hero from "../(home)/Hero";
import Header from "@/layouts/Header";

function PrivacyPolicy() {
  return (
    <>
      <Header />
      <Hero headerTitle="Privacy policy" />

      <main className="w-full py-4 px-4 sm:pt-12 sm:px-[5%]">
        <div className="flex-column gap-6 md:gap-10">
          <p className="pr-1">
            {privacyPolicy[0]?.introduction &&
              privacyPolicy[0]?.introduction
                .split("\n")
                .map((line, index) =>
                  line.trim() !== "" ? <p key={index}>{line}</p> : <br key={index} />
                )}
          </p>

          <div className="flex-column gap-6">
            {privacyPolicy.slice(1).map((paragraph, idx) => {
              return (
                <div
                  key={idx}
                  className="flex-column sm:grid grid-cols-[minmax(auto,_200px)_1fr] gap-x-4 gap-y-3"
                >
                  <h3 className="font-semibold text-[1rem]">{paragraph?.label}</h3>

                  <p className="pr-2">
                    {paragraph?.body &&
                      paragraph?.body
                        .split("\n")
                        .map((line, index) =>
                          line.trim() !== "" ? <p key={index}>{line}</p> : <br key={index} />
                        )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default PrivacyPolicy;
