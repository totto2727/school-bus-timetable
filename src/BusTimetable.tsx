import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridValueFormatterParams,
} from '@material-ui/data-grid'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'

//行き帰りか
type Direction = 'outward' | 'homeward'

//バス停
type BusStopName = '千歳駅' | '南千歳駅' | '研究実験棟' | '本部棟'
type BusStopJsonKey = 'chitose' | 'minamiChitose' | 'mainBldg' | 'studyBldg'
const getBusStopName = (key: BusStopJsonKey) => {
  const busStopNameFromJsonKey: { [key in BusStopJsonKey]: BusStopName } = {
    chitose: '千歳駅',
    minamiChitose: '南千歳駅',
    studyBldg: '研究実験棟',
    mainBldg: '本部棟',
  }
  return busStopNameFromJsonKey[key]
}

//移動順
type BusStops = {
  start: BusStopName
  via1: BusStopName
  via2: BusStopName
  goal: BusStopName
}

type StopTimes = {
  [key in BusStopJsonKey]?:Date
}

//テーブルの表示要素
type TimetableSlot = BusStops & { remarks: string }

//テーブルのカラム
type TimetableColumn = {
  id: number
  start?: Date
  via1?: Date
  via2?: Date
  goal?: Date
  remarks: string
  isEnable: boolean
}

//GASの返り値
type GasResponse = {
  values: TimetableSlot[]
}

//GAS APIのURL
const gasGetBusTimetable =
  'https://script.google.com/macros/s/AKfycbyFqCdqeo0DvFUJE8KCM3-6OzwckqNJGstPRtpppYbIu-JUmi_eUo_SkwpUmWhwlF4c/exec'

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
}))

//テーブルの備考欄のコンポーネント
const Remarks: React.FC<{ remarks: string }> = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleClickOpen = useCallback(() => setOpen(true), [])
  const handleClickClose = useCallback(() => setOpen(false), [])

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
  )
}

//DataGridの行の作成･設定
const makeColumns: (busStops: BusStops) => GridColDef[] = (busStops) => {
  //時刻表示を0詰め、もしくは空欄に変換
  const valueFormatter = (params: GridValueFormatterParams) => {
    const date = params.value as Date | undefined
    return (
      date &&
      `${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    )
  }

  const checkEnable = (params: GridCellParams) => {
    const date = params.value as Date
    const now = new Date()
    return (
      !date ||
      date.getHours() > now.getHours() ||
      (date.getHours() === now.getHours() &&
        date.getMinutes() >= now.getMinutes())
    )
  }

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
  }

  const busStopColumns: GridColDef[] = Object.keys(busStops).map((key) => ({
    ...shareSetting,
    headerName: `${busStops[key as keyof BusStops]}発`,
    field: key,
  }))

  //行の設定
  const columns: GridColDef[] = [
    { headerName: 'ID', field: 'id', hide: true, type: 'number' },
    ...busStopColumns,
    {
      ...shareSetting,
      headerName: '備考',
      field: 'remarks',
      flex: 1,
      align: 'center',
      valueFormatter: undefined,
      cellClassName: undefined,
      renderCell: function RenderCell(params) {
        return <Remarks remarks={params.value as string} />
      },
    },
  ]

  return columns
}

//時刻表本体、方向、バス停の移動順、ユーザの位置情報を引数とする
export const BusTimetable: React.FC<{
  direction: Direction
  busStop: BusStops
  position?: GeolocationPosition
  defaultExpanded?: boolean
}> = (props) => {
  const [timetableItems, setTimetableItems] = useState<TimetableColumn[]>([])
  const classes = useStyles()

  //APIから取得したデータを編集
  const slotToItem = useCallback(
    (slot: TimetableSlot, id: number): TimetableColumn => {
      //文字列を日付型へ
      const stringToTime = (str: string) =>
        str !== '' ? new Date(str) : undefined

      const { remarks, ...rest } = slot

      return Object.assign(
        { remarks, id },
        ...Object.entries(rest).map((v) => ({ [v[0]]: stringToTime(v[1]) }))
      )
    },
    []
  )

  //ページ描画後、GAS APIからデータ取得
  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get<GasResponse>(
          `${gasGetBusTimetable}?direction=${props.direction}`
        )
        setTimetableItems(response.data.values.map(slotToItem))
      } catch (error) {
        if (axios.isAxiosError(error))
          alert(`通信に失敗しました。再読込して下さい。\n${error.message}`)
      }
    })()
  }, [props.direction, slotToItem])

  return (
    <div className={classes.root}>
      <Accordion
        style={{ minWidth: '40rem' }}
        defaultExpanded={
          props.defaultExpanded || props.defaultExpanded === undefined
        }>
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
  )
}
