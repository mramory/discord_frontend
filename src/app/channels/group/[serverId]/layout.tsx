import ChannelsSidebar from "../components/ChannelsSidebar/ChannelsSidebar";

export default function SereverLayout({
  params,
  children,
}: {
  params: { serverId: string };
  children: React.ReactNode;
}) {
  return (
    <>
      <ChannelsSidebar serverId={params.serverId} />
      {children}
    </>
  );
}
