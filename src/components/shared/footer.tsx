

const dataFooter = [
    {
        name: "@ 2026 Geulist, Inc."
    },
    {
        name: "Terms"
    },
    {
        name: "Privacy"
    },
    {
        name: "Security"
    },
    {
        name: "Status"
    },
    {
        name: "Community"
    },

]

export default function Footer() {
    return (
        <footer className="w-full flex items-end justify-center mr-50 py-10 gap-6">
            {dataFooter.map((data) => (
                <p key={data.name}>
                    {data.name}
                </p>
            ))}

        </footer>
    )
}