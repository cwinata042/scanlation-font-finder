import Image from "next/image";
import Link from "next/link";

export default function Header({
  currTab,
}: {
  currTab: "Identifier" | "Database" | "Contribute";
}) {
  return (
    <header className="header">
      <div className="logo">
        <div className="logo-container">
          <Image
            className="logo-img"
            src="/icon.webp"
            alt="FontDeiB logo"
            fill={true}
          />
        </div>
        FontDeiB
      </div>
      <div className="navbar">
        <Link href="/" className={currTab === "Identifier" ? "selected" : ""}>
          Indentifier
        </Link>
        <Link
          href="/database"
          className={currTab === "Database" ? "selected" : ""}
        >
          Database
        </Link>
        <Link
          href="/contribute"
          className={currTab === "Contribute" ? "selected" : ""}
        >
          Contribute
        </Link>
      </div>
    </header>
  );
}
