import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ContactForm, PasswordForm, ProfileForm } from "@/components/forms/settings/ProfileForm";
import { useGetProfileQuery } from "@/server/actions/profile";
import { useGetAllStatesQuery } from "@/server/actions/utils";
import TabsPanel from "@/components/tabs/TabsPanel";
import ProfilePic from "./profile-pic";
import SectionWrapper from "@/layouts/SectionWrapper";

const tabs = ["Personal details", "Change phone number", "Change password"];

function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  const { data: profile, isError, error } = useGetProfileQuery({});
  const { data: states } = useGetAllStatesQuery({});

  useEffect(() => {
    if (isError) {
      const message = (error as any)?.message;
      toast.error(message || "Error processing request");
    }
  }, [isError]);

  const changeTab = (id: number) => {
    setActiveTab(id);
  };

  return (
    <SectionWrapper>
      <div className="flex-column md:row-flex-start !items-start gap-6 md:gap-8">
        <aside className="w-full card !pt-4 !pb-0 overflow-hidden !px-0 md:w-72">
          <Aside activeTab={activeTab} changeTab={changeTab} />
        </aside>

        <TabsPanel activeTab={activeTab} id={tabs[0]} idx={0}>
          <section className="flex-1 card !py-6 !px-5 flex-column w-full gap-3 max-w-3xl">
            <h3 className="">Personal details</h3>

            <div className="flex-column gap-5 mt-2">
              <ProfilePic image={profile?.profile_picture} />

              <ProfileForm data={profile} states={states} />
            </div>
          </section>
        </TabsPanel>

        <TabsPanel activeTab={activeTab} id={tabs[1]} idx={1}>
          <section className="card !py-6 !px-5 flex-1 flex-column w-full gap-3 max-w-xl">
            <h3 className="">Change phone number</h3>

            <ContactForm />
          </section>
        </TabsPanel>
        <TabsPanel activeTab={activeTab} id={tabs[2]} idx={2}>
          <section className="card !py-6 !px-5 flex-1 max-w-xl">
            <PasswordForm />
          </section>
        </TabsPanel>
      </div>
    </SectionWrapper>
  );
}

export default Profile;

const Aside = ({
  activeTab,
  changeTab,
}: {
  activeTab: number;
  changeTab: (id: number) => void;
}) => {
  return (
    <>
      <h3 className="px-4 text-[1.02rem] mb-6">Settings</h3>

      <div className="flex-column gap-3">
        {tabs.map((tab, idx) => (
          <p
            key={tab}
            onClick={() => changeTab(idx)}
            className={cn(
              "font-semibold py-3 px-4 transition-colors cursor-pointer",
              activeTab === idx && "bg-blue-100 text-secondary"
            )}
          >
            {tab}
          </p>
        ))}
      </div>
    </>
  );
};
