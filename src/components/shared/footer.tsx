const dataFooter = [
  {
    name: "@ 2026 Geulist, Inc.",
  },
  {
    name: "Terms",
  },
  {
    name: "Privacy",
  },
  {
    name: "Security",
  },
  {
    name: "Status",
  },
  {
    name: "Community",
  },
];

export default function Footer() {
  return (
    <footer className="w-full flex flex-wrap items-end justify-center py-6 md:py-10 gap-3 md:gap-6 mt-20 md:mt-40 px-4">
      {dataFooter.map((data) => (
        <p key={data.name} className="text-xs font-semibold">
          {data.name}
        </p>
      ))}
    </footer>
  );
}
