import React, { useCallback, useEffect } from "react";
import { useTable, useRowSelect } from "react-table";
import { useData } from "./useData";
import { IndeterminateCheckbox, Styles } from "./Components";
import { useTableColumns } from "./useTableColumns";

function Table({ columns, data, onSelectedRowChanged } = {}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { selectedRowIds }
    } = useTable(
        {
            onSelectedRowChanged,
            getRowId: (row, idx, parent) => {
                return row.id;
            },
            columns,
            data
        },
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: "selection",
                    Header: (props) => (
                        <div>
                            <IndeterminateCheckbox {...props.getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    )
                },
                ...columns
            ]);
        }
    );

    useEffect(() => {
        onSelectedRowChanged(selectedRowIds);
    }, [selectedRowIds, onSelectedRowChanged]);

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedRowIds: selectedRowIds
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
        </>
    );
}

function App() {
    const onSelectedRowChanged = useCallback((...args) => {
        console.log(args);
    }, []);

    const data = useData(5);

    const columns = useTableColumns();

    return (
        <Styles>
            <Table columns={columns} data={data} onSelectedRowChanged={onSelectedRowChanged} />
        </Styles>
    );
}

export default App;
