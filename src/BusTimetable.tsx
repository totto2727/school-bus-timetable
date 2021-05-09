import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
} from '@material-ui/data-grid';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  Paper,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

type Direction = 'outward' | 'homeward';

type BusStop = '千歳駅' | '南千歳駅' | '研究実験棟' | '本部棟';

type BusStops = {
  start1: BusStop;
  start2: BusStop;
  start3: BusStop;
  goal: BusStop;
};

type TimetableSlot = {
  start: string;
  via1: string;
  via2: string;
  goal: string;
  remarks: string;
};

type TimetableItem = {
  id: number;
  start?: Date;
  via1?: Date;
  via2?: Date;
  goal?: Date;
  remarks: string;
};

type GasResponse = {
  values: TimetableSlot[];
};

const gasGetBusTimetable =
  'https://script.google.com/macros/s/AKfycbyFqCdqeo0DvFUJE8KCM3-6OzwckqNJGstPRtpppYbIu-JUmi_eUo_SkwpUmWhwlF4c/exec';

const Remarks: React.FC<{ remarks: string }> = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => setOpen(true), []);

  const handleClickClose = useCallback(() => setOpen(false), []);

  return props.remarks !== '' ? (
    <div>
      <Button variant={'contained'} color="primary" onClick={handleClickOpen}>
        備考
      </Button>
      <Dialog open={open} onClose={handleClickClose}>
        <Paper
          style={{
            whiteSpace: 'pre-wrap',
            minWidth: 300,
            minHeight: 300,
          }}>
          <Typography
            style={{
              padding: '2rem',
              fontSize: '2rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              lineHeight: '3rem',
            }}>
            {props.remarks}
          </Typography>
        </Paper>
      </Dialog>
    </div>
  ) : (
    <></>
  );
};

const makeColumns: (busStops: BusStops) => GridColDef[] = (busStops) => {
  const valueFormatter = (params: GridValueFormatterParams) => {
    const date = params.value as Date | undefined;
    return date !== undefined
      ? `${date
          .getHours()
          .toString()
          .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
      : date;
  };

  const shareSetting: GridColDef = {
    field: '',
    flex: 2,
    valueFormatter,
    align: 'center',
    headerAlign: 'center',
    sortable: false,
    disableColumnMenu: true,
  };

  const columns: GridColDef[] = [
    { headerName: 'ID', field: 'id', hide: true, type: 'number' },
    { ...shareSetting, headerName: `${busStops.start1}発`, field: 'start' },
    {
      ...shareSetting,
      headerName: `${busStops.start2}発`,
      field: 'via1',
      flex: 2,
    },
    {
      ...shareSetting,
      headerName: `${busStops.start3}発`,
      field: 'via2',
      flex: 2,
    },
    {
      ...shareSetting,
      headerName: `${busStops.goal}着`,
      field: 'goal',
      flex: 2,
    },
    {
      ...shareSetting,
      headerName: '備考',
      field: 'remarks',
      flex: 1,
      align: 'center',
      valueFormatter: undefined,
      renderCell: function RenderCell(params) {
        return <Remarks remarks={params.value as string} />;
      },
    },
  ];

  return columns;
};

export const BusTimetable: React.FC<{
  direction: Direction;
  busStop: BusStops;
  position?: GeolocationPosition;
}> = (props) => {
  const [timetableItems, setTimetableItems] = useState<TimetableItem[]>([]);

  const slotToItem = useCallback(
    (slot: TimetableSlot, id: number): TimetableItem => {
      const stringToTime = (str: string) =>
        str !== '' ? new Date(str) : undefined;
      const { remarks, ...rest } = slot;
      return Object.assign(
        { remarks, id },
        ...Object.entries(rest).map((v) => ({ [v[0]]: stringToTime(v[1]) }))
      );
    },
    []
  );

  useEffect(() => {
    axios
      .get<GasResponse>(`${gasGetBusTimetable}?direction=${props.direction}`)
      .then((res) => setTimetableItems(res.data.values.map(slotToItem)))
      .catch(() => alert('通信に失敗しました。再読込して下さい。'));
  }, [props.direction, slotToItem]);

  return (
    <div>
      <Accordion style={{ minWidth: '40rem' }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          style={{ fontWeight: 'bold' }}>
          {props.children}
        </AccordionSummary>
        <AccordionDetails>
          <DataGrid
            rows={timetableItems}
            columns={makeColumns(props.busStop)}
            autoPageSize
            autoHeight
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
