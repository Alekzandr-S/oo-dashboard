"use client"

import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import {
  SidebarInset,
} from "@/components/ui/sidebar"
import data from "./data.json"
import SummaryCards from "@/components/section-cards"
import { ApplicationsTable } from "@/components/dashboard/table/ApplicationsTable"
import { ActionShortcuts } from "@/components/dashboard/table/ActionShortcuts"
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection"
import { ApplicationsOverTime } from "@/components/dashboard/charts/ApplicationsOverTime"
import { StatusDistribution } from "@/components/dashboard/charts/StatusDistribution"

export default function Page() {
  return (
    <>
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
               <SummaryCards />
               {/* <ActionShortcuts />   */}
              <div className="px-4 lg:px-6">
                {/* <ChartAreaInteractive /> */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
                <div className="lg:col-span-2">
                  <ApplicationsOverTime />
                </div>
                  <StatusDistribution />
                </div>
                {/* <AnalyticsSection /> */}
              </div>
              <div className="px-4 lg:px-6">
                <ApplicationsTable />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
        </div> */}
      </SidebarInset>
     </>
  )
}
