import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
  DataGrid,
  GridCellClassParams,
  GridColDef,
  GridValueFormatterParams,
} from '@material-ui/data-grid';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

//行き帰りか
type Direction = 'outward' | 'homeward';

//バス停のある場所
type BusStop = '千歳駅' | '南千歳駅' | '研究実験棟' | '本部棟';

//移動順
type BusStops = {
  start1: BusStop;
  start2: BusStop;
  start3: BusStop;
  goal: BusStop;
};

//テーブルの表示要素のみ
type TimetableSlot = {
  start: string;
  via1: string;
  via2: string;
  goal: string;
  remarks: string;
};

//テーブルのカラム
type TimetableItem = {
  id: number;
  start?: Date;
  via1?: Date;
  via2?: Date;
  goal: Date;
  remarks: string;
  isEnable: boolean;
};

//GASの返り値
type GasResponse = {
  values: TimetableSlot[];
};

//GAS APIのURL
const gasGetBusTimetable =
  'https://script.google.com/macros/s/AKfycbyFqCdqeo0DvFUJE8KCM3-6OzwckqNJGstPRtpppYbIu-JUmi_eUo_SkwpUmWhwlF4c/exec';

const useStyles = makeStyles((theme) => ({
  remarksPaper: {
    whiteSpace: 'pre-wrap',
    minWidth: 300,
    minHeight: 300,
  },
  remarksTypography: {
    padding: '2rem',
    fontSize: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: '3rem',
  },
  root: {
    '& .disable': {
      opacity: 0.5,
    },
    '& .remarksPaper': {
      whiteSpace: 'pre-wrap',
      minWidth: 300,
      minHeight: 300,
    },
    '& .remarksTypography': {
      padding: '2rem',
      fontSize: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      lineHeight: '3rem',
    },
  },
}));

//テーブルの備考欄のコンポーネント
const Remarks: React.FC<{ remarks: string }> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClickOpen = useCallback(() => setOpen(true), []);
  const handleClickClose = useCallback(() => setOpen(false), []);

  return props.remarks !== '' ? (
    <div className={classes.root}>
      <Button variant={'contained'} color="primary" onClick={handleClickOpen}>
        備考
      </Button>
      <Dialog open={open} onClose={handleClickClose}>
        <Paper className={classes.remarksPaper}>
          <Typography className={classes.remarksTypography}>
            {props.remarks}
          </Typography>
        </Paper>
      </Dialog>
    </div>
  ) : (
    <></>
  );
};

//DataGridの行の作成･設定
const makeColumns: (busStops: BusStops) => GridColDef[] = (busStops) => {
  //時刻表示を0詰め、もしくは空欄に変換
  const valueFormatter = (params: GridValueFormatterParams) => {
    const date = params.value as Date | undefined;
    return date !== undefined
      ? `${date
          .getHours()
          .toString()
          .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
      : date;
  };

  const checkEnable = (params: GridCellClassParams) => {
    const date = params.value as Date;
    const now = new Date();
    return (
      !date ||
      date.getHours() > now.getHours() ||
      (date.getHours() === now.getHours() &&
        date.getMinutes() >= now.getMinutes())
    );
  };

  //行の共通設定
  const shareSetting: GridColDef = {
    field: '',
    flex: 2,
    align: 'center',
    headerAlign: 'center',
    sortable: false,
    disableColumnMenu: true,
    valueFormatter,
    cellClassName: (params) => (checkEnable(params) ? '' : 'disable'),
  };

  //行の設定
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
      cellClassName: undefined,
      renderCell: function RenderCell(params) {
        return <Remarks remarks={params.value as string} />;
      },
    },
  ];

  return columns;
};

//時刻表本体、方向、バス停の移動順、ユーザの位置情報を引数とする
export const BusTimetable: React.FC<{
  direction: Direction;
  busStop: BusStops;
  position?: GeolocationPosition;
}> = (props) => {
  const [timetableItems, setTimetableItems] = useState<TimetableItem[]>([]);
  const classes = useStyles();

  //APIから取得したデータを編集
  const slotToItem = useCallback(
    (slot: TimetableSlot, id: number): TimetableItem => {
      //文字列を日付型へ
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

  //ページ描画後、GAS APIからデータ取得
  useEffect(() => {
    axios
      .get<GasResponse>(`${gasGetBusTimetable}?direction=${props.direction}`)
      .then((res) => setTimetableItems(res.data.values.map(slotToItem)))
      .catch(() => alert('通信に失敗しました。再読込して下さい。'));
  }, [props.direction, slotToItem]);

  return (
    <div className={classes.root}>
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
