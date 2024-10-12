import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo } from "react";
import { TPickupRequest } from "../@types";
import { PickupStatusBadge } from "./PickupStatusBadge";
import { usePickupRequets } from "../hooks/usePickupRequets";

import ArrowRight from "../assets/svgs/arrow-right.svg";
import Loader from "./Loader";
import SimpleAnimatedComponent from "./SimpleAnimatedComponent";
import { useNavigate } from "react-router-dom";

const columnHelper = createColumnHelper<TPickupRequest>();

export const PickupTable: React.FC = () => {
  const navigate = useNavigate();
  const { pickups, loading, loadPage, totalPages } = usePickupRequets();

  const columns = useMemo(
    () => [
      columnHelper.accessor("requested_by", { header: () => "User" }),
      columnHelper.accessor("address.address", { header: () => "Location" }),
      columnHelper.accessor("item.name", { header: () => "Material Type" }),
      columnHelper.accessor(
        (row) =>
          row.pickup_date ? new Date(row.pickup_date).toDateString() : "-",
        { header: () => "Scheduled Date", id: "pickup_date" }
      ),
      columnHelper.accessor("size", { header: () => "Weight/ Unit" }),
      columnHelper.accessor("status", {
        header: () => "Status",
        cell: (info) => <PickupStatusBadge status={info.getValue()} />,
      }),

      columnHelper.accessor("_id", {
        id: "blank",
        header: "",
        cell: () => <ArrowRight height={24} width={24} />,
      }),
    ],
    []
  );

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const table = useReactTable({
    data: pickups,
    columns,
    pageCount: totalPages,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  useEffect(() => {
    loadPage(pagination.pageIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.pageIndex]);

  if (loading) {
    return <Loader size={30} />;
  }

  return (
    <div>
      <SimpleAnimatedComponent>
        <table className="min-w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b-[1px] border-[#0000004D]"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-[14px] pr-6 last:pr-0 text-left text-[14px] font-normal text-black leading-[22px] tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => navigate(`/pickups/${row.original._id}`)}
                className="transition-color duration-300 border-b-[1px] border-[#0000004D] cursor-pointer hover:bg-gray-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-[14px] pr-6 last:pr-0 text-left text-[14px] font-normal text-black leading-[22px] tracking-wider"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </SimpleAnimatedComponent>

      <div className="h-8"></div>

      <SimpleAnimatedComponent className="w-full">
        <div className="flex flex-row items-center w-full justify-between">
          <p className="text-[14px] leading-[22px] inline-block">
            Showing {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="border-[0.5px] border-[#000000] rounded-[4px] w-[28px] h-[28px] flex justify-center items-center disabled:opacity-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              type="button"
              className="border-[0.5px] border-[#000000] rounded-[4px] w-[28px] h-[28px] flex justify-center items-center disabled:opacity-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
          </div>
        </div>
      </SimpleAnimatedComponent>
    </div>
  );
};
