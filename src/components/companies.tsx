"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from "html-react-parser";

import { ComboboxDemo } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { SelectAreaType, SelectCompanyType } from "@/drizzle/schema/schema";
import Link from "next/link";

export function Companies({
  companies,
  areas,
}: {
  companies: SelectCompanyType[];
  areas: SelectAreaType[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.introduction?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArea = !selectedArea || company.areaID === selectedArea;
      return matchesSearch && matchesArea;
    });
  }, [companies, searchTerm, selectedArea]);

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const { name, children } = domNode;

        if (name === "ul") {
          return (
            <ul className="list-disc ml-5">
              {domToReact(children as DOMNode[], options)}
            </ul>
          );
        }

        if (name === "ol") {
          return (
            <ol className="list-decimal ml-5">
              {domToReact(children as DOMNode[], options)}
            </ol>
          );
        }

        if (name === "p") {
          return (
            <p className="mb-4">{domToReact(children as DOMNode[], options)}</p>
          );
        }
      }
    },
  };

  const handleSearch = () => {
    // This will ensure the list is re-filtered when the search is changed
    setSelectedArea(null); // Optional, reset area when search is changed
  };

  const handleAreaChange = (areaId: string) => {
    setSelectedArea(areaId === "" ? null : areaId);
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Danh sách công ty</h1>
      {/*Thanh search*/}
      <div className="mx-auto h-14 flex items-center justify-center gap-3 p-3 mb-8">
        <Input
          className="w-[300px] rounded-full"
          placeholder="Tên công ty"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ComboboxDemo areas={areas} onValueChange={handleAreaChange} />
        <Button className="bg-primary rounded-full" onClick={handleSearch}>
          <Search />
          Tìm kiếm
        </Button>
      </div>
      {/*Tạo grid company cards*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <Card key={company.id} className="overflow-hidden">
              <div className="relative h-40">
                <Image
                  src={
                    company.coverImage
                      ? company.coverImage
                      : "https://via.placeholder.com/300"
                  }
                  alt={`${company.name} cover`}
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
                <div className="absolute -bottom-10 left-4">
                  <Image
                    src={
                      company.avatar
                        ? company.avatar
                        : "https://via.placeholder.com/80"
                    }
                    alt={`${company.name} avatar`}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-white shadow-lg"
                    unoptimized
                  />
                </div>
              </div>
              <CardHeader className="pt-12">
                <CardTitle>{company.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-2 text-sm">
                  {company.introduction
                    ? parse(company.introduction, options)
                    : ""}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Link href={`/companies/${company.slug}?id=${company.id}`}>
                  <Button className="w-full">Xem chi tiết</Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">Không có công ty nào!</p>
        )}
      </div>
    </section>
  );
}
