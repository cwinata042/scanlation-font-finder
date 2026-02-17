"use client";

import Header from "@/app/_components/Header";
import { getFontData } from "@/lib/actions/fontAction";
import { GET_FONTS_QUERY_KEY } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { LuLoaderCircle } from "react-icons/lu";

export default function Fonts() {
  const { data, error } = useQuery({
    queryKey: [GET_FONTS_QUERY_KEY],
    queryFn: async () => getFontData(),
  });

  if (!data) {
    return <LuLoaderCircle className="loader lg" />;
  }

  const fontList = data.map((font) => {
    return <div>{font.name}</div>;
  });

  return (
    <>
      <Header currTab="Identifier" /> {fontList}
    </>
  );
}
