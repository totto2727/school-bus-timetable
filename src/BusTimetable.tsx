import React, {useEffect, useState} from "react";
import axios from "axios";
import {DataGrid, GridColDef, GridValueFormatterParams} from "@material-ui/data-grid";
import {

    Button, Dialog, Paper,


} from "@material-ui/core";


type Direction = "outward" | "homeward";

type TimetableSlot = {
    start: string,
    via1: string,
    via2: string,
    goal: string,
    remarks: string
}

type TimetableItem = {
    id: number,
    start: Date | undefined,
    via1: Date | undefined,
    via2: Date | undefined,
    goal: Date | undefined,
    remarks: string
}

type GasResponse = {
    values: TimetableSlot[]
}

const valueFormatter = (params: GridValueFormatterParams) => {
    const date = params.value as Date | undefined;
    return date !== undefined ? `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}` : date;
};

const gasGetBusTimetable = "https://script.google.com/macros/s/AKfycbyLqwd2q-JoOBW3OIRH3oCMR0WhOKxICeBn9vMFQvRx2JE6J_TMxxyPhp6EEph6GFNA/exec";

const Remarks: React.FC<{ remarks: string }> = props => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    return (
        props.remarks !== ""
            ? <div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    備考
                </Button>
                <Dialog open={open} onClose={handleClickClose}>
                    <Paper style={{
                        whiteSpace: "pre-wrap",
                        width: "auto",
                        height: "auto",
                        fontSize: "2rem",
                        minWidth: 300,
                        minHeight: 300,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        lineHeight:"2em"
                    }}>{props.remarks}</Paper>
                </Dialog>
            </div>

            : <></>
    )
}

const columns: GridColDef[] = [
    {headerName: "ID", field: "id", hide: true, type: "number"},
    {headerName: "発車", field: "start", flex: 2, valueFormatter, align: "center", headerAlign: "center"},
    {headerName: "経由1", field: "via1", flex: 2, valueFormatter, align: "center", headerAlign: "center"},
    {headerName: "経由2", field: "via2", flex: 2, valueFormatter, align: "center", headerAlign: "center"},
    {headerName: "終点", field: "goal", flex: 2, valueFormatter, align: "center", headerAlign: "center"},
    {
        headerName: "備考",
        field: "remarks",
        flex: 15,
        renderCell: params => <Remarks remarks={params.value as string}/>
    }
]

const stringToTime = (str: string) => str !== "" ? new Date(str) : undefined

const makeTimetableItemList: (slot: TimetableSlot[]) => TimetableItem[] = slot =>
    slot.map((v, id) => {
        const {start, via1, via2, goal, ...data} = v;
        return {
            ...data,
            id,
            start: stringToTime(start),
            via1: stringToTime(via1),
            via2: stringToTime(via2),
            goal: stringToTime(goal),
        }
    })

export const BusTimetable: React.FC<{ direction: Direction, title: string }> = props => {
    const [timetable, setTimetable] = useState<TimetableItem[]>([]);

    useEffect(() => {
        axios
            .get<GasResponse>(`${gasGetBusTimetable}?direction=${props.direction}`)
            .then(res => {
                setTimetable(makeTimetableItemList(res.data.values));
                console.log(JSON.stringify(res.data));
            });
    }, []);

    return (
        <div>
            <h2>{props.title}</h2>
            <DataGrid rows={timetable} columns={columns} autoPageSize autoHeight/>
        </div>
    )
}