import React, { useMemo } from "react";
import { StatusBadge } from "./Components";

export const useTableColumns = () => {
  return useMemo(() => {
    return [
      {
        Header: "Triggered",
        accessor: "firstName",
        onSorted: () => {},
        type: "text",
        cellWidth: "92%"
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (props) => {
          return (
            <StatusBadge status={props.value}>
              {props.value === "ON" ? "On" : "Off"}
            </StatusBadge>
          );
        },
        type: "text",
        cellWidth: "8%"
      }
    ];
  }, []);
};

// export const useActionvationTableColumns = () => {
//     return useMemo(() => {
//       return [
//         {
//           Header: "Triggered",
//           accessor: "firstName",
//           onSorted: () => {},
//           type: "text",
//           cellWidth: "92%"
//         },
//         {
//           Header: "Status",
//           accessor: "status",
//           Cell: (props) => {
//             return (
//               <StatusBadge status={props.value}>
//                 {props.value === "ON" ? "On" : "Off"}
//               </StatusBadge>
//             );
//           },
//           type: "text",
//           cellWidth: "8%"
//         }
//       ];
//     }, []);
//   };
