"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="h-screen bg-[#f5f7fb]">
      {/* Fixed Sidebar */}
      <div
        className="
          fixed left-0 top-0 z-50
          h-screen
        "
      >
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={
            setSidebarOpen
          }
        />
      </div>

      {/* Main Content */}
      <div className="lg:ml-[270px]">
        <Header
          setSidebarOpen={
            setSidebarOpen
          }
        />

        <MainContent>
          {children}
        </MainContent>
      </div>
    </div>
  );
}