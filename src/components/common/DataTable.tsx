import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/Table";

export type Column<T> = {
    key: keyof T | string;
    label: string;
    render?: (row: T) => React.ReactNode;
};

interface Props<T> {
    columns: Column<T>[];
    data: T[];
    rowClassName?: (row: T) => string;
}

export function DataTable<T>({ columns, data, rowClassName }: Props<T>) {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((col, index) => (
                            <TableHead key={index}>{col.label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <TableRow key={rowIndex} className={rowClassName?.(row)}>
                                {columns.map((col, colIndex) => (
                                    <TableCell key={colIndex}>
                                        {col.render
                                            ? col.render(row)
                                            : (row as any)[col.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-center py-6 text-muted-foreground"
                            >
                                No hay datos
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}