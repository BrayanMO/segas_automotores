import { NextResponse } from "next/server";
import React from "react";
import Cookies from "js-cookie";

export default function middleware(req) {
  const { cookies } = req;
  const url = req.url;
  const tokens = cookies.token;
  const validation = [
    "/dashboard",
    "/settings",
    "/account",
    "/customers",
    "/registerCustomer",
    "/detail-customer",
    "/detail-vehicle",
    "/detail-product",
    "/products",
    "/providers",
    "/vehicle-conversion",
    "/register-product",
    "/register-provider",
  ];
  //if (validation.some((value) => value == url) || url.includes("/detail-customer")) {
  if (validation.some((value) => url.includes(value))) {
    if (tokens === undefined) {
      return NextResponse.redirect("/");
    }
    try {
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect("/");
    }
  }
  return NextResponse.next();
}
